
import { useState } from "react";
import { PieChart, Filter, FileDown, Eye, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
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
  const [activeFilter, setActiveFilter] = useState<"all" | "claimed" | "pending" | "testnet">("all");
  
  // Dummy data for demonstration
  const projects: Project[] = [
    {
      id: "1",
      name: "Arbitrum",
      logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg",
      status: "claimed",
      chain: "Ethereum L2",
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
      estimatedReward: 875,
      aiScore: 88,
      claimDate: "2023-06-22"
    },
    {
      id: "3",
      name: "zkSync",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      status: "pending",
      chain: "Ethereum L2",
      estimatedReward: 1600,
      aiScore: 94
    },
    {
      id: "4",
      name: "Scroll",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      status: "pending",
      chain: "Ethereum L2",
      estimatedReward: 900,
      aiScore: 82
    },
    {
      id: "5",
      name: "Sui",
      logo: "https://cryptologos.cc/logos/sui-sui-logo.svg",
      status: "testnet",
      chain: "Sui",
      estimatedReward: 1400,
      aiScore: 86
    },
    {
      id: "6",
      name: "Aptos",
      logo: "https://cryptologos.cc/logos/aptos-apt-logo.svg",
      status: "testnet",
      chain: "Aptos",
      estimatedReward: 750,
      aiScore: 79
    }
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.status === activeFilter);

  // Calculate totals for the pie chart
  const getPortfolioStats = () => {
    const claimed = projects
      .filter(p => p.status === "claimed")
      .reduce((sum, p) => sum + p.estimatedReward, 0);
      
    const pending = projects
      .filter(p => p.status === "pending")
      .reduce((sum, p) => sum + p.estimatedReward, 0);
      
    const testnet = projects
      .filter(p => p.status === "testnet")
      .reduce((sum, p) => sum + p.estimatedReward, 0);
      
    const total = claimed + pending + testnet;
    
    return [
      { name: "Claimed", value: claimed, color: "#10B981" },
      { name: "Pending", value: pending, color: "#3366FF" },
      { name: "Testnet", value: testnet, color: "#F59E0B" }
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "claimed": return "bg-green-100 text-green-800";
      case "pending": return "bg-blue-100 text-blue-800";
      case "testnet": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Airdrop Portfolio</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Track and manage your potential airdrops in one unified dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5 text-scryptex-blue" />
                Portfolio Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={getPortfolioStats()}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {getPortfolioStats().map((entry, index) => (
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
                {getPortfolioStats().map((stat, index) => (
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
                  <div className="text-sm text-gray-500">Pending</div>
                  <div className="font-semibold">{projects.filter(p => p.status === "pending").length}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Testnet</div>
                  <div className="font-semibold">{projects.filter(p => p.status === "testnet").length}</div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full flex items-center justify-center" variant="outline">
                  <FileDown className="mr-2 h-4 w-4" />
                  Export Portfolio
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <CardTitle>Project List</CardTitle>
                <div className="flex mt-4 sm:mt-0 space-x-2">
                  <Button 
                    onClick={() => setActiveFilter("all")}
                    className={activeFilter === "all" ? "bg-scryptex-blue text-white" : ""}
                    variant={activeFilter === "all" ? "default" : "outline"}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("claimed")}
                    className={activeFilter === "claimed" ? "bg-green-600 text-white" : ""}
                    variant={activeFilter === "claimed" ? "default" : "outline"}
                    size="sm"
                  >
                    Claimed
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("pending")}
                    className={activeFilter === "pending" ? "bg-scryptex-blue text-white" : ""}
                    variant={activeFilter === "pending" ? "default" : "outline"}
                    size="sm"
                  >
                    Pending
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("testnet")}
                    className={activeFilter === "testnet" ? "bg-amber-500 text-white" : ""}
                    variant={activeFilter === "testnet" ? "default" : "outline"}
                    size="sm"
                  >
                    Testnet
                  </Button>
                </div>
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
                      <div className="flex items-center justify-between">
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
                                {project.status === "pending" && "Pending"}
                                {project.status === "testnet" && "Testnet"}
                              </Badge>
                              <span className="mx-2 text-gray-400">•</span>
                              <span className="text-sm text-gray-500">{project.chain}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-8">
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
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
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
