import torch
import torchvision.models as models

def resnet18_embedder():
    model = models.resnet18(pretrained=True)
    model.fc = torch.nn.Identity()  # Remove classification head
    model.eval()
    return model
