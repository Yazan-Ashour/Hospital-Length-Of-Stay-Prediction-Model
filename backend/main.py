from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Restrict to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
# Define data model
class PatientData(BaseModel):
    rcount: float
    dialysisrenalendstage: int
    asthma: int
    irondef: int
    pneum: int
    substancedependence: int
    psychologicaldisordermajor: int
    depress: int
    psychother: int
    fibrosisandother: int
    malnutrition: int
    hemo: int
    hematocrit: float
    neutrophils: float
    sodium: float
    glucose: float
    bloodureanitro: float
    creatinine: float
    bmi: float
    pulse: float
    respiration: float

# Load the trained model
model = joblib.load("modelF.pkl")

@app.post("/predict")
async def predict(data: PatientData):
    # Prepare input data
    input_data = np.array([[
        data.rcount,
        data.dialysisrenalendstage,
        data.asthma,
        data.irondef,
        data.pneum,
        data.substancedependence,
        data.psychologicaldisordermajor,
        data.depress,
        data.psychother,
        data.fibrosisandother,
        data.malnutrition,
        data.hemo,
        data.hematocrit,
        data.neutrophils,
        data.sodium,
        data.glucose,
        data.bloodureanitro,
        data.creatinine,
        data.bmi,
        data.pulse,
        data.respiration,
    ]])
    
    # Predict using the model
    prediction = model.predict(input_data)
    return {"prediction": prediction[0]}
