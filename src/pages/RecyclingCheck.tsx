import { useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/contexts/ProgressContext';
import { toast } from "@/hooks/use-toast";

const RecyclingCheck = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { addPoints } = useProgress();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Placeholder for AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      // Award points for using the recycling check feature
      const points = 5;
      addPoints(points, 'recycling');
      toast({
        title: "Analysis Complete",
        description: `You earned ${points} points for checking recyclability!`,
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-eco-gradient">
              Recycling Check
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Upload a photo to check if an item is recyclable
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {selectedImage ? (
                    <div className="relative aspect-square">
                      <img
                        src={selectedImage}
                        alt="Selected item"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64">
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600">
                        Drag and drop an image here, or click to select
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                </div>
                <Button
                  onClick={() => document.getElementById('image-upload')?.click()}
                  variant="outline"
                  className="w-full"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Select Image
                </Button>
                {selectedImage && (
                  <Button
                    onClick={analyzeImage}
                    className="w-full bg-eco-gradient hover:opacity-90"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Check Recyclability'}
                  </Button>
                )}
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
                {selectedImage ? (
                  isAnalyzing ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-eco-primary mx-auto"></div>
                      <p className="mt-4 text-gray-600">Analyzing your item...</p>
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      AI analysis results will appear here once integrated.
                    </p>
                  )
                ) : (
                  <p className="text-gray-600">
                    Upload an image to get recycling recommendations
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default RecyclingCheck;