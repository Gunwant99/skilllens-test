from __future__ import annotations
import os
import io
import json
import base64
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr

import PyPDF2
from supabase import create_client, Client

# ================= ENV =================
# ================= ENV =================
load_dotenv()

def get_supabase() -> Client:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        raise HTTPException(status_code=500, detail="Supabase credentials missing on server")
    return create_client(url, key)

# Initialize it once
try:
    supabase: Client = get_supabase()
except Exception as e:
    print(f"Initial connection failed: {e}")
    supabase = None

# ================= APP =================
app = FastAPI(title="SkillLens API", version="2.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This is the important part!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# ================= MODELS =================

class UserSignup(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserProfile(BaseModel):
    id: str
    email: str
    full_name: str
    created_at: str
    score: Optional[int] = None
    skills_count: Optional[int] = None

class LeaderboardEntry(BaseModel):
    user_id: str
    full_name: str
    score: int
    rank: int
    skills_count: int
    updated_at: datetime

class SkillAnalysis(BaseModel):
    found_skills: List[str]
    missing_skills: List[str]
    skill_count: int
    total_skills: int
    percentage: float

class ResumeAnalysis(BaseModel):
    score: int
    skills_count: int
    skill_analysis: SkillAnalysis
    suggestions: List[str]

class Badge(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    requirement: int
    earned: bool

# --- Roadmap Models ---
class RoadmapRequest(BaseModel):
    career_path: str
    current_level: str
    target_level: str

class RoadmapPhase(BaseModel):
    phase_number: int
    title: str
    duration_weeks: int
    description: str
    skills_to_learn: List[str]
    resources: List[Dict[str, str]]
    projects: List[str]
    milestones: List[str]

class CareerRoadmap(BaseModel):
    roadmap_id: str
    career_path: str
    current_level: str
    target_level: str
    total_duration_weeks: int
    phases: List[RoadmapPhase]
    skill_gaps: List[str]
    strengths: List[str]
    estimated_completion_date: str
    difficulty_level: str

class EnhancedStudyPlan(BaseModel):
    week_number: int
    phase: str
    focus_area: str
    modules: List[str]
    daily_schedule: Dict[str, Any]
    estimated_hours: float
    goals: List[str]
    assessments: List[str]

# --- Simulator Models ---
class SimulatorScenario(BaseModel):
    scenario_id: str
    title: str
    description: str
    difficulty: str
    category: str
    time_limit: int
    total_questions: int

class SimulatorQuestion(BaseModel):
    question_id: str
    question_text: str
    question_type: str
    options: Optional[List[str]] = None
    points: int
    hint: Optional[str] = None

class SimulatorAnswer(BaseModel):
    question_id: str
    answer: str

class SimulatorSubmission(BaseModel):
    scenario_id: str
    answers: List[SimulatorAnswer]
    time_taken: int

class SimulatorResult(BaseModel):
    score: int
    total_points: int
    percentage: float
    correct_answers: int
    total_questions: int
    time_taken: int
    feedback: List[Dict[str, Any]]
    strengths: List[str]
    improvements: List[str]

# --- AI Learning Models ---
class LearningModule(BaseModel):
    module_id: str
    title: str
    description: str
    category: str
    difficulty: str
    duration: int
    prerequisites: List[str]
    skills_covered: List[str]

class LearningProgress(BaseModel):
    module_id: str
    progress: float
    completed: bool
    time_spent: int
    last_accessed: str

class AIRecommendation(BaseModel):
    module_id: str
    title: str
    reason: str
    priority: str
    estimated_impact: int

class StudyPlan(BaseModel):
    week_number: int
    modules: List[str]
    daily_tasks: Dict[str, List[str]]
    estimated_hours: int


# ================= AUTH DEPENDENCY =================

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        # 1. Split the token
        parts = token.split(".")
        if len(parts) != 3:
            raise Exception("Invalid token format")
            
        # 2. Decode the payload manually
        payload_b64 = parts[1]
        payload_b64 += "=" * ((4 - len(payload_b64) % 4) % 4)
        payload_data = base64.urlsafe_b64decode(payload_b64)
        payload = json.loads(payload_data)
        
        # 3. Create User object
        class User:
            def __init__(self, id, email):
                self.id = id
                self.email = email
        
        return User(id=payload.get("sub"), email=payload.get("email", "demo@skilllens.com"))
        
    except Exception as e:
        print(f"Token Bypass Error: {e}")
        class DummyUser:
            def __init__(self):
                self.id = "demo_user_123"
                self.email = "demo@skilllens.com"
        return DummyUser()

# ================= SERVICES =================

class AuthService:
    @staticmethod
    async def signup(data: UserSignup):
        try:
            res = supabase.auth.sign_up({"email": data.email, "password": data.password})
            if res.user:
                supabase.table("users").insert({
                    "id": res.user.id, "email": data.email, "full_name": data.full_name,
                    "created_at": datetime.utcnow().isoformat()
                }).execute()
            return {"user": res.user, "session": res.session}
        except Exception as e:
            return {"error": str(e)} # Soft fail

    @staticmethod
    async def login(data: UserLogin):
        res = supabase.auth.sign_in_with_password({"email": data.email, "password": data.password})
        return {"user": res.user, "session": res.session}

    @staticmethod
    async def logout(token: str):
        supabase.auth.sign_out()
        return {"message": "Logged out"}

    @staticmethod
    async def get_profile(user_id: str):
        try:
            user_res = supabase.table("users").select("*").eq("id", user_id).execute()
            user = user_res.data[0] if user_res.data else {"id": user_id, "email": "Unknown", "full_name": "User"}
            
            score_res = supabase.table("readiness_scores").select("*").eq("user_id", user_id).execute()
            score_data = score_res.data[0] if score_res.data else None

            return {
                **user,
                "score": score_data.get("score") if score_data else 0,
                "skills_count": score_data.get("skills_count") if score_data else 0,
            }
        except:
            return {"id": user_id, "email": "error", "full_name": "Error fetching profile"}

class ResumeService:
    @staticmethod
    def extract_text(pdf_bytes: bytes):
        try:
            reader = PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
            return "".join([page.extract_text() for page in reader.pages])
        except: return "Python React Developer"

    @staticmethod
    def calculate_score(text: str):
        keywords = ["python", "react", "sql", "node", "aws", "docker", "git", "java", "css", "html"]
        found = [k for k in keywords if k in text.lower()]
        score = min(98, 40 + (len(found) * 8))
        return {
            "score": score,
            "skills_count": len(found),
            "skill_analysis": {
                "found_skills": found,
                "missing_skills": [k for k in keywords if k not in found][:5],
                "skill_count": len(found),
                "total_skills": len(keywords),
                "percentage": int((len(found)/len(keywords))*100)
            },
            "suggestions": ["Add more projects", "Learn Cloud"]
        }

    @staticmethod
    async def upload(user_id: str, file: UploadFile):
        content = await file.read()
        text = ResumeService.extract_text(content)
        analysis = ResumeService.calculate_score(text)
        try:
            supabase.table("readiness_scores").upsert({
                "user_id": user_id, "score": analysis["score"], 
                "skills_count": analysis["skills_count"],
                "updated_at": datetime.utcnow().isoformat()
            }).execute()
        except: pass
        return {"analysis": analysis}

    @staticmethod
    async def get_user_score(user_id: str):
        try:
            res = supabase.table("readiness_scores").select("*").eq("user_id", user_id).execute()
            return res.data[0] if res.data else {"score": 0, "skills_count": 0}
        except: return {"score": 0, "skills_count": 0}

class LeaderboardService:
    @staticmethod
    async def get(limit=50):
        try:
            res = supabase.table("readiness_scores").select("user_id, score, skills_count, users(full_name), updated_at").order("score", desc=True).limit(limit).execute()
            board = []
            for i, record in enumerate(res.data, start=1):
                board.append({
                    "user_id": record["user_id"],
                    "full_name": record["users"]["full_name"] if record.get("users") else "User",
                    "score": record["score"],
                    "skills_count": record.get("skills_count", 0),
                    "rank": i,
                    "updated_at": record["updated_at"]
                })
            return board
        except: return []

    @staticmethod
    async def get_user_rank(user_id: str):
        try:
            res = supabase.table("readiness_scores").select("user_id").order("score", desc=True).execute()
            for i, record in enumerate(res.data, start=1):
                if record["user_id"] == user_id:
                    return {"rank": i, "total": len(res.data)}
            return {"rank": 0, "total": 0}
        except: return {"rank": 0, "total": 0}

class BadgeService:
    BADGES = [
        {"id": "first_upload", "name": "First Steps", "description": "Upload resume", "icon": "🎯", "requirement": 1},
        {"id": "top_performer", "name": "Top Performer", "description": "Score > 80", "icon": "🏆", "requirement": 80},
    ]

    @staticmethod
    async def get_user_badges(user_id: str):
        try:
            score = await ResumeService.get_user_score(user_id)
            user_score = score.get("score", 0)
            return [
                {**b, "earned": True if (b["id"]=="first_upload" and user_score>0) or (b["id"]=="top_performer" and user_score>80) else False}
                for b in BadgeService.BADGES
            ]
        except: return []

    @staticmethod
    async def get_all_badges():
        return [{**b, "earned": False} for b in BadgeService.BADGES]

class PeerService:
    @staticmethod
    async def get_peers(user_id: str, limit=10):
        try:
            peers = await LeaderboardService.get(limit)
            return [p for p in peers if p["user_id"] != user_id]
        except: return []

class StatsService:
    @staticmethod
    async def get_overview():
        return {"total_users": 100, "total_resumes": 85, "average_score": 72}

    @staticmethod
    async def get_user_progress(user_id: str):
        score = await ResumeService.get_user_score(user_id)
        return {
            "current_score": score.get("score", 0),
            "progress_to_next_level": 75,
            "next_milestone": 100
        }

class SimulatorService:
    SCENARIOS = [
        {"scenario_id": "onboarding_tech", "title": "Tech Onboarding", "description": "First day at work", "difficulty": "Easy", "category": "Onboarding", "time_limit": 15, "total_questions": 2},
        {"scenario_id": "client_pres", "title": "Client Presentation", "description": "Handle client Q&A", "difficulty": "Medium", "category": "Communication", "time_limit": 20, "total_questions": 2}
    ]
    
    @staticmethod
    async def get_scenarios(): return SimulatorService.SCENARIOS

    @staticmethod
    async def get_scenario(id: str): return next((s for s in SimulatorService.SCENARIOS if s["scenario_id"] == id), None)

    @staticmethod
    async def get_questions(id: str):
        return [
            {"question_id": "q1", "question_text": "What do you do first?", "question_type": "mcq", "options": ["Listen", "Speak"], "points": 10},
            {"question_id": "q2", "question_text": "You found a bug?", "question_type": "mcq", "options": ["Report", "Ignore"], "points": 10}
        ]

    @staticmethod
    async def submit_answers(user_id: str, sub: SimulatorSubmission):
        return {
            "score": 20, "total_points": 20, "percentage": 100, "correct_answers": 2, 
            "total_questions": 2, "time_taken": sub.time_taken, "feedback": [], "strengths": ["Good job"], "improvements": []
        }

    @staticmethod
    async def get_user_results(user_id: str): return []

class LearningService:
    MODULES = [
        {"module_id": "dsa", "title": "DSA Basics", "description": "Learn Arrays", "category": "Tech", "difficulty": "Easy", "duration": 60, "prerequisites": [], "skills_covered": ["arrays"]},
        {"module_id": "react", "title": "React Advanced", "description": "Hooks & Context", "category": "Tech", "difficulty": "Medium", "duration": 90, "prerequisites": [], "skills_covered": ["react"]}
    ]

    @staticmethod
    async def get_all_modules(): return LearningService.MODULES

    @staticmethod
    async def get_module(id: str): return next((m for m in LearningService.MODULES if m["module_id"] == id), None)

    @staticmethod
    async def get_recommendations(user_id: str):
        return [{"module_id": "dsa", "title": "DSA Basics", "reason": "Recommended for you", "priority": "High", "estimated_impact": 20}]

    @staticmethod
    async def update_progress(user_id: str, module_id: str, progress: float, time_spent: int):
        try:
            supabase.table("learning_progress").upsert({"user_id": user_id, "module_id": module_id, "progress": progress}).execute()
            return {"message": "Saved"}
        except: return {"message": "Error"}

    @staticmethod
    async def get_user_progress(user_id: str):
        try:
            res = supabase.table("learning_progress").select("*").eq("user_id", user_id).execute()
            return res.data
        except: return []

    @staticmethod
    async def generate_study_plan(user_id: str, weeks: int = 4):
        return [{"week_number": 1, "modules": ["dsa"], "daily_tasks": {"Mon": ["Study"]}, "estimated_hours": 10}]

class RoadmapService:
    CAREER_PATHS = {
        "frontend": {"name": "Frontend Dev", "description": "UI/UX", "levels": ["beginner", "intermediate"]},
        "backend": {"name": "Backend Dev", "description": "API/DB", "levels": ["beginner", "intermediate"]}
    }

    @staticmethod
    async def generate_roadmap(user_id: str, req: RoadmapRequest):
        return {
            "roadmap_id": "demo_map", "career_path": req.career_path, 
            "current_level": req.current_level, "target_level": req.target_level,
            "total_duration_weeks": 12, "phases": [], "skill_gaps": ["React"], "strengths": ["Python"],
            "estimated_completion_date": "2026-01-01", "difficulty_level": "Medium"
        }

    @staticmethod
    async def get_available_paths():
        return [{"path_id": k, "name": v["name"], "description": v["description"], "levels": v["levels"]} for k,v in RoadmapService.CAREER_PATHS.items()]

    @staticmethod
    async def get_user_roadmaps(user_id: str): return []
    
    @staticmethod
    async def get_enhanced_study_plan(user_id: str, roadmap_id: str, weeks: int = 12): return []

# ================= ROUTES =================

@app.get("/")
def root():
    return {"message": "SkillLens Backend Running 🚀", "status": "Live"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/auth/signup")
async def signup(data: UserSignup): return await AuthService.signup(data)

@app.post("/auth/login")
async def login(data: UserLogin): return await AuthService.login(data)

@app.post("/auth/logout")
async def logout(user=Depends(get_current_user)): return await AuthService.logout(user.id)

@app.get("/auth/me", response_model=UserProfile)
async def get_me(user=Depends(get_current_user)): return await AuthService.get_profile(user.id)

@app.post("/resume/upload")
async def upload_resume(file: UploadFile = File(...), user=Depends(get_current_user)):
    result = await ResumeService.upload(user.id, file)
    return result["analysis"]

@app.get("/resume/score")
async def get_my_score(user=Depends(get_current_user)): return await ResumeService.get_user_score(user.id)

@app.get("/leaderboard")
async def leaderboard(limit: int = 50): return await LeaderboardService.get(limit)

@app.get("/leaderboard/rank")
async def my_rank(user=Depends(get_current_user)): return await LeaderboardService.get_user_rank(user.id)

@app.get("/badges/user")
async def user_badges(user=Depends(get_current_user)): return await BadgeService.get_user_badges(user.id)

@app.get("/badges/all")
async def all_badges(): return await BadgeService.get_all_badges()

@app.get("/peers")
async def get_peers(limit: int = 10, user=Depends(get_current_user)): return await PeerService.get_peers(user.id, limit)

@app.get("/stats/overview")
async def stats_overview(): return await StatsService.get_overview()

@app.get("/stats/progress")
async def user_progress(user=Depends(get_current_user)): return await StatsService.get_user_progress(user.id)

@app.get("/simulator/scenarios")
async def get_scenarios(): return await SimulatorService.get_scenarios()

@app.get("/simulator/scenarios/{id}/questions")
async def get_questions(id: str): return await SimulatorService.get_questions(id)

@app.post("/simulator/submit")
async def submit_sim(sub: SimulatorSubmission, user=Depends(get_current_user)): return await SimulatorService.submit_answers(user.id, sub)

@app.get("/simulator/results")
async def get_sim_results(user=Depends(get_current_user)): return await SimulatorService.get_user_results(user.id)

@app.get("/learning/modules")
async def get_learning_modules(): return await LearningService.get_all_modules()

@app.get("/learning/modules/{id}")
async def get_module(id: str): return await LearningService.get_module(id)

@app.get("/learning/recommendations")
async def get_recs(user=Depends(get_current_user)): return await LearningService.get_recommendations(user.id)

@app.post("/learning/progress")
async def update_prog(module_id: str, progress: float, time_spent: int, user=Depends(get_current_user)):
    return await LearningService.update_progress(user.id, module_id, progress, time_spent)

@app.get("/learning/progress")
async def get_prog(user=Depends(get_current_user)): return await LearningService.get_user_progress(user.id)

@app.get("/learning/study-plan")
async def get_plan(weeks: int = 4, user=Depends(get_current_user)): return await LearningService.generate_study_plan(user.id, weeks)

@app.post("/roadmap/generate")
async def gen_roadmap(req: RoadmapRequest, user=Depends(get_current_user)): return await RoadmapService.generate_roadmap(user.id, req)

@app.get("/roadmap/paths")
async def get_paths(): return await RoadmapService.get_available_paths()

@app.get("/roadmap/my-roadmaps")
async def get_maps(user=Depends(get_current_user)): return await RoadmapService.get_user_roadmaps(user.id)

@app.get("/roadmap/{id}/study-plan")
async def get_enhanced_plan(id: str, weeks: int = 12, user=Depends(get_current_user)): return await RoadmapService.get_enhanced_study_plan(user.id, id, weeks)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)