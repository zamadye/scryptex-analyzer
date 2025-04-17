
import { ArrowRight, BarChart, Rocket, ActivitySquare, PieChart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { StepFlowSection } from "@/components/home/StepFlowSection";
import { TrendingChart } from "@/components/home/TrendingChart";

const features = [
  {
    title: "Deep Project Analysis",
    description: "Analyze crypto projects to understand their potential using AI and on-chain data.",
    icon: <BarChart className="h-12 w-12 text-scryptex-blue" />,
    path: "/analyze"
  },
  {
    title: "Twitter Autopilot",
    description: "Automate your Twitter engagement with Web3 projects to maximize airdrop eligibility.",
    icon: <Rocket className="h-12 w-12 text-scryptex-blue" />,
    path: "/autopilot"
  },
  {
    title: "Testnet Farming",
    description: "Automate testnet participation across multiple chains to boost your rewards.",
    icon: <ActivitySquare className="h-12 w-12 text-scryptex-blue" />,
    path: "/farming"
  },
  {
    title: "Airdrop Portfolio",
    description: "Track and manage your potential airdrops in a visual portfolio dashboard.",
    icon: <PieChart className="h-12 w-12 text-scryptex-blue" />,
    path: "/portfolio"
  },
  {
    title: "Smart Project Screener",
    description: "Discover high-potential projects before everyone else with AI-powered scoring.",
    icon: <Search className="h-12 w-12 text-scryptex-blue" />,
    path: "/screener"
  }
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <section className="py-20 px-4 sm:px-6 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-5 duration-500">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 max-w-4xl mb-6">
          The Ultimate <span className="text-scryptex-blue">Crypto Research & Analysis</span> Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          AI-powered analysis for airdrop hunters, investors, and Web3 researchers. Find the best opportunities before anyone else.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/analyze">
            <button className="bg-scryptex-blue hover:bg-scryptex-dark text-white font-medium rounded-lg px-6 py-3 flex items-center">
              Analyze a Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
          <Link to="/screener">
            <button className="border border-gray-300 hover:bg-gray-50 rounded-lg px-6 py-3 flex items-center">
              Browse Projects
            </button>
          </Link>
        </div>
      </section>

      {/* Step flow section */}
      <StepFlowSection />
      
      {/* Trending chart section */}
      <TrendingChart />

      {/* Features section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            All-in-One Crypto Research Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link to={feature.path} key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 animate-in fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex flex-col items-start">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="mt-auto">
                    <span className="text-scryptex-blue font-medium flex items-center">
                      Get Started
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-scryptex-blue to-blue-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Stay Ahead of the Crypto Market
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
            Advanced analytics, smart automation, and AI-powered insights to maximize your Web3 opportunities.
          </p>
          <Link to="/analyze">
            <button className="bg-white text-scryptex-blue hover:bg-gray-100 font-medium rounded-lg px-6 py-3 flex items-center mx-auto">
              Start Analyzing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
