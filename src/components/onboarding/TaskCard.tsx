
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string;
  assignee?: string;
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  className?: string;
}

const TaskCard = ({ task, onStatusChange, className }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();
  
  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case "pending":
        return <Circle className="h-5 w-5 text-muted-foreground" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };
  
  const getStatusText = (status: TaskStatus) => {
    switch (status) {
      case "pending":
        return "Not Started";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
    }
  };
  
  const handleStart = () => {
    onStatusChange(task.id, "in-progress");
    toast({
      title: "Task Started",
      description: `You've started working on: ${task.title}`,
    });
  };
  
  const handleComplete = () => {
    onStatusChange(task.id, "completed");
    toast({
      title: "Task Completed",
      description: `Great job completing: ${task.title}`,
    });
  };
  
  const handleReopen = () => {
    onStatusChange(task.id, "in-progress");
    toast({
      title: "Task Reopened",
      description: `You've reopened: ${task.title}`,
    });
  };

  return (
    <Card 
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-md",
        task.status === "completed" ? "bg-secondary/50" : "bg-card",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(task.status)}
            <span className={cn(
              "text-xs font-medium",
              task.status === "completed" ? "text-green-500" : 
              task.status === "in-progress" ? "text-blue-500" : 
              "text-muted-foreground"
            )}>
              {getStatusText(task.status)}
            </span>
          </div>
          
          {task.dueDate && (
            <span className="text-xs text-muted-foreground">
              Due: {task.dueDate}
            </span>
          )}
        </div>
        
        <h3 className={cn(
          "mt-3 text-lg font-medium transition-all duration-300",
          task.status === "completed" ? "text-muted-foreground line-through" : "text-foreground"
        )}>
          {task.title}
        </h3>
        
        <p className={cn(
          "mt-2 text-sm",
          task.status === "completed" ? "text-muted-foreground/70" : "text-muted-foreground"
        )}>
          {task.description}
        </p>
        
        {task.assignee && (
          <div className="mt-4 flex items-center">
            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
              {task.assignee.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 text-xs text-muted-foreground">{task.assignee}</span>
          </div>
        )}
      </div>
      
      <div className={cn(
        "p-3 bg-secondary/50 transition-all duration-300",
        isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}>
        <div className="flex justify-end space-x-2">
          {task.status === "pending" && (
            <Button size="sm" variant="outline" onClick={handleStart}>
              Start
            </Button>
          )}
          {task.status === "in-progress" && (
            <Button size="sm" className="bg-green-500 hover:bg-green-600" onClick={handleComplete}>
              Complete
            </Button>
          )}
          {task.status === "completed" && (
            <Button size="sm" variant="outline" onClick={handleReopen}>
              Reopen
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
