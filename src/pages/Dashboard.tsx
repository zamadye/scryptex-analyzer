import { useState, useEffect } from "react";
import { ArrowRight, BarChart, Clock, Activity, Search, Leaf, Twitter, Gift } from "@/components/icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";

// Agent status definitions
type AgentStatus = "ready" | "running" | "pending";

interface Agent {
  id: string;
  name: string;
  icon: JSX.Element;
  status: AgentStatus;
  lastUsed: string;
  path: string;
}

interface Activity {
  id: string;
  agent: string;
  project: string;
  action: string;
  timestamp: string;
}

export default function Dashboard() {
  // Agent data
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: "analyze",
      name: "Analyze Agent",
      icon: <Search className="h-10 w-10 text-blue-500" />,
      status: "ready",
      lastUsed: "2 hours ago",
      path: "/analyze"
    },
    {
      id: "farming",
      name: "Farming Agent",
      icon: <Leaf className="h-10 w-10 text-green-500" />,
      status: "ready",
      lastUsed: "1 day ago",
      path: "/farming"
    },
    {
      id: "twitter",
      name: "Twitter Agent",
      icon: <Twitter className="h-10 w-10 text-sky-500" />,
      status: "pending",
      lastUsed: "3 days ago",
      path: "/twitter"
    },
    {
      id: "airdrop",
      name: "Airdrop Explorer",
      icon: <Gift className="h-10 w-10 text-purple-500" />,
      status: "ready",
      lastUsed: "12 hours ago",
      path: "/airdrops"
    }
  ]);

  // Activity data
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      agent: "Analyze Agent",
      project: "Arbitrum",
      action: "Project Analysis Completed",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      agent: "Farming Agent",
      project: "ZKSync",
      action: "Completed 3 Tasks",
      timestamp: "1 day ago"
    },
    {
      id: "3",
      agent: "Twitter Agent",
      project: "Optimism",
      action: "Scheduled 2 Tweets",
      timestamp: "3 days ago"
    },
    {
      id: "4",
      agent: "Airdrop Explorer",
      project: "Linea",
      action: "Added to watchlist",
      timestamp: "4 days ago"
    },
    {
      id: "5",
      agent: "Analyze Agent",
      project: "Scroll",
      action: "Project Analysis Completed",
      timestamp: "5 days ago"
    }
  ]);

  // Stats data
  const [stats, setStats] = useState({
    analyzed: 12,
    airdrops: 24,
    farmed: 36,
    posts: 18
  });

  // Get status badge color
  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800";
      case "running":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const activateAgent = (agentId: string) => {
    // Update the agent status to "running"
    setAgents(agents.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: "running" as AgentStatus }
        : agent
    ));
    
    // After 2 seconds, set it back to ready (simulating completion)
    setTimeout(() => {
      setAgents(agents.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: "ready" as AgentStatus, lastUsed: "just now" }
          : agent
      ));
    }, 2000);
  };

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-500">
      {/* Hero section */}
      <section className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 md:p-10">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Your AI Agent Control Room</h1>
          <p className="text-lg md:text-xl opacity-90 mb-6 max-w-2xl">
            Manage, automate, and track your Web3 airdrop journey.
          </p>
          <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          {/* Background image would go here */}
        </div>
      </section>

      {/* Agent cards */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Agent Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map(agent => (
            <Card key={agent.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>{agent.icon}</div>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(agent.status)}`}>
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </span>
                </div>
                <CardTitle className="mt-4">{agent.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Clock className="mr-1 h-3 w-3" /> Last used: {agent.lastUsed}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Button 
                  className="w-full"
                  onClick={() => activateAgent(agent.id)}
                  asChild
                >
                  <a href={agent.path}>Activate</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-start p-4">
                  <Activity className="h-5 w-5 text-gray-500 mt-0.5 mr-4" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {activity.agent} • {activity.project}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-center border-t bg-gray-50">
            <Button variant="ghost" size="sm">
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Stats section */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Global Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Projects Analyzed</p>
                  <p className="text-3xl font-bold">{stats.analyzed}</p>
                  <p className="text-xs text-gray-500 mt-1">This week</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Search className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Airdrops Tracked</p>
                  <p className="text-3xl font-bold">{stats.airdrops}</p>
                  <p className="text-xs text-gray-500 mt-1">Total active</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Gift className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tasks Farmed</p>
                  <p className="text-3xl font-bold">{stats.farmed}</p>
                  <p className="text-xs text-gray-500 mt-1">Total completed</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500">Posts Published</p>
                  <p className="text-3xl font-bold">{stats.posts}</p>
                  <p className="text-xs text-gray-500 mt-1">Engagement rate: 3.2%</p>
                </div>
                <div className="h-12 w-12 bg-sky-100 rounded-full flex items-center justify-center">
                  <Twitter className="h-6 w-6 text-sky-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
