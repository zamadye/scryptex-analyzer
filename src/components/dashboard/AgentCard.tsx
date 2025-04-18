
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/cardui";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface AgentCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  lastUsed: string;
  path: string;
}

export const AgentCard = ({ id, name, icon, description, lastUsed, path }: AgentCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card 
      id={`${id}-agent-card`}
      className="overflow-hidden transition-all duration-200 hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-blue-900/20"
    >
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
            {icon}
          </div>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full 
            ${lastUsed === "Active" || lastUsed === "Connected" 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
              : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}
          >
            {lastUsed}
          </span>
        </div>
        <CardTitle className="mt-4">{name}</CardTitle>
        <CardDescription className="mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-0">
        <Link to={path} className="w-full">
          <Button className="w-full">
            {t('activate')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
