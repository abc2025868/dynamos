
import React, { useState } from 'react';
import axios from 'axios';
import './CropDisease.css';

const CropDisease = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file) => {
    setSelectedFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
    setPrediction(null);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('/api/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="crop-disease-container">
        <div className="container">
          <div className="page-header">
            <h1>Crop Disease Detection</h1>
            <p>Upload an image of your crop to detect diseases and get treatment recommendations</p>
          </div>

          <div className="upload-section">
            <form onSubmit={handleSubmit}>
              <div
                className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="image-preview">
                    <img src={previewUrl} alt="Preview" />
                    <button
                      type="button"
                      className="remove-image"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                        setPrediction(null);
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <h3>Drag & drop your crop image here</h3>
                    <p>or click to browse files</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files[0])}
                      className="file-input"
                    />
                  </div>
                )}
              </div>

              {selectedFile && (
                <button type="submit" className="btn btn-primary analyze-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-search"></i>
                      Analyze Image
                    </>
                  )}
                </button>
              )}
            </form>
          </div>

          {prediction && (
            <div className="prediction-results">
              <h2>Analysis Results</h2>
              <div className="result-card">
                <div className="disease-info">
                  <h3>{prediction.disease}</h3>
                  <p className="confidence">Confidence: {prediction.confidence}%</p>
                  <p className="description">{prediction.description}</p>
                </div>
                
                {prediction.treatment && (
                  <div className="treatment-info">
                    <h4>Treatment Recommendations</h4>
                    <ul>
                      {prediction.treatment.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropDisease;
