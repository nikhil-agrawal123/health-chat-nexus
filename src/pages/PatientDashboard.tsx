
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, Pill, Video, UserCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-health-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            className="gap-2" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Button>
          
          <Button variant="outline" className="gap-2" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-health-100 flex items-center justify-center">
              <UserCircle className="h-10 w-10 text-health-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, Patient</h1>
              <p className="text-gray-500">Last login: Today at 9:30 AM</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Your Health Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-health-600" />
                Appointments
              </CardTitle>
              <CardDescription>Manage your upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">You have no upcoming appointments.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Schedule Appointment</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-health-600" />
                Medical Records
              </CardTitle>
              <CardDescription>Access your health documents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">View your test results and medical history.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Records</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-health-600" />
                Prescriptions
              </CardTitle>
              <CardDescription>Your current medications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Manage and refill your prescriptions.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View Prescriptions</Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-health-600" />
                Telehealth Services
              </CardTitle>
              <CardDescription>Connect with healthcare providers virtually</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                Our telehealth services allow you to speak with healthcare providers from the comfort of your home.
                Schedule a virtual consultation today.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Schedule Virtual Visit</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
