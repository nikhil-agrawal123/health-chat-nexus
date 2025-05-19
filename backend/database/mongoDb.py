from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv

load_dotenv()

uri = os.getenv("VITE_MONGO_URI")
client = MongoClient(uri, server_api=ServerApi('1'))

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client["health_chat"]

doctors_collection = db["doctors"]
patients_collection = db["patients"]

def save_doctor(doctor_data):
    result = doctors_collection.insert_one(doctor_data)
    return result.inserted_id

def save_patient(patient_data):
    result = patients_collection.insert_one(patient_data)
    return result.inserted_id

# Example usage:
if __name__ == "__main__":
    doctor = {"name": "Dr. Smith", "specialty": "Cardiology", "email": "drsmith@example.com","password": "password123"}
    patient = {"name": "John Doe", "age": 30, "email": "johndoe@example.com","password": "password123"}

    doctor_id = save_doctor(doctor)
    print(f"Doctor saved with ID: {doctor_id}")

    patient_id = save_patient(patient)
    print(f"Patient saved with ID: {patient_id}")