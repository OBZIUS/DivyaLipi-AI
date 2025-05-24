from sanskrit_app.models.yolo.yolo_ocr import yolo_model

model = yolo_model()

def detect_text_boxes(image_path: str):
    results = model(image_path)
    boxes = results[0].boxes.xyxy.cpu().numpy()
    return boxes
