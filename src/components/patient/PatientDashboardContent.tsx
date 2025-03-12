
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  FileText, 
  Pill, 
  TestTube,
  MessageCircle,
  Bot
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

interface PatientDashboardContentProps {
  setActiveTab: (tab: string) => void;
}

const PatientDashboardContent: React.FC<PatientDashboardContentProps> = ({ setActiveTab }) => {
  const { translate } = useLanguage();

  return (
    <>
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
    </>
  );
};

export default PatientDashboardContent;
