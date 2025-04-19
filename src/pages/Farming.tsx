
import { useState } from "react";
import { Wallet, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Input } from "@/components/ui/inputui";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { useToast } from "@/hooks/use-toast";

export default function Farming() {
  const { isLoggedIn, user, updateUser } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectWebsite, setProjectWebsite] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isFarming, setIsFarming] = useState(false);
  const [tasks, setTasks] = useState<{id: string; name: string; type: string; status: 'pending' | 'completed' | 'failed'}[]>([]);
  const { toast } = useToast();

  const connectWallet = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    // Simulate wallet connection
    setIsWalletConnected(true);
    // Generate random wallet address
    const randomWallet = "0x" + Array.from({length: 40}, () => 
      Math.floor(Math.random() * 16).toString(16)).join('');
    setWalletAddress(randomWallet);
    
    toast({
      title: "Wallet Connected",
      description: `Connected to ${randomWallet.slice(0, 6)}...${randomWallet.slice(-4)}`,
    });
  };

  const analyzeProject = () => {
    if (!projectName || !projectWebsite) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Generate random tasks
      const taskTypes = ['NFT Mint', 'Token Swap', 'Bridge', 'Stake', 'Add Liquidity'];
      const newTasks = Array.from({length: 3 + Math.floor(Math.random() * 3)}, (_, i) => ({
        id: `task-${i}`,
        name: `${taskTypes[Math.floor(Math.random() * taskTypes.length)]} - Task ${i+1}`,
        type: taskTypes[Math.floor(Math.random() * taskTypes.length)],
        status: 'pending' as 'pending' | 'completed' | 'failed'
      }));
      
      setTasks(newTasks);
      
      // Update user's farmed projects
      if (user) {
        const updatedProjects = [...(user.farmedProjects || [])];
        if (!updatedProjects.includes(projectName)) {
          updatedProjects.push(projectName);
          updateUser({ farmedProjects: updatedProjects });
        }
      }
      
      toast({
        title: "Project Analyzed",
        description: `Found ${newTasks.length} tasks to farm for ${projectName}`,
      });
    }, 2000);
  };

  const startFarming = () => {
    setIsFarming(true);
    
    // Simulate task completion
    let completedCount = 0;
    
    const interval = setInterval(() => {
      if (completedCount >= tasks.length) {
        clearInterval(interval);
        setIsFarming(false);
        
        toast({
          title: "Farming Complete",
          description: `Successfully completed ${completedCount} tasks for ${projectName}`,
        });
        return;
      }
      
      setTasks(prevTasks => {
        const newTasks = [...prevTasks];
        newTasks[completedCount].status = Math.random() > 0.2 ? 'completed' : 'failed';
        return newTasks;
      });
      
      completedCount++;
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Onchain Farming</h1>
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <Wallet className="h-4 w-4" />
          <span>Uses 5 credits per task</span>
        </div>
      </div>

      {!isLoggedIn && (
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Automate Your Testnet Farming</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Detect and complete testnet tasks automatically across multiple blockchains to maximize your airdrop potential. Login to use this feature.
          </p>
          <Button onClick={() => setShowAuthModal(true)}>
            Login to Continue
          </Button>
        </Card>
      )}

      {isLoggedIn && !isWalletConnected && (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Connect your wallet to start farming tasks across multiple chains
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <Wallet className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="mb-6 text-gray-600">
              Your wallet will be used to execute tasks on testnet chains.
              No funds will be taken from your wallet without your approval.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button size="lg" onClick={connectWallet}>
              Connect Wallet
            </Button>
          </CardFooter>
        </Card>
      )}

      {isWalletConnected && (
        <>
          <Card className="border-green-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Wallet Connected</CardTitle>
                <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Connected
                </div>
              </div>
              <CardDescription>
                {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Enter the project details to analyze available tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name</label>
                  <Input
                    placeholder="e.g. Arbitrum, ZKSync"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website URL</label>
                  <Input
                    placeholder="https://example.com"
                    value={projectWebsite}
                    onChange={(e) => setProjectWebsite(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={analyzeProject} 
                disabled={isAnalyzing || !projectName || !projectWebsite}
                className="w-full sm:w-auto"
              >
                {isAnalyzing ? (
                  <>Analyzing Project<span className="ml-2 animate-pulse">...</span></>
                ) : (
                  <>Analyze Project<ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </CardFooter>
          </Card>

          {tasks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Available Tasks</CardTitle>
                <CardDescription>
                  Detected {tasks.length} tasks for {projectName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`flex justify-between items-center p-4 rounded-lg border ${
                        task.status === 'completed' ? 'bg-green-50 border-green-200' :
                        task.status === 'failed' ? 'bg-red-50 border-red-200' :
                        'bg-white border-gray-200'
                      }`}
                    >
                      <div>
                        <h4 className="font-medium">{task.name}</h4>
                        <p className="text-sm text-gray-500">Type: {task.type}</p>
                      </div>
                      <div>
                        {task.status === 'pending' && (
                          <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                            Pending
                          </span>
                        )}
                        {task.status === 'completed' && (
                          <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </span>
                        )}
                        {task.status === 'failed' && (
                          <span className="px-3 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-full flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Failed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={startFarming} 
                  disabled={isFarming || tasks.every(t => t.status !== 'pending')}
                  className="w-full sm:w-auto"
                >
                  {isFarming ? (
                    <>Farming Tasks<span className="ml-2 animate-pulse">...</span></>
                  ) : tasks.every(t => t.status !== 'pending') ? (
                    'All Tasks Processed'
                  ) : (
                    'Start Farming'
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
