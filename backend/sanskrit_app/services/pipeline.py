# backend/sanskrit_app/pipeline.py

import os
from typing import List

from sanskrit_app.services.detection import detect_text_boxes
from sanskrit_app.services.inference import restore_sanskrit_text


def process_image(image_path: str) -> str:
    """
    Full pipeline: Restore image → OCR → Sanskrit restoration using Mistral.

    Args:
        image_path (str): Path to the input image.

    Returns:
        str: Final corrected Sanskrit sentence + translation.
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image file not found: {image_path}")

    # Step 1: Enhance the image (denoising / restoration)


    # Step 2: OCR the restored image
    ocr_text = detect_text_boxes(image_path)

    # Step 3: Use Mistral to restore correct Sanskrit
    final_output = restore_sanskrit_text(ocr_text)

    return final_output

def split_sanskrit_english(text: str) -> dict:
    # Example naive split by keyword "English:" assuming Sanskrit is before it
    sanskrit_text = ""
    english_text = ""

    if "English:" in text:
        parts = text.split("English:", 1)
        sanskrit_text = parts[0].strip()
        english_text = parts[1].strip()
    else:
        # If no English part found, treat all as Sanskrit
        sanskrit_text = text.strip()

    return {"sanskrit": sanskrit_text, "english": english_text}
