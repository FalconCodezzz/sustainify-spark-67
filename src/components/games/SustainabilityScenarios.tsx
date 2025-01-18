import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from "@/hooks/use-toast";

interface SustainabilityScenariosProps {
  onLevelUp: () => void;
}

const SCENARIOS = [
  {
    scenario: "You notice a dripping faucet at home. What do you do?",
    options: [
      { text: "Fix it immediately to save water", correct: true, explanation: "Fixing leaks immediately can save thousands of gallons of water annually!" },
      { text: "Ignore it, it's just a small drip", correct: false, explanation: "Even small drips can waste hundreds of gallons of water." },
      { text: "Put a bucket under it", correct: false, explanation: "While this catches water, fixing the leak is the sustainable solution." },
      { text: "Report it to maintenance", correct: false, explanation: "Taking immediate action is better than waiting for maintenance." }
    ]
  },
  {
    scenario: "Your phone is 2 years old. What's the most sustainable choice?",
    options: [
      { text: "Keep using it as long as it works", correct: true, explanation: "Extended use reduces e-waste and manufacturing impact!" },
      { text: "Upgrade to the latest model", correct: false, explanation: "Frequent upgrades contribute to electronic waste." },
      { text: "Buy a new battery only", correct: false, explanation: "Good thinking, but using the current battery if functional is better." },
      { text: "Sell it and buy new", correct: false, explanation: "Creating new phones has a significant environmental impact." }
    ]
  },
  {
    scenario: "You're going grocery shopping. What's the best approach?",
    options: [
      { text: "Bring reusable bags and make a list", correct: true, explanation: "Planning reduces food waste and plastic bag usage!" },
      { text: "Buy whatever looks good", correct: false, explanation: "Unplanned shopping often leads to food waste." },
      { text: "Use store plastic bags", correct: false, explanation: "Plastic bags contribute to environmental pollution." },
      { text: "Shop online for delivery", correct: false, explanation: "Delivery can increase carbon emissions from transportation." }
    ]
  }
];

export const SustainabilityScenarios = ({ onLevelUp }: SustainabilityScenariosProps) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const { addPoints, totalScore } = useProgress();

  const handleAnswer = (index: number) => {
    const isCorrect = SCENARIOS[currentScenario].options[index].correct;
    
    if (isCorrect) {
      const points = 10;
      setScore(prev => prev + points);
      const prevScore = totalScore;
      addPoints(points, 'games');
      
      toast({
        title: "Great Choice!",
        description: SCENARIOS[currentScenario].options[index].explanation,
        duration: 3000,
      });

      // Check if we crossed a level threshold
      if (
        (prevScore < 100 && totalScore >= 100) ||
        (prevScore < 250 && totalScore >= 250) ||
        (prevScore < 500 && totalScore >= 500) ||
        (prevScore < 1000 && totalScore >= 1000) ||
        (prevScore < 2000 && totalScore >= 2000)
      ) {
        onLevelUp();
      }
    } else {
      toast({
        title: "Think Again",
        description: SCENARIOS[currentScenario].options[index].explanation,
        variant: "destructive",
        duration: 3000,
      });
    }

    if (currentScenario < SCENARIOS.length - 1 && isCorrect) {
      setTimeout(() => {
        setCurrentScenario(prev => prev + 1);
      }, 1500);
    } else if (isCorrect) {
      toast({
        title: "Game Complete!",
        description: `Well done! You scored ${score + 10} points! Play again to earn more.`,
        duration: 5000,
      });
      setTimeout(() => {
        setCurrentScenario(0);
        setScore(0);
      }, 2000);
    }
  };

  return (
    <Card className="w-full p-6">
      <CardHeader>
        <CardTitle>Scenario {currentScenario + 1} of {SCENARIOS.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-lg">{SCENARIOS[currentScenario].scenario}</p>
        <div className="grid gap-4">
          {SCENARIOS[currentScenario].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              variant="outline"
              className="w-full text-left justify-start h-auto py-4 px-6 text-base"
            >
              {option.text}
            </Button>
          ))}
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          Current Score: {score} points
        </div>
      </CardContent>
    </Card>
  );
};