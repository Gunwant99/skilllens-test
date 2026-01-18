import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { Simulator } from "@/components/simulator/Simulator";
import { CompanyPatterns } from "@/components/patterns/CompanyPatterns";
import { PeerInsights } from "@/components/peers/PeerInsights";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { AILearning } from "@/components/learning/AILearning";
import { Badges } from "@/components/badges/Badges";

const Index = () => {
  const [currentPath, setCurrentPath] = useState("/");

  const renderPage = () => {
    switch (currentPath) {
      case "/":
        return <Dashboard />;
      case "/onboarding":
        return <Onboarding />;
      case "/simulator":
        return <Simulator />;
      case "/patterns":
        return <CompanyPatterns />;
      case "/peers":
        return <PeerInsights />;
      case "/leaderboard":
        return <Leaderboard />;
      case "/learning":
        return <AILearning />;
      case "/badges":
        return <Badges />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout currentPath={currentPath} onNavigate={setCurrentPath}>
      {renderPage()}
    </AppLayout>
  );
};

export default Index;