
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'EN' | 'ID';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translations dictionary
const translations: Record<Language, Record<string, string>> = {
  EN: {
    'welcome': 'Welcome',
    'logout': 'Logout',
    'login': 'Login',
    'signup': 'Sign Up',
    'email': 'Email',
    'password': 'Password',
    'name': 'Name',
    'submit': 'Submit',
    'credits': 'Credits',
    'topup': 'Top Up',
    'analyze': 'Analyze',
    'farming': 'Farming',
    'twitter': 'Twitter Agent',
    'airdrops': 'Airdrops',
    'settings': 'Settings',
    'profile': 'Profile',
    'dashboard': 'Dashboard',
    'referral': 'Referral',
    'notifications': 'Notifications',
    'save': 'Save',
    'cancel': 'Cancel',
    'activate': 'Activate',
    'add': 'Add',
    'connect': 'Connect',
    'wallet': 'Wallet',
    'tutorial': 'Tutorial',
    'skip': 'Skip',
    'next': 'Next',
    'prev': 'Previous',
    'finish': 'Finish',
    'projectName': 'Project Name',
    'website': 'Website',
    'deadline': 'Deadline',
    'description': 'Description',
    'chain': 'Chain',
    'referralCode': 'Referral Code',
    'invite': 'Invite',
    'xp': 'XP',
    'level': 'Level',
    'language': 'Language',
    'theme': 'Theme',
    'light': 'Light',
    'dark': 'Dark',
    'startAnalyze': 'Start by analyzing a project',
    'connectWallet': 'Connect wallet before farming',
    'linkTwitter': 'Link your Twitter for automation',
    'trackAirdrops': 'Track top airdrops here',
    'earnPoints': 'Earn points as you interact!',
    'activeProjects': 'Active Projects',
    'joinDate': 'Join Date',
    'onchain': 'Onchain',
    'offchain': 'Offchain',
    'addAirdrop': 'Add Airdrop',
    'addChain': 'Add New Chain',
    'chainName': 'Chain Name',
    'chainId': 'Chain ID',
    'rpc': 'RPC URL',
    'symbol': 'Symbol',
    'explorer': 'Explorer',
    'twitterHandle': 'Twitter Handle',
    'generateTweet': 'Generate Tweet',
    'schedule': 'Schedule',
    'like': 'Like',
    'retweet': 'Retweet',
    'projectAnalyzed': 'Project analyzed successfully',
    'newFarmingTask': 'New farming task available',
    'creditLow': 'Credit low – top up now',
    'invites': 'Invites',
    'bonusCredit': 'Bonus Credit',
    'referralLink': 'Referral Link',
    'copy': 'Copy'
  },
  ID: {
    'welcome': 'Selamat Datang',
    'logout': 'Keluar',
    'login': 'Masuk',
    'signup': 'Daftar',
    'email': 'Email',
    'password': 'Kata Sandi',
    'name': 'Nama',
    'submit': 'Kirim',
    'credits': 'Kredit',
    'topup': 'Isi Ulang',
    'analyze': 'Analisis',
    'farming': 'Farming',
    'twitter': 'Agen Twitter',
    'airdrops': 'Airdrops',
    'settings': 'Pengaturan',
    'profile': 'Profil',
    'dashboard': 'Dasbor',
    'referral': 'Referral',
    'notifications': 'Notifikasi',
    'save': 'Simpan',
    'cancel': 'Batal',
    'activate': 'Aktifkan',
    'add': 'Tambah',
    'connect': 'Hubungkan',
    'wallet': 'Dompet',
    'tutorial': 'Tutorial',
    'skip': 'Lewati',
    'next': 'Selanjutnya',
    'prev': 'Sebelumnya',
    'finish': 'Selesai',
    'projectName': 'Nama Proyek',
    'website': 'Situs Web',
    'deadline': 'Tenggat Waktu',
    'description': 'Deskripsi',
    'chain': 'Chain',
    'referralCode': 'Kode Referral',
    'invite': 'Undang',
    'xp': 'XP',
    'level': 'Level',
    'language': 'Bahasa',
    'theme': 'Tema',
    'light': 'Terang',
    'dark': 'Gelap',
    'startAnalyze': 'Mulai dengan menganalisis proyek',
    'connectWallet': 'Hubungkan dompet sebelum farming',
    'linkTwitter': 'Hubungkan Twitter Anda untuk otomatisasi',
    'trackAirdrops': 'Pantau airdrops terbaik di sini',
    'earnPoints': 'Dapatkan poin saat Anda berinteraksi!',
    'activeProjects': 'Proyek Aktif',
    'joinDate': 'Tanggal Bergabung',
    'onchain': 'Onchain',
    'offchain': 'Offchain',
    'addAirdrop': 'Tambah Airdrop',
    'addChain': 'Tambah Chain Baru',
    'chainName': 'Nama Chain',
    'chainId': 'ID Chain',
    'rpc': 'URL RPC',
    'symbol': 'Simbol',
    'explorer': 'Explorer',
    'twitterHandle': 'Handle Twitter',
    'generateTweet': 'Buat Tweet',
    'schedule': 'Jadwal',
    'like': 'Suka',
    'retweet': 'Retweet',
    'projectAnalyzed': 'Proyek berhasil dianalisis',
    'newFarmingTask': 'Tugas farming baru tersedia',
    'creditLow': 'Kredit rendah – isi ulang sekarang',
    'invites': 'Undangan',
    'bonusCredit': 'Kredit Bonus',
    'referralLink': 'Link Referral',
    'copy': 'Salin'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('EN');
  
  // Load language from localStorage on mount
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage && (storedLanguage === 'EN' || storedLanguage === 'ID')) {
      setLanguageState(storedLanguage);
    }
  }, []);
  
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };
  
  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
