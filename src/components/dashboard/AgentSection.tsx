
import { Search, Leaf, Twitter, Gift } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AgentCard } from "./AgentCard";
import { useAuth } from "@/context/AuthContext";

export const AgentSection = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
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

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{t('agentOverview')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map(agent => (
          <AgentCard key={agent.id} {...agent} />
        ))}
      </div>
    </section>
  );
};
