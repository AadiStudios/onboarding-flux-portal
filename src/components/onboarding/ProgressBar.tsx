
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
}

const ProgressBar = ({ 
  progress,
  className,
  showPercentage = true,
  size = "md"
}: ProgressBarProps) => {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(Math.max(0, progress), 100);
  
  const getHeightClass = () => {
    switch (size) {
      case "sm": return "h-1";
      case "md": return "h-2";
      case "lg": return "h-3";
      default: return "h-2";
    }
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        {showPercentage && (
          <span className="text-xs font-medium text-muted-foreground">
            {Math.round(safeProgress)}% Complete
          </span>
        )}
      </div>
      <div className={cn("w-full bg-secondary rounded-full overflow-hidden", getHeightClass())}>
        <div 
          className={cn("bg-primary transition-all duration-500 ease-out rounded-full", getHeightClass())}
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
