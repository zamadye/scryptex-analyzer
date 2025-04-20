
import { useLanguage } from "@/context/LanguageContext";
import Image from 'next/image';

export const TrustSection = () => {
  const { t } = useLanguage();
  
  const logos = [
    { name: "CoinMarketCap", logo: "/media/logo-coinmarketcap.svg" },
    { name: "CoinGecko", logo: "/media/logo-coingecko.svg" },
    { name: "Messari", logo: "/media/logo-messari.svg" },
    { name: "Token Terminal", logo: "/media/logo-tokenterminal.svg" },
    { name: "CryptoRank", logo: "/media/logo-cryptorank.svg" },
    { name: "Crunchbase", logo: "/media/logo-crunchbase.svg" },
    { name: "Twitter", logo: "/media/logo-twitter.svg" },
    { name: "Discord", logo: "/media/logo-discord.svg" },
    { name: "Reddit", logo: "/media/logo-reddit.svg" }
  ];
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-6">We Analyze Data From Leading Sources</h3>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Our AI agents collect and process information from the most trusted platforms in the crypto ecosystem</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div 
              key={logo.name} 
              className="flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity duration-300 animate-in fade-in duration-700" 
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="text-gray-500 font-medium text-lg">{logo.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
