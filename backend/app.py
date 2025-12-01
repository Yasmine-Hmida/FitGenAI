from fastapi import FastAPI, Query                  # FastAPI for building our backend API
from fastapi.middleware.cors import CORSMiddleware  # To allow requests from a different origin (Our frontend in this case)
from search_exercices import search_exercises 

# Create the FastAPI app and enable CORS
app = FastAPI()

origins = [  
    "http://localhost:5173"  ## Allow the React frontend to access this API
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
) 

# Detecting the user's fitness level
def extract_level_from_prompt(prompt: str) -> str:
    """
    Detects if the user explicitly mentions their fitness level.
    Returns 'beginner', 'intermediate', 'advanced', or None.
    """
    prompt_lower = prompt.lower()

    if any(word in prompt_lower for word in ["beginner", "just starting", "no experience", "new to fitness", "new to working out"]):
        return "beginner"
    elif any(word in prompt_lower for word in ["intermediate", "some experience", "regularly train", "moderate experience"]):
        return "intermediate"
    elif any(word in prompt_lower for word in ["advanced", "expert", "experienced", "athlete", "train for years"]):
        return "advanced"
    else:
        return None 

# Define the /search endpoint
@app.get("/search")
def search(prompt: str = Query(...), level: str = Query(None)):
    """
    Example: /search?prompt=userPrompt&level=level_if_detected
    """
    detected_level = extract_level_from_prompt(prompt)
    level_to_use = level or detected_level

    df = search_exercises(prompt, level=level_to_use)
    
    # Return a JSON response
    results = df.to_dict(orient="records")
    return {"results": results}
