import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User, ArrowLeft } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useToast } from "@/hooks/use-toast";

const PatientSignup = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication logic would go here
    if(password !== confirmPassword) {
        toast({
            title: "Error",
            description: "Passwords do not match.",
            variant: "destructive",
        });
        return;
    }

    toast({
      title: "SignUp Successful",
      description: "Welcome to your patient dashboard.",
    });
    
    navigate("/patient-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-health-50 to-white flex items-center justify-center p-6">
      <GlassCard className="max-w-md w-full">
        <Button 
          variant="ghost" 
          className="mb-4 p-0 h-auto" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span>Back to Home</span>
        </Button>

        <div className="text-center mb-8">
          <div className="h-16 w-16 rounded-xl bg-health-50 flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-health-600" />
          </div>
          <h1 className="text-2xl font-bold">Patient Portal SignUp</h1>
          <p className="text-muted-foreground mt-2">
            One stop area to manage your health records and appointments.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="id" className="text-sm font-medium">
              Your Name
            </label>
            <div className="relative">
              <Input
                id="id"
                type="text"
                placeholder="John Doe"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="pl-10"
                required
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <AnimatedButton type="submit" className="w-full">
            Sign Up
          </AnimatedButton>

          <div className="text-center text-sm text-muted-foreground mt-6">
            Have an account?{" "}
            <a href="#" className="text-health-600 hover:underline">
                <button
                onClick={() => navigate("/patient-login")}
                >
                     Sign In   
                </button>
            </a>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default PatientSignup;
