from node_nlp import NlpManager

# Create an instance of NlpManager
manager = NlpManager(languages=["en"])

# Add intents and examples to the NLP manager
manager.addDocument("en", "How are you", "greeting")
manager.addDocument("en", "who are you", "introduction")
manager.addDocument("en", "what are you", "introduction")
# Add more document additions here...

async def main():
    try:
        await manager.load("model.nlp")
        print("Model loaded successfully...")
    except FileNotFoundError:
        print("Model not found. Training model...")
        await manager.train()
        manager.save("model.nlp", True)
        print("Model trained and saved.")

# Set confidence threshold
confidence_threshold = 0.9

# Function to extract intent from text
async def extract_intent(text):
    response = await manager.process("en", text)
    intent = response['intent']
    score = response['score']
    if score < confidence_threshold:
        return None
    return intent

if __name__ == "__main__":
    import asyncio
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
