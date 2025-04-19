
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FallbackLoaderProps {
  timeout?: number;
  onTimeout?: () => void;
}

export const FallbackLoader = ({ timeout = 10000, onTimeout }: FallbackLoaderProps) => {
  const { t } = useLanguage();
  const [showError, setShowError] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true);
      if (onTimeout) onTimeout();
    }, timeout);
    
    return () => clearTimeout(timer);
  }, [timeout, onTimeout]);
  
  return (
    <div className="h-[60vh] w-full flex flex-col items-center justify-center">
      {!showError ? (
        <>
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <p className="text-lg font-medium text-gray-700">{t('loading')}</p>
          <p className="text-sm text-gray-500 mt-2">{t('pleaseWait')}</p>
        </>
      ) : (
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('loadingError')}</h3>
          <p className="text-gray-600 mb-6">{t('loadingErrorDescription')}</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('refresh')}
            </button>
            <button 
              onClick={() => window.location.href = '/dashboard'}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              {t('goToDashboard')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
