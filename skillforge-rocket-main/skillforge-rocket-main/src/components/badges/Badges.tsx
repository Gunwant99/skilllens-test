import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Medal,
  Trophy,
  Star,
  Shield,
  Zap,
  Target,
  MessageSquare,
  Share2,
  Download,
  Lock,
  CheckCircle2
} from "lucide-react";

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface Certificate {
  id: string;
  title: string;
  company: string;
  description: string;
  earnedDate: string;
  verified: boolean;
}

const badges: Badge[] = [
  { id: "1", name: "TCS Digital Survivor", icon: "🏆", description: "Survived all 4 rounds of TCS Digital simulation", earned: true, earnedDate: "Jan 10, 2026", rarity: "legendary" },
  { id: "2", name: "Tech2 Beast", icon: "⚡", description: "Passed Tech Round 2 with 90%+ score", earned: true, earnedDate: "Jan 8, 2026", rarity: "epic" },
  { id: "3", name: "Communication Pro", icon: "💬", description: "Achieved 80%+ communication score", earned: true, earnedDate: "Jan 5, 2026", rarity: "rare" },
  { id: "4", name: "Day-0 Ready", icon: "🎯", description: "Reached 75%+ placement readiness", earned: true, earnedDate: "Jan 12, 2026", rarity: "epic" },
  { id: "5", name: "DSA Master", icon: "🧠", description: "Solved 100+ DSA problems", earned: false, rarity: "legendary" },
  { id: "6", name: "Quick Thinker", icon: "⏱️", description: "Average response time under 2 seconds", earned: false, rarity: "rare" },
  { id: "7", name: "Zero Fillers", icon: "🎤", description: "Complete an interview with 0 filler words", earned: false, rarity: "legendary" },
  { id: "8", name: "First Blood", icon: "🔥", description: "Complete your first simulation", earned: true, earnedDate: "Jan 1, 2026", rarity: "common" },
];

const certificates: Certificate[] = [
  { id: "1", title: "Placement Ready Certified", company: "SkillLens", description: "Demonstrated comprehensive placement readiness across technical and soft skills", earnedDate: "Jan 12, 2026", verified: true },
  { id: "2", title: "TCS Digital Simulation Survivor", company: "Capgemini GenC", description: "Successfully navigated all 4 rounds of company-specific placement simulation", earnedDate: "Jan 10, 2026", verified: true },
];

const rarityColors = {
  common: "from-gray-400 to-gray-500",
  rare: "from-blue-400 to-blue-600",
  epic: "from-purple-400 to-purple-600",
  legendary: "from-yellow-400 to-orange-500",
};

const rarityBorder = {
  common: "border-gray-400/50",
  rare: "border-blue-400/50",
  epic: "border-purple-400/50",
  legendary: "border-yellow-400/50",
};

export const Badges = () => {
  const earnedCount = badges.filter(b => b.earned).length;

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
            Badges & Certificates
          </h1>
          <p className="text-muted-foreground mt-1">
            Showcase your achievements and share with recruiters
          </p>
        </div>
        <div className="flex items-center gap-4">
          <NeonBadge variant="success" size="lg">
            <Award className="w-4 h-4 mr-2" />
            {earnedCount}/{badges.length} Earned
          </NeonBadge>
        </div>
      </motion.div>

      {/* Badges Grid */}
      <div>
        <h2 className="text-lg font-semibold font-display mb-4">Achievement Badges</h2>
        <div className="grid grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`relative p-6 rounded-xl border-2 transition-all ${
                badge.earned
                  ? `glass-card ${rarityBorder[badge.rarity]}`
                  : "bg-muted/20 border-border/30 opacity-50"
              }`}
            >
              {/* Rarity indicator */}
              <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r ${rarityColors[badge.rarity]}`} />
              
              <div className="text-center">
                <motion.div
                  className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl ${
                    badge.earned
                      ? `bg-gradient-to-br ${rarityColors[badge.rarity]}/20`
                      : "bg-muted"
                  }`}
                  initial={{ rotate: 0 }}
                  animate={badge.earned ? { rotate: [0, -10, 10, 0] } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  {badge.earned ? badge.icon : <Lock className="w-6 h-6 text-muted-foreground" />}
                </motion.div>
                
                <h3 className="font-semibold text-sm mb-1">{badge.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                
                <NeonBadge size="sm" variant={
                  badge.rarity === "legendary" ? "warning" :
                  badge.rarity === "epic" ? "secondary" :
                  badge.rarity === "rare" ? "default" : "outline"
                }>
                  {badge.rarity}
                </NeonBadge>

                {badge.earnedDate && (
                  <p className="text-[10px] text-muted-foreground mt-2">
                    Earned: {badge.earnedDate}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div>
        <h2 className="text-lg font-semibold font-display mb-4">LinkedIn Certificates</h2>
        <div className="grid grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <GlassCard key={cert.id} delay={0.2 + index * 0.1} glow>
              {/* Certificate Design */}
              <div className="relative p-6 rounded-xl bg-gradient-to-br from-muted/50 to-background border border-border/50">
                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50" />

                <div className="text-center py-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <Award className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Certificate of Achievement</p>
                  <h3 className="text-xl font-bold font-display gradient-text mb-2">{cert.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {cert.verified && (
                      <NeonBadge variant="success" size="sm">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </NeonBadge>
                    )}
                    <span className="text-xs text-muted-foreground">{cert.earnedDate}</span>
                  </div>

                  <p className="text-sm font-medium">Issued by SkillLens</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share to LinkedIn
                </Button>
                <Button variant="outline" className="border-border">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Locked Features Preview */}
      <GlassCard delay={0.4}>
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-muted/50">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold font-display">Recruiter Chat Unlock</h3>
            <p className="text-sm text-muted-foreground">
              Reach Top 5 in leaderboard to unlock direct recruiter messaging
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Rank</p>
            <p className="text-2xl font-bold text-primary">#7</p>
          </div>
          <Button variant="outline" disabled className="border-border">
            <Lock className="w-4 h-4 mr-2" />
            Locked
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};