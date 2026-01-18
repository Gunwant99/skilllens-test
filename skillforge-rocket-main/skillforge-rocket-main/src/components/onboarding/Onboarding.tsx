import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Target,
  Briefcase,
  GraduationCap,
  Building2,
  ChevronRight,
  Sparkles,
  Clock
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Roadmap data
const roadmapItems = [
  { day: 1, task: "Complete Skills Assessment", status: "completed", category: "Assessment" },
  { day: 2, task: "Resume ATS Optimization", status: "completed", category: "Resume" },
  { day: 3, task: "Array Patterns Practice", status: "completed", category: "DSA" },
  { day: 4, task: "SQL Fundamentals", status: "completed", category: "Database" },
  { day: 5, task: "String Manipulation", status: "completed", category: "DSA" },
  { day: 6, task: "Communication Assessment", status: "completed", category: "Soft Skills" },
  { day: 7, task: "Mock Interview #1", status: "in-progress", category: "Interview" },
  { day: 8, task: "SQL Window Functions", status: "pending", category: "Database" },
  { day: 9, task: "Graph Basics", status: "pending", category: "DSA" },
  { day: 10, task: "System Design Intro", status: "pending", category: "System Design" },
];

const eligibleCompanies = [
  { name: "TCS Digital", match: 92, logo: "🏢" },
  { name: "Infosys PP", match: 87, logo: "🏛️" },
  { name: "Wipro Elite", match: 85, logo: "🏗️" },
  { name: "Cognizant GenC", match: 81, logo: "🏬" },
  { name: "Capgemini", match: 78, logo: "🏣" },
];

const skillBreakdown = [
  { skill: "Data Structures", score: 72, category: "Technical" },
  { skill: "Algorithms", score: 68, category: "Technical" },
  { skill: "SQL/Database", score: 65, category: "Technical" },
  { skill: "Communication", score: 74, category: "Soft Skills" },
  { skill: "Problem Solving", score: 80, category: "Aptitude" },
  { skill: "Logical Reasoning", score: 85, category: "Aptitude" },
];

export const Onboarding = () => {
  const [resumeUploaded, setResumeUploaded] = useState(true);
  const atsScore = 82;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-display gradient-text">
          Your Placement Profile
        </h1>
        <p className="text-muted-foreground mt-1">
          AI-powered assessment and personalized roadmap
        </p>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* ATS Score Card */}
        <GlassCard className="col-span-4" delay={0.1} glow>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-display">Resume ATS Score</h2>
            <FileText className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex items-center justify-center py-6">
            <motion.div 
              className="relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <svg width="140" height="140" className="rotate-[-90deg]">
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="12"
                />
                <motion.circle
                  cx="70"
                  cy="70"
                  r="60"
                  fill="none"
                  stroke="url(#atsGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={377}
                  initial={{ strokeDashoffset: 377 }}
                  animate={{ strokeDashoffset: 377 - (377 * atsScore) / 100 }}
                  transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="atsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span 
                  className="text-4xl font-bold font-display neon-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {atsScore}
                </motion.span>
                <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
            </motion.div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-sm text-success">
              <CheckCircle2 className="w-4 h-4" />
              <span>Keywords optimized</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-success">
              <CheckCircle2 className="w-4 h-4" />
              <span>Format ATS-friendly</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-warning">
              <AlertTriangle className="w-4 h-4" />
              <span>Add more quantifiable achievements</span>
            </div>
          </div>
        </GlassCard>

        {/* Skills Assessment */}
        <GlassCard className="col-span-8" delay={0.2}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold font-display">Skills Assessment</h2>
              <p className="text-sm text-muted-foreground">Based on your profile and tests</p>
            </div>
            <NeonBadge variant="secondary">6 Skills Analyzed</NeonBadge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {skillBreakdown.map((skill, index) => (
              <motion.div
                key={skill.skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-4 rounded-lg bg-muted/30 border border-border/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <NeonBadge size="sm" variant={skill.score >= 75 ? "success" : skill.score >= 60 ? "default" : "warning"}>
                    {skill.category}
                  </NeonBadge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    />
                  </div>
                  <span className="text-sm font-bold text-primary">{skill.score}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Company Eligibility */}
        <GlassCard className="col-span-5" delay={0.3}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold font-display">Company Match</h2>
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          
          <div className="space-y-3">
            {eligibleCompanies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <span className="text-2xl">{company.logo}</span>
                <div className="flex-1">
                  <p className="font-medium">{company.name}</p>
                  <p className="text-xs text-muted-foreground">Eligibility based on profile</p>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${company.match >= 85 ? "text-success" : "text-primary"}`}>
                    {company.match}%
                  </span>
                  <p className="text-[10px] text-muted-foreground">Match</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* 21-Day Roadmap */}
        <GlassCard className="col-span-7" delay={0.4}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold font-display">21-Day Personalized Roadmap</h2>
              <p className="text-sm text-muted-foreground">AI-generated based on your gaps</p>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI Powered</span>
            </div>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                  item.status === "completed" 
                    ? "bg-success/10 border-success/30" 
                    : item.status === "in-progress"
                    ? "bg-primary/10 border-primary/30"
                    : "bg-muted/30 border-border/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  item.status === "completed"
                    ? "bg-success text-success-foreground"
                    : item.status === "in-progress"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {item.status === "completed" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : item.status === "in-progress" ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    item.day
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.task}</p>
                  <p className="text-xs text-muted-foreground">Day {item.day}</p>
                </div>
                <NeonBadge size="sm" variant={
                  item.status === "completed" ? "success" : 
                  item.status === "in-progress" ? "default" : "outline"
                }>
                  {item.category}
                </NeonBadge>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};