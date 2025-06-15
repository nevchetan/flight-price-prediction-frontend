Flight Ticket Price Predictor

This is a full-stack machine learning web application designed to predict flight ticket prices based on various travel parameters including airline, source, destination, stops, and timing.

Model Accuracy: Achieved 87% R² score using a Random Forest Regressor trained on a real-world airline dataset.

-------

Features

- Real-time flight price prediction
- Machine learning model built using scikit-learn
- Backend powered by FastAPI
- Frontend built with React.js
- Deployed on Render (API) and Vercel (Frontend)

---------

Dataset Overview

The model was trained on a publicly available dataset containing flight booking details. Below are the key features used:

| Feature           | Description                            |
|------------------|----------------------------------------|
| Airline           | Name of the airline                   |
| Source            | Departure city                        |
| Destination       | Arrival city                          |
| Date_of_Journey   | Date of travel                        |
| Departure Time    | Time of departure                     |
| Arrival Time      | Time of arrival                       |
| Total_Stops       | Number of stops or layovers           |
| Additional_Info   | Special flight information            |
| Duration          | Total travel time                     |
| Price             | Target variable to predict            |

---------

Model Training and Evaluation

The model was built using the following pipeline:

- Preprocessed datetime features
- Encoded categorical variables like Airlines, Source,Destination etc.
- Removed null values and outliers
- Used a RandomForestRegressor from scikit-learn

The model achieved 87% R² score on the test data.

----------------

Backend (FastAPI):

-Developed using FastAPI to serve a prediction API
-Accepts POST requests with structured flight data
-Returns predicted flight prices

Deployed on Render:
POST https://flight-price-prediction-backend-35s3.onrender.com/predict

-----------------

Frontend (React):

-Form interface for users to input travel details
-Makes API calls to backend for prediction
-Displays the predicted ticket price

Deployed using Vercel:
Live Application: https://your-vercel-url.vercel.app

---------------------------------------------------


Developed by [Chetan Nevrekar]
Email: chetannevrekar6@gmail.com
Linkedn:https://www.linkedin.com/in/chetan-nevrekar

