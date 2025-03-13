
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send } from "lucide-react";
import { format } from "date-fns";

// Mock patients data
const patients = [
  {
    id: "p1",
    name: "Arjun Patel",
    lastMessage: "Thank you doctor, I have started the medication.",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    unread: 0,
    image: "/placeholder.svg",
    online: true
  },
  {
    id: "p2",
    name: "Priya Sharma",
    lastMessage: "Is it normal to feel dizzy after taking this medicine?",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    unread: 2,
    image: "/placeholder.svg",
    online: true
  },
  {
    id: "p3",
    name: "Vikram Singh",
    lastMessage: "I'd like to schedule a follow-up appointment next week.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    unread: 0,
    image: "/placeholder.svg",
    online: false
  },
  {
    id: "p4",
    name: "Ananya Desai",
    lastMessage: "The joint pain has reduced significantly after the treatment.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    unread: 0,
    image: "/placeholder.svg",
    online: false
  }
];

// Mock chat messages
const mockChats: Record<string, {sender: 'patient' | 'doctor', message: string, timestamp: Date}[]> = {
  "p1": [
    {
      sender: "patient",
      message: "Hello doctor, I wanted to ask about the medication you prescribed.",
      timestamp: new Date(Date.now() - 25 * 60 * 1000)
    },
    {
      sender: "doctor",
      message: "Hello Arjun. Yes, please go ahead and ask.",
      timestamp: new Date(Date.now() - 24 * 60 * 1000)
    },
    {
      sender: "patient",
      message: "Should I take it before or after meals?",
      timestamp: new Date(Date.now() - 23 * 60 * 1000)
    },
    {
      sender: "doctor",
      message: "The antibiotic should be taken after meals to reduce stomach irritation. And please complete the full course.",
      timestamp: new Date(Date.now() - 20 * 60 * 1000)
    },
    {
      sender: "patient",
      message: "Thank you doctor, I have started the medication.",
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    }
  ],
  "p2": [
    {
      sender: "patient",
      message: "Doctor, I've been having severe headaches since yesterday.",
      timestamp: new Date(Date.now() - 60 * 60 * 1000)
    },
    {
      sender: "doctor",
      message: "I'm sorry to hear that, Priya. Could you describe the pain? Is it on one side or both?",
      timestamp: new Date(Date.now() - 59 * 60 * 1000)
    },
    {
      sender: "patient",
      message: "It's mostly on the right side, and it gets worse when I bend down.",
      timestamp: new Date(Date.now() - 58 * 60 * 1000)
    },
    {
      sender: "doctor",
      message: "I've prescribed a medication. Take one tablet every 8 hours after meals.",
      timestamp: new Date(Date.now() - 50 * 60 * 1000)
    },
    {
      sender: "patient",
      message: "Is it normal to feel dizzy after taking this medicine?",
      timestamp: new Date(Date.now() - 45 * 60 * 1000)
    }
  ]
};

const PatientMessages = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedPatient) {
      // In a real app, this would send the message to the backend
      setNewMessage("");
      // For demo purposes, we'll just show a success indicator
      const messageElement = document.getElementById("message-input");
      if (messageElement) {
        messageElement.classList.add("bg-green-50");
        setTimeout(() => {
          messageElement.classList.remove("bg-green-50");
        }, 500);
      }
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return format(date, "h:mm a");
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <h2 className="text-2xl font-bold mb-4">Patient Messages</h2>
      
      <div className="flex h-full overflow-hidden border rounded-lg">
        {/* Patients List */}
        <div className="w-full md:w-1/3 border-r">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-15rem)]">
            {filteredPatients.map((patient) => (
              <div 
                key={patient.id}
                className={`
                  flex items-center gap-3 p-3 cursor-pointer border-b transition-colors
                  ${selectedPatient === patient.id ? "bg-health-50" : "hover:bg-gray-50"}
                `}
                onClick={() => setSelectedPatient(patient.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={patient.image} alt={patient.name} />
                    <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {patient.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{patient.name}</h3>
                    <span className="text-xs text-gray-500">{formatTime(patient.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{patient.lastMessage}</p>
                </div>
                
                {patient.unread > 0 && (
                  <Badge className="bg-health-500 text-white ml-auto rounded-full h-5 w-5 flex items-center justify-center p-0">
                    {patient.unread}
                  </Badge>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>
        
        {/* Chat Area */}
        <div className="hidden md:flex flex-col w-2/3">
          {selectedPatient ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage 
                      src={patients.find(p => p.id === selectedPatient)?.image || ""} 
                      alt={patients.find(p => p.id === selectedPatient)?.name || ""}
                    />
                    <AvatarFallback>
                      {(patients.find(p => p.id === selectedPatient)?.name || "").charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {patients.find(p => p.id === selectedPatient)?.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {patients.find(p => p.id === selectedPatient)?.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Profile</Button>
                  <Button variant="outline" size="sm">Schedule Appointment</Button>
                </div>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {mockChats[selectedPatient]?.map((chat, index) => (
                    <div 
                      key={index} 
                      className={`flex ${chat.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`
                        max-w-[70%] p-3 rounded-lg 
                        ${chat.sender === 'doctor' 
                          ? 'bg-health-500 text-white rounded-tr-none' 
                          : 'bg-gray-100 rounded-tl-none'}
                      `}>
                        <p>{chat.message}</p>
                        <span className={`text-xs mt-1 block text-right ${chat.sender === 'doctor' ? 'text-health-50' : 'text-gray-500'}`}>
                          {format(chat.timestamp, 'h:mm a')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-3 border-t flex items-center gap-2">
                <Input
                  id="message-input"
                  placeholder="Type your message..."
                  className="flex-1 transition-colors"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-gray-500 mt-2">
                Choose a patient from the list to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientMessages;
