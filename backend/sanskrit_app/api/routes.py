from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
import uuid
import logging
from sanskrit_app.services.pipeline import process_image

router = APIRouter()

def split_sanskrit_english(text: str) -> dict:
    sanskrit_text = ""
    english_text = ""

    if "English:" in text:
        parts = text.split("English:", 1)
        sanskrit_text = parts[0].strip()
        english_text = parts[1].strip()
    else:
        sanskrit_text = text.strip()

    return {"sanskrit": sanskrit_text, "english": english_text}

@router.post("/process")
async def process_uploaded_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image")

    os.makedirs("temp", exist_ok=True)

    unique_filename = f"{uuid.uuid4().hex}_{file.filename}"
    temp_path = os.path.join("temp", unique_filename)

    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logging.debug(f"Saved uploaded file to {temp_path}")

        result = process_image(temp_path)
        logging.debug(f"process_image result: {result}")

        if isinstance(result, dict):
            # Assume already split properly
            sanskrit_text = result.get("sanskrit", "")
            english_text = result.get("english", "")
        elif isinstance(result, str):
            # Parse the combined string output
            split_result = split_sanskrit_english(result)
            sanskrit_text = split_result["sanskrit"]
            english_text = split_result["english"]
        else:
            raise ValueError("Unexpected return type from process_image")

        return {
            "sanskrit": sanskrit_text,
            "english": english_text
        }

    except Exception as e:
        logging.error(f"Error processing image: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
            logging.debug(f"Removed temp file: {temp_path}")
