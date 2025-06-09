import random
import json
import pickle
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt

import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('corpora/wordnet')
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('punkt')
    nltk.download('wordnet')
    nltk.download('stopwords')

class MedicalChatbotTrainer:
    def __init__(self, intents_file='intentreco/intents.json'):
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        self.ignore_letters = ['?', '!', '.', ',', ';', ':']
        
        # Load intents
        with open(intents_file, 'r', encoding='utf-8') as f:
            self.intents = json.load(f)
        
        self.words = []
        self.classes = []
        self.documents = []
        self.model = None
        
    def preprocess_data(self):
        """Enhanced preprocessing with better text cleaning"""
        print("Preprocessing data...")
        
        for intent in self.intents['intents']:
            for pattern in intent['pattern']:
                # Tokenize and clean
                word_list = nltk.word_tokenize(pattern.lower())
                
                # Remove stop words and ignore letters, lemmatize
                word_list = [
                    self.lemmatizer.lemmatize(word) 
                    for word in word_list 
                    if word not in self.ignore_letters and word not in self.stop_words
                ]
                
                self.words.extend(word_list)
                self.documents.append((word_list, intent['tag']))
                
                if intent['tag'] not in self.classes:
                    self.classes.append(intent['tag'])
        
        # Remove duplicates and sort
        self.words = sorted(set(self.words))
        self.classes = sorted(set(self.classes))
        
        print(f"Found {len(self.words)} unique words")
        print(f"Found {len(self.classes)} classes: {self.classes}")
        
        # Save preprocessed data
        pickle.dump(self.words, open('words.pkl', 'wb'))
        pickle.dump(self.classes, open('classes.pkl', 'wb'))
        
    def create_training_data(self):
        """Create training data with improved bag-of-words"""
        print("Creating training data...")
        
        training = []
        output_empty = [0] * len(self.classes)
        
        for document in self.documents:
            bag = []
            word_patterns = document[0]
            
            # Create bag of words
            for word in self.words:
                bag.append(1 if word in word_patterns else 0)
            
            # Create output row
            output_row = list(output_empty)
            output_row[self.classes.index(document[1])] = 1
            
            training.append(bag + output_row)
        
        # Shuffle and convert to numpy array
        random.shuffle(training)
        training = np.array(training, dtype=np.float32)
        
        # Split features and labels
        train_x = training[:, :len(self.words)]
        train_y = training[:, len(self.words):]
        
        return train_x, train_y
    
    def build_model(self, input_shape):
        """Build improved neural network model"""
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, input_shape=(input_shape,), activation='relu'),
            tf.keras.layers.BatchNormalization(),
            tf.keras.layers.Dropout(0.5),
            
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.BatchNormalization(), 
            tf.keras.layers.Dropout(0.5),
            
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dropout(0.3),
            
            tf.keras.layers.Dense(len(self.classes), activation='softmax')
        ])
        
        # Use Adam optimizer with learning rate scheduling
        optimizer = tf.keras.optimizers.Adam(learning_rate=0.001)
        
        model.compile(
            loss='categorical_crossentropy',
            optimizer=optimizer,
            metrics=['accuracy']
        )
        
        return model
    
    def train_model(self, epochs=200, batch_size=8, validation_split=0.2):
        """Train the model with validation and callbacks"""
        print("Training model...")
        
        # Prepare data
        train_x, train_y = self.create_training_data()
        
        # Split into train and validation sets
        x_train, x_val, y_train, y_val = train_test_split(
            train_x, train_y, test_size=validation_split, random_state=42
        )
        
        # Build model
        self.model = self.build_model(len(train_x[0]))
        
        # Callbacks
        callbacks = [
            tf.keras.callbacks.EarlyStopping(
                monitor='val_loss', 
                patience=20, 
                restore_best_weights=True
            ),
            tf.keras.callbacks.ReduceLROnPlateau(
                monitor='val_loss', 
                factor=0.5, 
                patience=10, 
                min_lr=0.0001
            )
        ]
        
        # Train model
        history = self.model.fit(
            x_train, y_train,
            epochs=epochs,
            batch_size=batch_size,
            validation_data=(x_val, y_val),
            callbacks=callbacks,
            verbose=1
        )
        
        # Save model
        self.model.save('chatbot_model.h5')
        
        
        return history
    
    def test_model(self, test_sentences):
        """Test the trained model with sample sentences"""
        if self.model is None:
            print("Model not trained yet!")
            return
        
        print("\nTesting model with sample sentences:")
        print("-" * 50)
        
        for sentence in test_sentences:
            # Preprocess sentence
            tokens = nltk.word_tokenize(sentence.lower())
            tokens = [
                self.lemmatizer.lemmatize(token) 
                for token in tokens 
                if token not in self.ignore_letters and token not in self.stop_words
            ]
            
            # Create bag of words
            bag = [1 if word in tokens else 0 for word in self.words]
            bag = np.array(bag).reshape(1, -1).astype(np.float32)
            
            # Predict
            prediction = self.model.predict(bag, verbose=0)[0]
            predicted_class = self.classes[np.argmax(prediction)]
            confidence = np.max(prediction)
            
            print(f"Input: {sentence}")
            print(f"Predicted: {predicted_class} (Confidence: {confidence:.3f})")
            print("-" * 30)

# Usage
def main():
    # Initialize trainer
    trainer = MedicalChatbotTrainer('intentreco/intents.json')

    # Preprocess data
    trainer.preprocess_data()
    
    # Train model
    history = trainer.train_model(epochs=300, batch_size=8)
    
    # Test with sample sentences
    test_sentences = [
        "I want to book an appointment with doctor",
        "मैं एक अपॉइंटमेंट बुक करना चाहता हूँ",
        "I need to schedule a blood test",
        "Can I book a lab test?",
        "I have a headache and fever",
        "My stomach is hurting",
        "Schedule a meeting with doctor",
        "Book test for tomorrow"
    ]
    
    trainer.test_model(test_sentences)
    
    print("\nTraining completed! Files saved:")
    print("- chatbot_model.h5")
    print("- words.pkl")
    print("- classes.pkl")
    print("- training_history.png")

if __name__ == "__main__":
    main()