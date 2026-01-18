import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getSimulatorScenario,
  getSimulatorQuestions,
  submitSimulator,
} from '../services/api';
import { SimulatorQuestion, SimulatorAnswer } from '../types/simulator';

const SimulatorQuiz: React.FC = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const navigate = useNavigate();

  const [scenario, setScenario] = useState<any>(null);
  const [questions, setQuestions] = useState<SimulatorQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<SimulatorAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScenarioData();
  }, [scenarioId]);

  useEffect(() => {
    if (scenario) {
      setTimeLeft(scenario.time_limit * 60); // Convert to seconds
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [scenario]);

  const loadScenarioData = async () => {
    try {
      const [scenarioData, questionsData] = await Promise.all([
        getSimulatorScenario(scenarioId!),
        getSimulatorQuestions(scenarioId!),
      ]);
      setScenario(scenarioData);
      setQuestions(questionsData);
    } catch (error) {
      console.error('Failed to load scenario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers([
        ...answers,
        {
          question_id: questions[currentQuestion].question_id,
          answer: selectedAnswer,
        },
      ]);
      setSelectedAnswer('');

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    try {
      const result = await submitSimulator({
        scenario_id: scenarioId!,
        answers: answers,
        time_taken: timeTaken,
      });

      navigate(`/simulator/results/${scenarioId}`, { state: { result } });
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{scenario.title}</h2>
          <div className="text-xl font-semibold text-red-600">
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-6">{question.question_text}</h3>

        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition ${
                selectedAnswer === option
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {question.hint && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              💡 <strong>Hint:</strong> {question.hint}
            </p>
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default SimulatorQuiz;