import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonBadge } from "@/components/ui/NeonBadge";
import { 
  Building2, 
  Search, 
  TrendingUp,
  FileText,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  BarChart3,
  ChevronRight,
  Code,
  Database,
  Brain,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Company {
  id: string;
  name: string;
  logo: string;
  category: string;
  aptitudeMatch: number;
  patterns: {
    tech1: string[];
    tech2: string[];
    hr: string[];
  };
  recentYears: string[];
  rejectionReasons: string[];
}

const companies: Company[] = [
  {
    id: "tcs-digital",
    name: "TCS Digital",
    logo: "🏢",
    category: "Product",
    aptitudeMatch: 82,
    patterns: {
      tech1: ["Array & String", "SQL Queries", "OOP Concepts"],
      tech2: ["Graph Algorithms", "System Design", "DP Problems"],
      hr: ["Why TCS?", "Leadership Examples", "Career Goals"],
    },
    recentYears: ["2025", "2024", "2023"],
    rejectionReasons: ["Poor communication", "Weak DSA", "Time management"],
  },
  {
    id: "infosys-pp",
    name: "Infosys Power Programmer",
    logo: "🏛️",
    category: "Service",
    aptitudeMatch: 78,
    patterns: {
      tech1: ["CodeVita Patterns", "Complex Logic", "Pattern Recognition"],
      tech2: ["Advanced DSA", "Optimization", "Code Quality"],
      hr: ["Innovation mindset", "Team collaboration", "Problem solving approach"],
    },
    recentYears: ["2025", "2024", "2023"],
    rejectionReasons: ["Low CodeVita score", "Syntax errors", "Incomplete solutions"],
  },
  {
    id: "wipro-elite",
    name: "Wipro Elite",
    logo: "🏗️",
    category: "Service",
    aptitudeMatch: 85,
    patterns: {
      tech1: ["Basic DSA", "SQL Fundamentals", "Java/Python Basics"],
      tech2: ["Project Discussion", "OOPS Deep Dive", "Database Design"],
      hr: ["Relocation flexibility", "Work-life balance", "Learning attitude"],
    },
    recentYears: ["2025", "2024", "2023"],
    rejectionReasons: ["Poor aptitude score", "Weak fundamentals", "Communication gap"],
  },
  {
    id: "cognizant-genc",
    name: "Cognizant GenC",
    logo: "🏬",
    category: "Service",
    aptitudeMatch: 80,
    patterns: {
      tech1: ["Coding fundamentals", "Logic building", "Basic algorithms"],
      tech2: ["Project walkthrough", "Technical depth", "Scalability thinking"],
      hr: ["Career aspirations", "Why Cognizant", "Handling pressure"],
    },
    recentYears: ["2025", "2024", "2023"],
    rejectionReasons: ["Lack of projects", "Weak coding", "Poor presentation"],
  },
];

export const CompanyPatterns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(companies[0]);

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Company Pattern Library
          </h1>
          <p className="text-muted-foreground mt-1">
            Historical patterns and rejection analysis for top companies
          </p>
        </div>
        <NeonBadge variant="secondary" size="lg">
          <Building2 className="w-4 h-4 mr-2" />
          {companies.length} Companies
        </NeonBadge>
      </motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Company List */}
        <div className="col-span-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search companies..." 
              className="pl-10 bg-muted/50 border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCompany(company)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedCompany?.id === company.id
                    ? "glass-card border-primary/50 neon-glow"
                    : "glass-card-hover"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{company.logo}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{company.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <NeonBadge size="sm" variant="outline">{company.category}</NeonBadge>
                      <span className="text-xs text-muted-foreground">
                        {company.aptitudeMatch}% match
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-colors ${
                    selectedCompany?.id === company.id ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Company Details */}
        {selectedCompany && (
          <motion.div 
            key={selectedCompany.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-8 space-y-4"
          >
            {/* Company Header */}
            <GlassCard glow>
              <div className="flex items-center gap-6">
                <div className="text-6xl">{selectedCompany.logo}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold font-display">{selectedCompany.name}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <NeonBadge variant="secondary">{selectedCompany.category}</NeonBadge>
                    <NeonBadge variant="success">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {selectedCompany.aptitudeMatch}% Aptitude Match
                    </NeonBadge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Available Papers</p>
                  <div className="flex gap-1 mt-1">
                    {selectedCompany.recentYears.map(year => (
                      <NeonBadge key={year} size="sm" variant="outline">{year}</NeonBadge>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Pattern Breakdown */}
            <div className="grid grid-cols-3 gap-4">
              {/* Tech 1 */}
              <GlassCard delay={0.1}>
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold font-display">Tech Round 1</h3>
                </div>
                <div className="space-y-2">
                  {selectedCompany.patterns.tech1.map((pattern, i) => (
                    <motion.div
                      key={pattern}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/30"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm">{pattern}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Tech 2 */}
              <GlassCard delay={0.2}>
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-5 h-5 text-secondary" />
                  <h3 className="font-semibold font-display">Tech Round 2</h3>
                </div>
                <div className="space-y-2">
                  {selectedCompany.patterns.tech2.map((pattern, i) => (
                    <motion.div
                      key={pattern}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/30"
                    >
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                      <span className="text-sm">{pattern}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* HR */}
              <GlassCard delay={0.3}>
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-success" />
                  <h3 className="font-semibold font-display">HR Round</h3>
                </div>
                <div className="space-y-2">
                  {selectedCompany.patterns.hr.map((pattern, i) => (
                    <motion.div
                      key={pattern}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/30"
                    >
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span className="text-sm">{pattern}</span>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Rejection Analysis */}
            <GlassCard delay={0.4}>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h3 className="font-semibold font-display">Common Rejection Reasons</h3>
              </div>
              <div className="flex gap-3">
                {selectedCompany.rejectionReasons.map((reason, i) => (
                  <motion.div
                    key={reason}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex-1 p-4 rounded-lg bg-destructive/10 border border-destructive/30"
                  >
                    <p className="text-sm font-medium text-center">{reason}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
};