
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  User, 
  Video, 
  Bot, 
  FileText, 
  TestTube,
  Globe,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PatientSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isCollapsed,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-health-500 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
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
        {/* Removed the health profile completion section */}
      </SidebarFooter>
    </Sidebar>
  );
};

export default PatientSidebar;
