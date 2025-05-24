from PIL import Image
from sanskrit_app.services.restoration import restore_image
from sanskrit_app.services.detection import detect_text_boxes
from sanskrit_app.services.recognition import extract_text_from_boxes
from sanskrit_app.services.translation import translate_texts

def process_image(image_path: str):
    # Load image from path
    image = Image.open(image_path).convert("RGB")

    # Step 1: Restore image to reduce noise, improve quality
    restored_image = restore_image(image)

    # Step 2: Detect text boxes on restored image
    boxes = detect_text_boxes(restored_image)

    # Step 3: Extract text from detected boxes
    texts = extract_text_from_boxes(restored_image, boxes)

    # Step 4: Translate extracted texts
    translations = translate_texts(texts)

    return {
        "boxes": boxes.tolist(),
        "texts": texts,
        "translations": translations
    }
