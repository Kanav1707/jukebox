print("Importing flask...")
from flask import Flask
print("Importing transformers...")
from transformers import pipeline
print("Importing spotipy...")
import spotipy
print("Importing torch...")
import torch
print("Importing tensorflow...")
import tensorflow

print("Initializing pipeline...")
try:
    sentiment_pipeline = pipeline('sentiment-analysis')
    print("Pipeline initialized successfully.")
except Exception as e:
    print(f"Error initializing pipeline: {e}")
