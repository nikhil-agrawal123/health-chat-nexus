
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Video, Clock, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const VirtualConsultation = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const { toast } = useToast();
  
  const doctors = [
    { id: "1", name: "Dr. Emily Chen", specialty: "Cardiology", available: true },
    { id: "2", name: "Dr. Michael Wong", specialty: "General Practice", available: true },
    { id: "3", name: "Dr. Sarah Johnson", specialty: "Dermatology", available: true },
    { id: "4", name: "Dr. Robert Smith", specialty: "Orthopedics", available: false }
  ];
  
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", 
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"
  ];
  
  const handleScheduleConsultation = () => {
    if (!date || !selectedDoctor || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select a doctor, date, and time slot.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Consultation Scheduled",
      description: `Your virtual consultation has been scheduled for ${date.toLocaleDateString()} at ${selectedTime}.`,
    });
  };

  const upcomingConsultations = [
    {
      id: 1,
      doctor: "Dr. Emily Chen",
      specialty: "Cardiology",
      date: "May 15, 2023",
      time: "10:00 AM",
      status: "Confirmed"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Virtual Consultation</h2>
        <p className="text-gray-500">Schedule a video call with your healthcare provider</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">Schedule New Consultation</h3>
          <Separator className="mb-4" />
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Select Doctor</label>
              <Select onValueChange={setSelectedDoctor} value={selectedDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map(doctor => (
                    <SelectItem 
                      key={doctor.id} 
                      value={doctor.id}
                      disabled={!doctor.available}
                    >
                      <div className="flex items-center">
                        <span>{doctor.name}</span>
                        <span className="ml-2 text-xs text-gray-500">({doctor.specialty})</span>
                        {!doctor.available && (
                          <span className="ml-2 text-xs text-red-500">(Unavailable)</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Select Date</label>
              <div className="border rounded-md p-3">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="mx-auto"
                  disabled={(date) => {
                    // Disable past dates and weekends
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const day = date.getDay();
                    return date < today || day === 0 || day === 6;
                  }}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Select Time</label>
              <Select onValueChange={setSelectedTime} value={selectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleScheduleConsultation}
            >
              <Video className="mr-2 h-4 w-4" />
              Schedule Consultation
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Upcoming Consultations</h3>
            <Separator className="mb-4" />
            
            {upcomingConsultations.length > 0 ? (
              <div className="space-y-4">
                {upcomingConsultations.map(consultation => (
                  <div key={consultation.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src="/placeholder.svg" alt={consultation.doctor} />
                          <AvatarFallback>{consultation.doctor.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{consultation.doctor}</h4>
                          <p className="text-sm text-gray-500">{consultation.specialty}</p>
                        </div>
                      </div>
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {consultation.status}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-4">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm">{consultation.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm">{consultation.time}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button className="flex-1">
                        <Video className="mr-2 h-4 w-4" />
                        Join Call
                      </Button>
                      <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">No upcoming consultations</p>
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <Separator className="mb-4" />
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-health-100 text-health-600 mr-3">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Schedule</h4>
                  <p className="text-sm text-gray-500">Select your preferred doctor, date, and time.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-health-100 text-health-600 mr-3">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Confirmation</h4>
                  <p className="text-sm text-gray-500">Receive a confirmation email with consultation details.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-health-100 text-health-600 mr-3">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Join</h4>
                  <p className="text-sm text-gray-500">Click "Join Call" button when it's time for your appointment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualConsultation;
