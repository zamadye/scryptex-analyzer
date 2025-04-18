
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface TutorialStep {
  title: string;
  description: string;
  target?: string; // CSS selector for the element to highlight
  position?: 'top' | 'right' | 'bottom' | 'left';
}

interface TutorialContextType {
  steps: TutorialStep[];
  currentStep: number;
  isTutorialActive: boolean;
  startTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTutorial: () => void;
  finishTutorial: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};

export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  
  const steps: TutorialStep[] = [
    {
      title: 'Start by analyzing a project',
      description: 'Use the Analyze Agent to research any Web3 project with AI.',
      target: '#analyze-agent-card',
      position: 'bottom'
    },
    {
      title: 'Connect wallet before farming',
      description: 'Connect your wallet to start farming tasks for airdrops.',
      target: '#farming-agent-card',
      position: 'bottom'
    },
    {
      title: 'Link your Twitter for automation',
      description: 'Connect your Twitter account to automate social tasks.',
      target: '#twitter-agent-card',
      position: 'bottom'
    },
    {
      title: 'Track top airdrops here',
      description: 'Monitor and save potential airdrops in one place.',
      target: '#airdrop-explorer-card',
      position: 'top'
    },
    {
      title: 'Earn points as you interact!',
      description: 'Every action earns XP that increases your rank and benefits.',
      target: '#credit-panel',
      position: 'bottom'
    }
  ];
  
  // Check if user has seen tutorial
  useEffect(() => {
    const seen = localStorage.getItem('hasSeenTutorial') === 'true';
    setHasSeenTutorial(seen);
    
    // Auto-start tutorial for first-time users
    if (!seen && window.location.pathname === '/') {
      // Short delay to ensure the UI is fully loaded
      const timer = setTimeout(() => {
        setIsTutorialActive(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const startTutorial = () => {
    setCurrentStep(0);
    setIsTutorialActive(true);
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      finishTutorial();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const skipTutorial = () => {
    setIsTutorialActive(false);
    localStorage.setItem('hasSeenTutorial', 'true');
    setHasSeenTutorial(true);
  };
  
  const finishTutorial = () => {
    setIsTutorialActive(false);
    localStorage.setItem('hasSeenTutorial', 'true');
    setHasSeenTutorial(true);
  };
  
  return (
    <TutorialContext.Provider value={{ 
      steps,
      currentStep,
      isTutorialActive,
      startTutorial,
      nextStep,
      prevStep,
      skipTutorial,
      finishTutorial
    }}>
      {children}
    </TutorialContext.Provider>
  );
};
