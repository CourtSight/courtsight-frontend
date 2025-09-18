import Navigation from "@/components/Navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { chatService } from "@/lib/api";
import type { ChatStreamEvent } from "@/lib/api";
import aseanImage from "@/assets/asean.png";
import { Bot, Lightbulb, Loader2, Send } from "lucide-react";
// Loader2
type StreamEvent = ChatStreamEvent;

const Chat = () => {
  const [messages, setMessages] = useState<Array<{ role: "user" | "bot" | "status"; content: string }>>([]);
  const [input, setInput] = useState("");
  const location = useLocation() as { state?: { message?: string } };
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
      addStatusMessage("Start Messaging with AI Agent");
      addMessage("Hello im bot!","bot");
      setTimeout(()=>{
        addMessage("Try to ask something about supreme court cases in Indonesia",'bot');

      },1000)

    }
    // If navigated with initial message from ChatWidget, seed and send
    const initial = location?.state?.message;
    if (initial) {
      setInput(initial);
      // fire-and-forget
      setTimeout(() => {
        // ensure state applied
        setInput((curr) => {
          const toSend = initial || curr;
          if (toSend) {
            addMessage(toSend, "user");
            setInput("");
            void (async () => {
              try {
                updateBotMessage("");
                await chatService.streamChat(
                  {
                    message: toSend,
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
              } catch (err: any) {
                console.error(err);
                addMessage(`Error, try again with longer context`, "bot");
              }
            })();
          }
          return "";
        });
      }, 0);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      {/* <div className="absolute inset-0 -z-10"> */}
    <img src={aseanImage} alt="ASEAN" className="absolute inset-0 w-full h-full object-cover -z-10" />
      {/* </div> */}
      <main className="max-w-5xl mx-auto px-4 py-6 z-10">
        <Card className="backdrop-blur-sm bg-white/90 shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              Supreme Court AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={listRef} className="space-y-4 max-h-[60vh] overflow-auto pr-1 py-4 scrollbar-thin scrollbar-thumb-gray-200">
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                const isStatus = m.role === "status";
                const contentHtml = isUser
                  ? escapeHtml(m.content).replace(/\n/g, "<br/>")
                  : isStatus
                  ? escapeHtml(m.content)
                  : renderMarkdown(m.content);
                return (
                  <div key={idx} className={`flex ${isUser ? "justify-end" : isStatus ? "justify-center" : "justify-start"}`}>
                    <div
                      className={
                        isUser
                          ? "max-w-[80%] rounded-2xl bg-blue-600 text-white px-4 py-2"
                          : isStatus
                          ? "inline-flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
                          : "max-w-[80%] rounded-2xl bg-gray-100 px-4 py-2 prose prose-sm"
                      }
                      dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                  </div>
                );
              })}
              {isSending && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="w-full space-y-3">
              <div className="flex gap-2">
                <Input
                  className="rounded-full bg-gray-100 border-0 focus-visible:ring-blue-600"
                  placeholder="Ask me anything about Supreme Court rulings..."
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
                <Button 
                  className="rounded-full w-10 h-10 p-0 bg-blue-600 hover:bg-blue-700"
                  onClick={handleSend} 
                  disabled={isSending || !input.trim()}
                >
                  {isSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <Lightbulb className="w-3 h-3" />
                Try asking: <button className="underline hover:text-blue-600" onClick={() => setInput(preset)}>{preset}</button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Chat;


