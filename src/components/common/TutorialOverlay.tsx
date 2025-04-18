
import { useTutorial } from '@/context/TutorialContext';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';

export const TutorialOverlay = () => {
  const { steps, currentStep, isTutorialActive, skipTutorial, nextStep, prevStep, finishTutorial } = useTutorial();
  const { t } = useLanguage();
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    if (!isTutorialActive) return;
    
    const step = steps[currentStep];
    
    if (step.target) {
      const element = document.querySelector(step.target) as HTMLElement;
      setTargetElement(element);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        
        // Set overlay position
        setOverlayPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
        
        // Set tooltip position
        const tooltipWidth = 300;
        let tooltipLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
        let tooltipTop = 0;
        
        switch (step.position) {
          case 'top':
            tooltipTop = rect.top - 130;
            break;
          case 'bottom':
          default:
            tooltipTop = rect.bottom + 20;
            break;
          case 'left':
            tooltipLeft = rect.left - tooltipWidth - 20;
            tooltipTop = rect.top + rect.height / 2 - 65;
            break;
          case 'right':
            tooltipLeft = rect.right + 20;
            tooltipTop = rect.top + rect.height / 2 - 65;
            break;
        }
        
        setTooltipPosition({
          top: tooltipTop + window.scrollY,
          left: tooltipLeft + window.scrollX
        });
        
        // Scroll to element if needed
        if (
          rect.top < 0 || 
          rect.left < 0 || 
          rect.bottom > window.innerHeight || 
          rect.right > window.innerWidth
        ) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }
  }, [isTutorialActive, currentStep, steps]);
  
  if (!isTutorialActive) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Highlight current element */}
      {targetElement && (
        <div 
          className="absolute z-10 border-2 border-blue-500 rounded-md animate-pulse"
          style={{
            top: overlayPosition.top,
            left: overlayPosition.left,
            width: overlayPosition.width,
            height: overlayPosition.height,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
          }}
        />
      )}
      
      {/* Tooltip */}
      <div 
        className="absolute z-20 w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left
        }}
      >
        <h3 className="text-lg font-bold mb-2">{t(steps[currentStep].title)}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t(steps[currentStep].description)}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              onClick={skipTutorial}
              className="mr-2"
            >
              {t('skip')}
            </Button>
            {currentStep > 0 && (
              <Button 
                variant="outline" 
                onClick={prevStep}
              >
                {t('prev')}
              </Button>
            )}
          </div>
          
          <Button 
            onClick={currentStep < steps.length - 1 ? nextStep : finishTutorial}
          >
            {currentStep < steps.length - 1 ? t('next') : t('finish')}
          </Button>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 flex items-center justify-center gap-1">
          {steps.map((_, index) => (
            <div 
              key={index}
              className={`h-1.5 rounded-full ${index === currentStep ? 'w-6 bg-blue-500' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
