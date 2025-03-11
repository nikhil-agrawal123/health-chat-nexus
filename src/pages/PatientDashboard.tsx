
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Pill, 
  Video, 
  UserCircle, 
  MessageCircle,
  Bot
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DoctorConsultation from "@/components/patient/DoctorConsultation";
import MedicalChatbot from "@/components/patient/MedicalChatbot";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-health-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            className="gap-2" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Button>
          
          <Button variant="outline" className="gap-2" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-health-100 flex items-center justify-center">
              <UserCircle className="h-10 w-10 text-health-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, Patient</h1>
              <p className="text-gray-500">Last login: Today at 9:30 AM</p>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-4 mb-8">
            <TabsTrigger value="dashboard" className="gap-2">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="consultation" className="gap-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">Consultations</span>
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Records</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <h2 className="text-xl font-semibold mb-4">Your Health Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-health-600" />
                    Appointments
                  </CardTitle>
                  <CardDescription>Manage your upcoming appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">You have no upcoming appointments.</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setActiveTab("consultation")}>Schedule Appointment</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-health-600" />
                    Medical Records
                  </CardTitle>
                  <CardDescription>Access your health documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">View your test results and medical history.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("records")}>View Records</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-health-600" />
                    Prescriptions
                  </CardTitle>
                  <CardDescription>Your current medications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Manage and refill your prescriptions.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Prescriptions</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-health-600" />
                    AI Health Assistant
                  </CardTitle>
                  <CardDescription>Get quick health advice from our AI chatbot</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Describe your symptoms and get instant health recommendations, or find a 
                    specialist for a more in-depth consultation.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setActiveTab("chatbot")} className="w-full">
                    <Bot className="h-4 w-4 mr-2" />
                    Talk to AI Assistant
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="consultation">
            <DoctorConsultation />
          </TabsContent>
          
          <TabsContent value="chatbot">
            <MedicalChatbot />
          </TabsContent>
          
          <TabsContent value="records">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
              <p className="text-gray-500 mb-4">
                Your medical records and history will be displayed here.
              </p>
              <div className="border rounded-lg p-8 text-center text-gray-400">
                <FileText className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No medical records found</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;
