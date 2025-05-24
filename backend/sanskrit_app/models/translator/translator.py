from transformers import MarianMTModel, MarianTokenizer

def translation_pipeline():
    model_name = "Helsinki-NLP/opus-mt-sa-en"
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    model = MarianMTModel.from_pretrained(model_name)
    return tokenizer, model
