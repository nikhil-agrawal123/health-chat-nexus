import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, User, Send, Mic, MicOff, ArrowRight, Clock, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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

const MedicalChatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your AI Health Assistant. How can I help you today?",
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
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Speech recognition hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Start/stop speech recognition and handle transcript
  const toggleRecording = () => {
    if (!browserSupportsSpeechRecognition) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser does not support speech recognition.",
        variant: "destructive"
      });
      return;
    }
    if (isRecording) {
      SpeechRecognition.stopListening();
      // The effect below will handle setting the transcript as input
    } else {
      setInput(""); // Optionally clear input before recording
      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "Speak clearly to describe your symptoms..."
      });
      SpeechRecognition.startListening({ continuous: false, language: "en-IN" });
    }
  };

  // When recording stops, set transcript as input
  useEffect(() => {
    if (!listening && isRecording) {
      setIsRecording(false);
      setInput(transcript);
      toast({
        title: "Voice recording stopped",
        description: "Transcription complete. You can edit or send your message."
      });
      resetTranscript();
    }
    // eslint-disable-next-line
  }, [listening]);

  useEffect(() => {
    // Only scroll when explicitly set to do so
    if (shouldScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [shouldScroll]);

  const scrollToBottom = () => {
    setShouldScroll(true);
  };

  const simulateAiResponse = (userMessage: string) => {
    setLoading(true);

    // Add a processing message
    const processingMessage: Message = {
      id: messages.length + 2,
      text: "Analyzing your symptoms...",
      sender: "bot",
      timestamp: new Date(),
      isProcessing: true
    };

    setMessages(prev => [...prev, processingMessage]);
    setShouldScroll(true);

    setTimeout(() => {
      // Remove the processing message
      setMessages(prev => prev.filter(m => !m.isProcessing));

      let response = "";
      let suggestions: string[] = [];
      let doctorReferral = undefined;

      // Simple keyword-based logic to simulate AI responses
      if (userMessage.toLowerCase().includes("headache")) {
        response = "Based on your description, you may be experiencing a tension headache. These are common and can be caused by stress, dehydration, or eye strain. Try resting in a dark room, staying hydrated, and taking an over-the-counter pain reliever if needed.";
        suggestions = ["Is the pain on one side?", "How long have you had this headache?", "Does light bother you?"];
      } else if (userMessage.toLowerCase().includes("rash")) {
        response = "Skin rashes can have many causes including allergies, infections, or skin conditions. Without seeing the rash, I can't provide a specific diagnosis, but you might want to avoid potential irritants and consider using a gentle, fragrance-free moisturizer.";
        suggestions = ["Is the rash itchy?", "How long have you had it?", "Have you used any new products recently?"];
        doctorReferral = {
          condition: "Unexplained skin rash",
          specialtyNeeded: "Dermatology"
        };
      } else if (userMessage.toLowerCase().includes("fever") || userMessage.toLowerCase().includes("temperature")) {
        response = "A fever is often a sign that your body is fighting an infection. If your temperature is above 100.4°F (38°C), make sure to rest, stay hydrated, and consider taking fever-reducing medication. If the fever is very high or persists for more than a few days, please consult a healthcare provider.";
        suggestions = ["What is your temperature?", "Do you have any other symptoms?", "How long have you had the fever?"];
      } else if (userMessage.toLowerCase().includes("throat") || userMessage.toLowerCase().includes("sore")) {
        response = "Sore throats are commonly caused by viral infections like the common cold. Gargling with warm salt water, drinking warm liquids, and using throat lozenges may help relieve discomfort. If your sore throat is severe, persists more than a week, or is accompanied by difficulty breathing, seek medical attention.";
        suggestions = ["Do you have a fever?", "Is it painful to swallow?", "Have you been exposed to someone who's sick?"];
      } else {
        response = "Thank you for sharing your symptoms. While I'm designed to provide general health information, I'm not able to provide a specific diagnosis. If your symptoms are causing you significant discomfort or concern, I'd recommend consulting with a healthcare provider for personalized advice.";
        suggestions = ["Can you tell me more about your symptoms?", "When did these symptoms start?", "Have you experienced this before?"];
      }

      const botMessage: Message = {
        id: messages.length + 3,
        text: response,
        sender: "bot",
        timestamp: new Date(),
        suggestions,
        doctorReferral
      };

      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
      setShouldScroll(true);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setShouldScroll(true);

    simulateAiResponse(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text: suggestion,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setShouldScroll(true);

    simulateAiResponse(suggestion);
  };

  const bookAppointmentWithSpecialist = (specialty: string) => {
    toast({
      title: "Referral Processing",
      description: `Looking for available ${specialty} specialists...`
    });

    setTimeout(() => {
      toast({
        title: "Specialists Found",
        description: `We found 3 ${specialty} specialists available for consultation.`
      });
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    
                    {message.isProcessing ? (
                      <div className="flex items-center space-x-1 my-2">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    ) : (
                      <p className="mt-1 text-sm">{message.text}</p>
                    )}
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, i) => (
                          <button
                            key={i}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {message.doctorReferral && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-md">
                        <div className="flex items-center text-blue-700 font-medium mb-1">
                          <Clock className="h-4 w-4 mr-1" />
                          Doctor Referral Recommended
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Based on your symptoms of {message.doctorReferral.condition}, 
                          a consultation with a {message.doctorReferral.specialtyNeeded} specialist may be helpful.
                        </p>
                        <Button 
                          size="sm" 
                          onClick={() => bookAppointmentWithSpecialist(message.doctorReferral.specialtyNeeded)}
                        >
                          <ArrowRight className="h-3 w-3 mr-1" />
                          Find Available Specialists
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t p-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full ${isRecording ? 'bg-red-100 text-red-500' : ''}`}
            onClick={toggleRecording}
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Describe your symptoms..."
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