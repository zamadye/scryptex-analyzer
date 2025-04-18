
import { useState } from "react";
import { 
  Gift, Search, Calendar, ChevronDown, Filter, Star, StarOff, ExternalLink
} from "lucide-react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Airdrop interface
interface Airdrop {
  id: string;
  name: string;
  logo: string;
  chain: string;
  endDate: string;
  taskCount: number;
  reward: string;
  category: string;
  saved: boolean;
}

export default function Airdrops() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [airdrops, setAirdrops] = useState<Airdrop[]>([
    {
      id: "1",
      name: "Arbitrum",
      logo: "/media/arbitrum-logo.png",
      chain: "Ethereum",
      endDate: "May 15, 2025",
      taskCount: 5,
      reward: "500-2000 ARB",
      category: "L2",
      saved: true
    },
    {
      id: "2",
      name: "ZKSync",
      logo: "/media/zksync-logo.png",
      chain: "Ethereum",
      endDate: "June 2, 2025",
      taskCount: 3,
      reward: "Unknown",
      category: "L2",
      saved: false
    },
    {
      id: "3",
      name: "Optimism",
      logo: "/media/optimism-logo.png",
      chain: "Ethereum",
      endDate: "July 30, 2025",
      taskCount: 7,
      reward: "1000-5000 OP",
      category: "L2",
      saved: true
    },
    {
      id: "4",
      name: "Linea",
      logo: "/media/linea-logo.png",
      chain: "Ethereum",
      endDate: "August 15, 2025",
      taskCount: 4,
      reward: "Unknown",
      category: "L2",
      saved: false
    },
    {
      id: "5",
      name: "Blast",
      logo: "/media/blast-logo.png",
      chain: "Ethereum",
      endDate: "September 10, 2025",
      taskCount: 6,
      reward: "250-1200 BLAST",
      category: "L2",
      saved: false
    },
    {
      id: "6",
      name: "Scroll",
      logo: "/media/scroll-logo.png",
      chain: "Ethereum",
      endDate: "October 5, 2025",
      taskCount: 3,
      reward: "Unknown",
      category: "L2",
      saved: false
    }
  ]);

  const toggleSaved = (id: string) => {
    setAirdrops(airdrops.map(airdrop => 
      airdrop.id === id ? { ...airdrop, saved: !airdrop.saved } : airdrop
    ));
  };

  const filteredAirdrops = airdrops.filter(airdrop => {
    if (filter === "saved" && !airdrop.saved) return false;
    if (searchQuery && !airdrop.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Airdrop Explorer</h1>
        <Button>
          <Gift className="mr-2 h-4 w-4" />
          Add New Airdrop
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Live Airdrops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{airdrops.length}</div>
            <p className="text-sm text-gray-500">Tracked projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Saved Airdrops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{airdrops.filter(a => a.saved).length}</div>
            <p className="text-sm text-gray-500">In your watchlist</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Ending Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-sm text-gray-500">In the next 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Airdrop Opportunities</CardTitle>
          <CardDescription>
            Potential and confirmed airdrops to explore
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilter("all")}>All Projects</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilter("saved")}>Saved Only</DropdownMenuItem>
                  <DropdownMenuItem>Layer 2</DropdownMenuItem>
                  <DropdownMenuItem>DeFi</DropdownMenuItem>
                  <DropdownMenuItem>GameFi</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Tabs defaultValue="grid" className="w-[100px]">
                <TabsList>
                  <TabsTrigger value="grid" className="w-10 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clipRule="evenodd" />
                    </svg>
                  </TabsTrigger>
                  <TabsTrigger value="list" className="w-10 p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M2 3.75A.75.75 0 012.75 3h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 3.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.166a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zm0 4.167a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <TabsContent value="grid" className="mt-0 space-y-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAirdrops.map(airdrop => (
                <Card key={airdrop.id} className="overflow-hidden">
                  <CardHeader className="pb-2 pt-6">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 flex items-center justify-center">
                          {/* Placeholder for logo */}
                          <span className="font-bold text-gray-600">{airdrop.name.substring(0, 1)}</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">{airdrop.name}</CardTitle>
                          <CardDescription>{airdrop.chain}</CardDescription>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleSaved(airdrop.id)}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        {airdrop.saved ? (
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">End Date:</span>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          <span>{airdrop.endDate}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Tasks:</span>
                        <Badge variant="outline">{airdrop.taskCount} Actions</Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Reward Est:</span>
                        <span className="font-medium">{airdrop.reward}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 pb-6 flex justify-between">
                    <Button variant="outline" size="sm">
                      View Tasks
                    </Button>
                    <Button size="sm">
                      Analyze
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0 space-y-0">
            <div className="border rounded-md divide-y">
              {filteredAirdrops.map(airdrop => (
                <div key={airdrop.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 flex items-center justify-center">
                      <span className="font-bold text-gray-600">{airdrop.name.substring(0, 1)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{airdrop.name}</h3>
                      <p className="text-sm text-gray-500">{airdrop.chain} • {airdrop.category}</p>
                    </div>
                  </div>
                  
                  <div className="hidden lg:flex items-center space-x-4">
                    <div className="text-sm">
                      <div className="font-medium">Ending</div>
                      <div className="text-gray-500">{airdrop.endDate}</div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="font-medium">Tasks</div>
                      <div className="text-center text-gray-500">{airdrop.taskCount}</div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="font-medium">Rewards</div>
                      <div className="text-gray-500">{airdrop.reward}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleSaved(airdrop.id)}
                      className="text-gray-400 hover:text-yellow-500"
                    >
                      {airdrop.saved ? (
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-5 w-5" />
                      )}
                    </Button>
                    
                    <Button size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-sm text-gray-500">Showing {filteredAirdrops.length} of {airdrops.length} airdrops</p>
          <Button variant="outline" size="sm">
            Load More
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
