from backend.app.services.detection import detect_text_boxes
from backend.app.services.recognition import extract_text_from_boxes
from backend.app.services.translation import translate_texts

def process_image(image_path: str):
    boxes = detect_text_boxes(image_path)
    texts = extract_text_from_boxes(image_path, boxes)
    translations = translate_texts(texts)
    return {
        "boxes": boxes.tolist(),
        "texts": texts,
        "translations": translations
    }
