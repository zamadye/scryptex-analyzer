
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 md:p-10">
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{t('aiAgentControlRoom')}</h1>
        <p className="text-lg md:text-xl opacity-90 mb-6 max-w-2xl">
          {t('dashboardDescription')}
        </p>
        <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
          {t('getStarted')} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        {/* Background pattern */}
      </div>
    </section>
  );
};
