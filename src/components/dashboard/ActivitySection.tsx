
import { Activity } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export const ActivitySection = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const activities = user?.analyzedProjects?.map(project => ({
    id: `analyze-${project}`,
    agent: t('analyze'),
    project,
    action: t('projectAnalysisCompleted'),
    timestamp: "Recently"
  })) || [];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{t('recentActivity')}</h2>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {activities.length > 0 ? (
              activities.map(activity => (
                <div key={activity.id} className="flex items-start p-4">
                  <Activity className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-4" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.agent} • {activity.project}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{activity.timestamp}</span>
                </div>
              ))
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">{t('noRecentActivity')}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{t('startUsingAgents')}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-center border-t bg-gray-50 dark:bg-gray-800/50">
          <Button variant="ghost" size="sm">
            {t('viewAllActivity')}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
