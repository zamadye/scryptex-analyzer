
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNotifications } from "@/context/NotificationContext";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { AgentSection } from "@/components/dashboard/AgentSection";
import { ActivitySection } from "@/components/dashboard/ActivitySection";
import { StatsSection } from "@/components/dashboard/StatsSection";

export default function Dashboard() {
  const { user, isLoggedIn } = useAuth();
  const { t } = useLanguage();
  const { addNotification } = useNotifications();
  
  useEffect(() => {
    if (isLoggedIn && user) {
      // Welcome notification - only send once on initial load
      addNotification({
        title: `${t('welcome')}, ${user.name}! 👋`,
        message: t('welcomeToDashboard'),
        type: 'info'
      });
      
      // Add sample activity notifications with delays to avoid flooding
      const timeoutIds: NodeJS.Timeout[] = [];
      
      timeoutIds.push(setTimeout(() => {
        addNotification({
          title: `✅ ${t('walletConnected')}`,
          message: t('walletConnectedMessage'),
          type: 'success'
        });
      }, 2000));
      
      if (user.analyzedProjects && user.analyzedProjects.length > 0) {
        timeoutIds.push(setTimeout(() => {
          addNotification({
            title: `🔍 ${t('analysisDone')}`,
            message: `${t('analysisDoneMessage')} ${user.analyzedProjects[0]}`,
            type: 'info'
          });
        }, 4000));
      }
      
      const credits = localStorage.getItem('userCredits');
      if (credits && parseInt(credits) < 5) {
        timeoutIds.push(setTimeout(() => {
          addNotification({
            title: `⚠️ ${t('creditLow')}`,
            message: t('visitTopupPage'),
            type: 'warning'
          });
        }, 6000));
      }
      
      // Cleanup timeouts on unmount to prevent notifications
      // if user navigates away quickly
      return () => {
        timeoutIds.forEach(id => clearTimeout(id));
      };
    }
  }, [isLoggedIn, user, t, addNotification]);

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <HeroSection />
      <AgentSection />
      <ActivitySection />
      <StatsSection />
    </div>
  );
}
