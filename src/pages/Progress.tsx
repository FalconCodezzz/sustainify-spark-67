import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Trophy, Star } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  progress: number;
}

const ProgressPage = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    // In a real app, this would come from localStorage or an API
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
    setTotalScore(1250); // Mock total score
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-eco-gradient">
          Your Sustainability Journey
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Total Impact Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-eco-primary mb-4">
              {totalScore}
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">
              You're in the top 25% of eco-warriors!
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-eco-light rounded-full">
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
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressPage;