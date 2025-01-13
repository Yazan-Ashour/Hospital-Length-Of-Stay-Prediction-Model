# Hospital-Length-Of-Stay-Prediction-Model
A Machine Learning Regression Model
Project Overview
The Length of Stay (LOS) Prediction Project aims to predict hospital stay durations using real-world patient data. This project is designed to assist healthcare providers in better resource planning and decision-making by leveraging machine learning models.

Features
Patient Data Input:

Manual entry of patient details through an intuitive web interface.
Support for binary (e.g., yes/no) and numeric data types.
Machine Learning Model:

Implements a Random Forest algorithm for predictions.
Provides high accuracy and reliability based on feature engineering and real-world data.
Interactive Web Interface:

Developed using React for seamless user interaction.
Easy-to-use form for entering patient details.
Real-time prediction display for hospital staff.
Data Management:

Technologies Used
Frontend: React.js
Backend: FastAPI
Machine Learning Framework: scikit-learn (Random Forest)
Language: Python
Installation Guide
Clone the Repository:

git clone <repository-url>
cd LOS-Prediction
Install Dependencies:

Python dependencies:
pip install -r requirements.txt
Node.js dependencies (for frontend):

cd frontend
npm install

Run the Application:
Start the backend:

uvicorn main:app --reload
Start the frontend:

npm start
Usage
Access the web application through your browser.
Enter patient details in the provided form.
Submit the data to receive a predicted length of stay.
Project Structure

LOS-Prediction/
├── backend/       # FastAPI server and ML model
├── frontend/      # React.js frontend application
├── data/          
├── models/        
├
└── README.md
Contributors
Yazan Ashour
Mohammed Amad
Future Enhancements
Add support for uploading batch data files for predictions.
Improve the user interface with real-time validations.
Integrate model retraining functionality via the web app.
