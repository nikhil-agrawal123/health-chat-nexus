
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Calendar as CalendarIcon, Clock, Filter, Search, User, Phone, Video, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

// Mock data for nearby patients
const nearbyPatients = [
  {
    id: "p5",
    name: "Rahul Mehta",
    age: 38,
    gender: "Male",
    distance: "1.2 km",
    condition: "Hypertension",
    phone: "+91 96543 21098",
    image: "/placeholder.svg"
  },
  {
    id: "p6",
    name: "Meera Shah",
    age: 45,
    gender: "Female",
    distance: "1.5 km",
    condition: "Diabetes Type 2",
    phone: "+91 89012 34567",
    image: "/placeholder.svg"
  },
  {
    id: "p7",
    name: "Vijay Kumar",
    age: 52,
    gender: "Male",
    distance: "2.3 km",
    condition: "Arthritis",
    phone: "+91 78901 23456",
    image: "/placeholder.svg"
  },
  {
    id: "p8",
    name: "Suman Patel",
    age: 32,
    gender: "Female",
    distance: "3.1 km",
    condition: "Asthma",
    phone: "+91 67890 12345",
    image: "/placeholder.svg"
  }
];

// Mock data for appointments
const appointments = [
  {
    id: "a1",
    patient: "Arjun Patel",
    patientId: "p1",
    date: new Date(),
    time: "2:30 PM - 3:00 PM",
    type: "Video",
    reason: "Follow-up on medication",
    status: "Confirmed",
    image: "/placeholder.svg"
  },
  {
    id: "a2",
    patient: "Priya Sharma",
    patientId: "p2",
    date: new Date(),
    time: "3:15 PM - 3:45 PM",
    type: "Video",
    reason: "Persistent headache",
    status: "Confirmed",
    image: "/placeholder.svg"
  },
  {
    id: "a3",
    patient: "Vikram Singh",
    patientId: "p3",
    date: new Date(),
    time: "4:00 PM - 4:30 PM",
    type: "Audio",
    reason: "Chest pain follow-up",
    status: "Confirmed",
    image: "/placeholder.svg"
  },
  {
    id: "a4",
    patient: "Ananya Desai",
    patientId: "p4",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
    time: "11:30 AM - 12:00 PM",
    type: "In-person",
    reason: "Joint pain and skin rash",
    status: "Confirmed",
    image: "/placeholder.svg"
  }
];

// Past appointments
const pastAppointments = [
  {
    id: "pa1",
    patient: "Rohan Joshi",
    patientId: "p9",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    time: "10:00 AM - 10:30 AM",
    type: "In-person",
    reason: "Annual check-up",
    status: "Completed",
    image: "/placeholder.svg"
  },
  {
    id: "pa2",
    patient: "Neha Gupta",
    patientId: "p10",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    time: "3:45 PM - 4:15 PM",
    type: "Video",
    reason: "Skin allergy",
    status: "Completed",
    image: "/placeholder.svg"
  }
];

const AppointmentsManagement = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [patientName, setPatientName] = useState<string>("");
  const [patientPhone, setPatientPhone] = useState<string>("");
  const [appointmentReason, setAppointmentReason] = useState<string>("");
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleScheduleAppointment = () => {
    if (!date || !appointmentType || !selectedTime || !patientName || !patientPhone) {
      toast({
        variant: "destructive",
        title: "Incomplete Information",
        description: "Please fill all the required fields."
      });
      return;
    }

    toast({
      title: "Appointment Scheduled",
      description: `Appointment with ${patientName} has been scheduled for ${format(date, "PPP")} at ${selectedTime}.`
    });

    // Reset form fields
    setAppointmentType("");
    setSelectedTime("");
    setPatientName("");
    setPatientPhone("");
    setAppointmentReason("");
    setShowScheduleDialog(false);
  };

  const filteredAppointments = appointments.filter(appointment => 
    appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Appointments Management</h2>
        <div className="flex gap-2">
          <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule New Appointment</DialogTitle>
                <DialogDescription>
                  Create a new appointment for a patient.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-2">
                  <Label htmlFor="appointmentDate">Appointment Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md p-2"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointmentType">Appointment Type</Label>
                    <Select value={appointmentType} onValueChange={setAppointmentType}>
                      <SelectTrigger id="appointmentType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Consultation</SelectItem>
                        <SelectItem value="audio">Audio Consultation</SelectItem>
                        <SelectItem value="in-person">In-person Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="appointmentTime">Time Slot</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime}>
                      <SelectTrigger id="appointmentTime">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00 AM - 09:30 AM">09:00 - 09:30 AM</SelectItem>
                        <SelectItem value="09:30 AM - 10:00 AM">09:30 - 10:00 AM</SelectItem>
                        <SelectItem value="10:00 AM - 10:30 AM">10:00 - 10:30 AM</SelectItem>
                        <SelectItem value="10:30 AM - 11:00 AM">10:30 - 11:00 AM</SelectItem>
                        <SelectItem value="11:00 AM - 11:30 AM">11:00 - 11:30 AM</SelectItem>
                        <SelectItem value="11:30 AM - 12:00 PM">11:30 - 12:00 PM</SelectItem>
                        <SelectItem value="02:00 PM - 02:30 PM">02:00 - 02:30 PM</SelectItem>
                        <SelectItem value="02:30 PM - 03:00 PM">02:30 - 03:00 PM</SelectItem>
                        <SelectItem value="03:00 PM - 03:30 PM">03:00 - 03:30 PM</SelectItem>
                        <SelectItem value="03:30 PM - 04:00 PM">03:30 - 04:00 PM</SelectItem>
                        <SelectItem value="04:00 PM - 04:30 PM">04:00 - 04:30 PM</SelectItem>
                        <SelectItem value="04:30 PM - 05:00 PM">04:30 - 05:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name</Label>
                  <Input 
                    id="patientName" 
                    value={patientName} 
                    onChange={(e) => setPatientName(e.target.value)} 
                    placeholder="Enter patient name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="patientPhone">Patient Phone</Label>
                  <Input 
                    id="patientPhone" 
                    value={patientPhone} 
                    onChange={(e) => setPatientPhone(e.target.value)} 
                    placeholder="Enter patient phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="appointmentReason">Reason for Visit</Label>
                  <Input 
                    id="appointmentReason" 
                    value={appointmentReason} 
                    onChange={(e) => setAppointmentReason(e.target.value)} 
                    placeholder="Brief description of the reason"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setShowScheduleDialog(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleScheduleAppointment}>
                  Schedule
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search appointments..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="nearby">Nearby Patients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {filteredAppointments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredAppointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex p-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={appointment.image} alt={appointment.patient} />
                        <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{appointment.patient}</h3>
                            <p className="text-gray-500 text-sm">
                              {format(appointment.date, "PPP")} • {appointment.time}
                            </p>
                          </div>
                          <Badge className={
                            appointment.type === "Video" ? "bg-blue-100 text-blue-800" : 
                            appointment.type === "Audio" ? "bg-purple-100 text-purple-800" : 
                            "bg-green-100 text-green-800"
                          }>
                            {appointment.type}
                          </Badge>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-sm font-medium">Reason:</p>
                          <p className="text-sm text-gray-600">{appointment.reason}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t bg-gray-50 p-3 flex justify-end items-center gap-2">
                      {appointment.type === "Video" && (
                        <Button size="sm" className="gap-1">
                          <Video className="h-4 w-4" />
                          Join
                        </Button>
                      )}
                      {appointment.type === "Audio" && (
                        <Button size="sm" className="gap-1">
                          <MessageSquare className="h-4 w-4" />
                          Call
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <CalendarIcon className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-lg font-medium text-gray-900">No upcoming appointments found</p>
                <p className="text-gray-500">You don't have any upcoming appointments that match your search.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4 mt-4">
          {pastAppointments.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={appointment.image} alt={appointment.patient} />
                        <AvatarFallback>{appointment.patient.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-lg">{appointment.patient}</h3>
                            <p className="text-gray-500 text-sm">
                              {format(appointment.date, "PPP")} • {appointment.time}
                            </p>
                          </div>
                          <Badge className={
                            appointment.status === "Completed" ? "bg-green-100 text-green-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }>
                            {appointment.status}
                          </Badge>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-sm font-medium">Reason:</p>
                          <p className="text-sm text-gray-600">{appointment.reason}</p>
                        </div>
                        
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline">Add Notes</Button>
                          <Button size="sm" variant="outline">Create Prescription</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <CalendarIcon className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-lg font-medium text-gray-900">No past appointments</p>
                <p className="text-gray-500">Your history of past consultations will appear here.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="nearby" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {nearbyPatients.map((patient) => (
              <Card key={patient.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex p-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={patient.image} alt={patient.name} />
                      <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{patient.name}</h3>
                          <p className="text-gray-500 text-sm">
                            {patient.age} years • {patient.gender}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {patient.distance}
                        </Badge>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm font-medium">Condition:</p>
                        <p className="text-sm text-gray-600">{patient.condition}</p>
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1">
                        <Phone className="h-3 w-3 inline mr-1" />
                        {patient.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t bg-gray-50 p-3 flex justify-end items-center gap-2">
                    <Button size="sm" variant="outline">View Profile</Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Schedule Appointment for {patient.name}</DialogTitle>
                          <DialogDescription>
                            Create a new appointment for this patient.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-1 gap-2">
                            <Label htmlFor="appointmentDate">Appointment Date</Label>
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              className="border rounded-md p-2"
                              disabled={(date) => date < new Date()}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="appointmentType">Appointment Type</Label>
                              <Select value={appointmentType} onValueChange={setAppointmentType}>
                                <SelectTrigger id="appointmentType">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="video">Video Consultation</SelectItem>
                                  <SelectItem value="audio">Audio Consultation</SelectItem>
                                  <SelectItem value="in-person">In-person Consultation</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="appointmentTime">Time Slot</Label>
                              <Select value={selectedTime} onValueChange={setSelectedTime}>
                                <SelectTrigger id="appointmentTime">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="09:00 AM - 09:30 AM">09:00 - 09:30 AM</SelectItem>
                                  <SelectItem value="09:30 AM - 10:00 AM">09:30 - 10:00 AM</SelectItem>
                                  <SelectItem value="10:00 AM - 10:30 AM">10:00 - 10:30 AM</SelectItem>
                                  <SelectItem value="10:30 AM - 11:00 AM">10:30 - 11:00 AM</SelectItem>
                                  <SelectItem value="11:00 AM - 11:30 AM">11:00 - 11:30 AM</SelectItem>
                                  <SelectItem value="11:30 AM - 12:00 PM">11:30 - 12:00 PM</SelectItem>
                                  <SelectItem value="02:00 PM - 02:30 PM">02:00 - 02:30 PM</SelectItem>
                                  <SelectItem value="02:30 PM - 03:00 PM">02:30 - 03:00 PM</SelectItem>
                                  <SelectItem value="03:00 PM - 03:30 PM">03:00 - 03:30 PM</SelectItem>
                                  <SelectItem value="03:30 PM - 04:00 PM">03:30 - 04:00 PM</SelectItem>
                                  <SelectItem value="04:00 PM - 04:30 PM">04:00 - 04:30 PM</SelectItem>
                                  <SelectItem value="04:30 PM - 05:00 PM">04:30 - 05:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="appointmentReason">Reason for Visit</Label>
                            <Input 
                              id="appointmentReason" 
                              value={appointmentReason} 
                              onChange={(e) => setAppointmentReason(e.target.value)} 
                              placeholder="Brief description of the reason"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="button" variant="outline" onClick={() => setShowScheduleDialog(false)}>
                            Cancel
                          </Button>
                          <Button type="button" onClick={handleScheduleAppointment}>
                            Schedule
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentsManagement;
