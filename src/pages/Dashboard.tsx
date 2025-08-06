
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/onboarding/Dashboard";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import PersonalInfoForm from "@/components/onboarding/PersonalInfoForm";
import BankInfoForm from "@/components/onboarding/BankInfoForm";
import BenefitsPackageForm from "@/components/onboarding/BenefitsPackageForm";
import FamilyDetailsForm from "@/components/onboarding/FamilyDetailsForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardPage = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <TabsList className="flex flex-col h-fit w-48 bg-background/80 backdrop-blur-sm border">
              <TabsTrigger 
                value="overview" 
                className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="personal" 
                className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                Personal Info
              </TabsTrigger>
              <TabsTrigger 
                value="family" 
                className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                Family Details
              </TabsTrigger>
              <TabsTrigger 
                value="banking" 
                className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                Banking
              </TabsTrigger>
              <TabsTrigger 
                value="benefits" 
                className="w-full justify-start hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                Benefits
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1">
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
