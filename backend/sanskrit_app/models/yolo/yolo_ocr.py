from ultralytics import YOLO

def yolo_model(model_path="sanskrit_app/models/yolo/best.pt"):
    model = YOLO("./best.pt")
    return model
