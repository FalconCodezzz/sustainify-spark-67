import React, { createContext, useContext, useState, useEffect } from 'react';

type Level = {
  name: string;
  minScore: number;
  color: string;
};

export const LEVELS: Level[] = [
  { name: "Eco Novice", minScore: 0, color: "text-green-400" },
  { name: "Green Guardian", minScore: 100, color: "text-emerald-500" },
  { name: "Sustainability Scout", minScore: 250, color: "text-teal-600" },
  { name: "Earth Defender", minScore: 500, color: "text-blue-600" },
  { name: "Climate Champion", minScore: 1000, color: "text-purple-600" },
  { name: "Eco Warrior", minScore: 2000, color: "text-amber-600" }
];

type Achievement = {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
};

interface ProgressContextType {
  totalScore: number;
  addPoints: (points: number, source: string) => void;
  currentLevel: Level;
  nextLevel: Level | null;
  achievements: Achievement[];
  updateAchievement: (id: string, progress: number) => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalScore, setTotalScore] = useState(() => {
    const saved = localStorage.getItem('totalScore');
    return saved ? parseInt(saved) : 0;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('achievements');
    return saved ? JSON.parse(saved) : [
      {
        id: 'recycling',
        title: 'Recycling Pioneer',
        description: 'Check recyclability of items',
        progress: 0,
        maxProgress: 10
      },
      {
        id: 'games',
        title: 'Game Master',
        description: 'Complete eco-games',
        progress: 0,
        maxProgress: 5
      },
      {
        id: 'chat',
        title: 'Eco Learner',
        description: 'Chat with Eco Assistant',
        progress: 0,
        maxProgress: 10
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('totalScore', totalScore.toString());
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [totalScore, achievements]);

  const currentLevel = LEVELS.reduce((acc, level) => {
    if (totalScore >= level.minScore) return level;
    return acc;
  }, LEVELS[0]);

  const nextLevel = LEVELS[LEVELS.indexOf(currentLevel) + 1] || null;

  const addPoints = (points: number, source: string) => {
    setTotalScore(prev => prev + points);
    
    // Update relevant achievement
    if (source === 'recycling' || source === 'games' || source === 'chat') {
      updateAchievement(source, 1);
    }
  };

  const updateAchievement = (id: string, progress: number) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === id) {
        const newProgress = Math.min(achievement.progress + progress, achievement.maxProgress);
        return { ...achievement, progress: newProgress };
      }
      return achievement;
    }));
  };

  return (
    <ProgressContext.Provider value={{
      totalScore,
      addPoints,
      currentLevel,
      nextLevel,
      achievements,
      updateAchievement
    }}>
      {children}
    </ProgressContext.Provider>
  );
};