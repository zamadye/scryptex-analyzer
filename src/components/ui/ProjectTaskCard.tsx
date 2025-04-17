
import { Check, AlertCircle, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TaskType {
  id: string;
  name: string;
  type: "NFT" | "DEX" | "Bridge" | "Contract" | "Other";
  status: "pending" | "running" | "completed" | "failed";
  required: boolean;
  gasCost: string;
  details?: string;
}

interface ProjectTaskCardProps {
  task: TaskType;
  isRunning?: boolean;
  progress?: number;
}

export const ProjectTaskCard = ({ task, isRunning, progress = 0 }: ProjectTaskCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-gray-100 text-gray-800";
      case "running": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case "NFT": return "bg-purple-100 text-purple-800";
      case "DEX": return "bg-blue-100 text-blue-800";
      case "Bridge": return "bg-orange-100 text-orange-800";
      case "Contract": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 transition-all duration-300",
        task.status === "running" ? "border-blue-300 bg-blue-50" : "border-gray-200",
        task.status === "completed" ? "border-green-300 bg-green-50" : "",
        task.status === "failed" ? "border-red-300 bg-red-50" : ""
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            {task.status === "completed" ? (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
            ) : task.status === "failed" ? (
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-600 font-medium">{task.id}</span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium">{task.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge className={getTypeColor(task.type)}>
                {task.type}
              </Badge>
              <Badge className={task.required ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}>
                {task.required ? "Required" : "Optional"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-right">
          <Badge className={getStatusColor(task.status)}>
            {task.status === "pending" && "Pending"}
            {task.status === "running" && "Running"}
            {task.status === "completed" && "Completed"}
            {task.status === "failed" && "Failed"}
          </Badge>
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <CreditCard className="h-3 w-3 mr-1" />
            <span>{task.gasCost}</span>
          </div>
        </div>
      </div>
      
      {task.details && (
        <p className="text-sm text-gray-600 my-2">{task.details}</p>
      )}
      
      {isRunning && (
        <div className="mt-3">
          <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-scryptex-blue h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};
