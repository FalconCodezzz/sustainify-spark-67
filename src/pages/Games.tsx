import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gamepad2, Brain, TreePine } from 'lucide-react';
import { useState } from 'react';
import { useProgress } from '@/contexts/ProgressContext';
import { useToast } from '@/components/ui/use-toast';

type GameQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

const TRIVIA_QUESTIONS: GameQuestion[] = [
  {
    question: "Which of these items is recyclable?",
    options: ["Greasy pizza box", "Clean cardboard", "Used tissues", "Plastic bags"],
    correctAnswer: 1
  },
  {
    question: "What is the most effective way to reduce carbon footprint?",
    options: ["Using public transport", "Eating less meat", "Reducing energy consumption", "All of the above"],
    correctAnswer: 3
  }
];

const RECYCLE_ITEMS = [
  { name: "Plastic Bottle", correct: "recyclable" },
  { name: "Food Waste", correct: "compost" },
  { name: "Newspaper", correct: "recyclable" },
  { name: "Broken Glass", correct: "trash" }
];

const Games = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const { addPoints } = useProgress();
  const { toast } = useToast();

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

  const handleAnswer = (answerIndex: number) => {
    const correct = answerIndex === TRIVIA_QUESTIONS[currentQuestion].correctAnswer;
    if (correct) {
      setScore(prev => prev + 10);
      toast({
        title: "Correct!",
        description: "You earned 10 points!",
      });
    }

    if (currentQuestion < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      addPoints(score, 'games');
      toast({
        title: "Game Complete!",
        description: `You scored ${score} points!`,
      });
      setSelectedGame(null);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const handleSort = (item: string, bin: string) => {
    const recycleItem = RECYCLE_ITEMS.find(i => i.name === item);
    if (recycleItem && recycleItem.correct === bin) {
      setScore(prev => prev + 10);
      toast({
        title: "Correct!",
        description: "You earned 10 points!",
      });
    }
  };

  const renderGameArea = () => {
    if (!selectedGame) return null;

    switch (selectedGame) {
      case 'trivia':
        return (
          <Card className="w-full p-6">
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{TRIVIA_QUESTIONS[currentQuestion].question}</p>
              <div className="grid gap-4">
                {TRIVIA_QUESTIONS[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    variant="outline"
                    className="w-full text-left"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'recycle-sort':
        return (
          <Card className="w-full p-6">
            <CardHeader>
              <CardTitle>Sort the Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {RECYCLE_ITEMS.map((item) => (
                    <Card key={item.name} className="p-4">
                      <p>{item.name}</p>
                    </Card>
                  ))}
                </div>
                <div className="space-y-4">
                  {['recyclable', 'compost', 'trash'].map((bin) => (
                    <Button
                      key={bin}
                      onClick={() => handleSort(RECYCLE_ITEMS[0].name, bin)}
                      variant="outline"
                      className="w-full capitalize"
                    >
                      {bin} Bin
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'scenarios':
        return (
          <Card className="w-full p-6">
            <CardHeader>
              <CardTitle>Daily Scenario</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">You notice a dripping faucet at home. What do you do?</p>
              <div className="grid gap-4">
                {[
                  "Fix it immediately to save water",
                  "Ignore it, it's just a small drip",
                  "Put a bucket under it",
                  "Report it to maintenance"
                ].map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    variant="outline"
                    className="w-full text-left"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        );
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