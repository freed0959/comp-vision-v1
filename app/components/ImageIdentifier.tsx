'use client';

import React, { useState, useRef } from 'react';
import { Upload, Loader, AlertCircle, CheckCircle } from 'lucide-react';

interface ClassificationResult {
  label: string;
  confidence: number;
  score: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ImageIdentifier() {
  const [image, setImage] = useState<string | null>(null);
  const [results, setResults] = useState<ClassificationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [threshold, setThreshold] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Show image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Send to backend
    await identifyImage(file);
  };

  const identifyImage = async (file: File) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    setWarning(null);
    setThreshold(null);
    setResults([]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/api/identify`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setThreshold(data.threshold);
        if (data.warning) setWarning(data.warning);
        setMessage(`Ditemukan ${data.count} hasil identifikasi (${data.threshold})`);
      } else {
        setError(data.message || 'Identifikasi gagal');
        if (data.closest_match) {
          setMessage(
            `Hasil terbaik: ${data.closest_match.label} (${data.closest_match.confidence}% - di bawah threshold 90%)`
          );
        }
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🤖 Image Identifier
          </h1>
          <p className="text-gray-600">
            Upload foto untuk identifikasi otomatis dengan AI
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div
            className="border-2 border-dashed border-indigo-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 mx-auto text-indigo-500 mb-4" />
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Klik atau drag image di sini
            </p>
            <p className="text-sm text-gray-500">
              Format: JPG, PNG, WebP (Max 10MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Image Preview */}
        {image && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Preview Foto
            </h2>
            <img
              src={image}
              alt="preview"
              className="w-full max-h-96 object-contain rounded-lg"
            />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6 flex items-center justify-center">
            <Loader className="w-8 h-8 animate-spin text-indigo-600 mr-4" />
            <span className="text-lg text-gray-700">
              Menganalisis gambar...
            </span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <p className="font-semibold text-red-700">Error</p>
                <p className="text-red-600">{error}</p>
                <p className="text-sm text-red-500 mt-2">
                  ⚠️ Pastikan backend server berjalan dan accessible
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Info Message */}
        {message && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded">
            <p className="text-blue-700">{message}</p>
          </div>
        )}

        {/* Warning Message */}
        {warning && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 rounded">
            <p className="text-yellow-700">⚠️ {warning}</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Hasil Identifikasi</h2>
            </div>

            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border-b pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-gray-800">
                      {result.label}
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {result.confidence}%
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-6">
              ✅ {threshold || 'Hasil identifikasi'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
