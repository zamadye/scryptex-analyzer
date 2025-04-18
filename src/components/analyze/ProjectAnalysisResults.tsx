
import { FileText, Users, BarChart, Map as RoadMap, Wallet } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProjectAnalysisResults() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="about">
        <TabsList className="w-full grid grid-cols-5">
          <TabsTrigger value="about" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            <span>About</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </TabsTrigger>
          <TabsTrigger value="tokenomics" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            <span>Tokenomics</span>
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center">
            <RoadMap className="mr-2 h-4 w-4" />
            <span>Roadmap</span>
          </TabsTrigger>
          <TabsTrigger value="backers" className="flex items-center">
            <Wallet className="mr-2 h-4 w-4" />
            <span>Backers</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
              <CardDescription>Project overview and key details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Arbitrum is a layer 2 scaling solution for Ethereum that aims to improve the scalability and reduce the transaction costs of the Ethereum network while maintaining its security properties. It uses a technology called Optimistic Rollups to achieve this.
                </p>
                <p>Key features of Arbitrum include:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Full Ethereum Virtual Machine (EVM) compatibility, allowing Ethereum developers to deploy their existing smart contracts with minimal changes</li>
                  <li>Significantly lower gas fees compared to Ethereum mainnet</li>
                  <li>Higher transaction throughput while inheriting Ethereum's security</li>
                  <li>Support for all Ethereum tools (MetaMask, Hardhat, Truffle, etc.)</li>
                </ul>
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <div className="text-sm text-gray-500 mb-1">Source:</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">CoinMarketCap, Official Documentation</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Analysis</CardTitle>
              <CardDescription>Key team members and background</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20 text-gray-500">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-40" />
                <p>Team information will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tokenomics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tokenomics</CardTitle>
              <CardDescription>Token distribution and economics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20 text-gray-500">
                <BarChart className="h-16 w-16 mx-auto mb-4 opacity-40" />
                <p>Tokenomics data will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roadmap" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Roadmap</CardTitle>
              <CardDescription>Future plans and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20 text-gray-500">
                <RoadMap className="h-16 w-16 mx-auto mb-4 opacity-40" />
                <p>Roadmap information will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="backers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Backers & Investors</CardTitle>
              <CardDescription>Investment rounds and key backers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-20 text-gray-500">
                <Wallet className="h-16 w-16 mx-auto mb-4 opacity-40" />
                <p>Backer information will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
