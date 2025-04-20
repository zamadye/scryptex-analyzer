
import { Search, Leaf, Twitter, Gift } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { AgentCard } from "./AgentCard";
import { useAuth } from "@/context/AuthContext";
import { UIText } from "@/constants/UIText";

export const AgentSection = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const agents = [
    {
      id: "analyze",
      name: UIText.dashboard.analyze.title,
      icon: <Search className="h-10 w-10 text-blue-500" />,
      description: UIText.dashboard.analyze.description,
      lastUsed: user?.analyzedProjects?.length ? "Active" : "Ready",
      path: "/analyze"
    },
    {
      id: "farming",
      name: UIText.dashboard.farming.title,
      icon: <Leaf className="h-10 w-10 text-green-500" />,
      description: UIText.dashboard.farming.description,
      lastUsed: user?.farmedProjects?.length ? "Active" : "Ready",
      path: "/farming"
    },
    {
      id: "twitter",
      name: UIText.dashboard.twitter.title,
      icon: <Twitter className="h-10 w-10 text-sky-500" />,
      description: UIText.dashboard.twitter.description,
      lastUsed: user?.twitterHandle ? "Connected" : "Ready",
      path: "/twitter"
    },
    {
      id: "airdrop",
      name: "🎁 Airdrop Explorer",
      icon: <Gift className="h-10 w-10 text-purple-500" />,
      description: "Track potential airdrop opportunities",
      lastUsed: "Ready",
      path: "/airdrops"
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Your AI Agents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map(agent => (
          <AgentCard key={agent.id} {...agent} />
        ))}
      </div>
    </section>
  );
};

