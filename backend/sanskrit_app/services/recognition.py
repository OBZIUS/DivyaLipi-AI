import cv2
import pytesseract

def extract_text_from_boxes(image_path: str, boxes):
    image = cv2.imread(image_path)
    texts = []
    for x1, y1, x2, y2 in boxes:
        roi = image[int(y1):int(y2), int(x1):int(x2)]
        text = pytesseract.image_to_string(roi, lang='eng+san')
        texts.append(text.strip())
    return texts
