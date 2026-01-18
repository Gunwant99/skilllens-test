import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { 
  Trophy, 
  Medal,
  Crown,
  TrendingUp,
  TrendingDown,
  Share2,
  Users,
  Zap,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  change: number;
  college: string;
  badges: string[];
}

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Priya Patel", avatar: "👩‍💻", score: 94, change: 2, college: "IIT Delhi", badges: ["🏆", "⚡", "🎯"] },
  { rank: 2, name: "Rahul Kumar", avatar: "👨‍💻", score: 91, change: -1, college: "NIT Trichy", badges: ["🏆", "💎"] },
  { rank: 3, name: "Sneha Reddy", avatar: "👩‍🎓", score: 89, change: 3, college: "BITS Pilani", badges: ["⚡", "🎯"] },
  { rank: 4, name: "Arjun Singh", avatar: "🧑‍💻", score: 87, change: 0, college: "VIT Vellore", badges: ["🎯"] },
  { rank: 5, name: "Kavya Sharma", avatar: "👩‍🔬", score: 85, change: 4, college: "DTU Delhi", badges: ["💎", "⚡"] },
  { rank: 6, name: "Vikram Joshi", avatar: "👨‍🎓", score: 83, change: -2, college: "IIIT Hyderabad", badges: ["🏆"] },
  { rank: 7, name: "You (Arjun M)", avatar: "🎯", score: 78, change: 12, college: "Your College", badges: ["⚡"] },
  { rank: 8, name: "Ananya Gupta", avatar: "👩‍💻", score: 76, change: 1, college: "SRM Chennai", badges: [] },
  { rank: 9, name: "Rohan Verma", avatar: "👨‍💻", score: 74, change: -3, college: "KIIT Bhubaneswar", badges: [] },
  { rank: 10, name: "Meera Nair", avatar: "👩‍🎓", score: 72, change: 5, college: "Manipal", badges: [] },
];

const skillBrackets = [
  { skill: "DSA Masters", count: 42, top: "Priya Patel" },
  { skill: "SQL Wizards", count: 38, top: "Rahul Kumar" },
  { skill: "System Designers", count: 25, top: "Sneha Reddy" },
  { skill: "Communication Pros", count: 56, top: "Kavya Sharma" },
];

export const Leaderboard = () => {
  const userRank = 7;
  const totalParticipants = 247;

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
            Competitive Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time rankings across your batch and college
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NeonBadge variant="success" size="lg" animate>
            <TrendingUp className="w-4 h-4 mr-2" />
            +12 positions this week
          </NeonBadge>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Share2 className="w-4 h-4 mr-2" />
            Share Rank
          </Button>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-4 py-8">
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="glass-card p-4 rounded-xl mb-2">
            <span className="text-4xl">{leaderboard[1].avatar}</span>
          </div>
          <div className="w-24 h-20 bg-gradient-to-t from-gray-400/30 to-gray-400/10 rounded-t-lg flex flex-col items-center justify-end pb-2">
            <Medal className="w-6 h-6 text-gray-400" />
            <p className="text-sm font-bold mt-1">2nd</p>
          </div>
          <p className="text-sm font-medium mt-2">{leaderboard[1].name}</p>
          <p className="text-xs text-muted-foreground">{leaderboard[1].score}%</p>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <div className="glass-card p-4 rounded-xl mb-2 neon-glow">
            <span className="text-5xl">{leaderboard[0].avatar}</span>
          </div>
          <div className="w-28 h-28 bg-gradient-to-t from-yellow-500/30 to-yellow-500/10 rounded-t-lg flex flex-col items-center justify-end pb-2">
            <Crown className="w-8 h-8 text-yellow-500" />
            <p className="text-lg font-bold mt-1">1st</p>
          </div>
          <p className="font-medium mt-2">{leaderboard[0].name}</p>
          <p className="text-sm text-primary font-bold">{leaderboard[0].score}%</p>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="glass-card p-4 rounded-xl mb-2">
            <span className="text-4xl">{leaderboard[2].avatar}</span>
          </div>
          <div className="w-24 h-16 bg-gradient-to-t from-amber-600/30 to-amber-600/10 rounded-t-lg flex flex-col items-center justify-end pb-2">
            <Medal className="w-6 h-6 text-amber-600" />
            <p className="text-sm font-bold mt-1">3rd</p>
          </div>
          <p className="text-sm font-medium mt-2">{leaderboard[2].name}</p>
          <p className="text-xs text-muted-foreground">{leaderboard[2].score}%</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Full Leaderboard */}
        <GlassCard className="col-span-8" delay={0.2}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold font-display">Full Rankings</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{totalParticipants} participants</span>
            </div>
          </div>

          <div className="space-y-2">
            {leaderboard.map((entry, index) => {
              const isUser = entry.rank === userRank;
              return (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    isUser
                      ? "bg-primary/20 border-2 border-primary/50 neon-glow"
                      : entry.rank <= 3
                      ? "glass-card"
                      : "bg-muted/30 border border-border/50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    entry.rank === 1 ? "bg-yellow-500/20 text-yellow-500" :
                    entry.rank === 2 ? "bg-gray-400/20 text-gray-400" :
                    entry.rank === 3 ? "bg-amber-600/20 text-amber-600" :
                    isUser ? "bg-primary/20 text-primary" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {entry.rank <= 3 ? (
                      entry.rank === 1 ? <Crown className="w-5 h-5" /> :
                      <Medal className="w-5 h-5" />
                    ) : (
                      `#${entry.rank}`
                    )}
                  </div>
                  
                  <span className="text-2xl">{entry.avatar}</span>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${isUser ? "text-primary" : ""}`}>
                        {entry.name}
                      </p>
                      {isUser && <NeonBadge size="sm" variant="default">You</NeonBadge>}
                    </div>
                    <p className="text-xs text-muted-foreground">{entry.college}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    {entry.badges.map((badge, i) => (
                      <span key={i} className="text-lg">{badge}</span>
                    ))}
                  </div>

                  <div className="text-right">
                    <p className={`text-lg font-bold ${isUser ? "text-primary neon-text" : ""}`}>
                      {entry.score}%
                    </p>
                    <div className={`flex items-center justify-end gap-1 text-xs ${
                      entry.change > 0 ? "text-success" : entry.change < 0 ? "text-destructive" : "text-muted-foreground"
                    }`}>
                      {entry.change > 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : entry.change < 0 ? (
                        <TrendingDown className="w-3 h-3" />
                      ) : null}
                      <span>{entry.change > 0 ? `+${entry.change}` : entry.change === 0 ? "—" : entry.change}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </GlassCard>

        {/* Skill Brackets */}
        <div className="col-span-4 space-y-4">
          <GlassCard delay={0.3}>
            <h3 className="text-lg font-semibold font-display mb-4">Skill-Based Brackets</h3>
            <div className="space-y-3">
              {skillBrackets.map((bracket, index) => (
                <motion.div
                  key={bracket.skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{bracket.skill}</span>
                    <NeonBadge size="sm" variant="outline">{bracket.count}</NeonBadge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leader: <span className="text-primary">{bracket.top}</span>
                  </p>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Share Card */}
          <GlassCard delay={0.4} glow>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center mb-4">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-bold font-display text-xl mb-1">Rank #7</h3>
              <p className="text-sm text-muted-foreground mb-4">Top 3% of your batch!</p>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Share2 className="w-4 h-4 mr-2" />
                Share on WhatsApp
              </Button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
