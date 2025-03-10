
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "doctor", 
      name: "Dr. Smith", 
      text: "Hello! How can I help you today?",
      time: "10:30 AM"
    },
    { 
      id: 2, 
      sender: "patient", 
      name: "You", 
      text: "Hi Dr. Smith, I've been experiencing some discomfort in my lower back for the past few days.",
      time: "10:32 AM"
    },
    { 
      id: 3, 
      sender: "doctor", 
      name: "Dr. Smith", 
      text: "I'm sorry to hear that. Can you describe the pain level and if there was any specific incident that might have triggered it?",
      time: "10:35 AM"
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "patient",
        name: "You",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Simulate doctor response
      setTimeout(() => {
        const doctorResponse = {
          id: messages.length + 2,
          sender: "doctor",
          name: "Dr. Smith",
          text: "Thank you for that information. Based on what you've described, I recommend applying ice for 15-20 minutes and avoid heavy lifting. If the pain persists beyond 48 hours, we should schedule an in-person appointment.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, doctorResponse]);
      }, 3000);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-4 border-b shadow-sm">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="/placeholder.svg" alt="Dr. Smith" />
            <AvatarFallback>DS</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Dr. Smith</h2>
            <p className="text-sm text-gray-500">Cardiologist • Online</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === "patient" 
                    ? "bg-health-600 text-white rounded-br-none" 
                    : "bg-white shadow-sm border border-gray-100 rounded-bl-none"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium ${msg.sender === "patient" ? "text-health-50" : "text-gray-500"}`}>
                    {msg.name}
                  </span>
                  <span className={`text-xs ${msg.sender === "patient" ? "text-health-50" : "text-gray-400"}`}>
                    {msg.time}
                  </span>
                </div>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardChat;
