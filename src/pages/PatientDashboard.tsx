
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  MessageCircle, 
  FileText, 
  Video, 
  User, 
  MapPin, 
  Calendar,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardChat from "@/components/dashboard/DashboardChat";
import MedicalRecords from "@/components/dashboard/MedicalRecords";
import VirtualConsultation from "@/components/dashboard/VirtualConsultation";
import DoctorProfiles from "@/components/dashboard/DoctorProfiles";
import NearbyDoctors from "@/components/dashboard/NearbyDoctors";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "chat":
        return <DashboardChat />;
      case "records":
        return <MedicalRecords />;
      case "consultation":
        return <VirtualConsultation />;
      case "doctors":
        return <DoctorProfiles />;
      case "nearby":
        return <NearbyDoctors />;
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Welcome, John</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Upcoming Appointments</h3>
                  <Calendar className="text-health-600 h-5 w-5" />
                </div>
                <Separator className="my-3" />
                <div className="space-y-2">
                  <div className="bg-health-50/30 p-3 rounded-lg">
                    <p className="text-sm font-medium">Dr. Emily Chen</p>
                    <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                    <p className="text-xs text-gray-500">Cardiology</p>
                  </div>
                  <div className="bg-health-50/30 p-3 rounded-lg">
                    <p className="text-sm font-medium">Dr. Michael Wong</p>
                    <p className="text-xs text-gray-500">May 15, 2:30 PM</p>
                    <p className="text-xs text-gray-500">General Check-up</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Recent Lab Results</h3>
                  <FileText className="text-health-600 h-5 w-5" />
                </div>
                <Separator className="my-3" />
                <div className="space-y-2">
                  <div className="bg-health-50/30 p-3 rounded-lg">
                    <p className="text-sm font-medium">Blood Test Results</p>
                    <p className="text-xs text-gray-500">Received on May 2, 2023</p>
                    <Button variant="link" size="sm" className="text-health-600 p-0 h-auto mt-1">
                      View Report
                    </Button>
                  </div>
                  <div className="bg-health-50/30 p-3 rounded-lg">
                    <p className="text-sm font-medium">X-Ray Results</p>
                    <p className="text-xs text-gray-500">Received on April 28, 2023</p>
                    <Button variant="link" size="sm" className="text-health-600 p-0 h-auto mt-1">
                      View Report
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Quick Actions</h3>
                  <Video className="text-health-600 h-5 w-5" />
                </div>
                <Separator className="my-3" />
                <div className="space-y-2">
                  <Button 
                    className="w-full justify-start bg-health-50 text-health-700 hover:bg-health-100"
                    onClick={() => setActiveTab("consultation")}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Schedule Consultation
                  </Button>
                  <Button 
                    className="w-full justify-start bg-health-50 text-health-700 hover:bg-health-100"
                    onClick={() => setActiveTab("chat")}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message Your Doctor
                  </Button>
                  <Button 
                    className="w-full justify-start bg-health-50 text-health-700 hover:bg-health-100"
                    onClick={() => setActiveTab("nearby")}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Find Nearby Doctors
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-health-700">MediCare</h1>
          <p className="text-sm text-gray-500">Patient Portal</p>
        </div>
        
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            <p className="text-xs font-medium text-gray-400 uppercase">Main</p>
          </div>
          
          <Button 
            variant={activeTab === "dashboard" ? "secondary" : "ghost"} 
            className="justify-start px-4 mb-1 rounded-md"
            onClick={() => setActiveTab("dashboard")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          
          <Button 
            variant={activeTab === "chat" ? "secondary" : "ghost"} 
            className="justify-start px-4 mb-1 rounded-md"
            onClick={() => setActiveTab("chat")}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat
          </Button>
          
          <Button 
            variant={activeTab === "records" ? "secondary" : "ghost"} 
            className="justify-start px-4 mb-1 rounded-md"
            onClick={() => setActiveTab("records")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Medical Records
          </Button>
          
          <Button 
            variant={activeTab === "consultation" ? "secondary" : "ghost"} 
            className="justify-start px-4 mb-1 rounded-md"
            onClick={() => setActiveTab("consultation")}
          >
            <Video className="mr-2 h-4 w-4" />
            Virtual Consultation
          </Button>
          
          <div className="px-4 py-2 mt-2">
            <p className="text-xs font-medium text-gray-400 uppercase">Doctors</p>
          </div>
          
          <Button 
            variant={activeTab === "doctors" ? "secondary" : "ghost"} 
            className="justify-start px-4 mb-1 rounded-md"
            onClick={() => setActiveTab("doctors")}
          >
            <User className="mr-2 h-4 w-4" />
            Doctor Profiles
          </Button>
          
          <Button 
            variant={activeTab === "nearby" ? "secondary" : "ghost"} 
            className="justify-start px-4 mb-1 rounded-md"
            onClick={() => setActiveTab("nearby")}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Nearby Doctors
          </Button>
          
          <div className="mt-auto p-4">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Header */}
      <div className="flex flex-col w-full">
        <div className="md:hidden flex items-center justify-between p-4 border-b bg-white">
          <h1 className="text-xl font-bold text-health-700">MediCare</h1>
          
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setActiveTab("dashboard")}>
              <LayoutDashboard className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setActiveTab("chat")}>
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setActiveTab("records")}>
              <FileText className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setActiveTab("consultation")}>
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5 text-red-500" />
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
