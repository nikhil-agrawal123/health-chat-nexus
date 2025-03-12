
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
  Globe,
  Settings,
  LogOut,
  LayoutDashboard,
  User,
  Users,
  AlarmClock,
  MapPin,
  Mail
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarProvider,
} from "@/components/ui/sidebar";
import DoctorConsultation from "@/components/patient/DoctorConsultation";
import MedicalChatbot from "@/components/patient/MedicalChatbot";
import Prescriptions from "@/components/patient/Prescriptions";
import MedicalRecords from "@/components/patient/MedicalRecords";
import LabTests from "@/components/patient/LabTests";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import UserProfile from "@/components/patient/UserProfile";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const { language, setLanguage, translate } = useLanguage();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [healthProfileComplete, setHealthProfileComplete] = useState(65);

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

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: translate("dashboard"),
      value: "dashboard"
    },
    {
      icon: User,
      label: translate("profile"),
      value: "profile"
    },
    {
      icon: Video,
      label: translate("consultations"),
      value: "consultation"
    },
    {
      icon: Bot,
      label: translate("aiAssistant"),
      value: "chatbot"
    },
    {
      icon: FileText,
      label: translate("records"),
      value: "records"
    },
    {
      icon: TestTube,
      label: translate("tests"),
      value: "tests"
    }
  ];

  return (
    <SidebarProvider defaultOpen={!isMobile} onOpenChange={setIsCollapsed} className="border-r bg-white">
      <div className="min-h-screen flex w-full bg-gradient-to-b from-health-50/50 to-white">
        {/* Sidebar */}
        <Sidebar className="border-r bg-white">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-health-500 flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-white" />
              </div>
              {!isCollapsed && <span className="font-semibold text-lg">Health Portal</span>}
            </div>
          </SidebarHeader>
          
          <SidebarContent className="py-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.value}>
                      <SidebarMenuButton 
                        className={activeTab === item.value ? "bg-health-50 text-health-700" : ""}
                        onClick={() => setActiveTab(item.value)}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="px-5 my-2">
                {translate("settings")}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                          <Globe className="h-5 w-5" />
                          <span>{language}</span>
                        </SidebarMenuButton>
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
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}>
                      <LogOut className="h-5 w-5" />
                      <span>{translate("logout")}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t p-4">
            {!isCollapsed && (
              <div className="flex flex-col space-y-2">
                <span className="text-sm text-muted-foreground">{translate("healthProfile")}</span>
                <Progress value={healthProfileComplete} className="h-2" />
                <span className="text-xs text-muted-foreground">{healthProfileComplete}% {translate("complete")}</span>
              </div>
            )}
          </SidebarFooter>
        </Sidebar>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
              <h1 className="text-xl font-semibold">
                {menuItems.find(item => item.value === activeTab)?.label || translate("dashboard")}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-health-100 text-health-700">
                  RP
                </AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          <main className="flex-1 p-6 overflow-auto">
            {/* Main content tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="dashboard">
                <div className="mb-6">
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                        <Avatar className="h-16 w-16 border-4 border-health-100">
                          <AvatarFallback className="bg-health-500 text-white text-xl">
                            RP
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold">{translate("welcome")}</h2>
                          <p className="text-muted-foreground">{translate("lastLogin")}: {new Date().toLocaleString()}</p>
                        </div>
                        <Button 
                          onClick={() => setActiveTab("profile")}
                          className="mt-2 md:mt-0 whitespace-nowrap"
                        >
                          {translate("viewProfile")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="border hover:shadow-md transition-shadow">
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
                  
                  <Card className="border hover:shadow-md transition-shadow">
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
                  
                  <Card className="border hover:shadow-md transition-shadow">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border hover:shadow-md transition-shadow">
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
                  
                  <Card className="border hover:shadow-md transition-shadow">
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
              
              <TabsContent value="profile">
                <UserProfile />
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default PatientDashboard;
