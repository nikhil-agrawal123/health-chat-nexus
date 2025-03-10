
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, Activity, Pill } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState("reports");
  
  const medicalReports = [
    {
      id: 1,
      title: "Annual Physical Examination",
      doctor: "Dr. Emily Chen",
      date: "March 15, 2023",
      type: "Check-up",
      status: "Completed"
    },
    {
      id: 2,
      title: "Blood Test Results",
      doctor: "Dr. Michael Wong",
      date: "February 22, 2023",
      type: "Laboratory",
      status: "Completed"
    },
    {
      id: 3,
      title: "Chest X-Ray Report",
      doctor: "Dr. Sarah Johnson",
      date: "January 10, 2023",
      type: "Imaging",
      status: "Completed"
    },
    {
      id: 4,
      title: "Cardiology Consultation",
      doctor: "Dr. Robert Smith",
      date: "December 5, 2022",
      type: "Specialist",
      status: "Completed"
    }
  ];
  
  const medications = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "January 15, 2023",
      endDate: "Ongoing",
      prescribedBy: "Dr. Robert Smith"
    },
    {
      id: 2,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily at bedtime",
      startDate: "February 10, 2023",
      endDate: "Ongoing",
      prescribedBy: "Dr. Robert Smith"
    },
    {
      id: 3,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily with meals",
      startDate: "March 1, 2023",
      endDate: "Ongoing",
      prescribedBy: "Dr. Emily Chen"
    }
  ];
  
  const vitalSigns = [
    {
      id: 1,
      date: "April 25, 2023",
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      respiratoryRate: "14 breaths/min",
      oxygenSaturation: "98%"
    },
    {
      id: 2,
      date: "March 15, 2023",
      bloodPressure: "118/78 mmHg",
      heartRate: "70 bpm",
      temperature: "98.4°F",
      respiratoryRate: "16 breaths/min",
      oxygenSaturation: "99%"
    },
    {
      id: 3,
      date: "February 10, 2023",
      bloodPressure: "122/82 mmHg",
      heartRate: "74 bpm",
      temperature: "98.8°F",
      respiratoryRate: "15 breaths/min",
      oxygenSaturation: "97%"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Medical Records</h2>
        <p className="text-gray-500">View your health history, test results, and more</p>
      </div>
      
      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="reports" onClick={() => setActiveTab("reports")}>
            <FileText className="mr-2 h-4 w-4" />
            Reports & Tests
          </TabsTrigger>
          <TabsTrigger value="medications" onClick={() => setActiveTab("medications")}>
            <Pill className="mr-2 h-4 w-4" />
            Medications
          </TabsTrigger>
          <TabsTrigger value="vitals" onClick={() => setActiveTab("vitals")}>
            <Activity className="mr-2 h-4 w-4" />
            Vital Signs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="space-y-4">
          {medicalReports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{report.title}</h3>
                  <p className="text-sm text-gray-500">Doctor: {report.doctor}</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="text-sm text-gray-500">{report.date}</p>
                  </div>
                </div>
                <div>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    {report.status}
                  </span>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{report.type}</span>
                <Button variant="outline" size="sm" className="text-health-600 border-health-200">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="medications" className="space-y-4">
          {medications.map((medication) => (
            <div key={medication.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{medication.name}</h3>
                  <p className="text-sm text-gray-500">{medication.dosage} - {medication.frequency}</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="text-sm text-gray-500">
                      {medication.startDate} to {medication.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mb-2">
                    Active
                  </span>
                  <p className="text-xs text-gray-500">Prescribed by: {medication.prescribedBy}</p>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Prescription</span>
                <Button variant="outline" size="sm" className="text-health-600 border-health-200">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="vitals" className="space-y-4">
          {vitalSigns.map((vital) => (
            <div key={vital.id} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Vital Signs Check</h3>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                  <p className="text-sm text-gray-500">{vital.date}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Blood Pressure</p>
                  <p className="text-sm font-medium">{vital.bloodPressure}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Heart Rate</p>
                  <p className="text-sm font-medium">{vital.heartRate}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Temperature</p>
                  <p className="text-sm font-medium">{vital.temperature}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Respiratory Rate</p>
                  <p className="text-sm font-medium">{vital.respiratoryRate}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Oxygen Saturation</p>
                  <p className="text-sm font-medium">{vital.oxygenSaturation}</p>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalRecords;
