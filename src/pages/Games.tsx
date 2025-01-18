import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, Brain, TreePine } from 'lucide-react';
import { Link } from 'react-router-dom';

const Games = () => {
  const games = [
    {
      title: "Recycle Sort",
      description: "Sort different items into correct recycling bins",
      icon: <TreePine className="w-6 h-6" />,
      color: "text-eco-primary",
      bgColor: "bg-eco-primary/10",
      path: "/games/recycle-sort"
    },
    {
      title: "Eco Trivia",
      description: "Test your knowledge about sustainability",
      icon: <Brain className="w-6 h-6" />,
      color: "text-eco-secondary",
      bgColor: "bg-eco-secondary/10",
      path: "/games/trivia"
    },
    {
      title: "Sustainability Scenarios",
      description: "Make choices in real-life environmental situations",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: "text-eco-accent",
      bgColor: "bg-eco-accent/10",
      path: "/games/scenarios"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-eco-gradient">
          Eco-Learning Games
        </h1>
        
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Learn about sustainability while having fun! Play games, earn points,
          and track your progress towards becoming an eco-warrior.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`${game.bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                    <div className={game.color}>{game.icon}</div>
                  </div>
                  <CardTitle className="text-xl">{game.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{game.description}</p>
                  <Link to={game.path}>
                    <Button className="w-full bg-eco-gradient hover:opacity-90">
                      Play Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Games;