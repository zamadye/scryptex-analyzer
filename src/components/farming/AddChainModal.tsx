
import { useState } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputui";
import { toast } from "@/hooks/use-toast";

interface AddChainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChain: (chain: ChainInfo) => void;
}

export interface ChainInfo {
  id: string;
  name: string;
  rpcUrl: string;
  chainId: string;
  symbol: string;
  explorerUrl: string;
  logo: string;
}

export const AddChainModal = ({ isOpen, onClose, onAddChain }: AddChainModalProps) => {
  const [name, setName] = useState("");
  const [rpcUrl, setRpcUrl] = useState("");
  const [chainId, setChainId] = useState("");
  const [symbol, setSymbol] = useState("");
  const [explorerUrl, setExplorerUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = "Chain name is required";
    if (!rpcUrl.trim()) newErrors.rpcUrl = "RPC URL is required";
    if (!chainId.trim()) newErrors.chainId = "Chain ID is required";
    else if (!/^\d+$/.test(chainId)) newErrors.chainId = "Chain ID must be a number";
    if (!symbol.trim()) newErrors.symbol = "Symbol is required";
    if (!explorerUrl.trim()) newErrors.explorerUrl = "Explorer URL is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newChain: ChainInfo = {
        id: Date.now().toString(),
        name,
        rpcUrl,
        chainId,
        symbol,
        explorerUrl,
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg" // Default logo
      };
      
      onAddChain(newChain);
      toast({
        title: "Chain Added",
        description: `${name} has been added successfully.`,
      });
      
      // Reset form
      setName("");
      setRpcUrl("");
      setChainId("");
      setSymbol("");
      setExplorerUrl("");
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Add New Chain</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Chain Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Arbitrum"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">RPC URL</label>
              <Input
                value={rpcUrl}
                onChange={(e) => setRpcUrl(e.target.value)}
                placeholder="e.g. https://arb1.arbitrum.io/rpc"
                className={errors.rpcUrl ? "border-red-500" : ""}
              />
              {errors.rpcUrl && <p className="text-red-500 text-xs mt-1">{errors.rpcUrl}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Chain ID</label>
              <Input
                value={chainId}
                onChange={(e) => setChainId(e.target.value)}
                placeholder="e.g. 42161"
                className={errors.chainId ? "border-red-500" : ""}
              />
              {errors.chainId && <p className="text-red-500 text-xs mt-1">{errors.chainId}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Token Symbol</label>
              <Input
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g. ETH, ARB"
                className={errors.symbol ? "border-red-500" : ""}
              />
              {errors.symbol && <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Explorer URL</label>
              <Input
                value={explorerUrl}
                onChange={(e) => setExplorerUrl(e.target.value)}
                placeholder="e.g. https://arbiscan.io"
                className={errors.explorerUrl ? "border-red-500" : ""}
              />
              {errors.explorerUrl && <p className="text-red-500 text-xs mt-1">{errors.explorerUrl}</p>}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-scryptex-blue hover:bg-scryptex-dark text-white">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Chain...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Chain
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
