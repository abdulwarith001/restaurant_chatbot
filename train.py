import pickle
from model import build_model
from sklearn.preprocessing import LabelEncoder

# Load preprocessed data
with open('preprocessed_data.pickle', 'rb') as handle:
    (train_sequences, train_labels,
     val_sequences, val_labels,
     _, _) = pickle.load(handle)

# Load the tokenizer
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

# Define max sequence length
max_sequence_length = train_sequences.shape[1]

# Encode labels with LabelEncoder
label_encoder = LabelEncoder()
train_labels_encoded = label_encoder.fit_transform(train_labels)
val_labels_encoded = label_encoder.transform(val_labels)

# Get the class labels
class_labels = label_encoder.classes_

# Build the model
vocab_size = len(tokenizer.word_index) + 1
num_classes = len(class_labels)
model = build_model(vocab_size, max_sequence_length, num_classes)

# Compile the model with sparse categorical crossentropy loss
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the model
history = model.fit(train_sequences, train_labels_encoded, epochs=10, batch_size=32,
                    validation_data=(val_sequences, val_labels_encoded))

# Save the trained model
model.save('restaurant_chatbot_model.h5')

print(class_labels)
print("Model training completed.")
