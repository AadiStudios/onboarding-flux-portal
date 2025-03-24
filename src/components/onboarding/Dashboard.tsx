
import { useState } from "react";
import { cn } from "@/lib/utils";
import TaskCard, { Task, TaskStatus } from "./TaskCard";
import ProgressBar from "./ProgressBar";
import AnimatedContainer from "../ui/AnimatedContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Complete Personal Information",
    description: "Fill out your personal details including contact information and emergency contacts.",
    status: "completed",
    dueDate: "Sep 15, 2023",
    assignee: "Alex Johnson"
  },
  {
    id: "task-2",
    title: "Sign Employment Contract",
    description: "Review and digitally sign your employment contract and related documents.",
    status: "in-progress",
    dueDate: "Sep 18, 2023",
    assignee: "Alex Johnson"
  },
  {
    id: "task-3",
    title: "Set Up Direct Deposit",
    description: "Provide banking information for payroll direct deposit setup.",
    status: "pending",
    dueDate: "Sep 20, 2023",
    assignee: "Alex Johnson"
  },
  {
    id: "task-4",
    title: "Select Benefits Package",
    description: "Choose your health insurance, retirement plans, and other benefits options.",
    status: "pending",
    dueDate: "Sep 25, 2023",
    assignee: "Alex Johnson"
  },
  {
    id: "task-5",
    title: "Complete Tax Forms",
    description: "Fill out required tax forms including W-4 and state tax withholding forms.",
    status: "pending",
    dueDate: "Sep 22, 2023",
    assignee: "Alex Johnson"
  },
  {
    id: "task-6",
    title: "IT Equipment Setup",
    description: "Configure your workstation, install required software, and set up credentials.",
    status: "pending",
    dueDate: "Sep 28, 2023",
    assignee: "Alex Johnson"
  }
];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Calculate overall progress
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const progress = (completedTasks / tasks.length) * 100;
  
  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };
  
  const filteredTasks = () => {
    switch (activeTab) {
      case "pending":
        return tasks.filter(task => task.status === "pending");
      case "in-progress":
        return tasks.filter(task => task.status === "in-progress");
      case "completed":
        return tasks.filter(task => task.status === "completed");
      default:
        return tasks;
    }
  };

  return (
    <div className="w-full">
      <AnimatedContainer className="mb-8">
        <div className="glass-panel rounded-xl p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Onboarding Progress</h2>
              <p className="text-muted-foreground">
                Complete all onboarding tasks before your start date
              </p>
            </div>
            <div className="bg-primary/10 rounded-md px-4 py-2 text-sm">
              <span className="text-primary font-medium">Start Date:</span> October 1, 2023
            </div>
          </div>
          
          <div className="mt-6">
            <ProgressBar progress={progress} size="lg" />
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">{completedTasks} of {tasks.length} tasks completed</span>
              <span className={cn(
                "font-medium",
                progress === 100 ? "text-green-500" : "text-primary"
              )}>
                {progress === 100 ? "Complete!" : "In Progress"}
              </span>
            </div>
          </div>
        </div>
      </AnimatedContainer>
      
      <AnimatedContainer delay={100}>
        <Tabs 
          defaultValue="all" 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold tracking-tight">Tasks</h2>
            <TabsList className="bg-secondary/80">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Not Started</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredTasks().map((task, index) => (
                <AnimatedContainer 
                  key={task.id} 
                  delay={150 + index * 50} 
                  animation="scale"
                >
                  <TaskCard 
                    task={task} 
                    onStatusChange={handleStatusChange} 
                    className="h-full"
                  />
                </AnimatedContainer>
              ))}
              
              {filteredTasks().length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No tasks in this category.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </AnimatedContainer>
    </div>
  );
};

export default Dashboard;
