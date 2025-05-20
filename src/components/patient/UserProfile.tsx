
import { useState } from "react";
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
  Heart,
  Activity
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const patientData = localStorage.getItem("patientData");

const UserProfile = () => {
  const { translate } = useLanguage();
  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    firstName: "Ravi",
    lastName: "Patel",
    email: "ravi.patel@example.com",
    phone: "+91 98765 43210",
    dob: "1985-04-15",
    gender: "Male",
    bloodGroup: "O+",
    height: "175",
    weight: "70",
    allergies: "None",
    chronicConditions: "None",
    emergencyContact: "Priya Patel",
    emergencyPhone: "+91 98765 12345",
    address: "123 Medical Avenue",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  });

  const handleSave = () => {
    setEditMode(false);
    // In a real app, you would save the data to the backend here
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData(prev => ({
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
                  {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
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
              <h2 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h2>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  <span>{userData.phone}</span>
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
        <TabsList className="grid grid-cols-3 md:w-[400px] mx-auto">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            <span>{translate("personalInfo")}</span>
          </TabsTrigger>
          <TabsTrigger value="medical">
            <Heart className="h-4 w-4 mr-2" />
            <span>{translate("medicalInfo")}</span>
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
                    value={userData.firstName} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("lastName")}</label>
                  <Input 
                    value={userData.lastName} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("email")}</label>
                  <Input 
                    value={userData.email} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("phone")}</label>
                  <Input 
                    value={userData.phone} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("dateOfBirth")}</label>
                  <Input 
                    type="date" 
                    value={userData.dob} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("gender")}</label>
                  <Input 
                    value={userData.gender} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("gender", e.target.value)}
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
                    value={userData.address} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("city")}</label>
                  <Input 
                    value={userData.city} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("state")}</label>
                  <Input 
                    value={userData.state} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("pincode")}</label>
                  <Input 
                    value={userData.pincode} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-health-600" />
                {translate("medicalProfile")}
              </CardTitle>
              <CardDescription>
                {translate("yourHealthInfo")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("bloodGroup")}</label>
                  <Input 
                    value={userData.bloodGroup} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("height")} (cm)</label>
                  <Input 
                    value={userData.height} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("weight")} (kg)</label>
                  <Input 
                    value={userData.weight} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("allergies")}</label>
                  <Input 
                    value={userData.allergies} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("allergies", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">{translate("chronicConditions")}</label>
                  <Input 
                    value={userData.chronicConditions} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("chronicConditions", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-health-600" />
                {translate("emergencyContacts")}
              </CardTitle>
              <CardDescription>
                {translate("inCaseOfEmergency")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("emergencyContact")}</label>
                  <Input 
                    value={userData.emergencyContact} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("emergencyPhone")}</label>
                  <Input 
                    value={userData.emergencyPhone} 
                    disabled={!editMode}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-health-600" />
                {translate("accountSecurity")}
              </CardTitle>
              <CardDescription>
                {translate("managePassword")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("currentPassword")}</label>
                  <Input type="password" disabled={!editMode} placeholder="********" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("newPassword")}</label>
                  <Input type="password" disabled={!editMode} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{translate("confirmPassword")}</label>
                  <Input type="password" disabled={!editMode} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" disabled={!editMode}>
                {translate("changePassword")}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-health-600" />
                {translate("notifications")}
              </CardTitle>
              <CardDescription>
                {translate("manageNotifications")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{translate("emailNotifications")}</h4>
                    <p className="text-sm text-muted-foreground">{translate("receiveEmailNotifs")}</p>
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
                    <h4 className="font-medium">{translate("smsNotifications")}</h4>
                    <p className="text-sm text-muted-foreground">{translate("receiveSmsNotifs")}</p>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
