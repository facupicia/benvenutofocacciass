import { useState } from 'react';
import { VerticalFeed } from '@/components/VerticalFeed';
import { Landing } from '@/components/Landing';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'menu'>('landing');

  return (
    <>
      {currentView === 'landing' ? (
        <Landing onNavigate={setCurrentView} />
      ) : (
        <VerticalFeed onNavigate={setCurrentView} />
      )}
      <Toaster position="top-center" />
    </>
  );
}

export default App;
