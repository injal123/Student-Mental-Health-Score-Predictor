import joblib
from fastapi import FastAPI
from pydantic import BaseModel, Field
import pandas as pd
from typing import Literal
from fastapi.middleware.cors import CORSMiddleware




# 1. Load the trained model:
model = joblib.load('models/Mental_Health_Model.pkl');

# 2. object of FastAPI class:
app = FastAPI()





# 10. CORS Middleware.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://student-mental-health-score-predictor-1.onrender.com", # deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





# 6.
top_countries = ['Other','India','USA','Canada','Australia','UK','Germany','Mexico','Turkey','France']











# 5. Pydantic Model - for validating the input data:
class InputData(BaseModel):
    Age                         : int = Field(..., ge=10, le=100) # ... -> most, ge -> >=
    Gender                      : Literal['Male', 'Female']
    Country                     : str
    Academic_Level              : Literal['Undergraduate', 'Graduate', 'High School']
    Most_Used_Platform          : Literal['Facebook', 'LinkedIn', 'Instagram', 'Snapchat','Twitter','YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp','WeChat']
    Purpose_Of_Use              : Literal['Networking', 'Education', 'Entertainment', 'News']
    Avg_Daily_Usage_Hours       : float = Field(..., ge=0, le=24)
    Daily_Unlocks               : int = Field(..., ge=0)
    Study_Hours                 : float = Field(..., ge=0, le=24)
    Physical_Activity_Hours     : float = Field(..., ge=0, le=24)
    Sleep_Hours_Per_Night       : float = Field(..., ge=0, le=24)
    Stress_Level                : Literal['Low', 'Medium', 'High', 'Very High']





# 8. Validate predicted mental health score.
class PredictionResponse(BaseModel):
    predicted_mental_health_score: float





# 3. 
@app.get("/")
def greet():
    return {"message": "Welcome to the Student Mental Health Prediction API!"}




# 4. User's input (input_data) is 1st passed to the InputData class for validation and parsing.
@app.post('/predict', response_model=PredictionResponse)  # 9. response_model sends pred to user.
def predict(input_data: InputData):

    # 7. Convert input data to a DataFrame for prediction:
    input_row = pd.DataFrame([{
        'Age'                         : input_data.Age,
        'Gender'                      : input_data.Gender,
        'Country'                     : input_data.Country,
        'Academic_Level'              : input_data.Academic_Level,
        'Most_Used_Platform'          : input_data.Most_Used_Platform,
        'Purpose_Of_Use'              : input_data.Purpose_Of_Use,
        'Avg_Daily_Usage_Hours'       : input_data.Avg_Daily_Usage_Hours,
        'Daily_Unlocks'               : input_data.Daily_Unlocks,
        'Study_Hours'                 : input_data.Study_Hours,
        'Physical_Activity_Hours'     : input_data.Physical_Activity_Hours,
        'Sleep_Hours_Per_Night'       : input_data.Sleep_Hours_Per_Night,
        'Stress_Level'                : input_data.Stress_Level,
        'Grouped_country'             : input_data.Country if input_data.Country in top_countries else "Other"
    }])


    prediction = model.predict(input_row)[0]  # [0] -> {}

    # 8.
    return PredictionResponse(predicted_mental_health_score= round(float(prediction), 2) )
    # NumPy pred into Python-float.







# Test with Swagger (/docs)