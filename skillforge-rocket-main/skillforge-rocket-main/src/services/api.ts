import axios from 'axios';

const API_BASE_URL = 'https://your-render-url.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== SIMULATOR ENDPOINTS ==========

export const getSimulatorScenarios = async () => {
  const response = await api.get('/simulator/scenarios');
  return response.data;
};

export const getSimulatorScenario = async (scenarioId: string) => {
  const response = await api.get(`/simulator/scenarios/${scenarioId}`);
  return response.data;
};

export const getSimulatorQuestions = async (scenarioId: string) => {
  const response = await api.get(`/simulator/scenarios/${scenarioId}/questions`);
  return response.data;
};

export const submitSimulator = async (data: {
  scenario_id: string;
  answers: { question_id: string; answer: string }[];
  time_taken: number;
}) => {
  const response = await api.post('/simulator/submit', data);
  return response.data;
};

export const getSimulatorResults = async () => {
  const response = await api.get('/simulator/results');
  return response.data;
};

// ========== LEARNING ENDPOINTS ==========

export const getLearningModules = async () => {
  const response = await api.get('/learning/modules');
  return response.data;
};

export const getLearningModule = async (moduleId: string) => {
  const response = await api.get(`/learning/modules/${moduleId}`);
  return response.data;
};

export const getLearningRecommendations = async () => {
  const response = await api.get('/learning/recommendations');
  return response.data;
};

export const updateLearningProgress = async (
  moduleId: string,
  progress: number,
  timeSpent: number
) => {
  const response = await api.post(
    `/learning/progress?module_id=${moduleId}&progress=${progress}&time_spent=${timeSpent}`
  );
  return response.data;
};

export const getLearningProgress = async () => {
  const response = await api.get('/learning/progress');
  return response.data;
};

export const getStudyPlan = async (weeks: number = 4) => {
  const response = await api.get(`/learning/study-plan?weeks=${weeks}`);
  return response.data;
};

export default api;