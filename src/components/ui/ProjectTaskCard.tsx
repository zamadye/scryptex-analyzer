
import { useState } from "react";
import { Check, X, LayoutList, Zap, Globe, Coins, RotateCcw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export type TaskType = {
  id: string;
  name: string;
  type: "NFT" | "DEX" | "Bridge" | "Contract" | string;
  status: "pending" | "running" | "completed" | "failed";
  required: boolean;
  gasCost?: string;
  details?: string;
  progress?: number;
};

interface ProjectTaskCardProps {
  task: TaskType;
  isRunning?: boolean;
  progress?: number;
}

export const ProjectTaskCard = ({ task, isRunning = false, progress = 0 }: ProjectTaskCardProps) => {
  const getTypeIcon = (type: string) => {
    switch(type) {
      case "NFT": return <LayoutList className="h-4 w-4 text-purple-500" />;
      case "DEX": return <Zap className="h-4 w-4 text-blue-500" />;
      case "Bridge": return <Globe className="h-4 w-4 text-green-500" />;
      case "Contract": return <Coins className="h-4 w-4 text-yellow-500" />;
      default: return <LayoutList className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getStatusIcon = () => {
    switch(task.status) {
      case "completed": return <Check className="h-5 w-5 text-green-500" />;
      case "failed": return <X className="h-5 w-5 text-red-500" />;
      case "running": return <RotateCcw className="h-5 w-5 text-blue-500 animate-spin" />;
      default: return null;
    }
  };
  
  const getStatusClass = () => {
    switch(task.status) {
      case "completed": return "border-green-200 bg-green-50";
      case "failed": return "border-red-200 bg-red-50";
      case "running": return "border-blue-200 bg-blue-50";
      default: return "border-gray-200";
    }
  };

  return (
    <div className={cn(
      "p-4 border rounded-lg transition-all duration-300",
      getStatusClass()
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            <div className="mr-2">
              {getTypeIcon(task.type)}
            </div>
            <h3 className="font-medium">{task.name}</h3>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            {task.gasCost && (
              <span className="flex items-center mr-3">
                <Coins className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                {task.gasCost}
              </span>
            )}
            
            <Badge variant={task.required ? "default" : "outline"} className="text-xs">
              {task.required ? "Required" : "Optional"}
            </Badge>
            
            <Badge variant="outline" className="ml-2 text-xs">
              {task.type}
            </Badge>
          </div>
          
          {task.details && (
            <div className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-3.5 w-3.5 mr-1" />
              {task.details}
            </div>
          )}
          
          {(isRunning || progress > 0) && (
            <div className="mt-3">
              <Progress value={progress} className="h-1.5" />
              <p className="text-xs text-gray-500 mt-1 text-right">{progress}%</p>
            </div>
          )}
        </div>
        
        <div className="ml-4 mt-1">
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
};
