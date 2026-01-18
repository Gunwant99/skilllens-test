import React from 'react';
import { useParams } from 'react-router-dom';

const LearningModule: React.FC = () => {
  const { moduleId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Learning Module: {moduleId}</h1>
      <p className="text-gray-600">Module content coming soon...</p>
    </div>
  );
};

export default LearningModule;