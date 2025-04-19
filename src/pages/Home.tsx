
import { useState } from "react";
import { ArrowRight, BarChart, Twitter, Wallet, Gift, CheckCircle, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { FeatureSection } from "@/components/home/FeatureSection";
import { AuthModal } from "@/components/auth/AuthModal";
import { useLanguage } from "@/context/LanguageContext";

// How it works section with steps
const HowItWorks = () => {
  const { t } = useLanguage();
  const steps = [
    {
      title: t('connectAccounts'),
      description: t('connectAccountsDescription'),
    },
    {
      title: t('deployAgents'),
      description: t('deployAgentsDescription'),
    },
    {
      title: t('monitorPerformance'),
      description: t('monitorPerformanceDescription'),
    },
    {
      title: t('earnAirdrops'),
      description: t('earnAirdropsDescription'),
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">{t('howItWorks')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className="flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 animate-in fade-in slide-in-from-bottom-5 duration-700" 
              style={{animationDelay: `${index * 150}ms`}}
            >
              <div className="relative">
                <div className="bg-scryptex-blue text-white text-2xl font-bold h-14 w-14 rounded-full flex items-center justify-center mb-6 z-10 relative">
                  {index + 1}
                </div>
                <div className="absolute h-14 w-14 rounded-full bg-blue-600 opacity-50 group-hover:opacity-80 group-hover:scale-[1.2] transition-all duration-300 -z-0 blur-sm"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing section
const Pricing = () => {
  const { t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const plans = [
    {
      name: t('starter'),
      credits: 100,
      price: "$29",
      features: [
        t('fullAccessAnalyzeAgent'),
        t('limitedTwitterAgent'),
        t('basicAirdropTracking'),
        t('emailSupport'),
      ],
      cta: t('getStarted'),
      popular: false,
    },
    {
      name: t('pro'),
      credits: 500,
      price: "$99",
      features: [
        t('allAgentsUnlocked'),
        t('unlimitedAnalysisReports'),
        t('advancedSocialFarming'),
        t('priorityEmailSupport'),
      ],
      cta: t('getPro'),
      popular: true,
    },
    {
      name: t('advanced'),
      credits: 1500,
      price: "$249",
      features: [
        t('everythingInProPlan'),
        t('customAgentConfigurations'),
        t('apiAccess'),
        t('dedicatedSupportChannel'),
      ],
      cta: t('contactSales'),
      popular: false,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t('simplePricing')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('creditSystemDescription')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={plan.name} 
              className={`bg-white rounded-xl shadow-sm border ${plan.popular ? 'border-scryptex-blue ring-2 ring-scryptex-blue/10' : 'border-gray-200'} p-8 relative animate-in fade-in duration-700 hover:shadow-md transition-all duration-300`}
              style={{animationDelay: `${index * 150}ms`}}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-scryptex-blue text-white px-4 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                  {t('mostPopular')}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500 ml-2">/ {t('month')}</span>
              </div>
              <p className="text-scryptex-blue font-medium mb-6">{plan.credits} {t('creditsIncluded')}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan.popular ? "default" : "outline"} 
                size="lg" 
                className="w-full"
                onClick={() => setShowAuthModal(true)}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 text-gray-500">
          {t('needCustomPlan')} <button onClick={() => setShowAuthModal(true)} className="text-scryptex-blue hover:underline">{t('contactUs')}</button>
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </section>
  );
};

// Testimonials slider section
const Testimonials = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = [
    {
      name: "Alex Johnson",
      role: t('defiResearcher'),
      text: t('testimonial1'),
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Williams",
      role: t('cryptoInvestor'),
      text: t('testimonial2'),
      image: "https://randomuser.me/api/portraits/women/17.jpg",
    },
    {
      name: "Michael Chen",
      role: t('web3Developer'),
      text: t('testimonial3'),
      image: "https://randomuser.me/api/portraits/men/67.jpg",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">{t('whatUsersSay')}</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.name} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                    <p className="text-lg mb-6">{testimonial.text}</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white shadow-md h-10 w-10 rounded-full flex items-center justify-center z-10 hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white shadow-md h-10 w-10 rounded-full flex items-center justify-center z-10 hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            →
          </button>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-scryptex-blue" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA section
const FinalCTA = () => {
  const { t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-scryptex-blue to-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">{t('readyToSupercharge')}</h2>
        <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
          {t('joinThousandsOfUsers')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            size="lg" 
            variant="secondary" 
            className="font-medium text-base bg-white text-scryptex-blue hover:bg-gray-100"
            onClick={() => setShowAuthModal(true)}
          >
            {t('getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="font-medium text-base border-white text-white hover:bg-white/10"
            onClick={() => setShowAuthModal(true)}
          >
            {t('joinWaitlist')}
          </Button>
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </section>
  );
};

// Footer component
const Footer = () => {
  const { t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Scryptex</h3>
            <p className="text-gray-400 mb-4">{t('aiAgentCommandCenter')}</p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{t('product')}</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">{t('features')}</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">{t('pricing')}</a></li>
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">{t('api')}</button></li>
              <li><Link to="/referral" className="hover:text-white transition-colors">{t('referralProgram')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{t('resources')}</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">{t('documentation')}</button></li>
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">{t('blog')}</button></li>
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">{t('community')}</button></li>
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">{t('support')}</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">{t('about')}</button></li>
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">{t('careers')}</button></li>
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">{t('privacyPolicy')}</button></li>
              <li><button onClick={() => setShowAuthModal(true)} className="hover:text-white transition-colors">{t('termsOfService')}</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Scryptex. {t('allRightsReserved')}</p>
        </div>
      </div>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </footer>
  );
};

// Main Home component
const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  
  // If logged in, redirect to dashboard
  if (isLoggedIn) {
    navigate('/dashboard');
  }
  
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <TrustSection />
      <Pricing />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Home;
