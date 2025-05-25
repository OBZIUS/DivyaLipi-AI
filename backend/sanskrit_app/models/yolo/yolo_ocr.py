from ultralytics import YOLO

def yolo_model(model_path="sanskrit_app/models/yolo/best.pt"):
    model = YOLO("/home/neuralsynth/Code/Projects/sanskrit-ocr/backend/sanskrit_app/models/yolo/best.pt")
    return model
