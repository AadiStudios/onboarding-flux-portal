
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import AnimatedContainer from "../ui/AnimatedContainer";
import { Shield, Heart, Award, Gift, BadgeDollarSign, TicketCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const benefitsFormSchema = z.object({
  healthPlan: z.string({
    required_error: "Please select a health insurance plan",
  }),
  retirement: z.boolean().optional(),
  retirement401k: z.boolean().optional(),
  dentalVision: z.boolean().optional(),
  lifeInsurance: z.boolean().optional(),
  wellnessProgram: z.boolean().optional(),
  additionalBenefits: z.string().optional(),
});

type BenefitsFormValues = z.infer<typeof benefitsFormSchema>;

const defaultValues: Partial<BenefitsFormValues> = {
  healthPlan: "",
  retirement: false,
  retirement401k: false,
  dentalVision: false,
  lifeInsurance: false,
  wellnessProgram: false,
  additionalBenefits: "",
};

const BenefitsPackageForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const form = useForm<BenefitsFormValues>({
    resolver: zodResolver(benefitsFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: BenefitsFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Handle form submission
    console.log("Benefits Package Data:", data);
    
    toast({
      title: "Benefits package selected",
      description: "Your benefits package has been successfully submitted.",
    });
    
    setIsComplete(true);
    setIsSubmitting(false);
  };

  return (
    <AnimatedContainer delay={200} className="mb-8">
      <Card className="glass-panel border-none shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2 text-primary">
            <Shield className="h-5 w-5" />
            <CardTitle className="text-xl">Benefits Package</CardTitle>
          </div>
          <CardDescription>
            Select your health insurance, retirement plans, and other benefits options.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isComplete ? (
            <div className="rounded-md bg-primary/10 p-4 text-center">
              <Heart className="mx-auto h-8 w-8 text-primary mb-2" />
              <h3 className="text-lg font-medium text-primary">Benefits Package Complete</h3>
              <p className="text-muted-foreground mt-1">
                You have successfully selected your benefits package. You can make changes to your selections until your start date.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsComplete(false)}
              >
                Edit Selections
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="healthPlan"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="font-medium flex items-center gap-2">
                        <Heart className="h-4 w-4 text-primary" />
                        Health Insurance Plan
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="standard" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              <div className="font-medium">Standard Plan</div>
                              <div className="text-sm text-muted-foreground">$75/month, $1,500 deductible</div>
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="premium" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              <div className="font-medium">Premium Plan</div>
                              <div className="text-sm text-muted-foreground">$150/month, $500 deductible</div>
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="family" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              <div className="font-medium">Family Plan</div>
                              <div className="text-sm text-muted-foreground">$250/month, $1,000 deductible, covers dependents</div>
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="none" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer flex-1">
                              <div className="font-medium">Decline Coverage</div>
                              <div className="text-sm text-muted-foreground">I have coverage from another source</div>
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <FormLabel className="font-medium flex items-center gap-2 mb-3">
                    <Award className="h-4 w-4 text-primary" />
                    Additional Benefits
                  </FormLabel>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="retirement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium">
                              <div className="flex items-center gap-2">
                                <BadgeDollarSign className="h-4 w-4 text-primary" />
                                Pension Plan
                              </div>
                            </FormLabel>
                            <FormDescription>
                              Traditional pension plan with employer contribution
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="retirement401k"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium">
                              <div className="flex items-center gap-2">
                                <BadgeDollarSign className="h-4 w-4 text-primary" />
                                401(k) Plan
                              </div>
                            </FormLabel>
                            <FormDescription>
                              5% employer match on contributions
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dentalVision"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-primary" />
                                Dental & Vision
                              </div>
                            </FormLabel>
                            <FormDescription>
                              Coverage for dental and vision care
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lifeInsurance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-primary" />
                                Life Insurance
                              </div>
                            </FormLabel>
                            <FormDescription>
                              2x annual salary coverage
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="wellnessProgram"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium">
                              <div className="flex items-center gap-2">
                                <Gift className="h-4 w-4 text-primary" />
                                Wellness Program
                              </div>
                            </FormLabel>
                            <FormDescription>
                              Gym membership and wellness incentives
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="additionalBenefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium flex items-center gap-2">
                        <TicketCheck className="h-4 w-4 text-primary" />
                        Additional Requests
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any other benefits or accommodations you'd like to request..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional: Let us know if you have any specific benefits needs
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Save Benefits Selections"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </AnimatedContainer>
  );
};

export default BenefitsPackageForm;
