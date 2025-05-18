import { Button } from "@/components/ui/button";
import { 
  Calendar, FileText, Pill, TestTube,
  MessageCircle, Bot, Shield
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

type ButtonVariant = "outline" | "link" | "default" | "destructive" | "secondary" | "ghost";

const cardData: Array<{
  icon: JSX.Element;
  titleKey: string;
  descKey: string;
  contentKey: string;
  button: { textKey: string; tab: string; icon?: JSX.Element };
  variant: ButtonVariant;
}> = [
  {
    icon: <Calendar className="h-6 w-6 text-blue-500" />,
    titleKey: "appointments",
    descKey: "manageAppointments",
    contentKey: "noAppointments",
    button: { textKey: "scheduleAppointment", tab: "consultation" },
    variant: "default"
  },
  {
    icon: <FileText className="h-6 w-6 text-green-500" />,
    titleKey: "medicalRecords",
    descKey: "accessHealthDocuments",
    contentKey: "viewRecordsDesc",
    button: { textKey: "viewRecords", tab: "records" },
    variant: "outline"
  },
  {
    icon: <Pill className="h-6 w-6 text-purple-500" />,
    titleKey: "prescriptions",
    descKey: "currentMedications",
    contentKey: "managePrescriptions",
    button: { textKey: "viewPrescriptions", tab: "prescriptions" },
    variant: "outline"
  },
  {
    icon: <TestTube className="h-6 w-6 text-yellow-500" />,
    titleKey: "labTests",
    descKey: "scheduleCollection",
    contentKey: "bookLabDesc",
    button: { textKey: "bookTests", tab: "tests", icon: <TestTube className="h-4 w-4 mr-2" /> },
    variant: "default"
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-cyan-500" />,
    titleKey: "aiHealthAssistant",
    descKey: "getChatbotAdvice",
    contentKey: "chatbotDesc",
    button: { textKey: "talkToAI", tab: "chatbot", icon: <Bot className="h-4 w-4 mr-2" /> },
    variant: "default"
  },
  {
    icon: <Shield className="h-6 w-6 text-indigo-500" />,
    titleKey: "governmentSchemes",
    descKey: "healthSchemes",
    contentKey: "schemesDesc",
    button: { textKey: "viewSchemes", tab: "schemes", icon: <Shield className="h-4 w-4 mr-2" /> },
    variant: "default"
  }
];

const PatientDashboardContent = ({ setActiveTab }) => {
  const { translate } = useLanguage();

  return (
    <div className="space-y-8">
      {/* Welcome Card */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-white">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-16 w-16 border-4 border-health-100">
            <AvatarFallback className="bg-health-500 text-white text-xl">RP</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{translate("welcome")}</h2>
            <p className="text-muted-foreground">{translate("lastLogin")}: {new Date().toLocaleString()}</p>
          </div>
          <Button onClick={() => setActiveTab("profile")} className="mt-2 md:mt-0 whitespace-nowrap">
            {translate("viewProfile")}
          </Button>
        </CardContent>
      </Card>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.slice(0, 3).map((item, idx) => (
          <Card key={idx} className="border hover:shadow-md transition-shadow flex flex-col justify-between h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">{item.icon}{translate(item.titleKey)}</CardTitle>
              <CardDescription>{translate(item.descKey)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{translate(item.contentKey)}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant={item.variant} 
                className="w-full" 
                onClick={() => setActiveTab(item.button.tab)}
              >
                {item.button.icon}{translate(item.button.textKey)}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cardData.slice(3).map((item, idx) => (
          <Card key={idx} className="border hover:shadow-md transition-shadow flex flex-col justify-between h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">{item.icon}{translate(item.titleKey)}</CardTitle>
              <CardDescription>{translate(item.descKey)}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{translate(item.contentKey)}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant={item.variant} 
                className="w-full" 
                onClick={() => setActiveTab(item.button.tab)}
              >
                {item.button.icon}{translate(item.button.textKey)}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientDashboardContent;
