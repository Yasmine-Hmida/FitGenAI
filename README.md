# FitGenAI

**FitGenAI** is a smart fitness recommandation system that takes the user request as an entry and recommandes the best exercices accordingly.

---

## Features
- Personnalized workout exercises recommandations based on the user request and goals.
- Beginner to advanced levels support.
- Smooth and a user friendly interface.
- Possibility to download the workout plan once satisfied with the result.

---

## Technologies Used

- ReactJS (For Frontend)
- jsPDF (For the workout PDF download)
- Sentence Transformers (Our model)
- FAISS (Facebook AI Similarity Search)
- Fast API (For Frontend-Backend integration)
- Pandas (For fusion and preprocessing)

---

## Project Structure

```
FitGenAI/
├── frontend/          # Frontend part
├── backend/           # FastAPI server and Backend
└── preprocessing/     # Dataset preparation and preprocessing
```

## Screenshots
<p align="center">
 <img width="800" height="835" alt="1" src="https://github.com/user-attachments/assets/cc75b516-4fa3-4090-9ded-b8c26d08cc0f" />
 <img width="800" height="700" alt="11" src="https://github.com/user-attachments/assets/b5f968da-d6ab-46fb-9e5e-18b04a662546" />
 <img width="800" height="86" alt="3" src="https://github.com/user-attachments/assets/4e82e2c8-7557-424c-bd54-4fe221d0c7a6" />
 <img width="400" height="122" alt="12" src="https://github.com/user-attachments/assets/a4fd1f11-741e-42a6-b0d7-adf628932f80" />
</p>

---

## How to Run

### 1. Prepare the adequate environment

To run FitGenAI locally you have to install:
- NodeJS (**v20.19.0**): Required for React/Vite 
- ReactJS (**v 19.1.1**) + Vite (**v 7.1.7**) 
- Python (**v 3.12.6**) 

### 2. Start the Backend

```
cd FitGenAI/backend
pip install -r requirements.txt  # To install SentenceTransformers, faiss, fastapi and all the dependencies used 
python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

Backend will run at: **[http://localhost:8000](http://localhost:8000)**

---

### 3. Start the Frontend

```
cd FitGenAI/frontend
npm install      # This will install jsPDF and any dependency in package.json
npm run dev
```

Frontend will run at: **[http://localhost:5173](http://localhost:5173)**

---

### 4. Preprocessing (Optional)

The Preprocessing script is located in the `FitGenAI/preprocessing/` directory.  
Run it in **Google Colab** if you want to modify the dataset.  
