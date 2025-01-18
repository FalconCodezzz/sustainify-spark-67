import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Index from './pages/Index';
import Games from './pages/Games';
import Progress from './pages/Progress';
import Chat from './pages/Chat';
import RecyclingCheck from './pages/RecyclingCheck';
import { ProgressProvider } from './contexts/ProgressContext';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ProgressProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/games" element={<Games />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/recycling-check" element={<RecyclingCheck />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;