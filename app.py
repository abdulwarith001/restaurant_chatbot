# text_preprocessing.py

import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle

# Load the dataset
df = pd.read_csv('restaurant_data.csv')

# Split the dataset into training, validation, and test sets
train_texts, test_texts, train_labels, test_labels = train_test_split(
    df['text'], df['intent'], test_size=0.2, random_state=42)
train_texts, val_texts, train_labels, val_labels = train_test_split(
    train_texts, train_labels, test_size=0.2, random_state=42)

# Tokenize the text data
tokenizer = Tokenizer(oov_token='<OOV>')
tokenizer.fit_on_texts(train_texts)

# Save the tokenizer for later use during inference
with open('tokenizer.pickle', 'wb') as handle:
    pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)

# Convert text to sequences and pad them to ensure uniform length
max_sequence_length = 100  # Choose an appropriate sequence length
train_sequences = pad_sequences(tokenizer.texts_to_sequences(train_texts), maxlen=max_sequence_length)
val_sequences = pad_sequences(tokenizer.texts_to_sequences(val_texts), maxlen=max_sequence_length)
test_sequences = pad_sequences(tokenizer.texts_to_sequences(test_texts), maxlen=max_sequence_length)

# Save preprocessed data
with open('preprocessed_data.pickle', 'wb') as handle:
    pickle.dump((train_sequences, train_labels, val_sequences, val_labels, test_sequences, test_labels), handle, protocol=pickle.HIGHEST_PROTOCOL)

print("Text preprocessing completed.")
