
import { useState } from "react";
import { PieChart, Filter, FileDown, Eye, ExternalLink, Link2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cardui";
import { 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  Tooltip,
  Legend
} from "recharts";

interface Project {
  id: string;
  name: string;
  logo: string;
  status: "claimed" | "pending" | "testnet";
  chain: string;
  estimatedReward: number;
  aiScore: number;
  claimDate?: string;
}

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState<"top" | "latest" | "my">("top");
  const [activeFilter, setActiveFilter] = useState<"all" | "open" | "closed" | "claimed">("all");
  
  // Dummy data for demonstration
  const projects = [
    {
      id: "1",
      name: "Arbitrum",
      logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
      status: "claimed",
      chain: "Ethereum L2",
      description: "Participate in the Ethereum L2 ecosystem by using the bridge, making transactions, and providing liquidity.",
      tutorialLink: "https://arbitrum.io/airdrop",
      estimatedReward: 1250,
      aiScore: 92,
      claimDate: "2023-04-15"
    },
    {
      id: "2",
      name: "Optimism",
      logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg",
      status: "claimed",
      chain: "Ethereum L2",
      description: "Use the Optimism bridge, trade on Velodrome, and interact with dApps to qualify.",
      tutorialLink: "https://community.optimism.io/docs/governance/airdrop-1/",
      estimatedReward: 875,
      aiScore: 88,
      claimDate: "2023-06-22"
    },
    {
      id: "3",
      name: "zkSync",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      status: "open",
      chain: "Ethereum L2",
      description: "Bridge assets to zkSync Era, trade on SyncSwap, and use the ecosystem dApps.",
      tutorialLink: "https://zksync.io/",
      estimatedReward: 1600,
      aiScore: 94
    },
    {
      id: "4",
      name: "Scroll",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      status: "open",
      chain: "Ethereum L2",
      description: "Bridge ETH to Scroll, swap on ScrollSwap, and provide liquidity.",
      tutorialLink: "https://scroll.io/",
      estimatedReward: 900,
      aiScore: 82
    },
    {
      id: "5",
      name: "Sui",
      logo: "https://cryptologos.cc/logos/sui-sui-logo.svg",
      status: "closed",
      chain: "Sui",
      description: "Use the Sui blockchain, stake SUI, and participate in governance.",
      tutorialLink: "https://sui.io/",
      estimatedReward: 1400,
      aiScore: 86
    },
    {
      id: "6",
      name: "Aptos",
      logo: "https://cryptologos.cc/logos/aptos-apt-logo.svg",
      status: "closed",
      chain: "Aptos",
      description: "Trade NFTs, use Liquidswap, and stake APT tokens.",
      tutorialLink: "https://aptoslabs.com/",
      estimatedReward: 750,
      aiScore: 79
    }
  ];

  // Filter projects based on active tab and filter
  const getFilteredProjects = () => {
    let filtered = [...projects];
    
    // First filter by tab
    if (activeTab === "my") {
      // Simulate "my projects" - for now just show some random ones
      filtered = filtered.filter((_, index) => index % 2 === 0);
    } else if (activeTab === "latest") {
      // Sort by newest (using ID as proxy for now)
      filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    } else {
      // Top airdrops - sort by estimated reward
      filtered.sort((a, b) => b.estimatedReward - a.estimatedReward);
    }
    
    // Then filter by status
    if (activeFilter !== "all") {
      filtered = filtered.filter(project => project.status === activeFilter);
    }
    
    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  // Calculate totals for the pie chart
  const getAirdropStats = () => {
    const claimed = projects
      .filter(p => p.status === "claimed")
      .reduce((sum, p) => sum + p.estimatedReward, 0);
      
    const open = projects
      .filter(p => p.status === "open")
      .reduce((sum, p) => sum + p.estimatedReward, 0);
      
    const closed = projects
      .filter(p => p.status === "closed")
      .reduce((sum, p) => sum + p.estimatedReward, 0);
      
    const total = claimed + open + closed;
    
    return [
      { name: "Claimed", value: claimed, color: "#10B981" },
      { name: "Open", value: open, color: "#3366FF" },
      { name: "Closed", value: closed, color: "#F59E0B" }
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "claimed": return "bg-green-100 text-green-800";
      case "open": return "bg-blue-100 text-blue-800";
      case "closed": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const handleTrackProject = (projectId: string) => {
    // This would normally add the project to the user's tracked list
    // For now, just show a toast message
    alert(`Project ${projectId} added to your tracked projects`);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12 animate-in fade-in duration-300">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Airdrop Tracker</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover, track, and participate in the most promising airdrops in the crypto space.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-1">
          <Card className="h-full animate-in fade-in slide-in-from-left-5 duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5 text-scryptex-blue" />
                Airdrop Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={getAirdropStats()}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {getAirdropStats().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`$${value}`, 'Estimated Value']}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {getAirdropStats().map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-gray-500">{stat.name}</div>
                    <div className="font-semibold" style={{ color: stat.color }}>
                      ${stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Total Projects</div>
                  <div className="font-semibold">{projects.length}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Claimed</div>
                  <div className="font-semibold">{projects.filter(p => p.status === "claimed").length}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Open</div>
                  <div className="font-semibold">{projects.filter(p => p.status === "open").length}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Closed</div>
                  <div className="font-semibold">{projects.filter(p => p.status === "closed").length}</div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full flex items-center justify-center" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export Airdrop List
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="animate-in fade-in slide-in-from-right-5 duration-300">
            <CardHeader className="border-b">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <CardTitle>Airdrop Projects</CardTitle>
                <div className="mt-4 sm:mt-0">
                  <div className="flex space-x-1">
                    <Button 
                      onClick={() => setActiveTab("top")}
                      variant={activeTab === "top" ? "default" : "outline"}
                      size="sm"
                      className={activeTab === "top" ? "bg-scryptex-blue text-white" : ""}
                    >
                      Top Airdrops
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("latest")}
                      variant={activeTab === "latest" ? "default" : "outline"}
                      size="sm"
                      className={activeTab === "latest" ? "bg-scryptex-blue text-white" : ""}
                    >
                      Latest
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("my")}
                      variant={activeTab === "my" ? "default" : "outline"}
                      size="sm"
                      className={activeTab === "my" ? "bg-scryptex-blue text-white" : ""}
                    >
                      My Projects
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button 
                  onClick={() => setActiveFilter("all")}
                  variant={activeFilter === "all" ? "default" : "outline"}
                  size="sm"
                  className={activeFilter === "all" ? "bg-scryptex-blue text-white" : ""}
                >
                  All
                </Button>
                <Button 
                  onClick={() => setActiveFilter("open")}
                  variant={activeFilter === "open" ? "default" : "outline"}
                  size="sm"
                  className={activeFilter === "open" ? "bg-blue-600 text-white" : ""}
                >
                  Open
                </Button>
                <Button 
                  onClick={() => setActiveFilter("closed")}
                  variant={activeFilter === "closed" ? "default" : "outline"}
                  size="sm"
                  className={activeFilter === "closed" ? "bg-amber-500 text-white" : ""}
                >
                  Closed
                </Button>
                <Button 
                  onClick={() => setActiveFilter("claimed")}
                  variant={activeFilter === "claimed" ? "default" : "outline"}
                  size="sm"
                  className={activeFilter === "claimed" ? "bg-green-600 text-white" : ""}
                >
                  Claimed
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredProjects.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No projects found with the selected filter.
                  </div>
                ) : (
                  filteredProjects.map((project) => (
                    <div key={project.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 mr-4 flex-shrink-0">
                            <img 
                              src={project.logo} 
                              alt={project.name} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{project.name}</h3>
                            <div className="flex items-center mt-1">
                              <Badge className={getStatusColor(project.status)}>
                                {project.status === "claimed" && "Claimed"}
                                {project.status === "open" && "Open"}
                                {project.status === "closed" && "Closed"}
                              </Badge>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-sm text-gray-500">{project.chain}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-6">
                          <div className="text-right">
                            <div className="text-sm text-gray-500">Est. Reward</div>
                            <div className="font-semibold">${project.estimatedReward}</div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm text-gray-500">AI Score</div>
                            <div className={`font-semibold ${getScoreColor(project.aiScore)}`}>
                              {project.aiScore}
                            </div>
                          </div>
                          
                          <div>
                            {activeTab !== "my" ? (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleTrackProject(project.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-scryptex-blue"
                                onClick={() => window.open(project.tutorialLink, "_blank")}
                              >
                                <Link2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {project.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs text-gray-600"
                          onClick={() => window.open(project.tutorialLink, "_blank")}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          How to Participate
                        </Button>
                        
                        {activeTab !== "my" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-xs text-scryptex-blue"
                            onClick={() => handleTrackProject(project.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Track Project
                          </Button>
                        )}
                      </div>
                      
                      {/* Mobile responsive info */}
                      <div className="grid grid-cols-2 gap-2 mt-3 md:hidden">
                        <div className="text-sm">
                          <span className="text-gray-500">Est. Reward:</span>{" "}
                          <span className="font-semibold">${project.estimatedReward}</span>
                        </div>
                        <div className="text-sm text-right">
                          <span className="text-gray-500">AI Score:</span>{" "}
                          <span className={`font-semibold ${getScoreColor(project.aiScore)}`}>
                            {project.aiScore}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
