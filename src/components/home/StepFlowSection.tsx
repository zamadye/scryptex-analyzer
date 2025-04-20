
import { ArrowRight, Search, BarChart3, Rocket, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

export const StepFlowSection = () => {
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-white p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl" />,
      title: "Input Project",
      description: "Enter any Web3 project name or website and let our AI agents get to work.",
      delay: 0
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-white p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl" />,
      title: "Get AI Analysis",
      description: "Receive comprehensive analysis including tokenomics, team, backers, and airdrop potential.",
      delay: 100
    },
    {
      icon: <Rocket className="h-12 w-12 text-white p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl" />,
      title: "Track & Farm",
      description: "Automatically track project activity and farm points through our automated agents.",
      delay: 200
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Scryptex simplifies the process of researching and farming airdrops through our intuitive workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div 
                className={cn(
                  "bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-all duration-300 h-full",
                  "animate-in fade-in slide-in-from-bottom-5 duration-700"
                )}
                style={{ animationDelay: `${step.delay}ms` }}
              >
                <div className="mb-6 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-blue-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
