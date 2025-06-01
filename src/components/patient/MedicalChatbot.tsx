import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Send, Mic, MicOff, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { multiLingual } from "@/utils/translation";
// import { streamAudio } from "@/utils/tts";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isProcessing?: boolean;
  suggestions?: string[];
  doctorReferral?: {
    condition: string;
    specialtyNeeded: string;
  };
}

// REST API call to your backend Gemini endpoint
async function Chat(prompt: string) {
  const response = await fetch("http://localhost:8081/gemini", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  if (!response.ok) throw new Error("Failed to get response from AI");
  const data = await response.json();
  return data.text;
}

const MedicalChatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! Please describe your symptoms.",
      sender: "bot",
      timestamp: new Date(),
      suggestions: [
        "I have a headache",
        "My throat is sore",
        "I have a fever",
        "My skin has a rash"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Start/stop audio recording
  const handleMicClick = async () => {
    if (!isRecording) {
      setAudioUrl(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunks.current = [];
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.current.push(event.data);
          }
        };
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.webm");

          try {
            const response = await fetch("http://localhost:8081/record", {
              method: "POST",
              body: formData,
            });

            if (response.ok) {
              toast({
                title: "Upload complete",
                description: "Audio uploaded to the server.",
              });
              const data = await response.json();
              localStorage.setItem("transcription", data.transcription);
              console.log("Transcript:", data.transcription);

              // Set transcript as input, but do NOT send automatically
              let translation = multiLingual(localStorage.getItem("language") || "English", data.transcription);
              translation.then((translatedText) => {
                setInput(translatedText);
                toast({
                  title: "Translation complete",
                  description: "Your message has been translated.",
                });
              });

              setAudioUrl(null);
            } else {
              toast({
                title: "Upload failed",
                description: "Could not upload audio to the server.",
                variant: "destructive",
              });
            }
          } catch (err) {
            toast({
              title: "Upload error",
              description: "An error occurred while uploading.",
              variant: "destructive",
            });
          }
        };
        mediaRecorder.start();
        setIsRecording(true);
        toast({
          title: "Recording started",
          description: "Speak clearly to record your message."
        });
      } catch (err) {
        toast({
          title: "Microphone Error",
          description: "Could not access microphone.",
          variant: "destructive"
        });
      }
    } else {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    }
  };

  // Send message and get AI response
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const messageToSend = input.trim();
    if (messageToSend === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageToSend,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Get AI response and add to chat
    try {
      const aiText = await Chat(messageToSend);
      const aiMessage: Message = {
        id: userMessage.id + 1,
        text: aiText,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      // streamAudio(aiText); // Optional: play AI response
    } catch (err) {
      toast({
        title: "AI Error",
        description: "Failed to get a response from the AI.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-250px)] overflow-hidden rounded-lg shadow-md bg-white">
      <div className="bg-health-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          <h2 className="font-semibold">AI Health Assistant</h2>
        </div>
        <div className="text-xs bg-health-500 px-2 py-1 rounded-full">
          Powered by Medical AI
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`
                  max-w-[80%] rounded-lg p-3
                  ${message.sender === "user" 
                    ? "bg-health-100 text-gray-800" 
                    : "bg-white border border-gray-200 shadow-sm"}
                `}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "bot" && (
                    <Bot className="h-5 w-5 mt-1 text-health-600" />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-medium">
                        {message.sender === "user" ? "You" : "AI Assistant"}
                      </div>
                      <div className="text-xs text-gray-400 ml-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <p className="mt-1 text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-tl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <form className="border-t p-3" onSubmit={handleSendMessage}>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${isRecording ? 'bg-red-100 text-red-500' : ''}`}
            onClick={handleMicClick}
            type="button"
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-health-500"
            disabled={isTyping}
          />
          <Button 
            size="sm"
            className="rounded-full"
            type="submit"
            disabled={isTyping || input.trim() === ''}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 px-2">
          <p className="text-xs text-gray-400 flex items-center">
            <Brain className="h-3 w-3 mr-1" />
            AI assistant provides general information only. Always consult with a healthcare provider for medical advice.
          </p>
        </div>
      </form>
    </div>
  );
};

export default MedicalChatbot;