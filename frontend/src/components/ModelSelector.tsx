// src/components/ModelSelector.tsx
import React from 'react';

interface Model {
    _id: string;
    prompt: string;
    glb: string;
}
  
interface ModelSelectorProps {
    models: Model[];
    onAddModel: (url: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, onAddModel }) => {
  return (
    <div>
      <h2>Select Models to Add</h2>
      <ul>
        {models.map((model) => (
          <li key={model._id}>
            {model.prompt}
            <button onClick={() => onAddModel(model.glb)}>Add to Platter</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModelSelector;
