import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { Mic, MicOff, Play, Pause, Square, FileText, Users, AlertCircle, Clock } from "lucide-react";

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const mediaRecorderRef = useRef(null);

  // Mock analysis data
  const mockAnalysis = {
    summary: "Client consultation regarding potential contract dispute with supplier. Key issues include delivery delays, quality concerns, and potential damages.",
    keyIssues: [
      "Contract breach - delivery timeline violations",
      "Product quality standards not met",
      "Potential damages calculation needed",
      "Statute of limitations considerations"
    ],
    actionItems: [
      "Review original contract terms",
      "Gather documentation of delays",
      "Calculate potential damages",
      "Schedule follow-up in 2 weeks"
    ],
    participants: ["Attorney Smith", "Client Johnson"],
    duration: "45 minutes",
    confidence: 94
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        // Handle audio data
        console.log("Audio data available:", event.data);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      
      // Mock transcript update
      setTimeout(() => {
        setTranscript("Attorney Smith: Good morning, Mr. Johnson. Let's discuss the issues you're having with your supplier. Can you walk me through what happened with the latest delivery?\\n\\nClient Johnson: Yes, we ordered materials that were supposed to arrive last month, but they came three weeks late and the quality was not what we expected...");
        setAnalysis(mockAnalysis);
      }, 3000);
      
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    setIsPaused(false);
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Lawyer-Client Recorder
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Record and analyze attorney-client conversations with AI-powered insights, 
            summaries, and structured note generation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recording Controls */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mic className="h-5 w-5" />
                <span>Recording Controls</span>
              </CardTitle>
              <CardDescription>
                Start recording your conversation and get real-time transcription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className={`relative p-8 rounded-full transition-all duration-300 ${
                  isRecording ? "bg-destructive/10 animate-pulse" : "bg-muted"
                }`}>
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      variant="hero"
                      size="xl"
                      className="rounded-full h-20 w-20"
                    >
                      <Mic className="h-8 w-8" />
                    </Button>
                  ) : (
                    <div className="flex items-center space-x-4">
                      {!isPaused ? (
                        <Button
                          onClick={pauseRecording}
                          variant="outline"
                          size="lg"
                          className="rounded-full"
                        >
                          <Pause className="h-6 w-6" />
                        </Button>
                      ) : (
                        <Button
                          onClick={resumeRecording}
                          variant="accent"
                          size="lg"
                          className="rounded-full"
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      )}
                      <Button
                        onClick={stopRecording}
                        variant="destructive"
                        size="lg"
                        className="rounded-full"
                      >
                        <Square className="h-6 w-6" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {isRecording && (
                <div className="text-center space-y-2">
                  <Badge variant={isPaused ? "secondary" : "destructive"}>
                    {isPaused ? "PAUSED" : "RECORDING"}
                  </Badge>
                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>
              )}

              {transcript && (
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Live Transcript</span>
                  </h4>
                  <div className="bg-muted p-4 rounded-lg max-h-60 overflow-y-auto">
                    <p className="text-sm whitespace-pre-wrap">{transcript}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>AI Analysis</span>
              </CardTitle>
              <CardDescription>
                Real-time analysis and insights from your conversation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysis ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{analysis.participants.join(", ")}</span>
                    </Badge>
                    <Badge variant="secondary">
                      {analysis.confidence}% confidence
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Summary</h4>
                    <p className="text-sm text-muted-foreground">{analysis.summary}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Key Legal Issues</h4>
                    <div className="space-y-2">
                      {analysis.keyIssues.map((issue, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Action Items</h4>
                    <div className="space-y-2">
                      {analysis.actionItems.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Start recording to see AI analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Recorder;