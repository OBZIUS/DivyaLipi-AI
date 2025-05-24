from ultralytics import YOLO

def yolo_model(model_path="app/models/yolo/best.pt"):
    model = YOLO(model_path)
    return model
