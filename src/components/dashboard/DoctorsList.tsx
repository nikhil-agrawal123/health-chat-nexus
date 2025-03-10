
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Users, 
  Stethoscope 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DoctorsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Emily Chen",
      specialty: "Cardiology",
      email: "emily.chen@hospital.org",
      phone: "(555) 123-4567",
      patients: 142,
      status: "Active",
      location: "Main Building, Floor 3",
      nextAvailable: "Today, 2:00 PM",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Dr. Michael Wong",
      specialty: "General Practice",
      email: "michael.wong@hospital.org",
      phone: "(555) 987-6543",
      patients: 210,
      status: "Active",
      location: "West Wing, Floor 1",
      nextAvailable: "Tomorrow, 9:30 AM",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Dr. Sarah Johnson",
      specialty: "Dermatology",
      email: "sarah.johnson@hospital.org",
      phone: "(555) 456-7890",
      patients: 98,
      status: "On Leave",
      location: "East Wing, Floor 2",
      nextAvailable: "Next Monday, 11:00 AM",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Dr. Robert Smith",
      specialty: "Orthopedics",
      email: "robert.smith@hospital.org",
      phone: "(555) 234-5678",
      patients: 156,
      status: "Active",
      location: "Surgical Center, Floor 4",
      nextAvailable: "Today, 4:30 PM",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Dr. Lisa Martinez",
      specialty: "Pediatrics",
      email: "lisa.martinez@hospital.org",
      phone: "(555) 345-6789",
      patients: 178,
      status: "Active",
      location: "Children's Wing, Floor 2",
      nextAvailable: "Tomorrow, 10:15 AM",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "Dr. James Williams",
      specialty: "Neurology",
      email: "james.williams@hospital.org",
      phone: "(555) 567-8901",
      patients: 115,
      status: "Inactive",
      location: "Research Building, Floor 5",
      nextAvailable: "N/A",
      image: "/placeholder.svg"
    }
  ];
  
  const specialties = [
    "All Specialties",
    "Cardiology",
    "General Practice",
    "Dermatology",
    "Orthopedics",
    "Pediatrics",
    "Neurology"
  ];
  
  const statuses = [
    "All Statuses",
    "Active",
    "On Leave",
    "Inactive"
  ];
  
  // Filter doctors based on search term and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = specialtyFilter === "" || specialtyFilter === "All Specialties" || 
                             doctor.specialty === specialtyFilter;
    const matchesStatus = statusFilter === "" || statusFilter === "All Statuses" || 
                          doctor.status === statusFilter;
    
    return matchesSearch && matchesSpecialty && matchesStatus;
  });
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Doctors Directory</h2>
          <p className="text-gray-500">Manage and view all healthcare providers</p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Add New Doctor
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search doctors..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>{doctor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{doctor.name}</CardTitle>
                    <div className="flex items-center mt-1">
                      <Stethoscope className="h-3.5 w-3.5 text-health-600 mr-1" />
                      <span className="text-sm text-health-600">{doctor.specialty}</span>
                    </div>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  doctor.status === "Active" ? "bg-green-100 text-green-800" : 
                  doctor.status === "On Leave" ? "bg-yellow-100 text-yellow-800" : 
                  "bg-gray-100 text-gray-800"
                }`}>
                  {doctor.status}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{doctor.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{doctor.phone}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{doctor.patients} patients</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{doctor.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Next available: {doctor.nextAvailable}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredDoctors.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No doctors found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
