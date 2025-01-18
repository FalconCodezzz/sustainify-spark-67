import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Trophy, Star, Award, TreePine, Sprout } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
}

const levels = [
  { name: "Eco Novice", minScore: 0, color: "text-green-400" },
  { name: "Green Guardian", minScore: 100, color: "text-emerald-500" },
  { name: "Sustainability Scout", minScore: 250, color: "text-teal-600" },
  { name: "Earth Defender", minScore: 500, color: "text-blue-600" },
  { name: "Climate Champion", minScore: 1000, color: "text-purple-600" },
  { name: "Eco Warrior", minScore: 2000, color: "text-amber-600" },
];

const ProgressPage = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalScore, setTotalScore] = useState(1250);
  const [currentLevel, setCurrentLevel] = useState(levels[0]);

  useEffect(() => {
    // Mock achievements data
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Recycling Pioneer',
        description: 'Successfully identified 10 recyclable items',
        icon: <Leaf className="w-6 h-6 text-eco-primary" />,
        progress: 60
      },
      {
        id: '2',
        title: 'Sustainability Scholar',
        description: 'Completed 5 eco-quizzes',
        icon: <Trophy className="w-6 h-6 text-eco-secondary" />,
        progress: 40
      },
      {
        id: '3',
        title: 'Community Champion',
        description: 'Shared 3 sustainability tips',
        icon: <Star className="w-6 h-6 text-eco-accent" />,
        progress: 30
      }
    ];

    setAchievements(mockAchievements);

    // Set current level based on total score
    const level = levels.reduce((acc, level) => {
      if (totalScore >= level.minScore) return level;
      return acc;
    }, levels[0]);
    setCurrentLevel(level);
  }, [totalScore]);

  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progressToNextLevel = nextLevel
    ? ((totalScore - currentLevel.minScore) / (nextLevel.minScore - currentLevel.minScore)) * 100
    : 100;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-eco-gradient">
          Your Sustainability Journey
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Current Level Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Award className={`h-8 w-8 ${currentLevel.color}`} />
                Current Level: {currentLevel.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-eco-primary mb-4">
                {totalScore} points
              </div>
              <Progress value={progressToNextLevel} className="h-2 mb-2" />
              {nextLevel && (
                <p className="text-sm text-gray-600">
                  {nextLevel.minScore - totalScore} points until {nextLevel.name}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Level Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Level Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {levels.map((level, index) => (
                  <div
                    key={level.name}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      currentLevel.name === level.name ? 'bg-eco-light' : ''
                    }`}
                  >
                    {index <= levels.indexOf(currentLevel) ? (
                      <TreePine className={`h-5 w-5 ${level.color}`} />
                    ) : (
                      <Sprout className="h-5 w-5 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium ${level.color}`}>{level.name}</p>
                      <p className="text-sm text-gray-600">{level.minScore} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-4 p-4 bg-eco-light/50 rounded-lg"
                  >
                    <div className="p-3 bg-white rounded-full">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                      <Progress
                        value={achievement.progress}
                        className="h-2 mt-2"
                      />
                    </div>
                    <div className="text-lg font-semibold text-eco-primary">
                      {achievement.progress}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressPage;