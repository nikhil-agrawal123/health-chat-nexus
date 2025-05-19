import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone,
  Calendar, 
  MapPin, 
  UserCircle,
  AlertCircle,
  Shield,
  Bell,
  Award,
  Stethoscope,
  GraduationCap,
  Clock
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const DoctorProfile = () => {
  const { translate } = useLanguage();
  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState(false);
  
  // Mock doctor data
  const [doctorData, setDoctorData] = useState({
    firstName: "Aditya",
    lastName: "Sharma",
    email: "dr.aditya.sharma@example.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 87654 32109",
    dob: "1980-06-22",
    gender: "Male",
    specialization: "Cardiology",
    qualification: "MD, DM Cardiology",
    experience: "15",
    imaNumber: "IMA-MH-12345",
    registrationNumber: "MCI-98765",
    consultationFee: "1000",
    availableSlots: "Mon-Fri, 10:00 AM - 6:00 PM",
    languages: "English, Hindi, Marathi",
    address: "456 Healthcare Avenue, Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400069",
    hospitalAffiliation: "City General Hospital",
    bio: "Dr. Aditya Sharma is a renowned cardiologist with over 15 years of experience in treating cardiovascular diseases. He specializes in interventional cardiology and has performed over 1000 successful procedures."
  });

  const handleSave = () => {
    setEditMode(false);
    // In a real app, you would save the data to the backend here
  };

  const handleInputChange = (field: string, value: string) => {
    setDoctorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-health-100">
                <AvatarFallback className="bg-health-500 text-white text-2xl">
                  {doctorData.firstName.charAt(0)}{doctorData.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {!editMode && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white"
                  onClick={() => setEditMode(true)}
                >
                  <User className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">Dr. {doctorData.firstName} {doctorData.lastName}</h2>
              <p className="text-health-600 font-medium">{doctorData.specialization}</p>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{doctorData.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{doctorData.phone}</span>
                </div>
              </div>
            </div>
            
            {editMode ? (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  {translate("cancel")}
                </Button>
                <Button onClick={handleSave}>
                  {translate("save")}
                </Button>
              </div>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                {translate("edit")}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[500px] mx-auto">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            <span>{translate("personalInfo")}</span>
          </TabsTrigger>
          <TabsTrigger value="professional">
            <Stethoscope className="h-4 w-4 mr-2" />
            <span>{translate("professional")}</span>
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Clock className="h-4 w-4 mr-2" />
            <span>{translate("practice")}</span>
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Shield className="h-4 w-4 mr-2" />
            <span>{translate("security")}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-health-600" />
                {translate("personalDetails")}
              </CardTitle>
              <CardDescription>
                {translate("yourPersonalInfo")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("firstName")}</label>
                  <Input 
                    value={doctorData.firstName} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("lastName")}</label>
                  <Input 
                    value={doctorData.lastName} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("email")}</label>
                  <Input 
                    value={doctorData.email} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("phone")}</label>
                  <Input 
                    value={doctorData.phone} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("alternatePhone")}</label>
                  <Input 
                    value={doctorData.alternatePhone} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("alternatePhone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("dateOfBirth")}</label>
                  <Input 
                    type="date" 
                    value={doctorData.dob} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("gender")}</label>
                  <Input 
                    value={doctorData.gender} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("languages")}</label>
                  <Input 
                    value={doctorData.languages} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("languages", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-health-600" />
                {translate("contactDetails")}
              </CardTitle>
              <CardDescription>
                {translate("yourContactInfo")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("address")}</label>
                  <Input 
                    value={doctorData.address} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("city")}</label>
                  <Input 
                    value={doctorData.city} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("state")}</label>
                  <Input 
                    value={doctorData.state} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("pincode")}</label>
                  <Input 
                    value={doctorData.pincode} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="professional" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-bold">Qualifications And Certifications</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">yourProfessionalQualifications</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">qualification</label>
                  <Input 
                    value={doctorData.qualification} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("qualification", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">specialization</label>
                  <Input 
                    value={doctorData.specialization} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("specialization", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">experience (years)</label>
                  <Input 
                    value={doctorData.experience} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">hospitalAffiliation</label>
                  <Input 
                    value={doctorData.hospitalAffiliation} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("hospitalAffiliation", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-bold">registrationDetails</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">yourMedicalRegistration</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">imaNumber</label>
                  <Input 
                    value={doctorData.imaNumber} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("imaNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">registrationNumber</label>
                  <Input 
                    value={doctorData.registrationNumber} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-bold">professionalBio</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">yourProfessionalSummary</p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">bio</label>
                  <textarea 
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={doctorData.bio} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="practice" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-bold">practiceDetails</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">yourPracticeInformation</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">consultationFee (₹)</label>
                  <Input 
                    value={doctorData.consultationFee} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("consultationFee", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">availableSlots</label>
                  <Input 
                    value={doctorData.availableSlots} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("availableSlots", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-bold">accountSecurity</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">managePassword</p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">currentPassword</label>
                  <Input type="password" disabled={!editMode} placeholder="********" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">newPassword</label>
                  <Input type="password" disabled={!editMode} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">confirmPassword</label>
                  <Input type="password" disabled={!editMode} />
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" disabled={!editMode}>
                  changePassword
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-bold">notifications</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">manageNotifications</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">emailNotifications</h4>
                    <p className="text-sm text-muted-foreground">receiveEmailNotifs</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      className="h-4 w-4"
                      disabled={!editMode}
                      defaultChecked
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">smsNotifications</h4>
                    <p className="text-sm text-muted-foreground">receiveSmsNotifs</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      className="h-4 w-4"
                      disabled={!editMode}
                      defaultChecked
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">appointmentReminders</h4>
                    <p className="text-sm text-muted-foreground">receiveAppointmentReminders</p>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="appointmentReminders"
                      className="h-4 w-4"
                      disabled={!editMode}
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorProfile;
