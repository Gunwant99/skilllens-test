import React, { useEffect, useState } from 'react';
import {
  getLearningModules,
  getLearningRecommendations,
  getLearningProgress,
} from '../services/api';
import { LearningModule, AIRecommendation } from '../types/learning';
import { useNavigate } from 'react-router-dom';

const Learning: React.FC = () => {
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [modulesData, recsData, progressData] = await Promise.all([
        getLearningModules(),
        getLearningRecommendations(),
        getLearningProgress(),
      ]);
      setModules(modulesData);
      setRecommendations(recsData);
      setProgress(progressData);
    } catch (error) {
      console.error('Failed to load learning data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getModuleProgress = (moduleId: string) => {
    const prog = progress.find((p) => p.module_id === moduleId);
    return prog?.progress || 0;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Learning Platform</h1>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">🎯 Recommended for You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.module_id}
                className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{rec.title}</h3>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{rec.reason}</p>
                <p className="text-xs text-green-600">
                  +{rec.estimated_impact} score impact
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Modules */}
      <h2 className="text-2xl font-semibold mb-4">All Modules</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const moduleProgress = getModuleProgress(module.module_id);

          return (
            <div
              key={module.module_id}
              className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/learning/${module.module_id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{module.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(
                    module.difficulty
                  )}`}
                >
                  {module.difficulty}
                </span>
              </div>

              <p className="text-gray-600 mb-4">{module.description}</p>

              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{moduleProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>📚 {module.category}</span>
                <span>⏱️ {module.duration} min</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {module.skills_covered.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Learning;