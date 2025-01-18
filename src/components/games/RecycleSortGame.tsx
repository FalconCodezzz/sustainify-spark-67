import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from "@/hooks/use-toast";

interface RecycleSortGameProps {
  onLevelUp: () => void;
}

const RECYCLE_ITEMS = [
  { name: "Plastic Bottle", correct: "recyclable" },
  { name: "Food Waste", correct: "compost" },
  { name: "Newspaper", correct: "recyclable" },
  { name: "Broken Glass", correct: "trash" }
];

export const RecycleSortGame = ({ onLevelUp }: RecycleSortGameProps) => {
  const { addPoints, totalScore } = useProgress();

  const handleSort = (item: string, bin: string) => {
    const recycleItem = RECYCLE_ITEMS.find(i => i.name === item);
    if (recycleItem && recycleItem.correct === bin) {
      const points = 10;
      const prevScore = totalScore;
      addPoints(points, 'games');
      
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
  };

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
};