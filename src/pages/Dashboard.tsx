
import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNotifications } from "@/context/NotificationContext";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { AgentSection } from "@/components/dashboard/AgentSection";
import { ActivitySection } from "@/components/dashboard/ActivitySection";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { UIText } from "@/constants/UIText";

export default function Dashboard() {
  const { user, isLoggedIn } = useAuth();
  const { t } = useLanguage();
  const { addNotification } = useNotifications();
  const welcomeShownRef = useRef(false);
  
  useEffect(() => {
    if (isLoggedIn && user && !welcomeShownRef.current) {
      welcomeShownRef.current = true;
      
      // Welcome notification - only once per session
      addNotification({
        title: `${UIText.dashboard.welcome}, ${user.name}`,
        message: UIText.dashboard.welcomeMessage,
        type: 'info'
      });
      
      // Manage other notifications with cleanup
      const timeoutIds: NodeJS.Timeout[] = [];
      
      if (user.analyzedProjects?.length > 0) {
        timeoutIds.push(setTimeout(() => {
          addNotification({
            title: UIText.notifications.analysisDone,
            message: `Latest project: ${user.analyzedProjects[0]}`,
            type: 'info'
          });
        }, 2000));
      }
      
      const credits = localStorage.getItem('userCredits');
      if (credits && parseInt(credits) < 5) {
        timeoutIds.push(setTimeout(() => {
          addNotification({
            title: UIText.notifications.creditLow,
            message: UIText.notifications.visitTopup,
            type: 'warning'
          });
        }, 3000));
      }
      
      return () => {
        timeoutIds.forEach(id => clearTimeout(id));
        welcomeShownRef.current = false;
      };
    }
  }, [isLoggedIn, user, addNotification]);

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      <HeroSection />
      <AgentSection />
      <ActivitySection />
      <StatsSection />
    </div>
  );
}
