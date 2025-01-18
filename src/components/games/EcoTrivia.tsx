import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from "@/hooks/use-toast";

const TRIVIA_QUESTIONS = [
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

export const EcoTrivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const { addPoints } = useProgress();

  const handleAnswer = (answerIndex: number) => {
    const correct = answerIndex === TRIVIA_QUESTIONS[currentQuestion].correctAnswer;
    if (correct) {
      const points = 10;
      setScore(prev => prev + points);
      addPoints(points, 'games');
      toast({
        title: "Correct!",
        description: `You earned ${points} points!`,
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Try again!",
        variant: "destructive",
      });
    }

    if (currentQuestion < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      toast({
        title: "Game Complete!",
        description: `You scored ${score + (correct ? 10 : 0)} points!`,
      });
      setCurrentQuestion(0);
      setScore(0);
    }
  };

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
};