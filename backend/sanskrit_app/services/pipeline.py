import base64
import requests

GEMINI_API_KEY = "AIzaSyB5WGTUQmxKOifPRTYWAnL10m_N4uGJ4-4"  # Replace or use from .env
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

def encode_image_to_base64(path):
    with open(path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def send_to_gemini(base64_image):
    headers = {"Content-Type": "application/json"}
    prompt = (
        "You are given an image containing text. Perform two steps:\n\n"
        "1. Extract the exact text from the image. Output it *as-is*, with no heading or trailing text. Just the plain text as seen in the image.\n\n"
        "2. Translate the extracted text line-by-line into English, maintaining the structure, while holding the meaning of the text. Prefix this section with exactly:\n\n"
        "\"Translated:\"\n\n"
        "Your final output must look like this:\n"
        "```\n"
        "<original text>\n\n"
        "Translated:\n"
        "<line 1 translation>\n"
        "<line 2 translation>\n"
        "...\n"
        "```\n\n"
        "Do not include any other text, explanation, or formatting outside the format above."
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt},
                    {
                        "inline_data": {
                            "mime_type": "image/jpeg",
                            "data": base64_image
                        }
                    }
                ]
            }
        ]
    }

    response = requests.post(API_URL, headers=headers, json=payload)
    if response.ok:
        return response.json()["candidates"][0]["content"]["parts"][0]["text"]
    else:
        raise Exception(f"Gemini API error {response.status_code}: {response.text}")

def process_image(image_path: str) -> str:
    base64_image = encode_image_to_base64(image_path)
    return send_to_gemini(base64_image)