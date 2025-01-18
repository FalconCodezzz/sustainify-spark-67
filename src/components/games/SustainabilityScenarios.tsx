import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from "@/hooks/use-toast";

export const SustainabilityScenarios = () => {
  const { addPoints } = useProgress();

  const handleAnswer = (index: number) => {
    if (index === 0) {
      const points = 10;
      addPoints(points, 'games');
      toast({
        title: "Great Choice!",
        description: `You earned ${points} points for choosing the most sustainable option!`,
      });
    } else {
      toast({
        title: "Think Again",
        description: "Consider the environmental impact of your choice.",
        variant: "destructive",
      });
    }
  };

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
};