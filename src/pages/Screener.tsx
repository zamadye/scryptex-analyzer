
import { useState } from "react";
import { Search, Filter, ArrowUpDown, ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface Project {
  id: string;
  name: string;
  logo: string;
  chain: string;
  status: string;
  description: string;
  aiScore: number;
  category: string;
  launchStatus: string;
}

const Screener = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [chainFilter, setChainFilter] = useState("all");
  const [scoreFilter, setScoreFilter] = useState(0);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Dummy data for demonstration
  const projects: Project[] = [
    {
      id: "1",
      name: "zkSync",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      chain: "Ethereum L2",
      status: "Confirmed",
      description: "Zero-knowledge rollup scaling Ethereum",
      aiScore: 95,
      category: "Infrastructure",
      launchStatus: "Live"
    },
    {
      id: "2",
      name: "Scroll",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      chain: "Ethereum L2",
      status: "Potential",
      description: "EVM-compatible zkRollup",
      aiScore: 87,
      category: "Infrastructure",
      launchStatus: "Testnet"
    },
    {
      id: "3",
      name: "Sui",
      logo: "https://cryptologos.cc/logos/sui-sui-logo.svg",
      chain: "Sui",
      status: "Confirmed",
      description: "Layer 1 with parallelized execution",
      aiScore: 90,
      category: "Layer 1",
      launchStatus: "Live"
    },
    {
      id: "4",
      name: "Aptos",
      logo: "https://cryptologos.cc/logos/aptos-apt-logo.svg",
      chain: "Aptos",
      status: "Rumored",
      description: "Layer 1 with Move language",
      aiScore: 82,
      category: "Layer 1",
      launchStatus: "Live"
    },
    {
      id: "5",
      name: "LayerZero",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      chain: "Multi-chain",
      status: "Confirmed",
      description: "Omnichain interoperability protocol",
      aiScore: 92,
      category: "Infrastructure",
      launchStatus: "Live"
    },
    {
      id: "6",
      name: "Sei",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      chain: "Cosmos",
      status: "Potential",
      description: "Specialized Layer 1 for trading",
      aiScore: 85,
      category: "Layer 1",
      launchStatus: "Testnet"
    },
    {
      id: "7",
      name: "StarkNet",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      chain: "Ethereum L2",
      status: "Confirmed",
      description: "Zero-knowledge rollup with Cairo language",
      aiScore: 94,
      category: "Infrastructure",
      launchStatus: "Live"
    },
    {
      id: "8",
      name: "Blast",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      chain: "Ethereum L2",
      status: "Rumored",
      description: "Ethereum L2 with native yield",
      aiScore: 88,
      category: "Infrastructure",
      launchStatus: "Testnet"
    }
  ];

  // Filter projects
  const filteredProjects = projects
    .filter(project => 
      (searchTerm === "" || 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (chainFilter === "all" || project.chain === chainFilter) &&
      (project.aiScore >= scoreFilter) &&
      (statusFilter === "all" || project.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a.aiScore - b.aiScore;
      } else {
        return b.aiScore - a.aiScore;
      }
    });

  // Extract unique chains for filter dropdown
  const uniqueChains = ["all", ...new Set(projects.map(project => project.chain))];
  
  // Extract unique statuses for filter dropdown
  const uniqueStatuses = ["all", ...new Set(projects.map(project => project.status))];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-blue-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 80) return "bg-blue-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Potential": return "bg-blue-100 text-blue-800";
      case "Rumored": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Screener</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover high-potential projects before everyone else with our AI-powered scoring.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">Search Projects</div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search by name or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>
            
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">Chain</div>
              <Select value={chainFilter} onValueChange={setChainFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Chain" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueChains.map((chain) => (
                    <SelectItem key={chain} value={chain}>
                      {chain === "all" ? "All Chains" : chain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">Minimum AI Score</div>
              <Select 
                value={scoreFilter.toString()} 
                onValueChange={(value) => setScoreFilter(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Minimum Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All Scores</SelectItem>
                  <SelectItem value="70">70+</SelectItem>
                  <SelectItem value="80">80+</SelectItem>
                  <SelectItem value="90">90+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="mb-2 text-sm font-medium text-gray-700">Airdrop Status</div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "all" ? "All Statuses" : status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{filteredProjects.length}</span> projects
        </p>
        <Button
          onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
          className="flex items-center"
          size="sm"
          variant="outline"
        >
          Sort by Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 mr-3 flex-shrink-0">
                      <img 
                        src={project.logo} 
                        alt={project.name} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-500">{project.category}</p>
                    </div>
                  </div>
                  <div className={`flex items-center justify-center h-10 w-10 rounded-full ${getScoreBg(project.aiScore)}`}>
                    <span className={`text-sm font-bold ${getScoreColor(project.aiScore)}`}>
                      {project.aiScore}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-gray-100 text-gray-800">
                    {project.chain}
                  </Badge>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Badge variant="outline">
                    {project.launchStatus}
                  </Badge>
                </div>
              </div>
              
              <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 flex justify-between items-center">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">AI Score: {project.aiScore}</span>
                </div>
                <Button size="sm" variant="outline" className="text-scryptex-blue border-scryptex-blue">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found matching your filters.</p>
          <Button 
            onClick={() => {
              setSearchTerm("");
              setChainFilter("all");
              setScoreFilter(0);
              setStatusFilter("all");
            }}
            className="mt-4"
            variant="outline"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Screener;
