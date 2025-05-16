from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import google.generativeai as genai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

genai.configure(api_key="AIzaSyDFHrTi0n_zSmZSrou4Q897Q5Q5cmfCroY")

@app.post("/feedback/")
async def get_feedback(text: str = Form(...), file: Optional[UploadFile] = File(None)):
    prompt = text

    if file:
        contents = await file.read()
        file_text = contents.decode("utf-8", errors="ignore")
        prompt += f"\n\nAttached file content:\n{file_text}"

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return {"response": response.text}
