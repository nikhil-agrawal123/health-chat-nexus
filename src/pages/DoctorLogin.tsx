
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User, ArrowLeft, Award, Building } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  imaNumber: z.string().min(6, { message: "Please enter a valid IMA registration number" }),
});

const DoctorLogin = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      imaNumber: "",
    },
  });

  async function savePatient(doctorData: any) {
    const response = await fetch("http://localhost:8081/doctor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctorData),
    });
    const data = await response.json();
    return data.patient_id;
  }

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Doctor login attempt with:", values);
    
    if (isNewUser) {
      toast({
        title: "Verification in process",
        description: "We're verifying your IMA credentials. You'll receive an email once approved.",
      });
      setTimeout(() => navigate("/"), 3000);
      savePatient(values);
    } else {
      toast({
        title: "Login successful",
        description: "Welcome to your doctor dashboard!",
      });
      navigate("/doctor-dashboard");
      localStorage.setItem("name", values.name);
    }
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
            <Award className="h-8 w-8 text-health-600" />
          </div>
          <h1 className="text-2xl font-bold">{isNewUser ? "Doctor Signup" : "Doctor Login"}</h1>
          <p className="text-muted-foreground mt-2">
            {isNewUser 
              ? "Create your account with IMA verification" 
              : "Access your patients and medical dashboard"
            }
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Email</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="doctor@hospital.org"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
      
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Dr. John Doe"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imaNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IMA Registration Number</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="IMA123456"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 text-health-600 focus:ring-health-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-health-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <AnimatedButton type="submit" className="w-full">
              {isNewUser ? "Verify & Register" : "Sign In"}
            </AnimatedButton>

            <div className="text-center text-sm text-muted-foreground mt-6">
              {isNewUser ? (
                <>
                  Already registered?{" "}
                  <button 
                    type="button"
                    className="text-health-600 hover:underline" 
                    onClick={() => setIsNewUser(false)}
                  >
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  New doctor?{" "}
                  <button 
                    type="button"
                    className="text-health-600 hover:underline" 
                    onClick={() => setIsNewUser(true)}
                  >
                    Register with IMA
                  </button>
                </>
              )}
            </div>
          </form>
        </Form>

        <div className="mt-8 pt-6 border-t">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-health-600" />
            <h3 className="text-sm font-medium">IMA Verification</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            To ensure the highest standards of medical care, all doctors must verify their credentials through the Indian Medical Association registry before accessing the platform.
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default DoctorLogin;
