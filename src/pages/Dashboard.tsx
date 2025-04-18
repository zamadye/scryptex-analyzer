import { useEffect } from "react";
import { ArrowRight, BarChart, Clock, Activity, Search, Leaf, Twitter, Gift } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useNotifications } from "@/context/NotificationContext";

export default function Dashboard() {
  const { user, isLoggedIn } = useAuth();
  const { t } = useLanguage();
  const { addNotification } = useNotifications();
  
  useEffect(() => {
    if (isLoggedIn && user) {
      addNotification({
        title: `${t('welcome')}, ${user.name}!`,
        message: t('welcomeToDashboard'),
        type: 'info'
      });
      
      const credits = localStorage.getItem('userCredits');
      if (credits && parseInt(credits) < 5) {
        setTimeout(() => {
          addNotification({
            title: t('creditLow'),
            message: t('visitTopupPage'),
            type: 'warning'
          });
        }, 3000);
      }
    }
  }, [isLoggedIn, user]);

  const agents = [
    {
      id: "analyze",
      name: t('analyze'),
      icon: <Search className="h-10 w-10 text-blue-500" />,
      description: t('analyzeAgentDesc'),
      lastUsed: user?.analyzedProjects?.length ? "Active" : "Ready",
      path: "/analyze"
    },
    {
      id: "farming",
      name: t('farming'),
      icon: <Leaf className="h-10 w-10 text-green-500" />,
      description: t('farmingAgentDesc'),
      lastUsed: user?.farmedProjects?.length ? "Active" : "Ready",
      path: "/farming"
    },
    {
      id: "twitter",
      name: t('twitter'),
      icon: <Twitter className="h-10 w-10 text-sky-500" />,
      description: t('twitterAgentDesc'),
      lastUsed: user?.twitterHandle ? "Connected" : "Ready",
      path: "/twitter"
    },
    {
      id: "airdrop",
      name: t('airdrops'),
      icon: <Gift className="h-10 w-10 text-purple-500" />,
      description: t('airdropExplorerDesc'),
      lastUsed: "Ready",
      path: "/airdrops"
    }
  ];

  const activities = user?.analyzedProjects?.map(project => ({
    id: `analyze-${project}`,
    agent: t('analyze'),
    project,
    action: t('projectAnalysisCompleted'),
    timestamp: "Recently"
  })) || [];

  const stats = {
    analyzed: user?.analyzedProjects?.length || 0,
    airdrops: 0,
    farmed: user?.farmedProjects?.length || 0,
    posts: 0
  };

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
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

      <section>
        <h2 className="text-2xl font-bold mb-6">{t('agentOverview')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map(agent => (
            <Card 
              key={agent.id} 
              id={`${agent.id}-agent-card`}
              className="overflow-hidden transition-all duration-200 hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-blue-900/20"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                    {agent.icon}
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full 
                    ${agent.lastUsed === "Active" || agent.lastUsed === "Connected" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}
                  >
                    {agent.lastUsed}
                  </span>
                </div>
                <CardTitle className="mt-4">{agent.name}</CardTitle>
                <CardDescription className="mt-2">
                  {agent.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Link to={agent.path} className="w-full">
                  <Button className="w-full">
                    {t('activate')}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

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

      <section>
        <h2 className="text-2xl font-bold mb-6">{t('globalStats')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('projectsAnalyzed')}</p>
                  <p className="text-3xl font-bold">{stats.analyzed}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('thisWeek')}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('airdropsTracked')}</p>
                  <p className="text-3xl font-bold">{stats.airdrops}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('totalActive')}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('tasksFarmed')}</p>
                  <p className="text-3xl font-bold">{stats.farmed}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('totalCompleted')}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('postsPublished')}</p>
                  <p className="text-3xl font-bold">{stats.posts}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('engagementRate')}: 3.2%</p>
                </div>
                <div className="h-12 w-12 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center">
                  <Twitter className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
