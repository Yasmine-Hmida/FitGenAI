from sentence_transformers import SentenceTransformer # To generate semantic embeddings for natural language similarity
import faiss # Creates an index of all these embeddings, so that searching for the closest matches is very efficient and fast
import numpy as np
import pandas as pd

# Upload our merged Dataset into a DataFrame
df = pd.read_csv("fitgenai_dataset.csv")

# Summarize all the relevant info about each exercise for the model
df["search_text"] = (
    "Exercise: " + df["name"] +
    ", Target: " + df["target"] +
    ", Body part: " + df["body_part"] +
    ", Equipment: " + df["equipment"] +
    ", Secondary muscles: " + df["secondary_muscles_full"] +
    ", Difficulty: " + df["difficulty"] +
    ", Sets: " + df["sets"].astype(str) +
    ", Reps: " + df["reps"].astype(str)
)

# Create vector embeddings
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
embeddings = model.encode(df["search_text"].tolist(), show_progress_bar=True, convert_to_numpy=True)

# Build the FAISS index
dimension = embeddings.shape[1]      # Extract the Embedding's dimension (Nb of cols)
index = faiss.IndexFlatL2(dimension) # We're gonna use the L2 distance (Euclidean distance) to measure similarity
index.add(embeddings)                # Add the Embeddings to the created Index

# Our Search Function
def search_exercises(prompt, k=4, level=None):
    query_embedding = model.encode([prompt], convert_to_numpy=True) # Embed the user prompt
    _, indices = index.search(query_embedding, k*3)  
    results = df.iloc[indices[0]].copy()

    # If the level is provided
    if level: 
        # Prioritize results matching the detected level
        results["is_level_match"] = results["difficulty"].str.lower() == level.lower()
        results = results.sort_values(by="is_level_match", ascending=False)

    # Return the k top results (k=4 in our case)
    return results.head(k)[["name", "target", "equipment", "sets", "reps", "secondary_muscles_full"]] 
