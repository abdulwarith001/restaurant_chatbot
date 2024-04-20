# evaluate.py

import pickle
from tensorflow.keras.models import load_model

from sklearn.preprocessing import LabelBinarizer

# Load preprocessed data
with open('preprocessed_data.pickle', 'rb') as handle:
    _, _, _, _, test_sequences, test_labels = pickle.load(handle)

# Load the trained model
model = load_model('restaurant_chatbot_model.h5')

# One-hot encode the target labels
label_binarizer = LabelBinarizer()
test_labels_encoded = label_binarizer.fit_transform(test_labels)

# Evaluate the model on the test set
loss, accuracy = model.evaluate(test_sequences, test_labels_encoded)
print("Test Loss:", loss)
print("Test Accuracy:", accuracy)
