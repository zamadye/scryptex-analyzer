
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDownToLine, ArrowUpFromLine, Zap } from "lucide-react";

interface Transaction {
  type: 'topup' | 'use';
  credits: number;
  method?: string;
  price?: number;
  date: string;
  package?: string;
  action?: string;
}

export function CreditHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return JSON.parse(localStorage.getItem('creditTransactions') || '[]');
  });
  
  // Listen for updates to credit transactions
  useState(() => {
    const handleStorageChange = () => {
      setTransactions(JSON.parse(localStorage.getItem('creditTransactions') || '[]'));
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit History</CardTitle>
        <CardDescription>View your credit transactions history</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="topup">Top Ups</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <TransactionTable transactions={transactions} />
          </TabsContent>
          
          <TabsContent value="topup">
            <TransactionTable transactions={transactions.filter(t => t.type === 'topup')} />
          </TabsContent>
          
          <TabsContent value="usage">
            <TransactionTable transactions={transactions.filter(t => t.type === 'use')} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function TransactionTable({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No transactions found
      </div>
    );
  }
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {transaction.type === 'topup' ? (
                    <>
                      <div className="bg-green-100 p-2 rounded-full">
                        <ArrowDownToLine className="h-4 w-4 text-green-600" />
                      </div>
                      <span>Top Up</span>
                    </>
                  ) : (
                    <>
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Zap className="h-4 w-4 text-blue-600" />
                      </div>
                      <span>Usage</span>
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span className={transaction.type === 'topup' ? 'text-green-600 font-medium' : 'text-blue-600 font-medium'}>
                  {transaction.type === 'topup' ? '+' : '-'}{transaction.credits}
                </span>
              </TableCell>
              <TableCell>
                {transaction.type === 'topup' ? (
                  <div>
                    <div>{transaction.package} Package</div>
                    <div className="text-sm text-gray-500">Via {transaction.method}</div>
                    {transaction.price && <div className="text-sm text-gray-500">${transaction.price}</div>}
                  </div>
                ) : (
                  <div>
                    <div>{transaction.action || 'AI Action'}</div>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                {formatDistanceToNow(new Date(transaction.date), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
