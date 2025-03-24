
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <AnimatedContainer className="lg:max-w-2xl">
              <span className="inline-block px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
                Streamline HR Onboarding
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
                Employee Onboarding, <span className="text-primary">Simplified</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl text-balance">
                Transform your employee onboarding experience with our intuitive workflow platform. Save time, reduce errors, and create a seamless welcome for new team members.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link to="/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link to="/">Learn More</Link>
                </Button>
              </div>
            </AnimatedContainer>
            
            <AnimatedContainer 
              className="mt-12 lg:mt-0 lg:ml-12" 
              delay={300}
              animation="scale"
            >
              <div className="relative">
                <div className="w-full max-w-md mx-auto lg:mx-0 overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-white to-secondary">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-primary/10 rounded-full px-3 py-1">
                        <span className="text-xs font-medium text-primary">8 days until start date</span>
                      </div>
                      <div className="text-muted-foreground text-sm">72% Complete</div>
                    </div>
                    
                    <div className="w-full bg-secondary rounded-full h-2 mb-6 overflow-hidden">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { text: "Personal Information", done: true },
                        { text: "Employment Contract", done: true },
                        { text: "Direct Deposit", done: false },
                        { text: "Benefits Selection", done: false }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`flex-shrink-0 h-5 w-5 rounded-full mr-3 flex items-center justify-center ${
                            item.done ? "text-green-500" : "text-muted-foreground"
                          }`}>
                            {item.done ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : (
                              <div className="h-3 w-3 rounded-full border-2 border-muted-foreground"></div>
                            )}
                          </div>
                          <span className={item.done ? "line-through text-muted-foreground" : ""}>
                            {item.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-primary/10 animate-float hidden md:block"></div>
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/5 animate-float animation-delay-1000 hidden md:block"></div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedContainer>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Streamlined Onboarding Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to successfully onboard new employees quickly and efficiently
              </p>
            </div>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Automated Workflows",
                description: "Automate repetitive tasks and streamline your onboarding process with customizable workflows."
              },
              {
                title: "Document Management",
                description: "Securely store and manage all employee documentation in one centralized location."
              },
              {
                title: "Progress Tracking",
                description: "Monitor onboarding progress in real-time with intuitive dashboards and reporting."
              },
              {
                title: "Task Assignment",
                description: "Assign tasks to team members and track completion status throughout the process."
              },
              {
                title: "Integration Ready",
                description: "Seamlessly connect with your existing HR systems and tools for a unified experience."
              },
              {
                title: "Compliance Management",
                description: "Ensure compliance with regulatory requirements and internal policies."
              }
            ].map((feature, index) => (
              <AnimatedContainer 
                key={index} 
                delay={100 + index * 100}
                animation="fade"
              >
                <Card className="h-full hover-lift border border-border/80">
                  <div className="p-6">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <div className="h-5 w-5 rounded-full bg-primary"></div>
                    </div>
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedContainer animation="scale">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to transform your onboarding experience?
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Join thousands of companies using FluxHR to streamline their employee onboarding processes.
                </p>
                <Button asChild size="lg" className="h-12 px-8">
                  <Link to="/dashboard">
                    Try the Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/5 transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-primary/5 transform -translate-x-1/3 translate-y-1/3"></div>
            </div>
          </AnimatedContainer>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
