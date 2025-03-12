
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

interface PatientHeaderProps {
  activeTab: string;
  menuItems: Array<{
    icon: React.ElementType;
    label: string;
    value: string;
  }>;
}

const PatientHeader: React.FC<PatientHeaderProps> = ({ activeTab, menuItems }) => {
  const { translate } = useLanguage();

  return (
    <header className="border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
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
  );
};

export default PatientHeader;
