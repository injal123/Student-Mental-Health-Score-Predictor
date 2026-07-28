# Backend Setup

This is the FastAPI backend for the **Student Mental Health Prediction** project. It serves the trained machine learning model (`Mental_Health_Model.pkl`) through a REST API.


---


## 1. Navigate to the backend folder

```bash
cd ~/Desktop/Student-mental-health-prediction/backend
```

## 2. Create a virtual environment

```bash
python3 -m venv .venv
```

## 3. Activate the virtual environment

### macOS / Linux

```bash
source .venv/bin/activate
```

### Windows

```bash
.venv\Scripts\activate
```

## 4. Install dependencies

```bash
pip install fastapi uvicorn pydantic pandas numpy scikit-learn joblib
```

## 5. Save the dependencies

Create a `requirements.txt` file:

```bash
pip freeze > requirements.txt
```

To install dependencies later:

```bash
pip install -r requirements.txt
```

## 6. Ignore unnecessary files

Create a `.gitignore`.





## 7. Run the FastAPI server

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

## 8. Deactivate the virtual environment

When you're done working:

```bash
deactivate
```

## Project Structure

```text
backend/
├── .venv/
├── main.py
├── requirements.txt
├── models/
│   └── Mental_Health_Model.pkl
└── .gitignore
```

## Tech Stack

* **Joblib** - Model serialization
* **FastAPI** - REST API
* **Pydantic** - Request and response validation
* **scikit-learn** - Machine learning pipeline
* **Pandas** - Data processing
* **Uvicorn** - ASGI server
