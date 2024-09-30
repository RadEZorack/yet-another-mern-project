// src/components/ModelGeneratorForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const ModelGeneratorForm: React.FC = () => {
  const [textInput, setTextInput] = useState('');
  const [modelUrl, setModelUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/generate-model', { text: textInput });
      setModelUrl(response.data.modelUrl);
    } catch (error) {
      console.error('Error generating model:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Describe the model you want to create"
      />
      <button type="submit">Generate Model</button>
      {modelUrl && <p>Model generated! View it <a href={modelUrl}>here</a>.</p>}
    </form>
  );
};

export default ModelGeneratorForm;
