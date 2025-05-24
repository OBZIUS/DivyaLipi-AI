from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
import uuid
from sanskrit_app.services.pipeline import process_image

router = APIRouter()

@router.post("/process")
async def process_uploaded_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file is not an image")

    os.makedirs("temp", exist_ok=True)

    unique_filename = f"{uuid.uuid4().hex}_{file.filename}"
    temp_path = os.path.join("temp", unique_filename)
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        print(f"[DEBUG] Processing uploaded image at: {temp_path}")
        result = process_image(temp_path)
        print(f"[DEBUG] Result from process_image: {result}")
        sanskrit_text = result.get("sanskrit", "") or ""
        english_text = result.get("english", "") or ""
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
            print(f"[DEBUG] Removed temp file: {temp_path}")
    return {
        "sanskrit": sanskrit_text,
        "english": english_text
    }
