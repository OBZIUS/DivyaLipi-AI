from ultralytics import YOLO

def yolo_model(model_path="sanskrit_app/models/yolo/.pt"):
    model = YOLO('yolov8n.pt')
    return model
