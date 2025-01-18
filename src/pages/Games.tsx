import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreePine, Brain, Gamepad2 } from 'lucide-react';
import { useProgress } from '@/contexts/ProgressContext';
import { RecycleSortGame } from '@/components/games/RecycleSortGame';
import { EcoTrivia } from '@/components/games/EcoTrivia';
import { SustainabilityScenarios } from '@/components/games/SustainabilityScenarios';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const games = [
    {
      title: "Recycle Sort",
      description: "Sort different items into correct recycling bins",
      icon: <TreePine className="w-6 h-6" />,
      color: "text-eco-primary",
      bgColor: "bg-eco-primary/10",
      id: "recycle-sort"
    },
    {
      title: "Eco Trivia",
      description: "Test your knowledge about sustainability",
      icon: <Brain className="w-6 h-6" />,
      color: "text-eco-secondary",
      bgColor: "bg-eco-secondary/10",
      id: "trivia"
    },
    {
      title: "Sustainability Scenarios",
      description: "Make choices in real-life environmental situations",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "text-eco-accent",
      bgColor: "bg-eco-accent/10",
      id: "scenarios"
    }
  ];

  const renderGameArea = () => {
    if (!selectedGame) return null;

    switch (selectedGame) {
      case 'trivia':
        return <EcoTrivia />;
      case 'recycle-sort':
        return <RecycleSortGame />;
      case 'scenarios':
        return <SustainabilityScenarios />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-eco-gradient">
          Eco-Learning Games
        </h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {games.map((game, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedGame(game.id)}
                  className="cursor-pointer"
                >
                  <Card className={`h-full hover:shadow-lg transition-shadow ${selectedGame === game.id ? 'ring-2 ring-eco-primary' : ''}`}>
                    <CardHeader>
                      <div className={`${game.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                        <div className={game.color}>{game.icon}</div>
                      </div>
                      <CardTitle className="text-xl">{game.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">{game.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {renderGameArea()}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Current Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-eco-primary">{score} points</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Games;