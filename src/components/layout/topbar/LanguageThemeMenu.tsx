
import { Globe, Moon, Sun, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export const LanguageThemeMenu = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  // Create a safe tutorial context hook
  const useSafeTutorial = () => {
    try {
      // Import TutorialContext only if it's available in the current context
      const { useTutorial } = require("@/context/TutorialContext");
      const tutorialContext = useTutorial();
      return tutorialContext;
    } catch (error) {
      // Return a dummy object with the required methods if TutorialContext is not available
      return {
        startTutorial: () => console.log("Tutorial not available")
      };
    }
  };
  
  const tutorialContext = useSafeTutorial();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('language')} & {t('theme')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-normal text-gray-500 pl-2">{t('language')}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'EN' | 'ID')}>
            <DropdownMenuRadioItem value="EN">English</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="ID">Bahasa Indonesia</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-normal text-gray-500 pl-2">{t('theme')}</DropdownMenuLabel>
          <DropdownMenuItem onClick={toggleTheme}>
            {theme === 'light' ? (
              <Moon className="mr-2 h-4 w-4" />
            ) : (
              <Sun className="mr-2 h-4 w-4" />
            )}
            {theme === 'light' ? t('dark') : t('light')} {t('theme')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => tutorialContext.startTutorial()}>
          <Settings className="mr-2 h-4 w-4" />
          {t('tutorial')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
