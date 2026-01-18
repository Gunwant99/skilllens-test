export interface LearningModule {
    module_id: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    duration: number;
    prerequisites: string[];
    skills_covered: string[];
  }
  
  export interface LearningProgress {
    module_id: string;
    progress: number;
    completed: boolean;
    time_spent: number;
    last_accessed: string;
  }
  
  export interface AIRecommendation {
    module_id: string;
    title: string;
    reason: string;
    priority: string;
    estimated_impact: number;
  }
  
  export interface StudyPlan {
    week_number: number;
    modules: string[];
    daily_tasks: { [day: string]: string[] };
    estimated_hours: number;
  }