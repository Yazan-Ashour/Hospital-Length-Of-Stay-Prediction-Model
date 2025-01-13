import React, { useState } from "react";
import "./PatientForm.css";

function PatientForm() {
  const [formData, setFormData] = useState({
    rcount: "",
    dialysisrenalendstage: 0,
    asthma: 0,
    irondef: 0,
    pneum: 0,
    substancedependence: 0,
    psychologicaldisordermajor: 0,
    depress: 0,
    psychother: 0,
    fibrosisandother: 0,
    malnutrition: 0,
    hemo: 0,
    hematocrit: "",
    neutrophils: "",
    sodium: "",
    glucose: "",
    bloodureanitro: "",
    creatinine: "",
    bmi: "",
    pulse: "",
    respiration: "",
  });

  const [tooltip, setTooltip] = useState({});
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? (checked ? 1 : 0) : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const toggleTooltip = (key) => {
    setTooltip((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const clinicalLabels = {
    rcount: "Readmission Count",
    dialysisrenalendstage: "Dialysis Indicator",
    asthma: "Asthma Indicator",
    irondef: "Iron Deficiency",
    pneum: "Pneumonia",
    substancedependence: "Substance Dependency",
    psychologicaldisordermajor: "Psychological Disorder",
    depress: "Depression",
    psychother: "Other Psychological Disorders",
    fibrosisandother: "Fibrosis",
    malnutrition: "Malnutrition",
    hemo: "Hemo",
    hematocrit: "Hematocrit Levels",
    neutrophils: "White Blood Cells",
    sodium: "Sodium Level",
    glucose: "Glucose Levels",
    bloodureanitro: "Blood Urea Nitrogen",
    creatinine: "Creatinine",
    bmi: "Body Mass Index",
    pulse: "Pulse",
    respiration: "Respiration",
  };

  const descriptions = {
    rcount: "Number of readmissions for the patient.",
    dialysisrenalendstage: "Indicates whether the patient is on dialysis for end-stage renal disease.",
    asthma: "Indicates if the patient has asthma.",
    irondef: "Shows whether the patient has an iron deficiency.",
    pneum: "Indicates if the patient has been diagnosed with pneumonia.",
    substancedependence: "Whether the patient is dependent on any substance.",
    psychologicaldisordermajor: "Major psychological disorders the patient might have.",
    depress: "Indicates whether the patient is experiencing depression.",
    psychother: "Other psychological disorders the patient might have.",
    fibrosisandother: "Indicates fibrosis or other related conditions.",
    malnutrition: "Whether the patient is experiencing malnutrition.",
    hemo: "Hemoglobin levels in the patient.",
    hematocrit: "Measures the proportion of red blood cells in the blood.",
    neutrophils: "Counts white blood cells in the patient's blood.",
    sodium: "Indicates sodium levels in the patient's body.",
    glucose: "Shows glucose levels in the patient's blood.",
    bloodureanitro: "Measures blood urea nitrogen levels.",
    creatinine: "Indicates creatinine levels in the patient's blood.",
    bmi: "Body mass index, representing the patient's weight-to-height ratio.",
    pulse: "Measures the patient's heart rate in beats per minute.",
    respiration: "Respiratory rate of the patient in breaths per minute.",
  };

  const normalRanges = {
    hematocrit: "10-16%",
    neutrophils: "5-13 K/uL",
    sodium: "135-145 mmol/L",
    glucose: "70-140 mg/dL",
    bloodureanitro: "7-20 mg/dL",
    creatinine: "0.6-1.2 mg/dL",
    bmi: "18.5-30",
    pulse: "60-100 bpm",
    respiration: "6-10 breaths/min",
    rcount: "0-10 counts",
  };

  const normalize = (value, min, max) => (value - min) / (max - min);
  const denormalize = (value, min, max) => value * (max - min) + min;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedData = { ...formData };
  
    // Normalize numeric inputs (example ranges, adjust as needed)
    const ranges = {
      hematocrit: [1, 25],
      neutrophils: [1, 25],
      sodium: [100, 200],
      glucose: [0, 300],
      bloodureanitro: [1, 100],
      creatinine: [0, 20],
      bmi: [0, 50],
      pulse: [0, 200],
      respiration: [0, 50],
      rcount: [0, 100],
    };
  
    Object.keys(ranges).forEach((key) => {
      if (formData[key]) {
        const [min, max] = ranges[key];
        normalizedData[key] = normalize(parseFloat(formData[key]), min, max);
      }
    });
  
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(normalizedData),
      });
      const result = await response.json();
  
      // Denormalize prediction result (example range, adjust as needed)
      const denormalizedPrediction = denormalize(result.prediction, 0, 17);
      setPrediction(Math.round(denormalizedPrediction)); // Round to the nearest natural number
    } catch (error) {
      console.error("Error:", error);
    }
  };
  


  return (
    <div className="form-container">
      <h1>Predict Length of Stay</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label>
              {clinicalLabels[key]}:
              <span
                className="tooltip-icon"
                onClick={() => toggleTooltip(key)}
                title="Click for description"
              >
                !
              </span>
              {tooltip[key] && (
                <div className="tooltip">
                  <p>{descriptions[key]}</p>
                </div>
              )}
              {typeof formData[key] === "number" && key !== "rcount" ? (
                <input
                  type="checkbox"
                  name={key}
                  checked={formData[key] === 1}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  placeholder={normalRanges[key] || ""}
                  onChange={handleChange}
                />
              )}
            </label>
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>
      {prediction !== null && (
        <div>
          <h2>Prediction: {prediction.toFixed(2)} days</h2>
        </div>
      )}
    </div>
  );
}

export default PatientForm;
