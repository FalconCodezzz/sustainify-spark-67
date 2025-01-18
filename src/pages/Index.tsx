import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Zap } from 'lucide-react';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Leaf className="h-6 w-6 text-eco-primary" />,
      title: "Eco-Learning Games",
      description: "Play interactive games to learn about sustainability"
    },
    {
      icon: <Recycle className="h-6 w-6 text-eco-secondary" />,
      title: "Recycling Assistant",
      description: "Get instant feedback on what can be recycled"
    },
    {
      icon: <Zap className="h-6 w-6 text-eco-accent" />,
      title: "AI-Powered Chat",
      description: "Get answers to your sustainability questions"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-eco-light pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl font-bold text-eco-dark mb-6"
          >
            Spark a{' '}
            <span className="bg-clip-text text-transparent bg-eco-gradient">
              sustainable
            </span>{' '}
            future
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Join us in making the world a better place through interactive learning
            and sustainable choices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/games"
              className="px-8 py-3 bg-eco-gradient text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Start Playing
            </a>
            <a
              href="/chat"
              className="px-8 py-3 border-2 border-eco-primary text-eco-primary rounded-full font-semibold hover:bg-eco-primary hover:text-white transition-colors"
            >
              Try AI Chat
            </a>
          </motion.div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {mounted && Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-20 w-20 rounded-full bg-eco-primary/10"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-eco-light rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-eco-dark mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;