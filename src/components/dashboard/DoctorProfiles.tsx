
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, MessageCircle, Video, Search, User, Award, GraduationCap, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const DoctorProfiles = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      specialty: "Cardiologist",
      experience: "15 years",
      education: "Harvard Medical School",
      rating: 4.9,
      reviewCount: 124,
      bio: "Dr. Emily Chen is a board-certified cardiologist with over 15 years of experience. She specializes in preventive cardiology, heart failure management, and cardiovascular disease in women. Dr. Chen is committed to providing personalized care and helping patients manage their heart health.",
      availability: "Mon, Wed, Fri",
      languages: ["English", "Mandarin"],
      location: "Main Hospital, 3rd Floor",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Dr. Michael Wong",
      specialty: "General Practitioner",
      experience: "10 years",
      education: "Johns Hopkins University",
      rating: 4.8,
      reviewCount: 98,
      bio: "Dr. Michael Wong is an experienced general practitioner dedicated to providing comprehensive primary care for patients of all ages. He believes in a holistic approach to healthcare, addressing not only physical symptoms but also considering mental and emotional well-being.",
      availability: "Tue, Thu, Sat",
      languages: ["English", "Cantonese"],
      location: "West Wing, 1st Floor",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      specialty: "Dermatologist",
      experience: "8 years",
      education: "Stanford University School of Medicine",
      rating: 4.7,
      reviewCount: 86,
      bio: "Dr. Sarah Johnson is a board-certified dermatologist specializing in medical, surgical, and cosmetic dermatology. She is particularly interested in skin cancer prevention and treatment, acne management, and anti-aging procedures. Dr. Johnson stays updated with the latest advancements in dermatological care.",
      availability: "Mon, Tue, Thu",
      languages: ["English", "Spanish"],
      location: "Outpatient Clinic, 2nd Floor",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Dr. Robert Smith",
      specialty: "Orthopedic Surgeon",
      experience: "20 years",
      education: "Yale School of Medicine",
      rating: 4.9,
      reviewCount: 152,
      bio: "Dr. Robert Smith is a highly skilled orthopedic surgeon with expertise in joint replacement, sports medicine, and trauma care. With over two decades of experience, he has helped thousands of patients regain mobility and improve their quality of life through both surgical and non-surgical treatments.",
      availability: "Wed, Thu, Fri",
      languages: ["English"],
      location: "Surgical Wing, 4th Floor",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Doctor Profiles</h2>
        <p className="text-gray-500">Learn more about your healthcare providers</p>
      </div>
      
      <div className="flex items-center mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Search by name or specialty" className="pl-10" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center p-6">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={doctor.image} alt={doctor.name} />
                <AvatarFallback>{doctor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
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
                    <Award className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-500">{doctor.experience}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="bio" className="w-full">
              <TabsList className="grid grid-cols-3 w-full border-t border-b border-gray-100">
                <TabsTrigger value="bio" className="py-3">
                  <User className="h-4 w-4 mr-2" />
                  Bio
                </TabsTrigger>
                <TabsTrigger value="education" className="py-3">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Education
                </TabsTrigger>
                <TabsTrigger value="schedule" className="py-3">
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bio" className="p-6">
                <p className="text-sm text-gray-600">{doctor.bio}</p>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Languages</h4>
                    <p className="text-sm text-gray-600">{doctor.languages.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Location</h4>
                    <p className="text-sm text-gray-600">{doctor.location}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="education" className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Medical Education</h4>
                  <p className="text-sm text-gray-600">{doctor.education}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Experience</h4>
                  <p className="text-sm text-gray-600">{doctor.experience} of clinical practice</p>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">Available Days</h4>
                  <p className="text-sm text-gray-600">{doctor.availability}</p>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button className="flex-1">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Video className="mr-2 h-4 w-4" />
                    Schedule Call
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorProfiles;
