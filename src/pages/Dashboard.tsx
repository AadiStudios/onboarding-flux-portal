
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
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="family">Family Details</TabsTrigger>
              <TabsTrigger value="banking">Banking</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              <Dashboard />
            </TabsContent>
            
            <TabsContent value="personal" className="mt-6">
              <PersonalInfoForm />
            </TabsContent>
            
            <TabsContent value="family" className="mt-6">
              <FamilyDetailsForm />
            </TabsContent>
            
            <TabsContent value="banking" className="mt-6">
              <BankInfoForm />
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-6">
              <BenefitsPackageForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
