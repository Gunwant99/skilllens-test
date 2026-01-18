import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Upload, BarChart3, Sparkles, Target, TrendingUp, Zap, LogOut, File, UploadCloud } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useState, useRef } from "react";

const Welcome = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // ── Resume Upload State ───────────────────────────────
  const [isDragging, setIsDragging] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      toast.success(`Resume selected: ${file.name}`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setResumeFile(file);
      toast.success(`Resume dropped: ${file.name}`);
    }
  };

  const stats = [
    { label: "Students Placed", value: "12,847", icon: Target },
    { label: "Avg. Score Boost", value: "+55%", icon: TrendingUp },
    { label: "Companies Covered", value: "200+", icon: Zap },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] } },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 flex justify-between items-center"
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            SkillLens
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>AI Online</span>
            </div>
            {user && (
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all text-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            )}
          </div>
        </motion.header>

        {/* Main Content */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 flex flex-col items-center justify-center px-6 pb-20"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Placement Intelligence</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              From Resume to{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Day-0 Ready
              </span>
              <br />
              Powered by AI
            </h2>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              SkillLens simulates real campus placements, tracks your survival rate, 
              and proves your readiness with data-backed insights.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-xl mb-6"
          >
            <motion.button
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 group relative py-4 px-8 bg-gradient-to-r from-primary via-accent to-secondary rounded-xl font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Start My Journey</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-4 px-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <BarChart3 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span>View My Readiness</span>
            </motion.button>
          </motion.div>

          {/* ── Modern Dropbox-style Resume Upload Zone ── */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            className={`
              w-full max-w-xl rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300
              ${isDragging
                ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
                : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10"
              }
            `}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />

            {resumeFile ? (
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-accent/10 rounded-full">
                  <File className="w-10 h-10 text-accent" />
                </div>
                <div className="space-y-1 max-w-[90%]">
                  <p className="font-medium text-lg text-white truncate">
                    {resumeFile.name}
                  </p>
                  <p className="text-sm text-white/60">
                    {(resumeFile.size / 1024 / 1024).toFixed(1)} MB • Uploaded
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <UploadCloud
                  className={`w-14 h-14 mx-auto transition-all ${
                    isDragging ? "text-accent scale-110" : "text-white/60"
                  }`}
                />
                <div>
                  <p className="text-xl font-medium text-white">
                    {isDragging ? "Drop your resume here" : "Drop your resume here"}
                  </p>
                  <p className="mt-2 text-white/60 text-sm">
                    or click to browse • PDF, DOC, DOCX
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.main>

        {/* Bottom Glow Effect & Floating Elements remain the same */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-primary/20 via-accent/10 to-transparent blur-3xl pointer-events-none" />

        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/10 blur-2xl pointer-events-none"
        />
        {/* ... other floating elements ... */}
      </div>
    </div>
  );
};

export default Welcome;