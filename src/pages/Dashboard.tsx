
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/onboarding/Dashboard";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import PersonalInfoForm from "@/components/onboarding/PersonalInfoForm";
import BankInfoForm from "@/components/onboarding/BankInfoForm";
import BenefitsPackageForm from "@/components/onboarding/BenefitsPackageForm";
import FamilyDetailsForm from "@/components/onboarding/FamilyDetailsForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LayoutDashboard, User, Users, CreditCard, Gift, GripVertical, EyeOff, Eye, Settings, PanelLeftClose, PanelLeftOpen } from "lucide-react";

const DashboardPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [panelHidden, setPanelHidden] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [tabItems, setTabItems] = useState([
    { value: "overview", label: "Overview", icon: LayoutDashboard },
    { value: "personal", label: "Personal Info", icon: User },
    { value: "family", label: "Family Details", icon: Users },
    { value: "banking", label: "Banking", icon: CreditCard },
    { value: "benefits", label: "Benefits", icon: Gift },
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newTabItems = [...tabItems];
    const draggedItem = newTabItems[draggedIndex];
    newTabItems.splice(draggedIndex, 1);
    newTabItems.splice(dropIndex, 0, draggedItem);

    setTabItems(newTabItems);
    setDraggedIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedContainer>
            <div className="flex flex-col space-y-2 mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Welcome, Alex</h1>
              <p className="text-muted-foreground">
                Complete your onboarding tasks to get started with your new role.
              </p>
            </div>
          </AnimatedContainer>
          
          <Tabs defaultValue="overview" orientation="vertical" className="flex w-full gap-0 relative">
            {/* Floating Control Panel */}
            {panelHidden && (
              <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 bg-card/95 backdrop-blur-sm border rounded-lg shadow-lg p-2 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPanelHidden(false)}
                  className="h-10 w-10 hover:bg-primary/10 hover:text-primary"
                  title="Show Panel"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border mx-auto"></div>
                {tabItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <TabsTrigger
                      key={item.value}
                      value={item.value}
                      className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary rounded-md"
                      title={item.label}
                    >
                      <Icon className="h-4 w-4" />
                    </TabsTrigger>
                  );
                })}
              </div>
            )}

            {/* Main Sidebar Panel */}
            <div className={`relative transition-all duration-500 ease-in-out transform ${
              panelHidden ? 'w-0 -translate-x-full opacity-0' : 'w-auto translate-x-0 opacity-100'
            }`}>
              
              {/* Panel Header */}
              <div className={`transition-all duration-300 ${
                sidebarCollapsed ? 'w-16' : 'w-64'
              } bg-card/50 backdrop-blur-sm border-r border-border/50`}>
                
                {/* Header Controls */}
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  {!sidebarCollapsed && (
                    <div className="animate-fade-in">
                      <h3 className="font-semibold text-sm text-foreground">Navigation</h3>
                      <p className="text-xs text-muted-foreground">Drag to reorder</p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                      title={sidebarCollapsed ? "Expand" : "Collapse"}
                    >
                      {sidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPanelHidden(true)}
                      className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                      title="Hide Panel"
                    >
                      <PanelLeftClose className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Tabs Container */}
                <div className="p-2">
                  <TabsList className="flex flex-col h-fit w-full bg-transparent p-0 space-y-1">
                    {tabItems.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.value}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                          className={`group w-full transition-all duration-200 ${
                            draggedIndex === index ? 'opacity-50 scale-95 rotate-2' : 'opacity-100 scale-100'
                          }`}
                        >
                          <TabsTrigger 
                            value={item.value} 
                            className={`${
                              sidebarCollapsed ? 'w-12 h-12 p-0' : 'w-full h-12 px-3'
                            } justify-start bg-background/50 hover:bg-primary/10 hover:text-primary hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing border border-transparent data-[state=active]:border-primary/20 data-[state=active]:bg-primary/5 data-[state=active]:shadow-sm group relative overflow-hidden`}
                            title={sidebarCollapsed ? item.label : undefined}
                          >
                            {!sidebarCollapsed && (
                              <GripVertical className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                            )}
                            
                            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'} flex-1`}>
                              <Icon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'} transition-all`} />
                              {!sidebarCollapsed && (
                                <span className="animate-fade-in font-medium text-sm truncate">{item.label}</span>
                              )}
                            </div>
                            
                            {/* Active Indicator */}
                            <div className="absolute left-0 top-0 w-1 h-full bg-primary scale-y-0 data-[state=active]:scale-y-100 transition-transform origin-top"></div>
                            
                            {/* Tooltip for collapsed state */}
                            {sidebarCollapsed && (
                              <div className="absolute left-full ml-3 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 border">
                                {item.label}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-popover border-l border-t rotate-45"></div>
                              </div>
                            )}
                          </TabsTrigger>
                        </div>
                      );
                    })}
                  </TabsList>
                </div>

                {/* Panel Footer */}
                {!sidebarCollapsed && (
                  <div className="p-4 border-t border-border/50 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Settings className="h-3 w-3" />
                      <span className="animate-fade-in">Customizable layout</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Content Area */}
            <div className="flex-1 transition-all duration-500 min-w-0">
              <TabsContent value="overview" className="mt-0 h-full">
                <Dashboard />
              </TabsContent>
              
              <TabsContent value="personal" className="mt-0 h-full">
                <PersonalInfoForm />
              </TabsContent>
              
              <TabsContent value="family" className="mt-0 h-full">
                <FamilyDetailsForm />
              </TabsContent>
              
              <TabsContent value="banking" className="mt-0 h-full">
                <BankInfoForm />
              </TabsContent>
              
              <TabsContent value="benefits" className="mt-0 h-full">
                <BenefitsPackageForm />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
