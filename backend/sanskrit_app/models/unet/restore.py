import torch
from torchvision import transforms
from PIL import Image


class RestorationModel(torch.nn.Module):
    def __init__(self):
        super(RestorationModel, self).__init__()
        # Replace with actual U-Net layers
        self.identity = torch.nn.Identity()

    def forward(self, x):
        return self.identity(x)


def load_restoration_model():
    model = RestorationModel()
    # model.load_state_dict(torch.load("sanskrit_app/models/unet/weights.pth", map_location=torch.device('cpu')))
    model.eval()
    return model


def preprocess_image(image: Image.Image):
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor(),
    ])
    return transform(image).unsqueeze(0)


def postprocess_image(tensor: torch.Tensor):
    tensor = tensor.squeeze(0).detach().clamp(0, 1)
    image = transforms.ToPILImage()(tensor)
    return image
