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

def get_patient_by_id(patient_id):
    patient = patients_collection.find_one({"id": patient_id})
    if patient:
        return {
            "id": str(patient["_id"]),
            "name": patient["id"],
            "password": patient["password"],
        }
    return None
    
def get_doctor_by_id(doctor_id):
    doctor = doctors_collection.find_one({"id": doctor_id})
    if doctor:
        return {
            "id": str(doctor["_id"]),
            "name": doctor["id"],
            "image": doctor["ima"],
            "password": doctor["password"],
        }
    return None