
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-health-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Button>
        
        <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <p className="text-gray-500">You have no upcoming appointments.</p>
            <Button className="mt-4 w-full">Schedule Appointment</Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Medical Records</h2>
            <p className="text-gray-500">Access your medical history and test results.</p>
            <Button variant="outline" className="mt-4 w-full">View Records</Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Prescriptions</h2>
            <p className="text-gray-500">View and manage your current prescriptions.</p>
            <Button variant="outline" className="mt-4 w-full">View Prescriptions</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
