from transformers import AutoModelForSeq2SeqLM, AutoTokenizer


def contextual_lm(model_name="google/mt5-small"):
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
    return tokenizer, model
