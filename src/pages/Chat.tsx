import Navigation from "@/components/Navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { chatService } from "@/lib/api";
import type { ChatStreamEvent } from "@/lib/api";

type StreamEvent = ChatStreamEvent;

const Chat = () => {
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot" | "status"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(() => localStorage.getItem("conversationId"));

  const listRef = useRef<HTMLDivElement | null>(null);
  const currentBotMessageRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (content: string, role: "user" | "bot" | "status") => {
    setMessages(prev => [...prev, { role, content }]);
  };

  const updateBotMessage = (content: string) => {
    setMessages(prev => {
      const next = [...prev];
      // If last is bot, append; else create new bot message
      if (next.length > 0 && next[next.length - 1].role === "bot") {
        next[next.length - 1] = { role: "bot", content };
      } else {
        next.push({ role: "bot", content });
      }
      return next;
    });
  };

  const addStatusMessage = (content: string) => addMessage(content, "status");

  const escapeHtml = (unsafe: string) =>
    unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const renderMarkdown = (text: string) => {
    // Preserve fenced code blocks
    const codeBlocks: string[] = [];
    let placeholderIndex = 0;
    const fencedRegex = /```([\s\S]*?)```/g;
    const withPlaceholders = text.replace(fencedRegex, (_m, p1) => {
      codeBlocks.push(p1);
      return `@@CODE_BLOCK_${placeholderIndex++}@@`;
    });

    // Escape HTML first
    let html = escapeHtml(withPlaceholders);

    // Headings
    html = html.replace(/^######\s?(.*)$/gm, '<h6 class="mt-2 font-semibold">$1<\/h6>');
    html = html.replace(/^#####\s?(.*)$/gm, '<h5 class="mt-2 font-semibold">$1<\/h5>');
    html = html.replace(/^####\s?(.*)$/gm, '<h4 class="mt-2 font-semibold">$1<\/h4>');
    html = html.replace(/^###\s?(.*)$/gm, '<h3 class="mt-3 font-semibold">$1<\/h3>');
    html = html.replace(/^##\s?(.*)$/gm, '<h2 class="mt-4 font-bold">$1<\/h2>');
    html = html.replace(/^#\s?(.*)$/gm, '<h1 class="mt-4 text-lg font-bold">$1<\/h1>');

    // Bold, italic, inline code
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1<\/strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1<\/em>');
    html = html.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted font-mono">$1<\/code>');

    // Links [text](url)
    html = html.replace(/\[(.*?)\]\((https?:[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-primary">$1<\/a>');

    // Unordered lists
    html = html.replace(/^(?:- |\* )(.*)(?:\n(?:(?:- |\* ).*)+)*/gm, (block) => {
      const items = block.split(/\n/).map((line) => line.replace(/^(?:- |\* )/, "")).map((c) => `<li>${c}<\/li>`).join("");
      return `<ul class="list-disc pl-6 my-2">${items}<\/ul>`;
    });

    // Ordered lists
    html = html.replace(/^(?:\d+\. )(.*)(?:\n(?:(?:\d+\. ).*)+)*/gm, (block) => {
      const items = block.split(/\n/).map((line) => line.replace(/^\d+\. /, "")).map((c) => `<li>${c}<\/li>`).join("");
      return `<ol class="list-decimal pl-6 my-2">${items}<\/ol>`;
    });

    // Paragraphs: convert double newlines to paragraphs, single newlines to <br/>
    html = html
      .split(/\n\n+/)
      .map((para) => `<p class="my-2 leading-relaxed">${para.replace(/\n/g, '<br/>')}<\/p>`) 
      .join("");

    // Restore code blocks
    html = html.replace(/@@CODE_BLOCK_(\d+)@@/g, (_m, idx) => {
      const code = escapeHtml(codeBlocks[Number(idx)] || "");
      return `<pre class="my-3 p-3 rounded bg-muted overflow-auto"><code class="font-mono text-sm">${code}<\/code><\/pre>`;
    });

    return html;
  };

  const handleSend = async () => {
    const message = input.trim();
    if (!message || isSending) return;

    setIsSending(true);
    addMessage(message, "user");
    setInput("");

    try {
      // Start empty bot message
      updateBotMessage("");

      await chatService.streamChat(
        {
          message,
          conversation_id: conversationId ?? undefined,
          include_reasoning: true,
          max_tokens: 100,
        },
        (data) => {
          switch (data.type) {
            case "status":
              addStatusMessage(`🔄 ${data.message}`);
              break;
            case "partial_response":
              updateBotMessage(data.content);
              break;
            case "final_response":
              updateBotMessage(data.content);
              break;
            case "complete": {
              if (data.conversation_id && data.conversation_id !== conversationId) {
                setConversationId(data.conversation_id);
                localStorage.setItem("conversationId", data.conversation_id);
              }
              const metadata = `⏱️ ${data.response_time.toFixed(2)}s | 🔧 ${data.tools_used?.length ?? 0} tools | ${data.workflow_used ? "🔀 Workflow" : "🤖 Agent"}`;
              addStatusMessage(metadata);
              break;
            }
            case "error":
              updateBotMessage(`❌ Error: ${data.message}`);
              break;
          }
        }
      );
    } catch (error: any) {
      console.error("Error:", error);
      addMessage(`❌ Connection error: ${error.message}`, "bot");
    } finally {
      setIsSending(false);
    }
  };

  const preset = useMemo(() => "Apa dasar hukum putusan tentang sengketa tanah?", []);

  useEffect(() => {
    if (messages.length === 0) {
      // Show helper preset button hint
      addStatusMessage("Tip: click the example question below to auto-fill.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Interactive Chatbot</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={listRef} className="space-y-3 max-h-[60vh] overflow-auto pr-1">
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                const isStatus = m.role === "status";
                const contentHtml = isUser
                  ? escapeHtml(m.content).replace(/\n/g, "<br/>")
                  : isStatus
                  ? escapeHtml(m.content)
                  : renderMarkdown(m.content);
                return (
                  <div key={idx} className={isUser ? "text-right" : isStatus ? "text-center text-muted-foreground text-sm" : "text-left"}>
                    <div
                      className={
                        isUser
                          ? "inline-block rounded-lg bg-primary text-primary-foreground px-3 py-2"
                          : isStatus
                          ? "inline-block"
                          : "inline-block rounded-lg bg-muted px-3 py-2 prose prose-sm max-w-none"
                      }
                      dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <div className="w-full flex gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isSending}
              />
              <Button onClick={handleSend} disabled={isSending || !input.trim()}>
                {isSending ? "Sending..." : "Send"}
              </Button>
            </div>
            <div className="w-full text-sm text-muted-foreground">
              Example: <button className="underline" onClick={() => setInput(preset)}>{preset}</button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Chat;


