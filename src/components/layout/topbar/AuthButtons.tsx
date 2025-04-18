
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export const AuthButtons = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center space-x-2">
      <Link to="/login">
        <Button variant="outline" size="sm">
          {t('login')}
        </Button>
      </Link>
      <Link to="/signup">
        <Button size="sm">
          {t('signup')}
        </Button>
      </Link>
    </div>
  );
};
