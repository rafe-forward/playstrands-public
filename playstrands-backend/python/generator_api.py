from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import random
from strands_generator import generate_board  
import os
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "playstrands-production.up.railway.app",
        "localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WordsRequest(BaseModel):
    words: list[str]

@app.post("/generate")
def generate(request: WordsRequest):
    print("here")
    result = generate_board(request.words)

    return {
        "board": result["board"],
        "spanagram_path": result["spanagram_path"],
        "side1_words": result["side1_words"],
        "side2_words": result["side2_words"],
        "side1_paths": result["side1_paths"],
        "side2_paths": result["side2_paths"]
    }


port = int(os.environ.get("PORT", 8000))

if __name__ == "__main__":
    uvicorn.run("generator_api:app", host="0.0.0.0", port=port, reload=True)
