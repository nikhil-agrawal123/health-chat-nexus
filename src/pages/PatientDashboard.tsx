
import React, { useState, useEffect } from "react";
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
  Bot,
  TestTube,
  Globe
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DoctorConsultation from "@/components/patient/DoctorConsultation";
import MedicalChatbot from "@/components/patient/MedicalChatbot";
import Prescriptions from "@/components/patient/Prescriptions";
import MedicalRecords from "@/components/patient/MedicalRecords";
import LabTests from "@/components/patient/LabTests";
import { useLanguage } from "@/contexts/LanguageContext";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const { language, setLanguage, translate } = useLanguage();

  const languages = [
    "English",
    "Hindi",
    "Punjabi",
    "Haryanvi",
    "Bhojpuri",
    "Telugu",
    "Tamil",
    "Gujarati",
    "Urdu"
  ];

  const handleLogout = () => {
    toast({
      title: translate("logout"),
      description: translate("You have been successfully logged out.")
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
            {translate("backToHome")}
          </Button>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang}
                    onClick={() => setLanguage(lang as any)}
                    className={language === lang ? "bg-health-50" : ""}
                  >
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" className="gap-2" onClick={handleLogout}>
              {translate("logout")}
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-health-100 flex items-center justify-center">
              <UserCircle className="h-10 w-10 text-health-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{translate("welcome")}</h1>
              <p className="text-gray-500">{translate("lastLogin")}: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="gap-2">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{translate("dashboard")}</span>
            </TabsTrigger>
            <TabsTrigger value="consultation" className="gap-2">
              <Video className="h-4 w-4" />
              <span className="hidden sm:inline">{translate("consultations")}</span>
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">{translate("aiAssistant")}</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{translate("records")}</span>
            </TabsTrigger>
            <TabsTrigger value="tests" className="gap-2">
              <TestTube className="h-4 w-4" />
              <span className="hidden sm:inline">{translate("tests")}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <h2 className="text-xl font-semibold mb-4">{translate("yourHealthDashboard")}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-health-600" />
                    {translate("appointments")}
                  </CardTitle>
                  <CardDescription>{translate("manageAppointments")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{translate("noAppointments")}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setActiveTab("consultation")}>{translate("scheduleAppointment")}</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-health-600" />
                    {translate("medicalRecords")}
                  </CardTitle>
                  <CardDescription>{translate("accessHealthDocuments")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{translate("viewRecordsDesc")}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("records")}>{translate("viewRecords")}</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Pill className="h-5 w-5 text-health-600" />
                    {translate("prescriptions")}
                  </CardTitle>
                  <CardDescription>{translate("currentMedications")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{translate("managePrescriptions")}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("records")}>{translate("viewPrescriptions")}</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-health-600" />
                    {translate("labTests")}
                  </CardTitle>
                  <CardDescription>{translate("scheduleCollection")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    {translate("bookLabDesc")}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setActiveTab("tests")} className="w-full">
                    <TestTube className="h-4 w-4 mr-2" />
                    {translate("bookTests")}
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-health-600" />
                    {translate("aiHealthAssistant")}
                  </CardTitle>
                  <CardDescription>{translate("getChatbotAdvice")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    {translate("chatbotDesc")}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setActiveTab("chatbot")} className="w-full">
                    <Bot className="h-4 w-4 mr-2" />
                    {translate("talkToAI")}
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
            <MedicalRecords />
          </TabsContent>
          
          <TabsContent value="tests">
            <LabTests />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;
