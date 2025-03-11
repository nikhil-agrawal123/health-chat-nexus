
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Video, Phone, UserCircle, Search, Star, Check, Clock4 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  language: string[];
  experience: number;
  rating: number;
  availability: string[];
  photo: string;
  price: number;
}

const DoctorConsultation = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointmentTime, setAppointmentTime] = useState<string | null>(null);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Sample data for doctors
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      language: ["English", "Spanish"],
      experience: 12,
      rating: 4.8,
      availability: ["10:00 AM", "2:00 PM", "4:30 PM"],
      photo: "/placeholder.svg",
      price: 150
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      language: ["English", "Mandarin"],
      experience: 8,
      rating: 4.6,
      availability: ["9:30 AM", "1:30 PM", "5:00 PM"],
      photo: "/placeholder.svg",
      price: 140
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      language: ["English", "Spanish"],
      experience: 15,
      rating: 4.9,
      availability: ["11:00 AM", "3:00 PM", "4:00 PM"],
      photo: "/placeholder.svg",
      price: 130
    },
    {
      id: "4",
      name: "Dr. David Kim",
      specialty: "Orthopedics",
      language: ["English", "Korean"],
      experience: 10,
      rating: 4.7,
      availability: ["8:30 AM", "12:30 PM", "3:30 PM"],
      photo: "/placeholder.svg",
      price: 160
    },
    {
      id: "5",
      name: "Dr. Lisa Patel",
      specialty: "Neurology",
      language: ["English", "Hindi", "Gujarati"],
      experience: 14,
      rating: 4.9,
      availability: ["9:00 AM", "1:00 PM", "4:00 PM"],
      photo: "/placeholder.svg",
      price: 170
    }
  ];

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doctor.specialty === selectedSpecialty : true;
    return matchesSearch && matchesSpecialty;
  });

  const handleDoctorSelect = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setAppointmentTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setAppointmentTime(time);
  };

  const handleBookAppointment = () => {
    if (selectedDoctor && appointmentTime) {
      setShowDialog(true);
    }
  };

  const confirmBooking = () => {
    setBookingComplete(true);
    setShowDialog(false);
    
    toast({
      title: "Appointment Booked",
      description: `Your appointment with ${selectedDoctor?.name} at ${appointmentTime} has been confirmed.`,
    });
    
    // In a real app, you would also send confirmation via SMS/email/WhatsApp here
  };

  const startConsultation = () => {
    toast({
      title: "Joining Consultation",
      description: "Connecting to your doctor...",
    });
    // In a real app, this would initiate the video call
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Video/Audio Consultations</h2>
          <p className="text-gray-500">Connect with healthcare providers remotely</p>
        </div>
        
        {bookingComplete && (
          <Button onClick={startConsultation} className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Join Consultation
          </Button>
        )}
      </div>
      
      {bookingComplete ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Upcoming Consultation
            </CardTitle>
            <CardDescription>Your scheduled appointment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border rounded-lg">
              <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                <img src={selectedDoctor?.photo} alt={selectedDoctor?.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{selectedDoctor?.name}</h3>
                <p className="text-gray-500">{selectedDoctor?.specialty}</p>
                <div className="flex items-center gap-6 mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Today</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{appointmentTime}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Clock4 className="h-3 w-3 mr-1" />
                  Starts in 15 minutes
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="sm:flex-1">Reschedule</Button>
            <Button variant="destructive" className="sm:flex-1">Cancel Appointment</Button>
            <Button className="sm:flex-1" onClick={startConsultation}>
              <Video className="h-4 w-4 mr-2" />
              Join Now
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="find">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="find">Find Doctors</TabsTrigger>
            <TabsTrigger value="recommended">Recommended for You</TabsTrigger>
          </TabsList>
          
          <TabsContent value="find" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search doctors by name or specialty..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex-shrink-0 w-full md:w-auto">
                <select 
                  className="w-full h-10 px-3 border rounded-md"
                  value={selectedSpecialty || ""}
                  onChange={(e) => setSelectedSpecialty(e.target.value || null)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-6">
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className={`cursor-pointer transition-all ${selectedDoctor?.id === doctor.id ? 'ring-2 ring-health-500' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                          <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex-grow space-y-2">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{doctor.name}</h3>
                            <p className="text-health-600">{doctor.specialty}</p>
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {doctor.experience} years exp.
                          </span>
                          {doctor.language.map((lang) => (
                            <span key={lang} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {lang}
                            </span>
                          ))}
                        </div>
                        
                        <div className="pt-2">
                          <p className="text-sm text-gray-500 mb-2">Available today:</p>
                          <div className="flex flex-wrap gap-2">
                            {doctor.availability.map((time) => (
                              <Button
                                key={time}
                                variant={appointmentTime === time && selectedDoctor?.id === doctor.id ? "default" : "outline"}
                                size="sm"
                                className="text-xs"
                                onClick={() => {
                                  handleDoctorSelect(doctor);
                                  handleTimeSelect(time);
                                }}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center bg-gray-50 px-6 py-3">
                    <div>
                      <span className="font-semibold text-health-700">${doctor.price}</span>
                      <span className="text-sm text-gray-500"> per consultation</span>
                    </div>
                    <Button 
                      onClick={() => handleDoctorSelect(doctor)}
                      variant={selectedDoctor?.id === doctor.id ? "default" : "outline"}
                    >
                      {selectedDoctor?.id === doctor.id ? "Selected" : "Select"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredDoctors.length === 0 && (
                <div className="text-center p-8 border rounded-lg">
                  <UserCircle className="h-12 w-12 mx-auto text-gray-300" />
                  <p className="mt-2 text-gray-500">No doctors found matching your criteria</p>
                </div>
              )}
            </div>
            
            {selectedDoctor && appointmentTime && (
              <div className="sticky bottom-0 bg-white p-4 border-t mt-6 -mx-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="font-medium">Selected: {selectedDoctor.name}</p>
                    <p className="text-sm text-gray-500">Today at {appointmentTime}</p>
                  </div>
                  <Button onClick={handleBookAppointment}>Book Appointment</Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="p-8 text-center border rounded-lg">
              <p className="text-gray-500 mb-2">Based on your past visits and current symptoms</p>
              <h3 className="text-lg font-semibold mb-6">Recommended Specialists</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.slice(0, 2).map((doctor) => (
                  <Card key={doctor.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                          <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-medium">{doctor.name}</h4>
                          <p className="text-sm text-health-600">{doctor.specialty}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleDoctorSelect(doctor)}
                      >
                        View Profile
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Appointment</DialogTitle>
            <DialogDescription>
              You're about to book a video consultation with {selectedDoctor?.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Doctor:</span>
              <span>{selectedDoctor?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Specialty:</span>
              <span>{selectedDoctor?.specialty}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Date:</span>
              <span>Today</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Time:</span>
              <span>{appointmentTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Fee:</span>
              <span>${selectedDoctor?.price}</span>
            </div>
            
            <div className="pt-4">
              <Label htmlFor="reminders">Send reminders via:</Label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="email" defaultChecked />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="sms" defaultChecked />
                  <label htmlFor="sms">SMS</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="whatsapp" />
                  <label htmlFor="whatsapp">WhatsApp</label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={confirmBooking}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorConsultation;
