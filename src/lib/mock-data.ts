export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  lessons: number;
  progress: number;
  icon: string;
  color: "cyan" | "purple" | "defense" | "attack" | "gold";
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  lessons: number;
  difficulty: Difficulty;
  estimatedMinutes: number;
  category: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  unlocked: boolean;
  progress: number;
  icon: string;
}

export interface AttackCard {
  id: string;
  name: string;
  vector: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  description: string;
  defenses: string[]; // ids of defenses that counter it
}

export interface DefenseCard {
  id: string;
  name: string;
  category: string;
  description: string;
}

const missionModules = import.meta.glob('../content/missions/*.json', { eager: true });
const loadedMissions = Object.values(missionModules).map((m: any) => m.default || m);

export const learningPaths: LearningPath[] = [
  { id: "owasp", title: "OWASP Top 10", description: "Master the most critical web app security risks.", difficulty: "Intermediate", lessons: 24, progress: 62, icon: "ShieldAlert", color: "cyan" },
  { id: "web", title: "Web Security", description: "From XSS to CSRF — secure the modern web.", difficulty: "Beginner", lessons: 18, progress: 40, icon: "Globe", color: "purple" },
  { id: "api", title: "API Security", description: "Protect REST & GraphQL surfaces against abuse.", difficulty: "Advanced", lessons: 20, progress: 15, icon: "Cable", color: "defense" },
  { id: "cloud", title: "Cloud Security", description: "Lock down AWS, GCP and Azure misconfigurations.", difficulty: "Advanced", lessons: 22, progress: 8, icon: "Cloud", color: "gold" },
  { id: "auth", title: "Authentication Security", description: "Sessions, tokens, MFA — done right.", difficulty: "Intermediate", lessons: 16, progress: 78, icon: "KeyRound", color: "attack" },
];

export const decks: Deck[] = loadedMissions.map((m: any) => ({
  id: m.id,
  title: m.title,
  description: m.description,
  lessons: m.lessons,
  difficulty: m.difficulty,
  estimatedMinutes: m.estimatedMinutes,
  category: m.category,
  tags: m.tags,
}));



export const achievements: Achievement[] = [
  { id: "first-defense", title: "First Defense", description: "Complete your first mission.", rarity: "Common", unlocked: false, progress: 0, icon: "Shield" },
  { id: "threat-hunter", title: "Threat Hunter", description: "Complete 5 missions.", rarity: "Rare", unlocked: false, progress: 0, icon: "Target" },
  { id: "owasp-explorer", title: "OWASP Explorer", description: "Complete the OWASP path.", rarity: "Epic", unlocked: false, progress: 0, icon: "Compass" },
  { id: "api-guardian", title: "API Guardian", description: "Complete the API path.", rarity: "Epic", unlocked: false, progress: 0, icon: "Cable" },
  { id: "cloud-defender", title: "Cloud Defender", description: "Complete the Cloud path.", rarity: "Legendary", unlocked: false, progress: 0, icon: "Cloud" },
];

export const attackCards: AttackCard[] = loadedMissions.map((m: any) => ({
  id: m.id,
  name: m.arena.attackName,
  vector: m.arena.attackVector,
  severity: m.arena.attackSeverity,
  description: m.arena.attackDescription,
  defenses: m.arena.correctDefenses,
}));

export const defenseCards: DefenseCard[] = [
  { id: "input_validation", name: "Input Validation", category: "Hardening", description: "Strictly validate, sanitize and type-check all user input." },
  { id: "param_queries", name: "Parameterized Queries", category: "Database", description: "Bind variables instead of concatenating SQL strings." },
  { id: "orm_usage", name: "Safe ORM Usage", category: "Database", description: "Use ORMs that automatically parameterize queries." },
  { id: "waf", name: "Web Application Firewall", category: "Network", description: "Filter malicious requests at the edge." },
  { id: "rotate_pw", name: "Password Rotation", category: "Auth", description: "Force password rotation after compromise." },
  { id: "csp_header", name: "Content-Security-Policy", category: "Browser", description: "Restrict what scripts the browser is allowed to execute." },
  { id: "output_encoding", name: "Output Encoding", category: "Browser", description: "Contextually encode data before rendering." },
  { id: "session_rotate", name: "Session Rotation", category: "Auth", description: "Issue a fresh session id on every privilege change." },
  { id: "mfa", name: "Multi-Factor Auth", category: "Auth", description: "Require a second factor beyond a password." },
  { id: "csrf_tokens", name: "CSRF Tokens", category: "Browser", description: "Bind every state-changing request to a per-session token." },
  { id: "samesite_cookies", name: "SameSite Cookies", category: "Browser", description: "Stop the browser from sending cookies on cross-site requests." },
  { id: "url_allowlist", name: "URL Allowlist", category: "Hardening", description: "Only fetch URLs that match a strict allowlist." },
  { id: "egress_firewall", name: "Egress Firewall", category: "Network", description: "Block outbound traffic to internal ranges." },
];

export const progressStats = {
  lessonsCompleted: 0,
  totalLessons: 132,
  securityScore: 0,
  streakDays: 0,
  achievementsUnlocked: 0,
  totalAchievements: 36,
  weeklyXP: [0, 0, 0, 0, 0, 0, 0],
};

export const recentActivity: any[] = [];

export const allLessons = loadedMissions.map((m: any) => ({
  id: m.id,
  title: m.title,
  difficulty: m.difficulty,
  category: m.category,
  ...m.lesson
}));

export const contributions = [
  { id: "deck", title: "Create a New Deck", description: "Author a deck of scenarios for your favorite attack surface.", icon: "Layers" },
  { id: "translate", title: "Translate Content", description: "Help bring ThreatForge to learners in your language.", icon: "Languages" },
  { id: "theme", title: "Design a Theme", description: "Ship a visual theme pack — neon, retro, mil-spec.", icon: "Palette" },
  { id: "ui", title: "Improve the UI", description: "Polish micro-interactions, fix a11y issues, raise the bar.", icon: "Sparkles" },
  { id: "scenario", title: "Contribute Scenarios", description: "Submit real-world incidents as playable challenges.", icon: "FileCode2" },
  { id: "review", title: "Review Pull Requests", description: "Help maintainers ship faster with thoughtful reviews.", icon: "GitPullRequest" },
];
