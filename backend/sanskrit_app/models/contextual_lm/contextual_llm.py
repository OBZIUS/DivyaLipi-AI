import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
load_dotenv()

gemini_api_key = os.getenv("LANG_API")

llm = ChatGoogleGenerativeAI(
    model='gemini-2.0-flash',
    api_key=gemini_api_key,
    temperature=0.4,
    max_tokens=2048
)

def generate_text(prompt: str) -> str:
    response = llm.complete(prompt)
    return response.get("text", "")

if __name__ == "__main__":
    prompt = "Translate Sanskrit to English: नमस्ते"
    output = generate_text(prompt)
    print("Gemini output:", output)
