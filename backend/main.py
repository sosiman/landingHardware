from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ia.lockthard.es", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ABACUS_API_KEY = os.getenv("ABACUS_API_KEY")
ABACUS_URL = "https://routellm.abacus.ai/v1/chat/completions"

class ChatRequest(BaseModel):
    message: str
    model: str = "zai-org/glm-4.6"

class ChatResponse(BaseModel):
    response: str
    model_used: str

@app.get("/")
def read_root():
    return {"status": "Backend API running", "service": "Abacus LLM Router"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        headers = {
            "Authorization": f"Bearer {ABACUS_API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": request.model,
            "messages": [
                {
                    "role": "user",
                    "content": request.message
                }
            ],
            "stream": False
        }

        response = requests.post(ABACUS_URL, headers=headers, data=json.dumps(payload))

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        data = response.json()

        return ChatResponse(
            response=data["choices"][0]["message"]["content"],
            model_used=data.get("model", request.model)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
