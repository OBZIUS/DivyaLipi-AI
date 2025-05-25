from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
import uuid
import logging
from sanskrit_app.services.pipeline import process_image

router = APIRouter()

def split_output(text: str) -> dict:
    if "Translated:" in text:
        parts = text.split("Translated:")
        sanskrit = parts[0].strip()
        english = parts[1].strip()
    else:
        sanskrit = text.strip()
        english = ""
    return {"sanskrit": sanskrit, "english": english}

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

        result_text = process_image(temp_path)
        split_result = split_output(result_text)

        return {
            "sanskrit": split_result["sanskrit"],
            "english": split_result["english"]
        }

    except Exception as e:
        logging.error(f"Error processing image: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)