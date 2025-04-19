
import { useLanguage } from "@/context/LanguageContext";

export const TrustSection = () => {
  const { t } = useLanguage();
  
  const logos = [
    { name: "CoinMarketCap", logo: "/media/logo-coinmarketcap.svg" },
    { name: "CoinGecko", logo: "/media/logo-coingecko.svg" },
    { name: "Dune Analytics", logo: "/media/logo-dune.svg" },
    { name: "LunarCrush", logo: "/media/logo-lunarcrush.svg" },
    { name: "DefiLlama", logo: "/media/logo-defillama.svg" },
    { name: "Nansen", logo: "/media/logo-nansen.svg" }
  ];
  
  return (
    <section className="py-12 px-4 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gray-500 mb-8">{t('trustedByDataProviders')}</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logo, index) => (
            <div 
              key={logo.name} 
              className="flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity duration-300 animate-in fade-in duration-700" 
              style={{animationDelay: `${index * 100}ms`}}
            >
              {/* Fallback to text if image not available */}
              <div className="text-gray-400 font-semibold text-lg">{logo.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
