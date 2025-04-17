
import { ArrowRight, Search, BarChart3, Rocket, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

export const StepFlowSection = () => {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-scryptex-blue" />,
      title: "Analyze Projects",
      description: "Research crypto projects using AI and on-chain data to identify high-potential opportunities.",
      delay: 0
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-scryptex-blue" />,
      title: "Track Airdrops",
      description: "Monitor upcoming airdrops and check your eligibility based on on-chain activity.",
      delay: 100
    },
    {
      icon: <Rocket className="h-10 w-10 text-scryptex-blue" />,
      title: "Auto Farm Testnets",
      description: "Automate your testnet participation across multiple chains to maximize rewards.",
      delay: 200
    },
    {
      icon: <Coins className="h-10 w-10 text-scryptex-blue" />,
      title: "Collect Rewards",
      description: "Track your expected earnings and successfully claim airdrops when they launch.",
      delay: 300
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Scryptex Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Maximize your airdrop opportunities with our streamlined process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div 
                className={cn(
                  "bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full",
                  "animate-in fade-in slide-in-from-bottom-5 duration-500"
                )}
                style={{ animationDelay: `${step.delay}ms` }}
              >
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-scryptex-blue" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
