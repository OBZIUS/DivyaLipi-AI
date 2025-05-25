import os
import base64
import mimetypes
from dotenv import load_dotenv
from pydantic import BaseModel
from langchain.schema import HumanMessage
from sanskrit_app.models.contextual_lm.contextual_llm import llm

class Base64Image(BaseModel):
    data: str
    media_type: str

load_dotenv()

gemini_api_key = os.getenv("LANG_API")

def analyze_image_with_prompt(image_path: str, prompt: str) -> str:
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found at {image_path}")

    with open(image_path, "rb") as img_file:
        image_bytes = img_file.read()

    image_base64 = base64.b64encode(image_bytes).decode("utf-8")
    media_type = mimetypes.guess_type(image_path)[0] or "image/jpeg"
    image_block = Base64Image(data=image_base64, media_type=media_type)

    message = HumanMessage(content=[image_block, prompt])

    try:
        response = llm.invoke([message])
        return response.content
    except Exception as e:
        raise RuntimeError(f"Gemini Vision model call failed: {e}")

def restore_sanskrit_text(raw_text: str) -> str:
    prompt = f"""How Can I provide an Image to you?

Input:
{raw_text}
"""

    try:
        response = llm.invoke([HumanMessage(content=prompt)])
        return response.content
    except Exception as e:
        raise RuntimeError(f"Gemini text model call failed: {e}")
