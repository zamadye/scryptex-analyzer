
import { useState } from "react";
import { BarChart, Twitter, Wallet, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { renderToStaticMarkup } from "react-dom/server";

export const FeatureSection = () => {
  const { t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      title: "Analyze Projects with AI",
      description: "Our advanced AI scans on-chain data, socials, and tokenomics to provide in-depth project analysis and airdrop potential score.",
      icon: <BarChart className="h-12 w-12 text-blue-500" />,
      color: "bg-blue-50",
      image: "/media/analyze-agent.png",
      path: "/analyze"
    },
    {
      title: "Auto Retweet for Twitter XP",
      description: "Configure automated Twitter engagement to maximize airdrop eligibility while you sleep. Smart filtering ensures you only engage with quality content.",
      icon: <Twitter className="h-12 w-12 text-sky-500" />,
      color: "bg-sky-50",
      image: "/media/twitter-agent.png",
      path: "/twitter"
    },
    {
      title: "Testnet Farming Automation",
      description: "Deploy farming agents across multiple testnets simultaneously. Our wallet connector makes cross-chain interactions seamless.",
      icon: <Wallet className="h-12 w-12 text-green-500" />,
      color: "bg-green-50",
      image: "/media/farming-agent.png",
      path: "/farming"
    },
    {
      title: "Airdrop Portfolio Visualization",
      description: "Track all your airdrop farming activity in one dashboard with estimated value projections and completion status.",
      icon: <Gift className="h-12 w-12 text-purple-500" />,
      color: "bg-purple-50",
      image: "/media/explorer-agent.png",
      path: "/airdrops"
    },
  ];

  return (
    <section className="py-24 px-4 bg-gray-50" id="features">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-6">Key Features</h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Advanced tools to maximize your airdrop hunting efficiency
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Feature tabs for mobile */}
          <div className="lg:hidden flex overflow-x-auto space-x-2 pb-4 mb-4">
            {features.map((feature, index) => (
              <button
                key={feature.title} 
                className={`flex-shrink-0 px-4 py-2 rounded-full border ${
                  activeFeature === index 
                    ? 'bg-blue-50 border-blue-200 text-blue-600' 
                    : 'border-gray-200 text-gray-600'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                {feature.title}
              </button>
            ))}
          </div>
          
          {/* Left side - Feature details */}
          <div className="order-2 lg:order-1">
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className={`${feature.color} p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${
                    activeFeature === index ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="animate-in fade-in duration-500">
              <h3 className="text-2xl font-bold mb-4">{features[activeFeature].title}</h3>
              <p className="text-gray-600 mb-6">{features[activeFeature].description}</p>
              <Link to={features[activeFeature].path}>
                <Button className="group bg-blue-500 hover:bg-blue-600">
                  Explore Feature
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right side - Feature image */}
          <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white p-4">
            {features.map((feature, index) => (
              <div 
                key={`img-${feature.title}`}
                className={`transition-all duration-500 ${
                  activeFeature === index ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <div className="aspect-video w-full bg-gray-50 flex items-center justify-center rounded-lg overflow-hidden">
                  {feature.image ? (
                    <img 
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If image fails to load, show a placeholder
                        e.currentTarget.src = "";
                        e.currentTarget.parentElement!.innerHTML = `
                          <div class="flex flex-col items-center justify-center w-full h-full bg-gray-50 p-8">
                            ${renderToStaticMarkup(feature.icon)}
                            <p class="mt-4 text-lg font-medium">${feature.title}</p>
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50 p-8">
                      {feature.icon}
                      <p className="mt-4 text-lg font-medium">{feature.title}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
