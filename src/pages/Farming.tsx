
import { useState } from "react";
import { Check, PlayCircle, Settings, ChevronRight, Coins, Workflow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

type Chain = "zksync" | "sui" | "aptos" | "scroll";

interface FarmingStep {
  id: number;
  name: string;
  status: "pending" | "running" | "completed" | "failed";
  details?: string;
}

interface FarmingLog {
  id: number;
  message: string;
  timestamp: string;
  type: "info" | "success" | "error";
}

const Farming = () => {
  const [selectedChain, setSelectedChain] = useState<Chain>("zksync");
  const [walletAddress, setWalletAddress] = useState("");
  const [isFarming, setIsFarming] = useState(false);
  const [farmingSteps, setFarmingSteps] = useState<FarmingStep[]>([]);
  const [farmingLogs, setFarmingLogs] = useState<FarmingLog[]>([]);

  // Chain data
  const chains = [
    { id: "zksync", name: "zkSync Era", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
    { id: "sui", name: "Sui", logo: "https://cryptologos.cc/logos/sui-sui-logo.svg" },
    { id: "aptos", name: "Aptos", logo: "https://cryptologos.cc/logos/aptos-apt-logo.svg" },
    { id: "scroll", name: "Scroll", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
  ];

  // Dummy farming steps for each chain
  const chainSteps: Record<Chain, FarmingStep[]> = {
    zksync: [
      { id: 1, name: "Connect to zkSync Era", status: "pending" },
      { id: 2, name: "Bridge funds from Ethereum", status: "pending" },
      { id: 3, name: "Execute swap on SyncSwap", status: "pending" },
      { id: 4, name: "Provide liquidity to pools", status: "pending" },
      { id: 5, name: "Interact with dApps", status: "pending" },
    ],
    sui: [
      { id: 1, name: "Connect to Sui Network", status: "pending" },
      { id: 2, name: "Claim Sui testnet tokens", status: "pending" },
      { id: 3, name: "Execute transactions", status: "pending" },
      { id: 4, name: "Stake SUI tokens", status: "pending" },
      { id: 5, name: "Use Sui dApps", status: "pending" },
    ],
    aptos: [
      { id: 1, name: "Connect to Aptos Network", status: "pending" },
      { id: 2, name: "Claim APT testnet tokens", status: "pending" },
      { id: 3, name: "Execute transactions", status: "pending" },
      { id: 4, name: "Provide liquidity on DEXes", status: "pending" },
      { id: 5, name: "Interact with Aptos NFTs", status: "pending" },
    ],
    scroll: [
      { id: 1, name: "Connect to Scroll Network", status: "pending" },
      { id: 2, name: "Bridge ETH to Scroll", status: "pending" },
      { id: 3, name: "Swap tokens on DEXes", status: "pending" },
      { id: 4, name: "Mint NFTs on Scroll", status: "pending" },
      { id: 5, name: "Test cross-chain messaging", status: "pending" },
    ],
  };

  const handleStartFarming = () => {
    if (!walletAddress) return;
    
    setIsFarming(true);
    setFarmingSteps(chainSteps[selectedChain]);
    setFarmingLogs([
      {
        id: 1,
        message: `Starting auto-farming on ${chains.find(c => c.id === selectedChain)?.name}...`,
        timestamp: new Date().toLocaleTimeString(),
        type: "info"
      }
    ]);
    
    // Simulate farming process with timeouts
    let stepIndex = 0;
    const runStep = () => {
      if (stepIndex >= chainSteps[selectedChain].length) {
        setIsFarming(false);
        setFarmingLogs(prev => [
          ...prev,
          {
            id: prev.length + 1,
            message: "Farming completed successfully!",
            timestamp: new Date().toLocaleTimeString(),
            type: "success"
          }
        ]);
        return;
      }
      
      // Update current step to running
      setFarmingSteps(prev => 
        prev.map((step, idx) => 
          idx === stepIndex ? { ...step, status: "running" } : step
        )
      );
      
      setFarmingLogs(prev => [
        ...prev,
        {
          id: prev.length + 1,
          message: `Running step: ${chainSteps[selectedChain][stepIndex].name}...`,
          timestamp: new Date().toLocaleTimeString(),
          type: "info"
        }
      ]);
      
      // Simulate step execution time (1-3 seconds)
      const executionTime = Math.floor(Math.random() * 2000) + 1000;
      
      setTimeout(() => {
        // Randomly succeed or fail (90% success rate)
        const isSuccess = Math.random() > 0.1;
        
        setFarmingSteps(prev => 
          prev.map((step, idx) => 
            idx === stepIndex ? { 
              ...step, 
              status: isSuccess ? "completed" : "failed",
              details: isSuccess ? undefined : "Transaction failed. Will retry..."
            } : step
          )
        );
        
        setFarmingLogs(prev => [
          ...prev,
          {
            id: prev.length + 1,
            message: isSuccess 
              ? `Successfully completed: ${chainSteps[selectedChain][stepIndex].name}` 
              : `Failed: ${chainSteps[selectedChain][stepIndex].name}. Retrying...`,
            timestamp: new Date().toLocaleTimeString(),
            type: isSuccess ? "success" : "error"
          }
        ]);
        
        // If failed, retry after 1 second
        if (!isSuccess) {
          setTimeout(() => {
            setFarmingSteps(prev => 
              prev.map((step, idx) => 
                idx === stepIndex ? { 
                  ...step, 
                  status: "completed",
                  details: undefined
                } : step
              )
            );
            
            setFarmingLogs(prev => [
              ...prev,
              {
                id: prev.length + 1,
                message: `Retry successful: ${chainSteps[selectedChain][stepIndex].name}`,
                timestamp: new Date().toLocaleTimeString(),
                type: "success"
              }
            ]);
            
            stepIndex++;
            runStep();
          }, 1000);
        } else {
          stepIndex++;
          runStep();
        }
      }, executionTime);
    };
    
    runStep();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-gray-100 text-gray-800";
      case "running": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case "info": return <ChevronRight className="h-4 w-4 text-gray-500" />;
      case "success": return <Check className="h-4 w-4 text-green-500" />;
      case "error": return <Workflow className="h-4 w-4 text-red-500" />;
      default: return <ChevronRight className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Testnet Farming</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Automate your testnet activity across multiple chains to maximize airdrop potential.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5 text-scryptex-blue" />
                Farming Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Select Chain</h3>
                <div className="grid grid-cols-2 gap-3">
                  {chains.map((chain) => (
                    <button
                      key={chain.id}
                      className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${
                        selectedChain === chain.id
                          ? "border-scryptex-blue bg-scryptex-light"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedChain(chain.id as Chain)}
                    >
                      <img src={chain.logo} alt={chain.name} className="h-10 w-10 mb-2" />
                      <span className="text-sm font-medium">{chain.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <Input 
                  label="Wallet Address" 
                  placeholder="Enter your wallet address" 
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  fullWidth
                />
              </div>

              <Button 
                onClick={handleStartFarming}
                disabled={!walletAddress || isFarming}
                className="bg-scryptex-blue hover:bg-scryptex-dark text-white w-full"
                isLoading={isFarming}
                icon={<PlayCircle className="h-5 w-5" />}
              >
                {isFarming ? "Farming In Progress..." : "Start Auto Farming"}
              </Button>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
                <p className="flex items-center mb-2">
                  <Coins className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                  <span className="font-medium">Auto Farming Benefits:</span>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-1">
                  <li>Automated transactions on testnet</li>
                  <li>Natural on-chain activity patterns</li>
                  <li>Interaction with key dApps</li>
                  <li>Higher chance for airdrops</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {farmingSteps.length > 0 && (
            <Card className="mb-6">
              <CardHeader className="border-b">
                <CardTitle>Farming Progress</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {farmingSteps.map((step, index) => (
                    <div 
                      key={step.id} 
                      className={`flex items-center justify-between p-4 ${
                        step.status === "running" ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full mr-3 flex-shrink-0">
                          {step.status === "completed" ? (
                            <div className="bg-green-100 rounded-full p-1">
                              <Check className="h-6 w-6 text-green-600" />
                            </div>
                          ) : step.status === "running" ? (
                            <div className="animate-pulse bg-blue-100 rounded-full p-1">
                              <PlayCircle className="h-6 w-6 text-blue-600" />
                            </div>
                          ) : (
                            <div className="bg-gray-100 rounded-full p-1">
                              <span className="h-6 w-6 flex items-center justify-center font-medium text-gray-600">
                                {index + 1}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{step.name}</p>
                          {step.details && <p className="text-sm text-red-500">{step.details}</p>}
                        </div>
                      </div>
                      <Badge className={getStatusColor(step.status)}>
                        {step.status === "pending" && "Pending"}
                        {step.status === "running" && "Running"}
                        {step.status === "completed" && "Completed"}
                        {step.status === "failed" && "Failed"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {farmingLogs.length > 0 && (
            <Card>
              <CardHeader className="border-b">
                <div className="flex justify-between items-center">
                  <CardTitle>Farming Logs</CardTitle>
                  <Badge variant="outline" className="text-scryptex-blue border-scryptex-blue">
                    {isFarming ? "Running" : "Completed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  <div className="divide-y">
                    {farmingLogs.map((log) => (
                      <div key={log.id} className="p-3 flex">
                        <div className="mr-3 mt-1">
                          {getLogIcon(log.type)}
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm">{log.message}</p>
                          <p className="text-xs text-gray-500">{log.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Farming;
