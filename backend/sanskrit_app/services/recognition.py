import cv2
import pytesseract
import numpy as np


def extract_text_from_boxes(image_input, boxes):

    if isinstance(image_input, (str, bytes)):
        image = cv2.imread(image_input)
        if image is None:
            raise ValueError(f"Failed to load image from path: {image_input}")
    elif isinstance(image_input, np.ndarray):
        image = image_input
    else:
        raise TypeError("image_input must be a file path (str/bytes) or a NumPy ndarray")

    texts = []
    for x1, y1, x2, y2 in boxes:
        roi = image[int(y1):int(y2), int(x1):int(x2)]
        text = pytesseract.image_to_string(roi, lang='eng+san')
        texts.append(text.strip())

    return texts
