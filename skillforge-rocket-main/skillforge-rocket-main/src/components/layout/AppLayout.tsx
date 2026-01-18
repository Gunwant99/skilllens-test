import { ReactNode, useState } from "react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Sidebar } from "./Sidebar";
import { motion } from "framer-motion";

interface AppLayoutProps {
  children: ReactNode;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const AppLayout = ({ 
  children, 
  currentPath = "/", 
  onNavigate = () => {} 
}: AppLayoutProps) => {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
      <main className="ml-64 min-h-screen relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};