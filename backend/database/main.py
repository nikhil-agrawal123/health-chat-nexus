from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from mongoDb import save_doctor, save_patient
from mongoDb import get_patient_by_id, get_doctor_by_id
app = FastAPI()

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/doctor")
async def add_doctor(request: Request):
    data = await request.json()
    doc_id = save_doctor(data)
    return {"doctor_id": str(doc_id)}

@app.post("/patient")
async def add_patient(request: Request):
    data = await request.json()
    pat_id = save_patient(data)
    return {"patient_id": str(pat_id)}

@app.post("/patient/login")
async def login_patient(request: Request):
    data = await request.json()
    patient = get_patient_by_id({"id": data})
    if not patient:
        return {"detail": "Patient not found", 1: 404}
    return {"detail": "Login successful", 1: 200}

@app.get("/doctor/{doctor_id}")
async def get_doctor(doctor_id: str):
    doctor = get_doctor_by_id(doctor_id)
    if doctor:
        return doctor
    return {"detail": "Doctor not found"}, 404
