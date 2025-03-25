
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/components/onboarding/Dashboard";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import PersonalInfoForm from "@/components/onboarding/PersonalInfoForm";
import BankInfoForm from "@/components/onboarding/BankInfoForm";
import BenefitsPackageForm from "@/components/onboarding/BenefitsPackageForm";

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
          
          <PersonalInfoForm />
          <BankInfoForm />
          <BenefitsPackageForm />
          
          <Dashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
