import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Upload, FileText, CheckCircle2, Sparkles, ArrowRight, Users, 
  TrendingUp, Target, Zap, Brain, ChevronDown, AlertCircle 
} from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { useAuth, API_URL } from "@/hooks/useAuth"; // Import API_URL and auth hook

type UploadState = "idle" | "hover" | "uploading" | "success" | "error";
type AnalysisStep = "parsing" | "extracting" | "calculating" | "generating" | "complete";

const ResumeAnalysis = () => {
  const navigate = useNavigate();
  const { token } = useAuth(); // Get the auth token for API calls
  
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState<AnalysisStep>("parsing");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // REAL DATA STATES
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [roadmapData, setRoadmapData] = useState<any>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const analysisSteps = [
    { key: "parsing", label: "Parsing resume...", icon: FileText },
    { key: "extracting", label: "Extracting skills...", icon: Brain },
    { key: "calculating", label: "Calculating ATS score...", icon: Target },
    { key: "generating", label: "Generating roadmap...", icon: Sparkles },
  ];

  // --- REAL UPLOAD LOGIC ---
  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    setUploadState("uploading");
    setUploadProgress(10); // Start progress

    try {
      // 1. Prepare Form Data
      const formData = new FormData();
      formData.append("file", file);

      // 2. Upload to Python Backend
      setUploadProgress(40);
      const response = await fetch(`${API_URL}/resume/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}` // Send the JWT token
        },
        body: formData
      });

      if (!response.ok) throw new Error("Upload failed");

      setUploadProgress(80);
      const data = await response.json();
      setAnalysisData(data); // Save the analysis result
      
      setUploadProgress(100);
      setUploadState("success");
      
      // 3. Start the Visual Sequence & Generate Roadmap
      setTimeout(() => startRealAnalysisFlow(), 500);

    } catch (error) {
      console.error("Upload error:", error);
      setUploadState("error");
      setErrorMessage("Failed to analyze resume. Please try again.");
    }
  };

  const startRealAnalysisFlow = async () => {
    setAnalysisStarted(true);
    
    // VISUAL SEQUENCE: Parsing -> Extracting -> Calculating
    setCurrentStep("parsing");
    await new Promise(r => setTimeout(r, 1500));
    
    setCurrentStep("extracting");
    await new Promise(r => setTimeout(r, 1500));
    
    setCurrentStep("calculating");
    await new Promise(r => setTimeout(r, 1500));

    // FETCH ROADMAP WHILE ANIMATING
    setCurrentStep("generating");
    try {
      const roadmapRes = await fetch(`${API_URL}/roadmap/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        // Sending default preferences for the Hackathon demo
        body: JSON.stringify({
          career_path: "fullstack",
          current_level: "beginner",
          target_level: "intermediate"
        })
      });
      
      const roadmap = await roadmapRes.json();
      setRoadmapData(roadmap);
      
    } catch (e) {
      console.error("Roadmap error:", e);
    }
    
    setCurrentStep("complete");
    setAnalysisComplete(true);
    
    // Scroll to results
    setTimeout(() => {
        document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  // --- DRAG & DROP HANDLERS ---
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      handleFileUpload(file);
    } else {
        setUploadState("error");
        setErrorMessage("Please upload a PDF file.");
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (uploadState !== "uploading") setUploadState("hover");
  }, [uploadState]);

  const handleDragLeave = useCallback(() => {
    if (uploadState !== "uploading") setUploadState("idle");
  }, [uploadState]);

  const handleFileSelect = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileUpload(file);
    };
    input.click();
  }, []);

  // Use real data or fallbacks
  const displaySkills = analysisData?.skill_analysis?.found_skills || ["React", "Python"];
  const displayStrengths = analysisData?.skill_analysis?.found_skills?.slice(0, 3).map((s:string) => `Proficient in ${s}`) || ["Good Foundation"];
  const displayGaps = analysisData?.skill_analysis?.missing_skills?.slice(0, 3) || ["Advanced System Design"];
  const atsScore = analysisData?.score || 0;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <h1 onClick={() => navigate("/welcome")} className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent cursor-pointer">
            SkillLens
          </h1>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <div className={`w-2 h-2 rounded-full ${token ? 'bg-success' : 'bg-red-500'} animate-pulse`} />
            <span>{token ? 'System Online' : 'Connecting...'}</span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center px-6">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center max-w-4xl mx-auto">
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold text-white mb-6">
              Upload Your Resume. <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">Get Your Roadmap.</span>
            </motion.h2>
            <motion.div variants={itemVariants} className="flex justify-center">
              <button onClick={() => document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" })} className="py-4 px-8 bg-primary rounded-xl font-bold text-white hover:bg-primary/80 transition-all flex items-center gap-2">
                <Upload className="w-5 h-5" /> Start Analysis
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* Upload Section */}
        <section id="upload-section" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="w-full max-w-2xl">
            <div 
                onDrop={handleDrop} 
                onDragOver={handleDragOver} 
                onDragLeave={handleDragLeave} 
                onClick={handleFileSelect}
                className={`relative p-12 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 backdrop-blur-xl ${uploadState === 'error' ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-white/5 hover:border-primary/50'}`}
            >
                <div className="flex flex-col items-center gap-6">
                    {uploadState === 'uploading' ? (
                         <div className="w-full max-w-xs text-center">
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} className="h-full bg-primary rounded-full" />
                            </div>
                            <p className="text-white/60">Uploading... {uploadProgress}%</p>
                         </div>
                    ) : (
                        <>
                            <Upload className={`w-16 h-16 ${uploadState === 'error' ? 'text-red-500' : 'text-primary'}`} />
                            <div className="text-center">
                                <p className="text-xl font-medium text-white mb-2">
                                    {uploadState === 'error' ? errorMessage : "Click to Upload Resume (PDF)"}
                                </p>
                                <p className="text-white/50">Supported format: PDF only</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
          </div>
        </section>

        {/* Analysis Loading Screen */}
        <AnimatePresence>
          {analysisStarted && !analysisComplete && (
             <section className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center">
                 <div className="text-center">
                    <div className="flex gap-4 mb-8">
                        {analysisSteps.map((step) => (
                            <div key={step.key} className={`p-4 rounded-xl border ${currentStep === step.key ? 'border-primary bg-primary/20 text-white' : 'border-white/10 text-white/40'}`}>
                                <step.icon className="w-6 h-6 mx-auto mb-2" />
                                <span className="text-xs">{step.label}</span>
                            </div>
                        ))}
                    </div>
                    <h3 className="text-2xl font-bold text-white animate-pulse">AI is processing your resume...</h3>
                 </div>
             </section>
          )}
        </AnimatePresence>

        {/* Results Section */}
        {analysisComplete && (
            <section id="results-section" className="min-h-screen px-6 py-20">
                <div className="max-w-6xl mx-auto">
                    
                    {/* Scores & Skills */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center">
                            <h3 className="text-2xl font-bold text-white mb-6">Placement Readiness Score</h3>
                            <ProgressRing value={atsScore} max={100} size={200} strokeWidth={15} color={atsScore > 70 ? "success" : "warning"} />
                            <p className="mt-4 text-white/60 text-center">Based on industry standards</p>
                        </div>
                        
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                            <h3 className="text-2xl font-bold text-white mb-6">Detected Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {displaySkills.map((skill: string, i: number) => (
                                    <span key={i} className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            
                            <h3 className="text-xl font-bold text-warning mt-8 mb-4">Missing Skills (Gap Analysis)</h3>
                            <div className="space-y-2">
                                {displayGaps.map((gap: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2 text-white/80">
                                        <AlertCircle className="w-4 h-4 text-warning" />
                                        <span>{gap}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Roadmap */}
                    {roadmapData && (
                        <div className="mt-16">
                             <div className="text-center mb-10">
                                <h3 className="text-3xl font-bold text-white">Your Personalized <span className="text-primary">Roadmap</span></h3>
                                <p className="text-white/60">Generated based on your missing skills</p>
                             </div>
                             
                             <div className="grid gap-6">
                                {roadmapData.phases?.map((phase: any, i: number) => (
                                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all flex md:flex-row flex-col gap-6 items-center">
                                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                                            {i + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-xl font-bold text-white mb-2">{phase.title}</h4>
                                            <p className="text-white/60 mb-3">{phase.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {phase.skills_to_learn.slice(0, 4).map((s: string) => (
                                                    <span key={s} className="text-xs px-2 py-1 bg-white/10 rounded">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">{phase.duration_weeks} Weeks</span>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    )}

                </div>
            </section>
        )}

      </div>
    </div>
  );
};

export default ResumeAnalysis;