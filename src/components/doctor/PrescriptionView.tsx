
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Prescription {
  id: string;
  patient: string;
  date: string;
  type: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  instructions: string;
  status: string;
}

interface PrescriptionViewProps {
  prescription: Prescription | null;
  isOpen: boolean;
  onClose: () => void;
  mode: 'view' | 'edit';
}

const PrescriptionView: React.FC<PrescriptionViewProps> = ({ 
  prescription, 
  isOpen, 
  onClose,
  mode
}) => {
  const { toast } = useToast();
  const [editedPrescription, setEditedPrescription] = useState<Prescription | null>(prescription);
  const [medications, setMedications] = useState(prescription?.medications || []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editedPrescription) {
      setEditedPrescription({
        ...editedPrescription,
        [name]: value
      });
    }
  };
  
  const handleMedicationChange = (index: number, field: string, value: string) => {
    const updatedMedications = [...medications];
    updatedMedications[index] = {
      ...updatedMedications[index],
      [field]: value
    };
    setMedications(updatedMedications);
  };
  
  const addMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "", duration: "" }
    ]);
  };
  
  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };
  
  const handleSave = () => {
    toast({
      title: "Prescription Updated",
      description: "The prescription has been updated successfully."
    });
    onClose();
  };
  
  const downloadPrescription = () => {
    toast({
      title: "Prescription Downloaded",
      description: "The prescription has been downloaded as PDF."
    });
  };

  if (!prescription) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'view' ? 'Prescription Details' : 'Edit Prescription'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'view' 
              ? 'View details of the prescription.' 
              : 'Make changes to the prescription and save them.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="patient">Patient</Label>
              <Input 
                id="patient" 
                value={mode === 'edit' ? editedPrescription?.patient : prescription.patient} 
                readOnly={mode === 'view'}
                name="patient"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="date">Prescribed Date</Label>
              <Input 
                id="date" 
                value={mode === 'edit' ? editedPrescription?.date : prescription.date} 
                readOnly={mode === 'view'}
                name="date"
                onChange={handleInputChange}
                type="date"
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Medications</Label>
              {mode === 'edit' && (
                <Button type="button" variant="outline" size="sm" onClick={addMedication}>
                  Add Medication
                </Button>
              )}
            </div>
            
            {(mode === 'edit' ? medications : prescription.medications).map((medication, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`medication-${index}`}>Medication Name</Label>
                      <Input 
                        id={`medication-${index}`} 
                        value={medication.name} 
                        readOnly={mode === 'view'}
                        onChange={(e) => mode === 'edit' && handleMedicationChange(index, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`dosage-${index}`}>Dosage</Label>
                      <Input 
                        id={`dosage-${index}`} 
                        value={medication.dosage} 
                        readOnly={mode === 'view'}
                        onChange={(e) => mode === 'edit' && handleMedicationChange(index, 'dosage', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`frequency-${index}`}>Frequency</Label>
                      <Input 
                        id={`frequency-${index}`} 
                        value={medication.frequency} 
                        readOnly={mode === 'view'}
                        onChange={(e) => mode === 'edit' && handleMedicationChange(index, 'frequency', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`duration-${index}`}>Duration</Label>
                      <Input 
                        id={`duration-${index}`} 
                        value={medication.duration} 
                        readOnly={mode === 'view'}
                        onChange={(e) => mode === 'edit' && handleMedicationChange(index, 'duration', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  {mode === 'edit' && (
                    <div className="flex justify-end">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeMedication(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea 
              id="instructions" 
              value={mode === 'edit' ? editedPrescription?.instructions : prescription.instructions} 
              readOnly={mode === 'view'}
              name="instructions"
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          
          {mode === 'view' && (
            <div>
              <Label htmlFor="status">Status</Label>
              <Input id="status" value={prescription.status} readOnly />
            </div>
          )}
          
          {mode === 'edit' && (
            <div>
              <Label htmlFor="status">Status</Label>
              <Select 
                defaultValue={editedPrescription?.status}
                onValueChange={(value) => {
                  if (editedPrescription) {
                    setEditedPrescription({...editedPrescription, status: value});
                  }
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Dispensed">Dispensed</SelectItem>
                  <SelectItem value="Refilled">Refilled</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <DialogFooter>
          {mode === 'view' ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadPrescription}>
                Download PDF
              </Button>
              <Button variant="outline" onClick={() => onClose()}>
                Close
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onClose()}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionView;
