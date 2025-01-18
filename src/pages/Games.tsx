import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gamepad2, Brain, TreePine, Upload, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');

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
          {/* Games Selection */}
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

            {/* Game Area Placeholder */}
            {selectedGame && (
              <Card className="w-full h-[400px] bg-eco-light/50 flex items-center justify-center">
                <p className="text-lg text-gray-600">Game area for {selectedGame} will be implemented here</p>
              </Card>
            )}
          </div>

          {/* AI Chat & Image Analysis Area */}
          <div className="space-y-6">
            {/* Image Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recycling Check</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Upload an image to check if it's recyclable</p>
                </div>
                <Button className="w-full bg-eco-gradient hover:opacity-90">
                  Upload Image
                </Button>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Eco Assistant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-[200px] bg-eco-light/30 rounded-lg p-4 overflow-y-auto">
                  <p className="text-sm text-gray-600">Chat messages will appear here...</p>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about sustainability..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Games;