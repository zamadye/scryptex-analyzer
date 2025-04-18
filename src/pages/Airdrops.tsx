
import { useState } from "react";
import { Gift, PlusCircle, Calendar, Globe, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/inputui";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useXP } from "@/context/XPContext";
import { useNotifications } from "@/context/NotificationContext";
import { useLanguage } from "@/context/LanguageContext";
import { Airdrop } from "@/types/airdrop";

export default function Airdrops() {
  const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
  const [newAirdrop, setNewAirdrop] = useState({
    link: "",
    projectName: "",
    deadline: "",
    description: "",
    chain: "Ethereum"
  });
  const [isOpen, setIsOpen] = useState(false);
  const { addXP } = useXP();
  const { addNotification } = useNotifications();
  const { t } = useLanguage();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAirdrop(prev => ({ ...prev, [name]: value }));
  };

  const handleChainChange = (value: string) => {
    setNewAirdrop(prev => ({ ...prev, chain: value }));
  };

  const handleAddAirdrop = () => {
    // Ensure all required fields are provided
    if (!newAirdrop.projectName || !newAirdrop.link || !newAirdrop.deadline) {
      addNotification({
        title: t('missingFields'),
        message: t('pleaseCompleteAllRequiredFields'),
        type: 'error'
      });
      return;
    }

    const airdrop: Airdrop = {
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      projectName: newAirdrop.projectName,
      link: newAirdrop.link,
      deadline: newAirdrop.deadline,
      description: newAirdrop.description,
      chain: newAirdrop.chain
    };

    setAirdrops(prev => [airdrop, ...prev]);
    
    // Add XP and notify user
    addXP(1, `Saved ${airdrop.projectName} airdrop`);
    addNotification({
      title: t('airdropSaved'),
      message: `${airdrop.projectName} ${t('airdropAddedToYourList')}`,
      type: 'success'
    });
    
    // Reset form and close dialog
    setNewAirdrop({
      link: "",
      projectName: "",
      deadline: "",
      description: "",
      chain: "Ethereum"
    });
    setIsOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('airdrops')}</h1>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('addAirdrop')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('addNewAirdrop')}</DialogTitle>
              <DialogDescription>
                {t('addAirdropDescription')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="projectName">{t('projectName')} *</Label>
                <Input
                  id="projectName"
                  name="projectName"
                  value={newAirdrop.projectName}
                  onChange={handleInputChange}
                  placeholder="Sui Network"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="link">{t('link')} *</Label>
                <Input
                  id="link"
                  name="link"
                  value={newAirdrop.link}
                  onChange={handleInputChange}
                  placeholder="https://galxe.com/sui/campaign/..."
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="deadline">{t('deadline')} *</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={newAirdrop.deadline}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="chain">{t('chain')}</Label>
                <Select 
                  value={newAirdrop.chain} 
                  onValueChange={handleChainChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectChain')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ethereum">Ethereum</SelectItem>
                    <SelectItem value="Polygon">Polygon</SelectItem>
                    <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="Optimism">Optimism</SelectItem>
                    <SelectItem value="Base">Base</SelectItem>
                    <SelectItem value="Solana">Solana</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">{t('description')}</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={newAirdrop.description}
                  onChange={handleInputChange}
                  placeholder={t('airdropDescriptionPlaceholder')}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddAirdrop}>
                {t('saveAirdrop')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {airdrops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {airdrops.map((airdrop) => (
            <Card key={airdrop.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30">
                    <Gift className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <CardTitle className="mt-4">{airdrop.projectName}</CardTitle>
                <CardDescription className="mt-1 line-clamp-2">
                  {airdrop.description || t('noDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <a 
                      href={airdrop.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline truncate"
                    >
                      {airdrop.link}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{airdrop.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span>{airdrop.chain}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full">
                  {t('viewDetails')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Gift className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{t('noAirdropsYet')}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-md mx-auto">
            {t('noAirdropsDescription')}
          </p>
        </div>
      )}
    </div>
  );
}
