
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
import { ChevronLeft, ChevronRight, LayoutDashboard, User, Users, CreditCard, Gift } from "lucide-react";

const DashboardPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabItems = [
    { value: "overview", label: "Overview", icon: LayoutDashboard },
    { value: "personal", label: "Personal Info", icon: User },
    { value: "family", label: "Family Details", icon: Users },
    { value: "banking", label: "Banking", icon: CreditCard },
    { value: "benefits", label: "Benefits", icon: Gift },
  ];

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
          
          <Tabs defaultValue="overview" orientation="vertical" className="flex w-full gap-6">
            <div className="relative">
              {/* Toggle Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="absolute -right-3 top-4 z-10 h-6 w-6 rounded-full bg-background border shadow-sm hover:bg-accent"
              >
                {sidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
              </Button>

              {/* Tabs List */}
              <TabsList 
                className={`flex flex-col h-fit bg-background/80 backdrop-blur-sm border transition-all duration-300 ease-in-out ${
                  sidebarCollapsed ? 'w-14 px-2' : 'w-48 px-3'
                }`}
              >
                {tabItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <TabsTrigger 
                      key={item.value}
                      value={item.value} 
                      className={`${
                        sidebarCollapsed ? 'w-10 h-10 p-0' : 'w-full'
                      } justify-start hover:bg-primary/10 hover:text-primary transition-all duration-200 group relative`}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <Icon className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-2'} transition-all`} />
                      {!sidebarCollapsed && (
                        <span className="animate-fade-in text-sm">{item.label}</span>
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {sidebarCollapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                          {item.label}
                        </div>
                      )}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
            
            <div className="flex-1 transition-all duration-300">
              <TabsContent value="overview" className="mt-0">
                <Dashboard />
              </TabsContent>
              
              <TabsContent value="personal" className="mt-0">
                <PersonalInfoForm />
              </TabsContent>
              
              <TabsContent value="family" className="mt-0">
                <FamilyDetailsForm />
              </TabsContent>
              
              <TabsContent value="banking" className="mt-0">
                <BankInfoForm />
              </TabsContent>
              
              <TabsContent value="benefits" className="mt-0">
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
