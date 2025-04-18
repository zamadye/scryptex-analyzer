
import { useState } from "react";
import { Gift, Plus, Calendar, Link2, Search, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputui";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useXP } from "@/context/XPContext";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";

const AddAirdropSchema = z.object({
  projectName: z.string().min(1, { message: "Project name is required" }),
  link: z.string().url({ message: "Must be a valid URL" }),
  deadline: z.string().min(1, { message: "Deadline is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  chain: z.string().min(1, { message: "Chain is required" }),
});

type AirdropFormValues = z.infer<typeof AddAirdropSchema>;

interface Airdrop {
  id: string;
  projectName: string;
  link: string;
  deadline: string;
  description: string;
  chain: string;
  savedAt: string;
}

export default function Airdrops() {
  const [airdrops, setAirdrops] = useState<Airdrop[]>(() => {
    const saved = localStorage.getItem("savedAirdrops");
    return saved ? JSON.parse(saved) : [];
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterChain, setFilterChain] = useState<string | null>(null);
  const { addXP } = useXP();
  const { t } = useLanguage();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<AirdropFormValues>({
    resolver: zodResolver(AddAirdropSchema),
    defaultValues: {
      projectName: "",
      link: "",
      deadline: "",
      description: "",
      chain: "",
    }
  });

  const onSubmit = (data: AirdropFormValues) => {
    const newAirdrop: Airdrop = {
      ...data,
      id: Date.now().toString(),
      savedAt: new Date().toISOString()
    };
    
    const updatedAirdrops = [...airdrops, newAirdrop];
    setAirdrops(updatedAirdrops);
    localStorage.setItem("savedAirdrops", JSON.stringify(updatedAirdrops));
    
    // Add XP
    addXP(1, `Saved ${data.projectName} airdrop`);
    
    // Close dialog and reset form
    setIsDialogOpen(false);
    reset();
  };
  
  const chains = [
    "Ethereum", 
    "Polygon", 
    "Arbitrum", 
    "Optimism", 
    "Base", 
    "ZKSync", 
    "Scroll", 
    "Berachain", 
    "Linea", 
    "Blast"
  ];
  
  const filteredAirdrops = airdrops.filter(airdrop => {
    const matchesSearch = airdrop.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          airdrop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChain = !filterChain || airdrop.chain === filterChain;
    
    return matchesSearch && matchesChain;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('airdrops')}</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {t('addAirdrop')}
        </Button>
      </div>
      
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('searchAirdrops')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterChain || ""} onValueChange={(value) => setFilterChain(value || null)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={t('filterByChain')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">{t('allChains')}</SelectItem>
            {chains.map(chain => (
              <SelectItem key={chain} value={chain}>{chain}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Airdrops Grid */}
      {filteredAirdrops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAirdrops.map(airdrop => (
            <Card key={airdrop.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle>{airdrop.projectName}</CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                    {airdrop.chain}
                  </Badge>
                </div>
                <CardDescription className="mt-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {t('deadline')}: {airdrop.deadline}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {airdrop.description}
                </p>
              </CardContent>
              <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 flex justify-between">
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Gift className="h-3 w-3 mr-1" />
                  {t('saved')}: {new Date(airdrop.savedAt).toLocaleDateString()}
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a href={airdrop.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {t('visit')}
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-50 dark:bg-gray-800/30 border-dashed">
          <CardContent className="py-10 flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
              <Gift className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">{t('noAirdrops')}</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
              {t('noAirdropsDescription')}
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t('addFirstAirdrop')}
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Add Airdrop Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t('addNewAirdrop')}</DialogTitle>
            <DialogDescription>
              {t('addNewAirdropDescription')}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('projectName')}</label>
              <Controller
                control={control}
                name="projectName"
                render={({ field }) => (
                  <Input {...field} placeholder="e.g. ZKSync, Arbitrum" />
                )}
              />
              {errors.projectName && (
                <p className="text-sm text-red-500">{errors.projectName.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('link')}</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Controller
                  control={control}
                  name="link"
                  render={({ field }) => (
                    <Input {...field} className="pl-9" placeholder="https://example.com" />
                  )}
                />
              </div>
              {errors.link && (
                <p className="text-sm text-red-500">{errors.link.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('deadline')}</label>
                <Controller
                  control={control}
                  name="deadline"
                  render={({ field }) => (
                    <Input {...field} placeholder="e.g. May 30, 2025" />
                  )}
                />
                {errors.deadline && (
                  <p className="text-sm text-red-500">{errors.deadline.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('chain')}</label>
                <Controller
                  control={control}
                  name="chain"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectChain')} />
                      </SelectTrigger>
                      <SelectContent>
                        {chains.map(chain => (
                          <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.chain && (
                  <p className="text-sm text-red-500">{errors.chain.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('description')}</label>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea 
                    {...field} 
                    placeholder={t('describeAirdrop')}
                    className="min-h-[100px]"
                  />
                )}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsDialogOpen(false);
                  reset();
                }}
              >
                {t('cancel')}
              </Button>
              <Button type="submit">
                <Plus className="h-4 w-4 mr-2" />
                {t('addAirdrop')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
