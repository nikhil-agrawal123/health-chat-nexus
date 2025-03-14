
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import { Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import ChatbotDemo from "@/components/ChatbotDemo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HomePage = () => {
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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                {translate("healthPortal")}
              </span>
            </Link>
            <Navbar />
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Globe className="h-4 w-4" />
                    {language}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang}
                      onClick={() => setLanguage(lang as any)}
                      className={language === lang ? "bg-health-100 text-health-700" : ""}
                    >
                      {lang}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <nav className="flex items-center space-x-2">
              <Link to="/patient-login">
                <Button variant="outline" size="sm">
                  {translate("patientLogin")}
                </Button>
              </Link>
              <Link to="/doctor-login">
                <Button size="sm">
                  {translate("doctorLogin")}
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Hero />
        <FeatureSection />
        <ChatbotDemo />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
