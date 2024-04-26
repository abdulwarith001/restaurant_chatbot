const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["en"] });

// Add intents and examples to the NLP manager
// Add intents and examples to the NLP manager
manager.addDocument("en", "How are you", "greeting");
manager.addDocument("en", "who are you", "introduction");
manager.addDocument("en", "what are you", "introduction");
manager.addDocument("en", "are you a bot", "introduction");
manager.addDocument("en", "are you a robot", "introduction");
manager.addDocument("en", "are you a human", "introduction");
manager.addDocument("en", "can you help me with my orders", "introduction");
manager.addDocument("en", "what can you help me with", "introduction");
manager.addDocument("en", "hello", "greeting");
manager.addDocument("en", "hi", "greeting");
manager.addDocument("en", "I'm new here", "greeting");
manager.addDocument("en", "How are you doing?", "greeting"); // Additional example
manager.addDocument("en", "whats up", "greeting"); // Additional example
manager.addDocument("en", "hey there", "greeting"); // Additional example
manager.addDocument("en", "good morning", "greeting"); // Additional example
manager.addDocument("en", "what is the menu", "menu"); // Additional example
manager.addDocument("en", "can i have the menu", "menu"); // Additional example
manager.addDocument("en", "what do you have", "menu"); // Additional example
manager.addDocument("en", "what do you guys have today", "menu"); // Additional example
manager.addDocument("en", "what can you offer", "menu"); // Additional example
manager.addDocument("en", "do you have fish", "menu"); // Additional example
manager.addDocument("en", "menu", "menu"); // Additional example
manager.addDocument("en", "Can you show me your drink menu?", "menu"); // Additional example
manager.addDocument("en", "can i get a cold drink from you", "menu"); // Additional example
manager.addDocument(
  "en",
  "I'm allergic to nuts, what dishes should I avoid?",
  "menu"
); // Additional example
manager.addDocument("en", "What's on the menu?", "menu"); // Additional example
manager.addDocument("en", "What can I order?", "menu"); // Additional example
manager.addDocument("en", "Could you tell me about your dishes?", "menu"); // Additional example
manager.addDocument("en", "Is there a menu available?", "menu"); // Additional example
manager.addDocument("en", "Is there a menu available", "menu"); // Additional example
manager.addDocument("en", "Could you please provide me with the menu?", "menu"); // Additional example
manager.addDocument("en", "What are your opening hours?", "opening_hour"); // Additional example
manager.addDocument("en", "What time do you open", "opening_hour"); // Additional example
manager.addDocument("en", "Are you opened by 2PM", "opening_hour"); // Additional example
manager.addDocument("en", "What time can i come?", "opening_hour"); // Additional example
manager.addDocument("en", "Can i come now", "opening_hour"); // Additional example
manager.addDocument("en", "when do you open", "opening_hour"); // Additional example
manager.addDocument("en", "where are you located", "location"); // Additional example
manager.addDocument("en", "where are you", "location"); // Additional example
manager.addDocument("en", "what is your address", "location"); // Additional example
manager.addDocument("en", "what is your location", "location"); // Additional example
manager.addDocument("en", "what state are you located", "location"); // Additional example
manager.addDocument("en", "bye", "closing_greetings"); // Additional example
manager.addDocument("en", "goodbye", "closing_greetings"); // Additional example
manager.addDocument("en", "i am going now", "closing_greetings"); // Additional example
manager.addDocument("en", "good night", "closing_greetings"); // Additional example
manager.addDocument("en", "thank you", "closing_greetings"); // Additional example
manager.addDocument("en", "Thanks for your help", "closing_greetings"); // Additional example
manager.addDocument("en", "I appreciate your help", "closing_greetings"); // Additional example
// manager.addDocument("en", "", "closing_greetings"); // Additional example
manager.addDocument("en", "catch you later", "closing_greetings"); // Additional example
manager.addDocument("en", "see you later", "closing_greetings"); // Additional example
manager.addDocument("en", "Can I make a reservation?", "booking"); // Additional example
manager.addDocument("en", "I'd like to book a table, please.", "booking"); // Additional example
manager.addDocument(
  "en",
  "Is it possible to reserve a table for 24 of april 2024 at 7PM?",
  "booking"
); // Additional example
manager.addDocument(
  "en",
  "Are there any openings for dinner tomorrow?",
  "booking"
); // Additional example
manager.addDocument(
  "en",
  "Do you have any tables available on 24 of may?",
  "booking"
); // Additional example
manager.addDocument(
  "en",
  "Do you have any tables available tomorrow?",
  "booking"
); // Additional example
manager.addDocument(
  "en",
  "What times do you have available for reservations?",
  "booking"
); // Additional example
manager.addDocument(
  "en",
  "Can I reserve a table for a group of six?",
  "booking"
); // Additional example
manager.addDocument(
  "en",
  "I'm planning a birthday dinner. Can I make a reservation?",
  "booking"
); // Additional example
manager.addDocument("en", "How do I go about booking a table?", "booking"); // Additional example
manager.addDocument(
  "en",
  "Can you guide me through the reservation process?",
  "booking"
); // Additional example
manager.addDocument(
  "en",
  "Can I request a table in a quieter area?",
  "booking"
); // Additional example
manager.addDocument(
  "en",
  "Can you suggest something for dinner?",
  "suggestion"
); // Additional example
manager.addDocument(
  "en",
  "I'm not sure what to order. Any recommendations?",
  "suggestion"
); // Additional example
manager.addDocument(
  "en",
  "What do you suggest I try from the menu?",
  "suggestion"
); // Additional example
manager.addDocument(
  "en",
  "I'm allergic to nuts. Can you recommend nut-free options?",
  "suggestion"
); // Additional example
manager.addDocument(
  "en",
  "Any suggestions for vegan-friendly dishes?",
  "suggestion"
); // Additional example
manager.addDocument(
  "en",
  "Do you have any gluten-free recommendations?",
  "suggestion"
); // Additional example
manager.addDocument(
  "en",
  "I'm on a budget. Can you recommend something affordable?",
  "suggestion"
); // Additional example
manager.addDocument("en", "can you suggest something", "suggestion"); // Additional example
manager.addDocument(
  "en",
  "What's your most popular wine or beer?",
  "suggestion"
); // Additional example
manager.addDocument(
  "en",
  "Can you suggest something sweet to end the meal?",
  "suggestion"
); // Additional example
manager.addDocument("en", "Any recommendations for a decadent dessert?", "suggestion"); // Additional example

(async () => {
  try {
    await manager.load("model.nlp");
    console.log("Model loaded successfully...");
  } catch (err) {
    console.log("Model not found. Training model...");
    await manager.train();
    manager.save("model.nlp", true);
    console.log("Model trained and saved.");
  }
})();

const confidenceThreshold = 0.9;

// Function to extract intent from text
async function extractIntent(text) {
  const response = await manager.process("en", text);
  const { intent, score } = response;
  if (score < confidenceThreshold) {
    // If confidence score is below the threshold, return null or handle accordingly
    return null;
  }
  return intent;
}

module.exports = extractIntent;
