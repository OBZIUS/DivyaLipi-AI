import cv2
import numpy as np
from PIL import Image

from sanskrit_app.services.restoration import restore_image
from sanskrit_app.services.detection import detect_text_boxes
from sanskrit_app.services.recognition import extract_text_from_boxes
from sanskrit_app.services.translation import translate_texts

def process_image(image_path: str):
    pil_image = Image.open(image_path).convert("RGB")
    print(f"[INFO] Loaded image from: {image_path}")
    restored_pil = restore_image(pil_image)
    restored_cv2 = cv2.cvtColor(np.array(restored_pil), cv2.COLOR_RGB2BGR)
    print(f"[INFO] Restored image shape: {restored_cv2.shape}")
    boxes = detect_text_boxes(restored_cv2)
    print(f"[INFO] Detected {len(boxes)} text boxes: {boxes}")
    texts = extract_text_from_boxes(restored_cv2, boxes)
    print(f"[INFO] Extracted texts: {texts}")
    translations = translate_texts(texts)
    print(f"[INFO] Translations: {translations}")
    return {
        "boxes": boxes.tolist() if isinstance(boxes, np.ndarray) else boxes,
        "texts": texts,
        "translations": translations
    }
