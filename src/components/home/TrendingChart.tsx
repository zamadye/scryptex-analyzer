
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowUp, ArrowDown, BarChart2 } from "lucide-react";

interface TrendingProject {
  name: string;
  searches: number;
  change: number;
}

export const TrendingChart = () => {
  const [data, setData] = useState<TrendingProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for trending projects
    const loadData = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const dummyData: TrendingProject[] = [
          { name: "zkSync", searches: 1250, change: 23 },
          { name: "Arbitrum", searches: 980, change: -5 },
          { name: "Blast", searches: 870, change: 48 },
          { name: "Sui", searches: 750, change: 12 },
          { name: "Scroll", searches: 680, change: 15 },
          { name: "LayerZero", searches: 550, change: -8 },
          { name: "Taiko", searches: 490, change: 32 },
          { name: "StarkNet", searches: 420, change: -3 }
        ];
        
        setData(dummyData);
        setIsLoading(false);
      }, 1000);
    };
    
    loadData();
  }, []);

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-500" : "text-red-500";
  };

  const getBarColor = (index: number) => {
    const colors = [
      "#3366FF", "#59BAFF", "#7DCDFF", "#A1DFFF", "#C6F0FF",
      "#EBF7FF", "#DBECFF", "#CADEFF"
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-12 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center mb-2">
              <BarChart2 className="mr-2 h-6 w-6 text-scryptex-blue" />
              <h2 className="text-2xl font-bold text-gray-900">Explore What's Trending</h2>
            </div>
            <p className="text-gray-600">
              Most analyzed projects this week across the Scryptex platform
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-scryptex-blue"></div>
            </div>
          ) : (
            <>
              <div className="mb-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {data.slice(0, 4).map((project, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{project.name}</span>
                      <div className={`flex items-center ${getChangeColor(project.change)}`}>
                        {project.change >= 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        <span className="text-xs font-medium">{Math.abs(project.change)}%</span>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm">{project.searches} searches</div>
                  </div>
                ))}
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name"
                      tick={{ fontSize: 12, fill: '#666' }}
                      axisLine={{ stroke: '#eee' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#666' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => value.toLocaleString()}
                    />
                    <Tooltip
                      formatter={(value) => [new Intl.NumberFormat().format(Number(value)), "Searches"]}
                      itemStyle={{ color: '#3366FF' }}
                    />
                    <Bar dataKey="searches" radius={[4, 4, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
