from fastapi import APIRouter, UploadFile, File
import shutil, os
from backend.app.services.pipeline import process_image

router = APIRouter()

@router.post("/ocr-translate/")
async def ocr_translate(file: UploadFile = File(...)):
    os.makedirs("temp", exist_ok=True)
    temp_path = f"temp/{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = process_image(temp_path)
    os.remove(temp_path)
    return result
