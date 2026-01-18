import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  PlayCircle,
  RefreshCw,
  Lightbulb,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Volume2
} from "lucide-react";

interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: "video" | "practice" | "bot";
  status: "completed" | "in-progress" | "locked";
  improvement?: string;
}

const eliminationAnalysis = {
  round: "Tech Round 1",
  question: "Two Sum Problem",
  reason: "Time Complexity Analysis",
  details: "Your solution had O(n²) complexity. The interviewer was looking for O(n) using a hash map approach.",
  fixVideo: {
    title: "Hash Map Optimization - 90 Second Fix",
    duration: "1:30",
    thumbnail: "🎬",
  },
};

const learningModules: LearningModule[] = [
  { id: "1", title: "Hash Map Patterns", description: "Master the O(n) lookup technique", duration: "15 min", type: "video", status: "completed", improvement: "+12%" },
  { id: "2", title: "Two Pointer Technique", description: "Solve array problems efficiently", duration: "20 min", type: "video", status: "in-progress" },
  { id: "3", title: "Practice: Array Problems", description: "5 curated problems", duration: "45 min", type: "practice", status: "locked" },
  { id: "4", title: "Communication Coach", description: "AI-powered speaking practice", duration: "10 min", type: "bot", status: "locked" },
];

const personalityScores = {
  confidence: 72,
  clarity: 68,
  pacing: 75,
  fillerWords: 8,
  eyeContact: 65,
};

export const AILearning = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold font-display gradient-text">
            AI Learning Engine
          </h1>
          <p className="text-muted-foreground mt-1">
            Personalized improvement based on your eliminations
          </p>
        </div>
        <NeonBadge variant="secondary" size="lg">
          <Brain className="w-4 h-4 mr-2" />
          AI Powered
        </NeonBadge>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Elimination Analysis */}
        <GlassCard className="col-span-8" delay={0.1} glow>
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-destructive" />
            <h2 className="text-lg font-semibold font-display">Last Elimination Analysis</h2>
          </div>

          <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium">{eliminationAnalysis.round}</p>
                <p className="text-sm text-muted-foreground">{eliminationAnalysis.question}</p>
              </div>
              <NeonBadge variant="destructive">{eliminationAnalysis.reason}</NeonBadge>
            </div>
            <p className="text-sm text-muted-foreground mt-3">{eliminationAnalysis.details}</p>
          </div>

          {/* 90-Second Fix Video */}
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-warning" />
              <span className="font-medium">90-Second Fix</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-32 h-20 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-4xl">
                {eliminationAnalysis.fixVideo.thumbnail}
              </div>
              <div className="flex-1">
                <p className="font-medium">{eliminationAnalysis.fixVideo.title}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{eliminationAnalysis.fixVideo.duration}</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <PlayCircle className="w-4 h-4 mr-2" />
                Watch Fix
              </Button>
            </div>
          </div>

          {/* Retry Loop */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-muted/30"
            >
              <XCircle className="w-6 h-6 text-destructive" />
              <span className="text-sm font-medium">Eliminated</span>
            </motion.div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-primary/20 border border-primary/30"
            >
              <Lightbulb className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">Learn Fix</span>
            </motion.div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-success/20 border border-success/30"
            >
              <RefreshCw className="w-6 h-6 text-success" />
              <span className="text-sm font-medium">Retry</span>
            </motion.div>
          </div>
        </GlassCard>

        {/* Personality Bot */}
        <GlassCard className="col-span-4" delay={0.2}>
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-secondary" />
            <h3 className="font-semibold font-display">Personality Coach</h3>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center text-3xl">
              🤖
            </div>
            <div>
              <p className="font-medium">AI Communication Bot</p>
              <p className="text-sm text-muted-foreground">Improve your soft skills</p>
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(personalityScores).slice(0, 4).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={`text-sm font-bold ${value >= 70 ? "text-success" : "text-warning"}`}>
                    {typeof value === 'number' && key !== 'fillerWords' ? `${value}%` : `${value}/min`}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${value >= 70 ? "bg-success" : "bg-warning"}`}
                    initial={{ width: 0 }}
                    animate={{ width: key === 'fillerWords' ? `${100 - value * 5}%` : `${value}%` }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <Button className="w-full mt-6 bg-gradient-to-r from-secondary to-primary hover:opacity-90">
            <Volume2 className="w-4 h-4 mr-2" />
            Start Practice Session
          </Button>
        </GlassCard>

        {/* Learning Modules */}
        <GlassCard className="col-span-12" delay={0.3}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold font-display">Personalized Learning Path</h2>
              <p className="text-sm text-muted-foreground">Based on your elimination patterns</p>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI Curated</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {learningModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`p-4 rounded-xl border transition-all ${
                  module.status === "completed"
                    ? "bg-success/10 border-success/30"
                    : module.status === "in-progress"
                    ? "bg-primary/10 border-primary/30"
                    : "bg-muted/30 border-border/50 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <NeonBadge size="sm" variant={
                    module.type === "video" ? "default" :
                    module.type === "practice" ? "secondary" : "outline"
                  }>
                    {module.type === "video" ? <PlayCircle className="w-3 h-3 mr-1" /> :
                     module.type === "bot" ? <MessageSquare className="w-3 h-3 mr-1" /> : null}
                    {module.type}
                  </NeonBadge>
                  {module.status === "completed" && (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )}
                </div>
                
                <h4 className="font-medium mb-1">{module.title}</h4>
                <p className="text-xs text-muted-foreground mb-3">{module.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{module.duration}</span>
                  </div>
                  {module.improvement && (
                    <NeonBadge size="sm" variant="success">
                      {module.improvement}
                    </NeonBadge>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};