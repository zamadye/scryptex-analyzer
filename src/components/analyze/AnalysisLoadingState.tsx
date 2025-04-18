
import { Search } from "@/components/icons";
import { Card, CardContent } from "@/components/ui/cardui";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalysisLoadingStateProps {
  projectName: string;
}

export function AnalysisLoadingState({ projectName }: AnalysisLoadingStateProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 animate-pulse">
            <Search className="h-10 w-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Analyzing {projectName}</h3>
          <p className="text-gray-500 max-w-md">
            Our AI agent is gathering data from multiple sources and analyzing the project details. This might take a few moments.
          </p>
          
          <div className="mt-8 w-full max-w-md space-y-3">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex items-center space-x-3">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
