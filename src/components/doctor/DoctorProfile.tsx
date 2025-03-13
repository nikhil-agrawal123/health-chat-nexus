
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Clock, MapPin, Award, Stethoscope, User, Mail, Phone, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const DoctorProfile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "Dr. Rahul Verma",
    email: "dr.rahul.verma@example.com",
    phone: "+91 98765 43210",
    specialization: "General Physician",
    experience: "15 years",
    qualifications: "MBBS, MD (Internal Medicine)",
    licenseNumber: "MH12345",
    address: "123 Healthcare Lane, Mumbai, Maharashtra",
    consultationFees: "₹500",
    workingHours: "9:00 AM - 6:00 PM (Mon-Sat)"
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Doctor Profile</h2>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/3">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt="Dr. Rahul Verma" />
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              
              <div className="text-center">
                <h3 className="text-xl font-bold">{profile.name}</h3>
                <p className="text-gray-500">{profile.specialization}</p>
                <p className="text-gray-500">{profile.licenseNumber}</p>
              </div>
              
              {isEditing && (
                <Button variant="outline" size="sm" className="w-full">
                  Change Photo
                </Button>
              )}
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-start">
                <Award className="h-5 w-5 text-health-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Experience</p>
                  <p className="text-gray-500">{profile.experience}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Stethoscope className="h-5 w-5 text-health-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Qualifications</p>
                  <p className="text-gray-500">{profile.qualifications}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-health-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Clinic Address</p>
                  <p className="text-gray-500">{profile.address}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-health-600 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium">Working Hours</p>
                  <p className="text-gray-500">{profile.workingHours}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="w-full md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="professional">Professional Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your contact and personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={profile.name} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={profile.email} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        value={profile.phone} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="professional" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>Your qualifications and practice details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <Input 
                        id="specialization" 
                        name="specialization" 
                        value={profile.specialization} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience</Label>
                      <Input 
                        id="experience" 
                        name="experience" 
                        value={profile.experience} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="qualifications">Qualifications</Label>
                      <Input 
                        id="qualifications" 
                        name="qualifications" 
                        value={profile.qualifications} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input 
                        id="licenseNumber" 
                        name="licenseNumber" 
                        value={profile.licenseNumber} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Clinic Address</Label>
                      <Textarea 
                        id="address" 
                        name="address" 
                        value={profile.address} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="consultationFees">Consultation Fees</Label>
                      <Input 
                        id="consultationFees" 
                        name="consultationFees" 
                        value={profile.consultationFees} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="workingHours">Working Hours</Label>
                      <Input 
                        id="workingHours" 
                        name="workingHours" 
                        value={profile.workingHours} 
                        onChange={handleInputChange} 
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
