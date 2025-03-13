
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Heart, 
  Users, 
  Home, 
  Baby, 
  BadgeIndianRupee, 
  BadgeHelp,
  BadgePlus,
  ExternalLink,
  Search
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface Scheme {
  id: string;
  title: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  documents: string[];
  icon: React.ReactNode;
  category: string;
  url: string;
}

const GovernmentSchemes = () => {
  const { translate } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  // Sample data for government health schemes
  const schemes: Scheme[] = [
    {
      id: "1",
      title: "Ayushman Bharat",
      description: "A national health insurance scheme that aims to provide free access to healthcare for low income earners in the country.",
      eligibility: [
        "Families with low income as per SECC database",
        "Both rural and urban families who fall under the defined categories"
      ],
      benefits: [
        "Coverage up to ₹5 lakh per family per year",
        "Cashless and paperless access to services",
        "Pre and post hospitalization expenses covered",
        "No restrictions on family size, age or gender"
      ],
      documents: [
        "Ayushman Card",
        "Aadhaar Card",
        "Income Certificate",
        "Any government ID proof"
      ],
      icon: <Heart className="h-10 w-10 text-rose-500" />,
      category: "Insurance",
      url: "https://pmjay.gov.in/"
    },
    {
      id: "2",
      title: "PM Jan Arogya Yojana (PM-JAY)",
      description: "Flagship scheme of Ayushman Bharat providing health coverage to poor and vulnerable families.",
      eligibility: [
        "Families identified based on SECC 2011 database",
        "Currently entitled families as per RSBY"
      ],
      benefits: [
        "Health cover of Rs. 5 lakh per family",
        "More than 1,500 procedures covered",
        "All pre-existing conditions covered",
        "Nationally portable benefits"
      ],
      documents: [
        "PM-JAY Card",
        "Aadhaar Card",
        "Ration Card",
        "Any government ID proof"
      ],
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      category: "Insurance",
      url: "https://pmjay.gov.in/"
    },
    {
      id: "3",
      title: "Janani Suraksha Yojana (JSY)",
      description: "A safe motherhood intervention under the National Health Mission to reduce maternal and neonatal mortality.",
      eligibility: [
        "All pregnant women in low performing states",
        "BPL pregnant women in high performing states",
        "SC/ST pregnant women"
      ],
      benefits: [
        "Cash assistance for delivery and post-delivery care",
        "Rs. 1400 in rural areas and Rs. 1000 in urban areas",
        "Free ante-natal check-ups",
        "Free medications and nutritional supplements"
      ],
      documents: [
        "Aadhaar Card",
        "BPL Card (if applicable)",
        "SC/ST Certificate (if applicable)",
        "Bank Account details"
      ],
      icon: <Baby className="h-10 w-10 text-pink-500" />,
      category: "Maternal Health",
      url: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309"
    },
    {
      id: "4",
      title: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
      description: "Provides fixed-day assured, comprehensive and quality antenatal care to pregnant women on the 9th of every month.",
      eligibility: [
        "All pregnant women in second and third trimester"
      ],
      benefits: [
        "Free of cost antenatal care on 9th of every month",
        "Guaranteed minimum package of antenatal care services",
        "Early identification and management of high-risk pregnancies"
      ],
      documents: [
        "Aadhaar Card",
        "Any government ID proof"
      ],
      icon: <Baby className="h-10 w-10 text-purple-500" />,
      category: "Maternal Health",
      url: "https://pmsma.nhp.gov.in/"
    },
    {
      id: "5",
      title: "Rashtriya Swasthya Bima Yojana (RSBY)",
      description: "Health insurance scheme for Below Poverty Line (BPL) families to reduce out-of-pocket expenditure on health care.",
      eligibility: [
        "BPL families",
        "Building and construction workers",
        "MGNREGA workers who have worked for more than 15 days"
      ],
      benefits: [
        "Smart card based cashless health insurance cover of Rs. 30,000",
        "Coverage for most diseases requiring hospitalization",
        "Transportation cost of Rs. 100 per visit with an annual cap of Rs. 1,000"
      ],
      documents: [
        "BPL Certificate",
        "Aadhaar Card",
        "Ration Card",
        "Voter ID"
      ],
      icon: <BadgeIndianRupee className="h-10 w-10 text-green-500" />,
      category: "Insurance",
      url: "https://www.india.gov.in/spotlight/rashtriya-swasthya-bima-yojana"
    },
    {
      id: "6",
      title: "National Mental Health Program (NMHP)",
      description: "Program to ensure the availability and accessibility of minimum mental healthcare for all, particularly to the vulnerable sections of the population.",
      eligibility: [
        "Any individual requiring mental health care services"
      ],
      benefits: [
        "Free treatment and counseling at district mental health program centers",
        "Early detection and treatment of mental illnesses",
        "Rehabilitation services"
      ],
      documents: [
        "Any government ID proof"
      ],
      icon: <BadgeHelp className="h-10 w-10 text-indigo-500" />,
      category: "Mental Health",
      url: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1043&lid=359"
    },
    {
      id: "7",
      title: "National AIDS Control Program (NACP)",
      description: "Program to prevent and control HIV/AIDS in India through a comprehensive service package for the affected population.",
      eligibility: [
        "Any individual requiring HIV/AIDS testing, counseling or treatment"
      ],
      benefits: [
        "Free HIV testing and counseling",
        "Free Anti-Retroviral Therapy (ART)",
        "Prevention of Parent to Child Transmission (PPTCT) services"
      ],
      documents: [
        "Any government ID proof"
      ],
      icon: <Users className="h-10 w-10 text-red-500" />,
      category: "Disease Control",
      url: "https://naco.gov.in/"
    },
    {
      id: "8",
      title: "Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)",
      description: "Aims at correcting regional imbalances in the availability of affordable and reliable tertiary healthcare services.",
      eligibility: [
        "Available to all citizens seeking treatment at AIIMS-like institutions"
      ],
      benefits: [
        "Access to quality tertiary healthcare services",
        "Reduced waiting time for procedures",
        "Subsidized treatment at premier government hospitals"
      ],
      documents: [
        "Any government ID proof"
      ],
      icon: <Home className="h-10 w-10 text-amber-500" />,
      category: "Infrastructure",
      url: "https://pmssy.mohfw.gov.in/"
    }
  ];
  
  const filteredSchemes = schemes.filter(scheme => 
    scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleViewDetails = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setShowDetails(true);
  };
  
  const handleOpenExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Insurance":
        return <Shield className="h-6 w-6 text-green-500" />;
      case "Maternal Health":
        return <Baby className="h-6 w-6 text-pink-500" />;
      case "Mental Health":
        return <BadgeHelp className="h-6 w-6 text-indigo-500" />;
      case "Disease Control":
        return <Users className="h-6 w-6 text-red-500" />;
      case "Infrastructure":
        return <Home className="h-6 w-6 text-amber-500" />;
      default:
        return <BadgePlus className="h-6 w-6 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{translate("governmentSchemes")}</h2>
        <p className="text-gray-500">{translate("exploreHealthSchemes")}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder={translate("searchSchemes")}
          className="w-full sm:max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {scheme.icon}
                  <CardTitle className="text-lg">{scheme.title}</CardTitle>
                </div>
                <span className="px-2 py-1 rounded-full text-xs bg-health-100 text-health-700">
                  {scheme.category}
                </span>
              </div>
              <CardDescription className="line-clamp-2">{scheme.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm line-clamp-3">{translate("eligibility")}: {scheme.eligibility[0]}</p>
            </CardContent>
            <CardFooter className="pt-0 flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => handleViewDetails(scheme)}
              >
                {translate("viewDetails")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleOpenExternalLink(scheme.url)}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                {translate("visitWebsite")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredSchemes.length === 0 && (
        <div className="text-center p-8 border rounded-lg">
          <Shield className="h-12 w-12 mx-auto text-gray-300" />
          <p className="mt-2 text-gray-500">{translate("noSchemesFound")}</p>
        </div>
      )}
      
      {/* Scheme Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedScheme?.icon}
              {selectedScheme?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedScheme?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedScheme && (
            <div className="space-y-6 py-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{translate("eligibility")}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedScheme.eligibility.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">{translate("benefits")}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedScheme.benefits.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">{translate("requiredDocuments")}</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedScheme.documents.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-2">
                <Button
                  className="w-full"
                  onClick={() => handleOpenExternalLink(selectedScheme.url)}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {translate("visitOfficialWebsite")}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GovernmentSchemes;
