from PIL import Image
from sanskrit_app.models.unet.restore import (
    load_restoration_model,
    preprocess_image,
    postprocess_image,
)

model = load_restoration_model()

def restore_image(image: Image.Image) -> Image.Image:
    input_tensor = preprocess_image(image)
    with torch.no_grad():
        restored_tensor = model(input_tensor)
    return postprocess_image(restored_tensor)
