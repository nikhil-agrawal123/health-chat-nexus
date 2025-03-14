
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedButton from "./ui/AnimatedButton";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { language, translate } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    navigate("/patient-login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-health-600 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">HC</span>
          </div>
          <span className="font-semibold text-xl">{translate("healthPortal")}</span>
        </div>

        {!isMobile && (
          <div className="flex items-center space-x-8">
            <Button 
              variant="ghost" 
              className="text-base font-medium"
              onClick={() => handleNavigation("hero")}
            >
              {translate("home")}
            </Button>
            <Button 
              variant="ghost" 
              className="text-base font-medium"
              onClick={() => handleNavigation("features")}
            >
              {translate("features")}
            </Button>
            <Button 
              variant="ghost" 
              className="text-base font-medium"
              onClick={() => handleNavigation("for-doctors")}
            >
              {translate("forDoctors")}
            </Button>
            <Button 
              variant="ghost" 
              className="text-base font-medium"
              onClick={() => handleNavigation("contact")}
            >
              {translate("contact")}
            </Button>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full">
            <Globe className="h-4 w-4" />
            <span>{language.slice(0, 2)}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="z-50"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
          
          {!isMobile && (
            <AnimatedButton
              className="rounded-full font-medium"
              animationDelay={200}
              onClick={handleGetStarted}
            >
              {translate("getStarted")}
            </AnimatedButton>
          )}
        </div>
      </div>

      {isMobile && (
        <div
          className={`fixed inset-0 top-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-6 pt-24 px-6 bg-white">
            <Button 
              variant="ghost" 
              className="justify-start text-lg font-medium"
              onClick={() => handleNavigation("hero")}
            >
              {translate("home")}
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-lg font-medium"
              onClick={() => handleNavigation("features")}
            >
              {translate("features")}
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-lg font-medium"
              onClick={() => handleNavigation("for-doctors")}
            >
              {translate("forDoctors")}
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start text-lg font-medium"
              onClick={() => handleNavigation("contact")}
            >
              {translate("contact")}
            </Button>
            <AnimatedButton 
              className="w-full mt-4"
              onClick={handleGetStarted}
            >
              {translate("getStarted")}
            </AnimatedButton>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
