// src/components/ModelSelector.tsx
import React from 'react';

interface Model {
    _id: string;
    prompt: string;
    glb: string;
    thumbnail_url: string
}
  
interface ModelSelectorProps {
    models: Model[];
    onAddModel: (url: string, name: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ models, onAddModel }) => {
  return (
    <div>
      <ul>
        {models.map((model) => (
          <li key={model._id}>
            <button onClick={() => onAddModel(model.glb, model.prompt)}>
                {model.thumbnail_url && (
                <img
                    width="50"
                    height="50"
                    alt={model.prompt}
                    src={model.thumbnail_url}
                    style={{ maxWidth: '100%' }}
                />
                )} Add to Platter
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModelSelector;
