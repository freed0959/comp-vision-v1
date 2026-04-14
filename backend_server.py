from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import torch
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# Initialize image classification pipeline
classifier = pipeline("image-classification", model="google/vit-base-patch16-224")

@app.route('/api/identify', methods=['POST'])
def identify_image():
    """
    Receive image file and return classification results
    """
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    try:
        # Read and process image
        image = Image.open(file.stream).convert('RGB')
        
        # Classify image
        results = classifier(image)
        
        # Filter results with confidence > 90%
        filtered_results_90 = [
            {
                'label': result['label'],
                'confidence': round(result['score'] * 100, 2),
                'score': result['score']
            }
            for result in results 
            if result['score'] > 0.9
        ]
        
        # If we have results > 90%, return them
        if filtered_results_90:
            return jsonify({
                'success': True,
                'results': filtered_results_90,
                'count': len(filtered_results_90),
                'threshold': '> 90%'
            })
        
        # If no results > 90%, try > 80%
        filtered_results_80 = [
            {
                'label': result['label'],
                'confidence': round(result['score'] * 100, 2),
                'score': result['score']
            }
            for result in results 
            if result['score'] > 0.8
        ]
        
        if filtered_results_80:
            return jsonify({
                'success': True,
                'results': filtered_results_80,
                'count': len(filtered_results_80),
                'threshold': '> 80% (≥90% tidak ditemukan)',
                'warning': 'Hasil dengan confidence sedikit di bawah standar 90%'
            })
        
        # If still nothing, return top 3 results
        top_results = [
            {
                'label': result['label'],
                'confidence': round(result['score'] * 100, 2),
                'score': result['score']
            }
            for result in results[:3]
        ]
        
        return jsonify({
            'success': True,
            'results': top_results,
            'count': len(top_results),
            'threshold': 'Top 3 results (confidence < 80%)',
            'warning': 'Hasil identifikasi rendah - silakan coba foto lain'
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
