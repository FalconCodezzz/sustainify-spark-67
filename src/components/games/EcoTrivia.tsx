import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from "@/hooks/use-toast";

interface EcoTriviaProps {
  onLevelUp: () => void;
}

const TRIVIA_QUESTIONS = [
  {
    question: "Which of these items is recyclable?",
    options: ["Greasy pizza box", "Clean cardboard", "Used tissues", "Plastic bags"],
    correctAnswer: 1,
    explanation: "Clean cardboard is recyclable! Food-contaminated items and tissues cannot be recycled."
  },
  {
    question: "What is the most effective way to reduce carbon footprint?",
    options: ["Using public transport", "Eating less meat", "Reducing energy consumption", "All of the above"],
    correctAnswer: 3,
    explanation: "All these actions contribute to reducing your carbon footprint!"
  },
  {
    question: "How many years does it take for a plastic bottle to decompose?",
    options: ["10 years", "50 years", "450 years", "1000 years"],
    correctAnswer: 2,
    explanation: "It takes approximately 450 years for a plastic bottle to decompose completely."
  }
];

export const EcoTrivia = ({ onLevelUp }: EcoTriviaProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const { addPoints, totalScore } = useProgress();

  const handleAnswer = (answerIndex: number) => {
    const correct = answerIndex === TRIVIA_QUESTIONS[currentQuestion].correctAnswer;
    if (correct) {
      const points = 10;
      setScore(prev => prev + points);
      const prevScore = totalScore;
      addPoints(points, 'games');
      
      toast({
        title: "Correct!",
        description: TRIVIA_QUESTIONS[currentQuestion].explanation,
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
        title: "Incorrect",
        description: "Try again! Think about the environmental impact.",
        variant: "destructive",
        duration: 3000,
      });
    }

    if (currentQuestion < TRIVIA_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 1500);
    } else {
      toast({
        title: "Game Complete!",
        description: `You scored ${score + (correct ? 10 : 0)} points! Play again to earn more points.`,
        duration: 5000,
      });
      setTimeout(() => {
        setCurrentQuestion(0);
        setScore(0);
      }, 2000);
    }
  };

  return (
    <Card className="w-full p-6">
      <CardHeader>
        <CardTitle>Question {currentQuestion + 1} of {TRIVIA_QUESTIONS.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-lg">{TRIVIA_QUESTIONS[currentQuestion].question}</p>
        <div className="grid gap-4">
          {TRIVIA_QUESTIONS[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              variant="outline"
              className="w-full text-left justify-start h-auto py-4 px-6 text-base"
            >
              {option}
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