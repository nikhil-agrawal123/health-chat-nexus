
import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { LayoutDashboard, User, Video, Bot, FileText, TestTube } from "lucide-react";

// Components
import PatientSidebar from "@/components/patient/PatientSidebar";
import PatientHeader from "@/components/patient/PatientHeader";
import PatientDashboardContent from "@/components/patient/PatientDashboardContent";
import UserProfile from "@/components/patient/UserProfile";
import DoctorConsultation from "@/components/patient/DoctorConsultation";
import MedicalChatbot from "@/components/patient/MedicalChatbot";
import MedicalRecords from "@/components/patient/MedicalRecords";
import LabTests from "@/components/patient/LabTests";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { translate } = useLanguage();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [healthProfileComplete, setHealthProfileComplete] = useState(65);

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
        <PatientSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isCollapsed={isCollapsed}
          healthProfileComplete={healthProfileComplete}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <PatientHeader activeTab={activeTab} menuItems={menuItems} />
          
          <main className="flex-1 p-6 overflow-auto">
            {/* Main content tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="dashboard">
                <PatientDashboardContent setActiveTab={setActiveTab} />
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
