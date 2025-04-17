
import { useState, useEffect } from "react";
import { ChevronLeft, BarChart3, CalendarClock, User, ExternalLink, Globe, Code, Rocket, Gift, Award, Check, Loader2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type FetcherType = "tokenomics" | "roadmap" | "backers" | "social" | "airdrop" | null;

interface FetcherOutputProps {
  type: FetcherType;
  onBack: () => void;
  projectName: string;
}

export const FetcherOutput = ({ type, onBack, projectName }: FetcherOutputProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (type) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [type]);
  
  if (!type) return null;
  
  if (isLoading) {
    return (
      <Card className="animate-in fade-in duration-300">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-scryptex-blue animate-spin mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Fetching {type} data...
            </h3>
            <p className="text-gray-600 mt-2">
              This may take a moment while we analyze on-chain data
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const renderContent = () => {
    switch (type) {
      case "tokenomics":
        return <TokenomicsContent projectName={projectName} />;
      case "roadmap":
        return <RoadmapContent projectName={projectName} />;
      case "backers":
        return <BackersContent projectName={projectName} />;
      case "social":
        return <SocialContent projectName={projectName} />;
      case "airdrop":
        return <AirdropContent projectName={projectName} />;
      default:
        return null;
    }
  };
  
  const getTitle = () => {
    switch (type) {
      case "tokenomics": return "Tokenomics Analysis";
      case "roadmap": return "Project Roadmap";
      case "backers": return "Venture Capital Backers";
      case "social": return "Social Media Analysis";
      case "airdrop": return "Airdrop Likelihood";
      default: return "";
    }
  };

  return (
    <Card className="mb-8 animate-in fade-in duration-300">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center mb-2">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-0 h-8">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to options
          </Button>
        </div>
        <CardTitle className="flex items-center text-xl">
          {type === "tokenomics" && <BarChart3 className="mr-2 h-5 w-5 text-scryptex-blue" />}
          {type === "roadmap" && <CalendarClock className="mr-2 h-5 w-5 text-scryptex-blue" />}
          {type === "backers" && <User className="mr-2 h-5 w-5 text-scryptex-blue" />}
          {type === "social" && <Globe className="mr-2 h-5 w-5 text-scryptex-blue" />}
          {type === "airdrop" && <Gift className="mr-2 h-5 w-5 text-scryptex-blue" />}
          {getTitle()}
        </CardTitle>
        <CardDescription>
          Detailed analysis for {projectName}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        {renderContent()}
      </CardContent>
      <CardFooter className="bg-gray-50 border-t">
        <div className="text-xs text-gray-500">
          Last updated: {new Date().toLocaleDateString()} | Data source: On-chain analytics
        </div>
      </CardFooter>
    </Card>
  );
};

// Tokenomics Content Component
const TokenomicsContent = ({ projectName }: { projectName: string }) => {
  const tokenomicsData = [
    { name: "Team", value: 15, color: "#3366FF" },
    { name: "Investors", value: 20, color: "#66A1FF" },
    { name: "Community", value: 40, color: "#99C5FF" },
    { name: "Treasury", value: 10, color: "#CCE5FF" },
    { name: "Advisors", value: 15, color: "#0047CC" },
  ];
  
  const unlockData = [
    { month: "Mar '23", amount: 2 },
    { month: "May '23", amount: 5 },
    { month: "Jul '23", amount: 8 },
    { month: "Sep '23", amount: 15 },
    { month: "Nov '23", amount: 25 },
    { month: "Jan '24", amount: 35 },
    { month: "Mar '24", amount: 50 },
    { month: "May '24", amount: 75 },
    { month: "Jul '24", amount: 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Token Allocation</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenomicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {tokenomicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Allocation']}
                  itemStyle={{ color: "#3366FF" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {tokenomicsData.map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Token Unlock Schedule</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={unlockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#3366FF" 
                  activeDot={{ r: 8 }} 
                  name="Tokens Unlocked (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Token Type:</span>
              <span>ERC-20</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Total Supply:</span>
              <span>1,000,000,000</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium">Initial Circulating:</span>
              <span>50,000,000 (5%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Fully Diluted Valuation:</span>
              <span>$100,000,000</span>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Risk Assessment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium flex items-center">
                <User className="h-4 w-4 mr-2 text-yellow-500" />
                Concentration Risk
              </h4>
              <p className="mt-2 text-sm">Moderate - Top 10 holders control ~40% of supply</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium flex items-center">
                <CalendarClock className="h-4 w-4 mr-2 text-green-500" />
                Unlock Schedule
              </h4>
              <p className="mt-2 text-sm">Low Risk - Gradual unlocks over 24 months</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h4 className="font-medium flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                Supply Inflation
              </h4>
              <p className="mt-2 text-sm">High - Annual inflation rate of ~25%</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Roadmap Content Component
const RoadmapContent = ({ projectName }: { projectName: string }) => {
  const roadmapData = [
    {
      quarter: "Q4 2023",
      title: "Project Launch & MVP",
      items: [
        "Initial DEX offering",
        "Launch of core protocol features",
        "Community building initiatives",
        "Security audit by CertiK"
      ],
      completed: true
    },
    {
      quarter: "Q1 2024",
      title: "Ecosystem Expansion",
      items: [
        "Mobile app beta launch",
        "Cross-chain integration (Arbitrum, Optimism)",
        "Governance framework implementation",
        "Developer documentation release"
      ],
      completed: true
    },
    {
      quarter: "Q2 2024",
      title: "Protocol Upgrade",
      items: [
        "V2 protocol with improved scalability",
        "Layer 2 optimizations",
        "Institutional partnerships",
        "Liquidity mining program"
      ],
      inProgress: true
    },
    {
      quarter: "Q3 2024",
      title: "Global Scaling",
      items: [
        "Enterprise solution launch",
        "Additional chain integrations",
        "Advanced analytics dashboard",
        "Strategic exchange listings"
      ],
      upcoming: true
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          This roadmap was compiled from on-chain activities, official documentation, and recent team communications.
        </p>
      </div>
      
      <div className="relative">
        {roadmapData.map((phase, index) => (
          <div key={index} className="mb-8 relative">
            {/* Timeline connector */}
            {index < roadmapData.length - 1 && (
              <div className="absolute left-5 top-6 bottom-0 w-0.5 bg-gray-200 z-0"></div>
            )}
            
            <div className="flex">
              {/* Timeline point */}
              <div className="flex-shrink-0 relative z-10">
                <div className={`
                  h-10 w-10 rounded-full flex items-center justify-center
                  ${phase.completed ? 'bg-green-100 text-green-600' : 
                    phase.inProgress ? 'bg-yellow-100 text-yellow-600' : 
                    'bg-gray-100 text-gray-600'}
                `}>
                  {phase.completed ? (
                    <Check className="h-5 w-5" />
                  ) : phase.inProgress ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <CalendarClock className="h-5 w-5" />
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="ml-4 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{phase.title}</h3>
                  <Badge variant={phase.completed ? "default" : phase.inProgress ? "outline" : "secondary"}>
                    {phase.quarter}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 
                        ${phase.completed ? 'bg-green-500' : 
                          phase.inProgress ? 'bg-yellow-500' : 'bg-gray-300'}`}
                      ></div>
                      <span className={phase.completed ? 'text-gray-800' : 'text-gray-600'}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Development Milestones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">87%</div>
                <div className="text-sm text-gray-600">Roadmap Completion</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">142</div>
                <div className="text-sm text-gray-600">GitHub Commits (30d)</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">4</div>
                <div className="text-sm text-gray-600">Major Updates YTD</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Backers Content Component
const BackersContent = ({ projectName }: { projectName: string }) => {
  const backers = [
    { name: "Sequoia Capital", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", tier: "Lead", amount: "$12M" },
    { name: "Andreessen Horowitz", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", tier: "Lead", amount: "$10M" },
    { name: "Paradigm", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", tier: "Strategic", amount: "$8M" },
    { name: "Dragonfly Capital", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", tier: "Strategic", amount: "$5M" },
    { name: "Polychain Capital", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", tier: "Investor", amount: "$4M" },
    { name: "Coinbase Ventures", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", tier: "Investor", amount: "$3M" },
    { name: "Binance Labs", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", tier: "Investor", amount: "$3M" },
    { name: "Pantera Capital", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg", tier: "Investor", amount: "$2M" },
  ];
  
  const relevantInvestments = [
    "Uniswap", "Polygon", "Solana", "Arbitrum", "Optimism"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Key Investors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {backers.map((backer, index) => (
            <div key={index} className="border rounded-lg p-4 flex flex-col items-center">
              <div className="h-12 w-12 mb-3">
                <img src={backer.logo} alt={backer.name} className="h-full w-full object-contain" />
              </div>
              <h4 className="font-medium text-center">{backer.name}</h4>
              <div className="mt-2 flex flex-col items-center">
                <Badge variant={
                  backer.tier === "Lead" ? "default" : 
                  backer.tier === "Strategic" ? "outline" : "secondary"
                } className="mb-1">
                  {backer.tier}
                </Badge>
                <span className="text-sm text-gray-600">{backer.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Funding Rounds</h3>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Series A</h4>
              <Badge>$25M</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">January 2024</p>
            <p className="text-sm">Led by Sequoia Capital and Andreessen Horowitz, this round valued the project at $250M.</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Seed Round</h4>
              <Badge variant="outline">$8M</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">June 2023</p>
            <p className="text-sm">Participated by Paradigm and Dragonfly Capital at a $80M valuation.</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Angel Round</h4>
              <Badge variant="secondary">$2M</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">March 2023</p>
            <p className="text-sm">Initial funding from angel investors and small crypto venture funds.</p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Investor Network Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Common Portfolio Projects</h4>
            <div className="flex flex-wrap gap-2">
              {relevantInvestments.map((project, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50">
                  {project}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-600">
              These projects share multiple investors with {projectName}, indicating strong network effects.
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Investor Expertise</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Deep experience in DeFi and layer-2 scaling solutions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Track record of supporting projects through market cycles</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Strong regulatory compliance expertise</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Technical advisory and networking opportunities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Social Media Content Component
const SocialContent = ({ projectName }: { projectName: string }) => {
  const socialMetrics = {
    twitter: {
      followers: 48500,
      engagement: 3.2,
      growth: 12.5,
    },
    discord: {
      members: 32000,
      activeUsers: 8500,
      messagesPerDay: 1200,
    },
    telegram: {
      members: 18000,
      growth: 8.3,
    },
    github: {
      stars: 1200,
      forks: 320,
      contributors: 35,
    }
  };
  
  const sentimentData = [
    { sentiment: "Positive", percentage: 65, color: "#4CAF50" },
    { sentiment: "Neutral", percentage: 25, color: "#2196F3" },
    { sentiment: "Negative", percentage: 10, color: "#F44336" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Community Metrics</h3>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                <h4 className="font-medium">Twitter</h4>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-sm text-gray-600">Followers</p>
                  <p className="font-semibold">{socialMetrics.twitter.followers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engagement</p>
                  <p className="font-semibold">{socialMetrics.twitter.engagement}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly Growth</p>
                  <p className="font-semibold text-green-600">+{socialMetrics.twitter.growth}%</p>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Globe className="h-5 w-5 text-indigo-500 mr-2" />
                <h4 className="font-medium">Discord</h4>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-sm text-gray-600">Members</p>
                  <p className="font-semibold">{socialMetrics.discord.members.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="font-semibold">{socialMetrics.discord.activeUsers.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Messages/Day</p>
                  <p className="font-semibold">{socialMetrics.discord.messagesPerDay.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Globe className="h-5 w-5 text-blue-400 mr-2" />
                <h4 className="font-medium">Telegram</h4>
              </div>
              <div>
                <p className="text-sm text-gray-600">Members</p>
                <p className="font-semibold">{socialMetrics.telegram.members.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+{socialMetrics.telegram.growth}% monthly growth</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Code className="h-5 w-5 text-gray-700 mr-2" />
                <h4 className="font-medium">GitHub</h4>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Stars:</span>
                  <span className="font-medium">{socialMetrics.github.stars}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Forks:</span>
                  <span className="font-medium">{socialMetrics.github.forks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Contributors:</span>
                  <span className="font-medium">{socialMetrics.github.contributors}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Sentiment Analysis</h3>
          <div className="border rounded-lg p-4 mb-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="percentage"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Sentiment analysis based on 5,000+ social media posts across Twitter, Reddit, and Discord over the past 30 days.
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Top Conversation Topics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Protocol Features</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tokenomics</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "72%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Roadmap Progress</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Team Updates</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "48%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Partnership News</span>
                <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Engagement Strategy Assessment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Award className="h-5 w-5 text-green-500 mr-2" />
              <h4 className="font-medium">Strengths</h4>
            </div>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Consistent posting schedule</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Strong technical content</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Active developer engagement</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Transparent progress updates</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <h4 className="font-medium">Areas to Improve</h4>
            </div>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Limited non-technical content</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Slower response to criticism</span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Inconsistent community calls</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Rocket className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-medium">Recommendations</h4>
            </div>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <Rocket className="h-4 w-4 text-blue-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Increase AMAs with core team</span>
              </li>
              <li className="flex items-start">
                <Rocket className="h-4 w-4 text-blue-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Develop beginner-friendly content</span>
              </li>
              <li className="flex items-start">
                <Rocket className="h-4 w-4 text-blue-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Expand community events</span>
              </li>
              <li className="flex items-start">
                <Rocket className="h-4 w-4 text-blue-500 mr-1 mt-0.5 flex-shrink-0" />
                <span>Create localized communities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Airdrop Content Component
const AirdropContent = ({ projectName }: { projectName: string }) => {
  const criteriaData = [
    { name: "Protocol Usage", score: 85 },
    { name: "Transaction Frequency", score: 72 },
    { name: "Liquidity Provision", score: 65 },
    { name: "Testnet Participation", score: 90 },
    { name: "Community Involvement", score: 60 },
  ];
  
  const eligibilityScore = 78;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Airdrop Criteria Analysis</h3>
          <div className="space-y-4">
            {criteriaData.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{item.name}</h4>
                  <span className={`font-bold ${getScoreColor(item.score)}`}>{item.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      item.score >= 80 ? 'bg-green-600' : 
                      item.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                    }`} 
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {item.score >= 80 
                    ? 'Excellent performance in this category' 
                    : item.score >= 60 
                    ? 'Average performance, room for improvement' 
                    : 'Below average, focus needed here'}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Overall Eligibility</h3>
          <div className="border rounded-lg p-6">
            <div className="text-center mb-4">
              <div className={`text-5xl font-bold ${getScoreColor(eligibilityScore)}`}>
                {eligibilityScore}/100
              </div>
              <p className="text-sm text-gray-600 mt-2">Airdrop Eligibility Score</p>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className={`h-3 rounded-full ${
                  eligibilityScore >= 80 ? 'bg-green-600' : 
                  eligibilityScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                }`} 
                style={{ width: `${eligibilityScore}%` }}
              ></div>
            </div>
            
            <div className="text-center mb-6">
              <Badge 
                className={`${
                  eligibilityScore >= 80 ? 'bg-green-100 text-green-800' : 
                  eligibilityScore >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {eligibilityScore >= 80 ? 'Highly Likely' : 
                 eligibilityScore >= 60 ? 'Probable' : 'Unlikely'}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-center mb-2">Recommendations</h4>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <p className="text-sm">Increase testnet transaction frequency</p>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <p className="text-sm">Add liquidity to main pools</p>
              </div>
              <div className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <p className="text-sm">Engage more on Discord and governance</p>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 mt-4">
            <h4 className="font-medium mb-3">Estimated Timeline</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span>Announcement</span>
                <Badge variant="outline">Q2 2024</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Snapshot Date</span>
                <Badge variant="outline">Q3 2024</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Distribution</span>
                <Badge variant="outline">Q3 2024</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Required Actions Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">On-Chain Activity</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Interact with main protocol features</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Bridge assets to required networks</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Execute at least 10 unique transactions</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Participate in testnet activities</span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Community Engagement</h4>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Join Discord server and verify wallet</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Follow official Twitter account</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Participate in governance discussions</span>
              </div>
              <div className="flex items-center text-sm">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Complete Knowledge Base quiz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800">Disclaimer</h4>
            <p className="text-sm text-blue-700 mt-1">
              This analysis is based on historical airdrop patterns and public project information. Airdrop eligibility criteria can change without notice. Past participation does not guarantee future rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
