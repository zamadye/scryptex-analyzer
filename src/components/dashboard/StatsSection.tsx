
import { Search, Gift, Leaf, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/cardui";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export const StatsSection = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const stats = {
    analyzed: user?.analyzedProjects?.length || 0,
    airdrops: 0,
    farmed: user?.farmedProjects?.length || 0,
    posts: 0
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{t('globalStats')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label={t('projectsAnalyzed')}
          value={stats.analyzed}
          sublabel={t('thisWeek')}
          icon={<Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
          color="blue"
        />
        <StatCard
          label={t('airdropsTracked')}
          value={stats.airdrops}
          sublabel={t('totalActive')}
          icon={<Gift className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
          color="purple"
        />
        <StatCard
          label={t('tasksFarmed')}
          value={stats.farmed}
          sublabel={t('totalCompleted')}
          icon={<Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />}
          color="green"
        />
        <StatCard
          label={t('postsPublished')}
          value={stats.posts}
          sublabel={`${t('engagementRate')}: 3.2%`}
          icon={<Twitter className="h-6 w-6 text-sky-600 dark:text-sky-400" />}
          color="sky"
        />
      </div>
    </section>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  sublabel: string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'sky';
}

const StatCard = ({ label, value, sublabel, icon, color }: StatCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sublabel}</p>
        </div>
        <div className={`h-12 w-12 bg-${color}-100 dark:bg-${color}-900/30 rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);
