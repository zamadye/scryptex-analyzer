
import { useState, useEffect } from "react";
import { Check, PlayCircle, Settings, ChevronRight, Coins, Workflow, PlusCircle, Copy, ExternalLink, LayoutList, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/inputui";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/cardui";
import { AddChainModal, ChainInfo } from "@/components/farming/AddChainModal";
import { ProjectTaskCard, TaskType } from "@/components/ui/ProjectTaskCard";
import { useToast } from "@/hooks/use-toast";
import { CreditManager } from "@/components/common/CreditPanel";

type Chain = "zksync" | "sui" | "aptos" | "scroll" | "opbnb" | "berachain" | string;

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
  const { toast } = useToast();
  
  // State for chain management
  const [selectedChain, setSelectedChain] = useState<Chain>("zksync");
  const [chains, setChains] = useState<ChainInfo[]>([
    { id: "zksync", name: "zkSync Era", rpcUrl: "https://mainnet.era.zksync.io", chainId: "324", symbol: "ETH", explorerUrl: "https://explorer.zksync.io", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
    { id: "sui", name: "Sui", rpcUrl: "https://sui-mainnet-rpc.allthatnode.com", chainId: "1", symbol: "SUI", explorerUrl: "https://explorer.sui.io", logo: "https://cryptologos.cc/logos/sui-sui-logo.svg" },
    { id: "aptos", name: "Aptos", rpcUrl: "https://fullnode.mainnet.aptoslabs.com", chainId: "1", symbol: "APT", explorerUrl: "https://explorer.aptoslabs.com", logo: "https://cryptologos.cc/logos/aptos-apt-logo.svg" },
    { id: "scroll", name: "Scroll", rpcUrl: "https://rpc.scroll.io", chainId: "534352", symbol: "ETH", explorerUrl: "https://scrollscan.com", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
    { id: "opbnb", name: "opBNB", rpcUrl: "https://opbnb-mainnet-rpc.bnbchain.org", chainId: "204", symbol: "BNB", explorerUrl: "https://opbnb.bscscan.com", logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg" },
    { id: "berachain", name: "Berachain", rpcUrl: "https://rpc.berachain-internal.com", chainId: "80085", symbol: "BERA", explorerUrl: "https://explorer.berachain-internal.com", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" },
  ]);
  
  // State for chain modal
  const [showAddChainModal, setShowAddChainModal] = useState(false);
  
  // State for main farming inputs
  const [walletAddress, setWalletAddress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFarming, setIsFarming] = useState(false);
  const [farmingSteps, setFarmingSteps] = useState<FarmingStep[]>([]);
  const [farmingLogs, setFarmingLogs] = useState<FarmingLog[]>([]);
  
  // State for tasks and balance
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [isCheckingBalance, setIsCheckingBalance] = useState(false);
  const [projectSaved, setProjectSaved] = useState(false);
  
  // Handle adding a new chain
  const handleAddChain = (chain: ChainInfo) => {
    setChains([...chains, chain]);
    setShowAddChainModal(false);
  };
  
  // Handle checking wallet balance
  const handleCheckBalance = () => {
    if (!walletAddress) {
      toast({
        title: "Missing Information",
        description: "Please enter a wallet address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCheckingBalance(true);
    setWalletBalance(null);
    
    // Simulate API call
    setTimeout(() => {
      // Random balance between 0 and 0.2 ETH
      const randomBalance = Math.random() * 0.2;
      setWalletBalance(randomBalance);
      setIsCheckingBalance(false);
      
      toast({
        title: "Balance Checked",
        description: `Wallet balance: ${randomBalance.toFixed(4)} ${chains.find(c => c.id === selectedChain)?.symbol || "ETH"}`,
      });
    }, 1000);
  };
  
  // Handle analyzing project tasks
  const handleAnalyzeProject = () => {
    if (!projectName) {
      toast({
        title: "Missing Information",
        description: "Please enter a project name.",
        variant: "destructive",
      });
      return;
    }
    
    // Try to use a credit
    if (!CreditManager.useCredit(1)) {
      toast({
        title: "Insufficient Credits",
        description: "You don't have enough credits to perform this action.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setTasks([]);
    setWalletBalance(null);
    
    // Simulate API call
    setTimeout(() => {
      const dummyTasks: TaskType[] = [
        {
          id: "1",
          name: "Mint NFT on TestnetNFT.xyz",
          type: "NFT",
          status: "pending",
          required: true,
          gasCost: "~0.0015 ETH",
        },
        {
          id: "2",
          name: "Swap tokens on TestSwap.xyz",
          type: "DEX",
          status: "pending",
          required: true,
          gasCost: "~0.0025 ETH",
        },
        {
          id: "3",
          name: "Add liquidity to TestPool.xyz",
          type: "DEX",
          status: "pending",
          required: false,
          gasCost: "~0.0035 ETH",
        },
        {
          id: "4",
          name: "Bridge assets from Ethereum",
          type: "Bridge",
          status: "pending",
          required: true,
          gasCost: "~0.004 ETH",
        },
        {
          id: "5",
          name: "Deploy sample contract",
          type: "Contract",
          status: "pending",
          required: false,
          gasCost: "~0.008 ETH",
        },
      ];
      
      setTasks(dummyTasks);
      setIsAnalyzing(false);
      
      toast({
        title: "Tasks Analyzed",
        description: `Found ${dummyTasks.length} tasks for ${projectName} on ${chains.find(c => c.id === selectedChain)?.name}.`,
      });
    }, 2000);
  };
  
  // Handle starting auto farming
  const handleStartFarming = () => {
    if (tasks.length === 0) return;
    
    // Check if balance is sufficient (minimum 0.001)
    if (walletBalance !== null && walletBalance < 0.001) {
      toast({
        title: "Insufficient Balance",
        description: "Please top up your wallet before farming.",
        variant: "destructive",
      });
      return;
    }
    
    // Try to use a credit
    if (!CreditManager.useCredit(2)) {
      toast({
        title: "Insufficient Credits",
        description: "You need 2 credits to start farming.",
        variant: "destructive",
      });
      return;
    }
    
    setIsFarming(true);
    setFarmingLogs([
      {
        id: 1,
        message: `Starting auto-farming on ${chains.find(c => c.id === selectedChain)?.name} for ${projectName}...`,
        timestamp: new Date().toLocaleTimeString(),
        type: "info"
      }
    ]);
    
    // Reset task status
    setTasks(tasks.map(task => ({ ...task, status: "pending" })));
    
    // Simulate farming process with timeouts
    let taskIndex = 0;
    const runTask = () => {
      if (taskIndex >= tasks.length) {
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
      
      // Update current task to running
      setTasks(prev => 
        prev.map((task, idx) => 
          idx === taskIndex ? { ...task, status: "running" } : task
        )
      );
      
      setFarmingLogs(prev => [
        ...prev,
        {
          id: prev.length + 1,
          message: `Running: ${tasks[taskIndex].name}...`,
          timestamp: new Date().toLocaleTimeString(),
          type: "info"
        }
      ]);
      
      // Simulate task execution time (2-5 seconds)
      const executionTime = Math.floor(Math.random() * 3000) + 2000;
      
      // Simulate progress updates
      let progress = 0;
      const progressInterval = setInterval(() => {
        if (progress < 90) {
          progress += 10;
          setTasks(prev => 
            prev.map((task, idx) => 
              idx === taskIndex ? { ...task, progress } : task
            )
          );
        }
      }, executionTime / 10);
      
      setTimeout(() => {
        clearInterval(progressInterval);
        
        // Randomly succeed or fail (90% success rate)
        const isSuccess = Math.random() > 0.1;
        
        setTasks(prev => 
          prev.map((task, idx) => 
            idx === taskIndex ? { 
              ...task, 
              status: isSuccess ? "completed" : "failed",
              details: isSuccess ? undefined : "Transaction failed. Will retry...",
              progress: 100
            } : task
          )
        );
        
        setFarmingLogs(prev => [
          ...prev,
          {
            id: prev.length + 1,
            message: isSuccess 
              ? `Successfully completed: ${tasks[taskIndex].name}` 
              : `Failed: ${tasks[taskIndex].name}. Retrying...`,
            timestamp: new Date().toLocaleTimeString(),
            type: isSuccess ? "success" : "error"
          }
        ]);
        
        // If failed, retry after 1 second
        if (!isSuccess) {
          setTimeout(() => {
            setTasks(prev => 
              prev.map((task, idx) => 
                idx === taskIndex ? { 
                  ...task, 
                  status: "completed",
                  details: undefined
                } : task
              )
            );
            
            setFarmingLogs(prev => [
              ...prev,
              {
                id: prev.length + 1,
                message: `Retry successful: ${tasks[taskIndex].name}`,
                timestamp: new Date().toLocaleTimeString(),
                type: "success"
              }
            ]);
            
            taskIndex++;
            runTask();
          }, 1500);
        } else {
          taskIndex++;
          runTask();
        }
      }, executionTime);
    };
    
    runTask();
  };
  
  // Handle saving project to farming list
  const handleSaveProject = () => {
    if (!projectName || tasks.length === 0) return;
    
    // Simulate saving
    setTimeout(() => {
      setProjectSaved(true);
      
      toast({
        title: "Project Saved",
        description: `${projectName} has been added to your farming list.`,
      });
    }, 500);
  };
  
  // Copy faucet URL to clipboard
  const handleCopyFaucetUrl = () => {
    const faucetUrl = `https://${selectedChain}-faucet.xyz`;
    navigator.clipboard.writeText(faucetUrl);
    
    toast({
      title: "Copied",
      description: "Faucet URL copied to clipboard.",
    });
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
      <div className="text-center mb-12 animate-in fade-in duration-300">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Testnet Farming</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Automate your testnet activity across multiple chains to maximize airdrop potential.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="animate-in fade-in slide-in-from-left-8 duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5 text-scryptex-blue" />
                Farming Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Input 
                  label="Project Name" 
                  placeholder="e.g. ZKSync Testnet" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  fullWidth
                  className="mb-4"
                />
                
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Testnet Chain
                </label>
                <div className="flex mb-2">
                  <select 
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-scryptex-blue focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 mr-2"
                    value={selectedChain}
                    onChange={(e) => setSelectedChain(e.target.value as Chain)}
                  >
                    {chains.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    onClick={() => setShowAddChainModal(true)}
                    className="flex-shrink-0 bg-scryptex-light text-scryptex-blue hover:bg-blue-100"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>

              <Button 
                onClick={handleAnalyzeProject}
                disabled={!projectName || isAnalyzing}
                className="w-full bg-scryptex-blue hover:bg-scryptex-dark text-white mb-6"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Tasks...
                  </>
                ) : (
                  "Analyze Onchain Tasks"
                )}
              </Button>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
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
              
              {tasks.length > 0 && (
                <div className="space-y-4">
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <ExternalLink className="h-4 w-4 mr-1 text-scryptex-blue" />
                      Faucet URL
                    </h3>
                    <div className="flex">
                      <Input
                        value={`https://${selectedChain}-faucet.xyz`}
                        readOnly
                        className="text-sm bg-gray-50"
                      />
                      <Button 
                        onClick={handleCopyFaucetUrl}
                        className="ml-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Input 
                      label="Your Wallet Address" 
                      placeholder="0x..." 
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      fullWidth
                    />
                    <div className="flex justify-between mt-2">
                      <Button 
                        onClick={handleCheckBalance}
                        disabled={!walletAddress || isCheckingBalance}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        {isCheckingBalance ? (
                          <>
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            Checking...
                          </>
                        ) : (
                          "Check Balance"
                        )}
                      </Button>
                      
                      {walletBalance !== null && (
                        <div className={`flex items-center text-xs ${walletBalance < 0.001 ? 'text-red-600' : 'text-green-600'}`}>
                          {walletBalance < 0.001 ? (
                            <>
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Low Balance: {walletBalance.toFixed(4)}
                            </>
                          ) : (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Balance OK: {walletBalance.toFixed(4)}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {walletBalance !== null && walletBalance < 0.001 && (
                      <div className="mt-2 p-2 bg-red-50 text-red-800 text-xs rounded border border-red-200">
                        Top up needed before farming
                      </div>
                    )}
                    
                    {walletBalance !== null && walletBalance >= 0.001 && (
                      <div className="mt-2 p-2 bg-green-50 text-green-800 text-xs rounded border border-green-200">
                        Ready to farm
                      </div>
                    )}
                  </div>
                  
                  {!isFarming && tasks.length > 0 && (
                    <Button 
                      onClick={handleStartFarming}
                      disabled={walletBalance === null || walletBalance < 0.001}
                      className="w-full bg-scryptex-blue hover:bg-scryptex-dark text-white"
                      icon={<PlayCircle className="h-5 w-5" />}
                    >
                      Start Auto Farming
                    </Button>
                  )}
                  
                  {tasks.some(task => task.status === "completed") && !projectSaved && (
                    <Button 
                      onClick={handleSaveProject}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <LayoutList className="h-4 w-4 mr-2" />
                      Save Project to Farming List
                    </Button>
                  )}
                  
                  {projectSaved && (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm text-green-800">Project saved to your list</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Daily farming enabled
                      </Badge>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {tasks.length > 0 && (
            <Card className="mb-6 animate-in fade-in slide-in-from-right-8 duration-300">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Task List: {projectName}</CardTitle>
                <Badge className="ml-2 bg-scryptex-blue text-white">
                  {chains.find(c => c.id === selectedChain)?.name}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <ProjectTaskCard 
                      key={task.id} 
                      task={task} 
                      isRunning={task.status === "running"}
                      progress={task.progress}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {farmingLogs.length > 0 && (
            <Card className="animate-in fade-in slide-in-from-bottom-8 duration-300">
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
              {!isFarming && farmingLogs.length > 0 && (
                <CardFooter className="border-t bg-gray-50 py-3">
                  <div className="text-sm text-gray-600 flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    All tasks completed for {projectName}
                  </div>
                </CardFooter>
              )}
            </Card>
          )}
        </div>
      </div>
      
      <AddChainModal
        isOpen={showAddChainModal}
        onClose={() => setShowAddChainModal(false)}
        onAddChain={handleAddChain}
      />
    </div>
  );
};

export default Farming;
