from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import random

import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Spotify setup
client_id = os.getenv('SPOTIPY_CLIENT_ID')
client_secret = os.getenv('SPOTIPY_CLIENT_SECRET')
sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(client_id=client_id, client_secret=client_secret))

@app.route('/')
def home():
    return "Welcome to the Enhanced Song Recommendation System!"

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    song_name = data.get('song_name')
    artist_name = data.get('artist_name')

    if not song_name:
        return jsonify({'error': 'Song name is required'}), 400

    # Analyze sentiment using TextBlob
    blob = TextBlob(f"{song_name} by {artist_name}")
    sentiment_score = blob.sentiment.polarity
    sentiment_label = classify_sentiment(sentiment_score)

    # Fetch recommendations from Spotify based on sentiment
    recommendations = fetch_spotify_recommendations(artist_name, sentiment_label)

    return jsonify({
        'sentiment': sentiment_label,
        'recommendations': recommendations
    })

def classify_sentiment(score):
    if score >= 0.5:
        return "Very Positive"
    elif score > 0:
        return "Positive"
    elif score <= -0.5:
        return "Very Negative"
    elif score < 0:
        return "Negative"
    else:
        return "Neutral"

def fetch_spotify_recommendations(artist_name, sentiment):
    recommendations = []

    # Fetch up to 5 songs from the same artist and randomly sample 2
    try:
        same_artist_results = sp.search(q=f'artist:{artist_name}', type='track', limit=5)
        same_artist_tracks = same_artist_results['tracks']['items']
        sampled_same_artist_tracks = random.sample(same_artist_tracks, min(2, len(same_artist_tracks)))

        for track in sampled_same_artist_tracks:
            track_name = track['name']
            artist = track['artists'][0]['name']
            album_cover = track['album']['images'][0]['url'] if track['album']['images'] else ''
            spotify_url = track['external_urls']['spotify']
            recommendations.append({
                'track_name': track_name,
                'artist_name': artist,
                'album_cover': album_cover,
                'spotify_url': spotify_url
            })
    except Exception as e:
        print(f"Error fetching artist tracks: {e}")

    # Dynamic Spotify query based on sentiment
    if "Positive" in sentiment:
        query = 'genre:pop happy'
    elif "Negative" in sentiment:
        query = 'genre:pop sad'
    elif sentiment == "Neutral":
        query = 'genre:pop chill'
    else:
        query = 'genre:pop'

    # Fetch up to 10 additional songs and randomly sample 3
    try:
        other_artists_results = sp.search(q=query, type='track', limit=10)
        other_artists_tracks = other_artists_results['tracks']['items']
        sampled_other_artist_tracks = random.sample(other_artists_tracks, min(3, len(other_artists_tracks)))

        for track in sampled_other_artist_tracks:
            track_name = track['name']
            artist = track['artists'][0]['name']
            album_cover = track['album']['images'][0]['url'] if track['album']['images'] else ''
            spotify_url = track['external_urls']['spotify']
            if artist.lower() != artist_name.lower():
                recommendations.append({
                    'track_name': track_name,
                    'artist_name': artist,
                    'album_cover': album_cover,
                    'spotify_url': spotify_url
                })
    except Exception as e:
        print(f"Error fetching other tracks: {e}")

    return recommendations

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)