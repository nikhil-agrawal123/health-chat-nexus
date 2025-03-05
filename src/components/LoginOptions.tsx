
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "./ui/GlassCard";
import AnimatedButton from "./ui/AnimatedButton";
import { ArrowRight, Lock, Shield, User, UserCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const LoginOptions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handlePatientLogin = () => {
    navigate("/patient-login");
  };

  const handleProviderLogin = () => {
    navigate("/provider-login");
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-b from-health-50 to-white"
      id="login-options"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-gradient">Access Portal</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Whether you're a patient seeking care or a healthcare provider, we have a secure login portal for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="animate-on-scroll">
            <GlassCard hoverEffect className="h-full flex flex-col">
              <div className="h-16 w-16 rounded-xl bg-health-50 flex items-center justify-center mb-6">
                <User className="h-8 w-8 text-health-600" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">Patient Portal</h3>
              
              <p className="text-muted-foreground mb-6 flex-grow">
                Access your health records, chat with our AI assistant, 
                schedule appointments, and connect with healthcare providers 
                in your preferred language.
              </p>
              
              <ul className="space-y-3 mb-8">
                {["24/7 AI health assistant", "Secure health records", "Video consultations", "Multilingual support"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-health-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-health-600"></div>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <AnimatedButton 
                className="w-full justify-between"
                onClick={handlePatientLogin}
              >
                <span>Patient Login</span>
                <ArrowRight className="h-5 w-5" />
              </AnimatedButton>
            </GlassCard>
          </div>
          
          <div className="animate-on-scroll" style={{ transitionDelay: "100ms" }}>
            <GlassCard hoverEffect className="h-full border-health-200 flex flex-col">
              <div className="h-16 w-16 rounded-xl bg-health-50 flex items-center justify-center mb-6">
                <UserCheck className="h-8 w-8 text-health-600" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3">Healthcare Providers</h3>
              
              <p className="text-muted-foreground mb-6 flex-grow">
                Manage your patient interactions, access medical resources, 
                and provide care in multiple languages through our secure 
                provider platform.
              </p>
              
              <ul className="space-y-3 mb-8">
                {["Patient management tools", "Real-time translation", "Secure messaging", "Medical resource library"].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-health-100 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-health-600"></div>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <AnimatedButton 
                className="w-full justify-between" 
                variant="outline" 
                onClick={handleProviderLogin}
              >
                <span>Provider Login</span>
                <ArrowRight className="h-5 w-5" />
              </AnimatedButton>
            </GlassCard>
          </div>
        </div>
        
        <div className="mt-16 text-center animate-on-scroll">
          <GlassCard className="inline-block max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-health-600" />
              <h4 className="font-semibold">Enterprise-grade security</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              All communications and data are protected with end-to-end encryption.
              We comply with international healthcare data regulations to ensure your information remains private and secure.
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default LoginOptions;
