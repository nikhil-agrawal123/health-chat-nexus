import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Send, Mic, MicOff, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import testdata from "./testdata.json";

// --- Add your intent detection function ---
async function getIntent(text: string) {
  const response = await fetch("https://database-tval.onrender.com/detect_intent/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) throw new Error("Failed to get response from AI");
  const data = await response.json();
  return data.intent;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

type BookingStep = null | "date" | "time" | "address";

const MedicalChatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! Please describe your symptoms or request a test.",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Booking flow state
  const [selectableTests, setSelectableTests] = useState<any[]>([]);
  const [pendingTest, setPendingTest] = useState<any | null>(null);
  const [bookingStep, setBookingStep] = useState<BookingStep>(null);
  const [bookingInfo, setBookingInfo] = useState<{ date?: string; time?: string; address?: string }>({});

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
            const response = await fetch("https://database-tval.onrender.com/record", {
              method: "POST",
              body: formData,
            });
            if (response.ok) {
              toast({
                title: "Upload complete",
                description: "Audio uploaded to the server.",
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

  // Main message handler
  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    // Booking flow: collect date, time, address
    if (pendingTest && bookingStep) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          text: input,
          sender: "user",
          timestamp: new Date()
        }
      ]);

      if (bookingStep === "date") {
        setBookingInfo(prev => ({ ...prev, date: input }));
        setBookingStep("time");
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              text: "Please enter your preferred time (e.g., 10:00 AM):",
              sender: "bot",
              timestamp: new Date()
            }
          ]);
        }, 100);
        setInput("");
        return;
      }
      if (bookingStep === "time") {
        setBookingInfo(prev => ({ ...prev, time: input }));
        setBookingStep("address");
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              text: "Please enter your address for sample pickup:",
              sender: "bot",
              timestamp: new Date()
            }
          ]);
        }, 100);
        setInput("");
        return;
      }
      if (bookingStep === "address") {
        const finalBooking = {
          date: bookingInfo.date,
          time: bookingInfo.time,
          address: input
        };
        setBookingInfo({});
        setBookingStep(null);

        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              text: "Thank you! Booking your test...",
              sender: "bot",
              timestamp: new Date()
            }
          ]);
        }, 100);

        // POST to backend (as before)
        fetch("https://database-tval.onrender.com/test/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            test_id: pendingTest.id || pendingTest._id || "",
            user_id: localStorage.getItem("userId") || "demo-user",
            date: finalBooking.date,
            time: finalBooking.time,
            address: finalBooking.address,
            status: "booked"
          })
        }).then(() => {
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                id: Date.now() + Math.random(),
                text: `Your test "${pendingTest.name}" has been booked for ${finalBooking.date} at ${finalBooking.time}.`,
                sender: "bot",
                timestamp: new Date()
              }
            ]);
            setPendingTest(null);
          }, 100);
        }).catch(() => {
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                id: Date.now() + Math.random(),
                text: "Sorry, there was an error booking your test. Please try again.",
                sender: "bot",
                timestamp: new Date()
              }
            ]);
            setPendingTest(null);
          }, 100);
        });
        setInput("");
        return;
      }
    }

    // Add the user's message first
    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);

    // --- INTENT DETECTION INTEGRATION ---
    setLoading(true);
    try {
      const intent = await getIntent(input);
      if (intent === "test") {
        // --- LAB TEST BOOKING FLOW ---
        let foundTests: any[] = [];
        testdata["all data"].forEach((item: any) => {
          Object.keys(item).forEach((key) => {
            if (input.toLowerCase().includes(key.toLowerCase())) {
              item[key].forEach((test: any) => {
                foundTests.push({ ...test, category: key });
              });
            }
          });
        });

        if (foundTests.length > 0) {
          setSelectableTests(foundTests);
          setMessages(prev => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              text: "Please select the test you want to book:",
              sender: "bot",
              timestamp: new Date()
            }
          ]);
          setInput("");
          setLoading(false);
          return;
        } else {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              text: "Sorry, I couldn't find any matching tests. Please try again.",
              sender: "bot",
              timestamp: new Date()
            }
          ]);
          setInput("");
          setLoading(false);
          return;
        }
      } else {
        // --- DEFAULT BOT RESPONSE FOR OTHER INTENTS ---
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            text: "Thank you for your message. Our AI assistant will help you with your health queries.",
            sender: "bot",
            timestamp: new Date()
          }
        ]);
        setInput("");
        setLoading(false);
        return;
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          text: "Sorry, there was an error processing your request.",
          sender: "bot",
          timestamp: new Date()
        }
      ]);
      setInput("");
      setLoading(false);
      return;
    }
  };

  // Render selection buttons when selectableTests is not empty
  const renderTestSelection = () => (
    selectableTests.length > 0 && (
      <div className="mb-4 flex flex-wrap gap-2">
        {selectableTests.map((test, idx) => (
          <Button
            key={idx}
            variant="outline"
            onClick={() => {
              setPendingTest(test);
              setSelectableTests([]);
              setBookingStep("date");
              setMessages(prev => [
                ...prev,
                {
                  id: Date.now() + Math.random(),
                  text:
                    `You selected "${test.name}".\nDescription: ${test.description || "N/A"}\nPrice: ${test.cost || test.price || "N/A"}\n\nPlease enter your preferred date (YYYY-MM-DD):`,
                  sender: "bot",
                  timestamp: new Date()
                }
              ]);
            }}
          >
            {test.name}
          </Button>
        ))}
      </div>
    )
  );

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
          {renderTestSelection()}
        </div>
      </div>
      <div className="border-t p-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${isRecording ? 'bg-red-100 text-red-500' : ''}`}
            onClick={handleMicClick}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Describe your symptoms or request a test..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-health-500"
          />
          <Button
            size="sm"
            className="rounded-full"
            onClick={handleSendMessage}
            disabled={loading || input.trim() === ''}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {audioUrl && (
          <div className="mt-2 px-2 text-xs text-gray-500">
            <a href={audioUrl} download="recording.webm" className="text-blue-600 underline">
              Download your recording (webm)
            </a>
          </div>
        )}
        <div className="mt-2 px-2">
          <p className="text-xs text-gray-400 flex items-center">
            <Brain className="h-3 w-3 mr-1" />
            AI assistant provides general information only. Always consult with a healthcare provider for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalChatbot;