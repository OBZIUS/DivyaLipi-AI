from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

def translation_pipeline():
    model_name = "ai4bharat/indictrans2-indic-en-1B"
    tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name, trust_remote_code=True)
    return tokenizer, model

tokenizer, model = translation_pipeline()

def translate_texts(texts):
    results = []
    for text in texts:
        if not text:
            results.append("")
            continue
        # Tokenize input text
        inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        # Generate translation output ids
        outputs = model.generate(**inputs)
        # Decode the generated ids to string
        translated = tokenizer.decode(outputs[0], skip_special_tokens=True)
        results.append(translated.strip())
    return results
