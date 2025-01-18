import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from "@/hooks/use-toast";

interface RecycleSortGameProps {
  onLevelUp: () => void;
}

const RECYCLE_ITEMS = [
  { name: "Plastic Bottle", correct: "recyclable", explanation: "Plastic bottles are recyclable when clean and empty!" },
  { name: "Food Waste", correct: "compost", explanation: "Food waste can be composted to create nutrient-rich soil!" },
  { name: "Newspaper", correct: "recyclable", explanation: "Paper products like newspapers are perfect for recycling!" },
  { name: "Broken Glass", correct: "trash", explanation: "Broken glass should go in the trash for safety reasons." }
];

export const RecycleSortGame = ({ onLevelUp }: RecycleSortGameProps) => {
  const [currentItem, setCurrentItem] = useState(0);
  const [score, setScore] = useState(0);
  const { addPoints, totalScore } = useProgress();

  const handleSort = (bin: string) => {
    const isCorrect = RECYCLE_ITEMS[currentItem].correct === bin;
    
    if (isCorrect) {
      const points = 10;
      setScore(prev => prev + points);
      const prevScore = totalScore;
      addPoints(points, 'games');
      
      toast({
        title: "Correct!",
        description: RECYCLE_ITEMS[currentItem].explanation,
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
        title: "Try Again",
        description: "Think about where this item should go!",
        variant: "destructive",
        duration: 3000,
      });
    }

    if (currentItem < RECYCLE_ITEMS.length - 1 && isCorrect) {
      setTimeout(() => {
        setCurrentItem(prev => prev + 1);
      }, 1500);
    } else if (isCorrect) {
      toast({
        title: "Game Complete!",
        description: `Great job! You scored ${score + 10} points! Play again to earn more.`,
        duration: 5000,
      });
      setTimeout(() => {
        setCurrentItem(0);
        setScore(0);
      }, 2000);
    }
  };

  return (
    <Card className="w-full p-6">
      <CardHeader>
        <CardTitle>Sort the Item ({currentItem + 1} of {RECYCLE_ITEMS.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <p className="text-2xl font-semibold mb-2">{RECYCLE_ITEMS[currentItem].name}</p>
            <p className="text-muted-foreground">Where should this item go?</p>
          </Card>
          <div className="space-y-4">
            {['recyclable', 'compost', 'trash'].map((bin) => (
              <Button
                key={bin}
                onClick={() => handleSort(bin)}
                variant="outline"
                className="w-full capitalize text-lg py-6"
              >
                {bin} Bin
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          Current Score: {score} points
        </div>
      </CardContent>
    </Card>
  );
};