import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.preprocessing import LabelEncoder

# Load the trained model
model = load_model('restaurant_chatbot_model.h5')

# Load preprocessed data
with open('preprocessed_data.pickle', 'rb') as handle:
    (_, _, _, _, test_sequences, test_labels) = pickle.load(handle)

# Load the tokenizer
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Load the label encoder
with open('label_encoder.pickle', 'rb') as handle:
    label_encoder = pickle.load(handle)

# Preprocess the user input
user_input_text = "Your user input text here"
preprocessed_input = preprocess_text(user_input_text)

# Tokenize and pad the preprocessed input
sequence = tokenizer.texts_to_sequences([preprocessed_input])
max_sequence_length = test_sequences.shape[1]
padded_sequence = pad_sequences(sequence, maxlen=max_sequence_length)

# Predict the intent
intent_probabilities = model.predict(padded_sequence)
predicted_intent_index = intent_probabilities.argmax()
predicted_intent = label_encoder.inverse_transform([predicted_intent_index])[0]

print("Predicted Intent:", predicted_intent)
