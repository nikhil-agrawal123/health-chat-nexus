
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Phone, MessageCircle, Navigation, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NearbyDoctors = () => {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [insurance, setInsurance] = useState("");
  
  const nearbyDoctors = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      specialty: "Cardiology",
      distance: "0.8 miles",
      address: "123 Medical Center Dr, Suite 101",
      phone: "(555) 123-4567",
      rating: 4.9,
      reviewCount: 124,
      availability: "Available today",
      acceptingNewPatients: true,
      insurances: ["Medicare", "Blue Cross", "Aetna"],
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Dr. Michael Wong",
      specialty: "General Practice",
      distance: "1.2 miles",
      address: "456 Health Blvd, Suite 205",
      phone: "(555) 987-6543",
      rating: 4.8,
      reviewCount: 98,
      availability: "Next available: Tomorrow",
      acceptingNewPatients: true,
      insurances: ["Medicare", "United Healthcare", "Cigna"],
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      specialty: "Dermatology",
      distance: "1.5 miles",
      address: "789 Wellness Way, Suite 300",
      phone: "(555) 456-7890",
      rating: 4.7,
      reviewCount: 86,
      availability: "Next available: Friday",
      acceptingNewPatients: true,
      insurances: ["Blue Cross", "Aetna", "Humana"],
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Dr. Robert Smith",
      specialty: "Orthopedics",
      distance: "2.3 miles",
      address: "321 Care Lane, Suite 400",
      phone: "(555) 234-5678",
      rating: 4.9,
      reviewCount: 152,
      availability: "Next available: Monday",
      acceptingNewPatients: false,
      insurances: ["Medicare", "Blue Cross", "United Healthcare"],
      image: "/placeholder.svg"
    }
  ];
  
  const specialties = [
    "All Specialties",
    "Cardiology",
    "Dermatology",
    "General Practice",
    "Orthopedics",
    "Pediatrics",
    "Neurology",
    "Obstetrics & Gynecology"
  ];
  
  const insuranceProviders = [
    "All Insurance",
    "Medicare",
    "Blue Cross",
    "Aetna",
    "United Healthcare",
    "Cigna",
    "Humana"
  ];
  
  const getCurrentLocation = () => {
    setLocation("Current Location");
    // In a real app, you would use the Geolocation API here
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Find Nearby Doctors</h2>
        <p className="text-gray-500">Discover healthcare providers in your area</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Enter your location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={getCurrentLocation}
            >
              <Navigation className="h-4 w-4 text-health-600" />
            </Button>
          </div>
          
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger>
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={insurance} onValueChange={setInsurance}>
            <SelectTrigger>
              <SelectValue placeholder="Select insurance" />
            </SelectTrigger>
            <SelectContent>
              {insuranceProviders.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full mt-4">
          <MapPin className="mr-2 h-4 w-4" />
          Find Doctors
        </Button>
      </div>
      
      <div className="space-y-6">
        {nearbyDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <Avatar className="h-16 w-16 mb-4 md:mb-0 md:mr-6">
                <AvatarImage src={doctor.image} alt={doctor.name} />
                <AvatarFallback>{doctor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-health-600">{doctor.specialty}</p>
                    
                    <div className="flex items-center mt-1">
                      <div className="flex items-center mr-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{doctor.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({doctor.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{doctor.distance}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 md:mt-0">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      doctor.acceptingNewPatients 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {doctor.acceptingNewPatients ? "Accepting new patients" : "Not accepting new patients"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Address</p>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                  <p className="text-sm text-gray-600">{doctor.address}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Availability</p>
                <p className="text-sm text-gray-600">{doctor.availability}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Insurance</p>
                <p className="text-sm text-gray-600">{doctor.insurances.join(", ")}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Button className="flex-grow md:flex-grow-0">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" className="flex-grow md:flex-grow-0">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button variant="outline" className="flex-grow md:flex-grow-0">
                Book Appointment
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyDoctors;
