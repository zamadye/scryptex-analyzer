
import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/cardui";

interface FetcherOutputProps {
  type: "tokenomics" | "roadmap" | "backers" | "social" | "airdrop" | null;
  onBack: () => void;
  projectName: string;
}

export const FetcherOutput = ({ type, onBack, projectName }: FetcherOutputProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!type) return;
    
    setIsLoading(true);
    setData(null);
    
    // Simulate API fetch
    const timer = setTimeout(() => {
      setData(getDummyData(type, projectName));
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [type, projectName]);

  if (!type) return null;

  return (
    <Card className="mb-6 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{getTitle(type)}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to options
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-scryptex-blue animate-spin" />
            <span className="ml-3 text-gray-600">Loading {getTitle(type)}...</span>
          </div>
        ) : (
          <div className="mt-4">
            {renderContent(type, data)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function getTitle(type: string): string {
  switch (type) {
    case "tokenomics": return "Tokenomics Analysis";
    case "roadmap": return "Project Roadmap";
    case "backers": return "Investors & Backers";
    case "social": return "Social Media Analysis";
    case "airdrop": return "Airdrop Confirmation";
    default: return "";
  }
}

function renderContent(type: string, data: any) {
  switch (type) {
    case "tokenomics":
      return (
        <div>
          <p className="mb-4">{data.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {data.metrics.map((metric: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-gray-500 text-sm">{metric.label}</div>
                <div className="font-semibold text-lg">{metric.value}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Token Allocation</h4>
            <div className="space-y-2">
              {data.allocation.map((item: any, index: number) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="flex-1">{item.name}</div>
                  <div className="font-medium">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      
    case "roadmap":
      return (
        <div className="space-y-6">
          {data.phases.map((phase: any, index: number) => (
            <div key={index} className="relative pl-8 border-l-2 border-scryptex-light">
              <div className="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-scryptex-blue"></div>
              <div className="mb-1">
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-scryptex-light text-scryptex-blue">
                  {phase.date}
                </span>
              </div>
              <h4 className="font-medium text-lg mt-2">{phase.title}</h4>
              <p className="text-gray-600 mt-1">{phase.description}</p>
              <ul className="mt-2 space-y-1">
                {phase.milestones.map((milestone: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="text-scryptex-blue mr-2">•</span>
                    <span>{milestone}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
      
    case "backers":
      return (
        <div>
          <p className="mb-4">{data.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {data.investors.map((investor: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full mb-3 flex items-center justify-center overflow-hidden">
                  <img src={investor.logo} alt={investor.name} className="w-8 h-8 object-contain" />
                </div>
                <div className="font-medium text-center">{investor.name}</div>
                <div className="text-xs text-gray-500 mt-1">{investor.type}</div>
              </div>
            ))}
          </div>
        </div>
      );
      
    case "social":
      return (
        <div>
          <div className="flex flex-wrap gap-4 mb-6">
            {data.platforms.map((platform: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 flex-1 min-w-[200px]">
                <div className="flex items-center mb-2">
                  <platform.icon className="w-5 h-5 mr-2" style={{ color: platform.color }} />
                  <span className="font-medium">{platform.name}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Followers</span>
                    <span className="font-medium">{platform.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Engagement</span>
                    <span className="font-medium">{platform.engagement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Activity</span>
                    <span className="font-medium">{platform.activity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="font-medium mb-2">Social Analysis</h4>
            <p>{data.analysis}</p>
          </div>
        </div>
      );
      
    case "airdrop":
      return (
        <div>
          <div className={`p-4 rounded-lg mb-4 ${data.status === "Confirmed" ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"}`}>
            <div className="font-medium mb-1">
              Airdrop Status: <span className={data.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}>{data.status}</span>
            </div>
            <p className="text-gray-700">{data.statusDescription}</p>
          </div>
          
          <h4 className="font-medium mb-2">Eligibility Criteria</h4>
          <ul className="space-y-2 mb-4">
            {data.criteria.map((criterion: any, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-scryptex-blue mr-2 mt-1">•</span>
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
          
          <h4 className="font-medium mb-2">Expected Timeline</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Snapshot Date</div>
                <div className="font-medium">{data.snapshot}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Distribution</div>
                <div className="font-medium">{data.distribution}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Claim Period</div>
                <div className="font-medium">{data.claimPeriod}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Est. Value</div>
                <div className="font-medium">{data.estimatedValue}</div>
              </div>
            </div>
          </div>
        </div>
      );
      
    default:
      return <p>No data available</p>;
  }
}

function getDummyData(type: string, projectName: string) {
  switch (type) {
    case "tokenomics":
      return {
        description: `${projectName} has a well-balanced tokenomics structure designed for long-term sustainability. The token ($${projectName.substring(0, 4).toUpperCase()}) has a maximum supply of 1 billion tokens with a 5-year emission schedule.`,
        metrics: [
          { label: "Max Supply", value: "1,000,000,000" },
          { label: "Circulating", value: "125,000,000" },
          { label: "Initial MC", value: "$15.5M" },
          { label: "FDV", value: "$124M" }
        ],
        allocation: [
          { name: "Team & Advisors", percentage: 15, color: "#3366FF" },
          { name: "Investors", percentage: 20, color: "#66A1FF" },
          { name: "Community", percentage: 40, color: "#99C5FF" },
          { name: "Treasury", percentage: 15, color: "#CCE5FF" },
          { name: "Ecosystem", percentage: 10, color: "#0047CC" }
        ]
      };
      
    case "roadmap":
      return {
        phases: [
          {
            date: "Q1 2023",
            title: "Foundation Phase",
            description: "Initial platform development and team building",
            milestones: [
              "Team formation and key hires",
              "Whitepaper release",
              "Seed funding round",
              "MVP development"
            ]
          },
          {
            date: "Q3 2023",
            title: "Beta Launch",
            description: "Testing and community building",
            milestones: [
              "Testnet launch",
              "Community incentive program",
              "Security audit",
              "Strategic partnerships"
            ]
          },
          {
            date: "Q1 2024",
            title: "Mainnet Launch",
            description: "Full platform release with core features",
            milestones: [
              "Mainnet launch",
              "Token generation event",
              "Exchange listings",
              "Marketing campaign"
            ]
          },
          {
            date: "Q3 2024",
            title: "Expansion Phase",
            description: "Scaling and feature expansion",
            milestones: [
              "Cross-chain integration",
              "Mobile app release",
              "Enterprise partner program",
              "Governance implementation"
            ]
          }
        ]
      };
      
    case "backers":
      return {
        description: `${projectName} has secured strong backing from reputable venture capital firms and strategic investors in the blockchain space. The project has raised $25M across seed and Series A rounds.`,
        investors: [
          { name: "Paradigm", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", type: "Lead Investor" },
          { name: "a16z Crypto", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", type: "Strategic" },
          { name: "Binance Labs", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", type: "Strategic" },
          { name: "Dragonfly", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", type: "Lead Investor" },
          { name: "Coinbase Ventures", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", type: "Strategic" },
          { name: "Polychain", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", type: "Early Investor" },
          { name: "Jump Crypto", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", type: "Early Investor" },
          { name: "Galaxy Digital", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", type: "Strategic" }
        ]
      };
      
    case "social":
      return {
        platforms: [
          { 
            name: "Twitter", 
            icon: Twitter, 
            color: "#1DA1F2", 
            followers: "168.5K", 
            engagement: "High", 
            activity: "Daily" 
          },
          { 
            name: "Discord", 
            icon: Users, 
            color: "#5865F2", 
            followers: "87.3K", 
            engagement: "Medium", 
            activity: "Daily" 
          },
          { 
            name: "Telegram", 
            icon: Users, 
            color: "#0088cc", 
            followers: "52.1K", 
            engagement: "Medium", 
            activity: "Daily" 
          }
        ],
        analysis: `${projectName} maintains an active social media presence with consistent engagement. The project team regularly shares updates, technical content, and community activities. The Twitter account shows strong growth with a 15% increase in followers over the last 30 days. Discord community is highly engaged with active developer discussions and regular AMAs with the founding team.`
      };
      
    case "airdrop":
      return {
        status: Math.random() > 0.3 ? "Confirmed" : "Potential",
        statusDescription: Math.random() > 0.3 
          ? `${projectName} has officially confirmed an airdrop for early users and contributors. The team has announced that snapshot dates and eligibility criteria will be published soon.` 
          : `${projectName} has not officially confirmed an airdrop, but based on similar projects in the space and team hints, there is a high probability of a future token distribution to early users.`,
        criteria: [
          "Active protocol usage (min. 5 transactions)",
          "Minimum 30 days of activity before snapshot",
          "Interacted with core protocol features",
          "Maintained minimum balance of platform tokens",
          "Participated in governance (if applicable)"
        ],
        snapshot: "Q2 2024 (Estimated)",
        distribution: "Q3 2024 (Estimated)",
        claimPeriod: "90 Days",
        estimatedValue: "$500 - $2,000"
      };
      
    default:
      return {};
  }
}
