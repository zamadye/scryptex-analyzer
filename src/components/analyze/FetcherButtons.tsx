
import { useState } from "react";
import { BarChart3, Users, CalendarClock, Twitter, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FetcherType = "tokenomics" | "roadmap" | "backers" | "social" | "airdrop" | null;

interface FetcherButtonsProps {
  onFetcherSelect: (fetcher: FetcherType) => void;
  activeFetcher: FetcherType;
  isLoading: boolean;
}

export const FetcherButtons = ({ onFetcherSelect, activeFetcher, isLoading }: FetcherButtonsProps) => {
  const fetcherOptions = [
    { type: "tokenomics" as FetcherType, label: "Tokenomics", icon: <BarChart3 className="w-4 h-4 mr-2" /> },
    { type: "roadmap" as FetcherType, label: "Roadmap", icon: <CalendarClock className="w-4 h-4 mr-2" /> },
    { type: "backers" as FetcherType, label: "Backers", icon: <Users className="w-4 h-4 mr-2" /> },
    { type: "social" as FetcherType, label: "Social Media", icon: <Twitter className="w-4 h-4 mr-2" /> },
    { type: "airdrop" as FetcherType, label: "Airdrop Confirm", icon: <Gift className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {fetcherOptions.map((option) => (
        <Button
          key={option.type}
          onClick={() => onFetcherSelect(option.type)}
          variant={activeFetcher === option.type ? "default" : "outline"}
          className={cn(
            "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50",
            activeFetcher === option.type && "bg-scryptex-blue text-white hover:bg-scryptex-dark"
          )}
          disabled={isLoading}
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
    </div>
  );
};
