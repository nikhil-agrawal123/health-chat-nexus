from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from mongoDb import save_doctor, save_patient
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