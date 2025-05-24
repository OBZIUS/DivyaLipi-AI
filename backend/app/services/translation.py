from backend.app.models.translator.translator import translation_pipeline


tokenizer, model = translation_pipeline()

def translate_texts(texts):
    results = []
    for text in texts:
        if not text:
            results.append("")
            continue
        inputs = tokenizer([text], return_tensors="pt", padding=True, truncation=True)
        outputs = model.generate(**inputs)
        translated = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]
        results.append(translated.strip())
    return results
