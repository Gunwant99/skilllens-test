import React, { useEffect, useState } from 'react';
import { getSimulatorScenarios } from '../services/api';
import { SimulatorScenario } from '../types/simulator';
import { useNavigate } from 'react-router-dom';

const Simulator: React.FC = () => {
  const [scenarios, setScenarios] = useState<SimulatorScenario[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const data = await getSimulatorScenarios();
      setScenarios(data);
    } catch (error) {
      console.error('Failed to load scenarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
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
      <h1 className="text-3xl font-bold mb-6">Day 0 Simulator</h1>
      <p className="text-gray-600 mb-8">
        Practice real workplace scenarios in a risk-free environment
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <div
            key={scenario.scenario_id}
            className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/simulator/${scenario.scenario_id}`)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{scenario.title}</h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(
                  scenario.difficulty
                )}`}
              >
                {scenario.difficulty}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{scenario.description}</p>

            <div className="flex justify-between text-sm text-gray-500">
              <span>📝 {scenario.total_questions} questions</span>
              <span>⏱️ {scenario.time_limit} min</span>
            </div>

            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Start Scenario
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Simulator;