
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Building, CreditCard, Landmark, Wallet, FileText, User, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AnimatedContainer from "../ui/AnimatedContainer";

const bankInfoSchema = z.object({
  accountHolderName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  accountNumber: z.string().min(8, { message: "Please enter a valid account number." }),
  routingNumber: z.string().min(9, { message: "Routing number must be at least 9 digits." }),
  bankName: z.string().min(2, { message: "Please enter your bank name." }),
  accountType: z.string().min(2, { message: "Please specify the account type." }),
  taxId: z.string().optional(),
  paymentMethod: z.enum(["direct_deposit", "check", "other"]),
});

type BankInfoValues = z.infer<typeof bankInfoSchema>;

const BankInfoForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<BankInfoValues>({
    resolver: zodResolver(bankInfoSchema),
    defaultValues: {
      accountHolderName: "",
      accountNumber: "",
      routingNumber: "",
      bankName: "",
      accountType: "checking",
      taxId: "",
      paymentMethod: "direct_deposit",
    },
  });

  function onSubmit(data: BankInfoValues) {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Bank information submitted:", data);
      setIsSaving(false);
      
      toast({
        title: "Bank Information Saved",
        description: "Your banking details have been successfully updated.",
      });
      
      // Update the task status to "completed" here if needed
    }, 1500);
  }

  return (
    <AnimatedContainer className="glass-panel rounded-xl p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">Banking Information</h2>
        <p className="text-muted-foreground">
          Please provide your banking details for payroll and direct deposit
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="John Doe" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Chase Bank" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-10" 
                        placeholder="XXXXXXX1234" 
                        type="password"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    This information is encrypted and securely stored
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="routingNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Routing Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Landmark className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="123456789" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Type</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Wallet className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="checking">Checking</option>
                        <option value="savings">Savings</option>
                        <option value="money_market">Money Market</option>
                      </select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="taxId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax ID / SSN (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        className="pl-10" 
                        placeholder="XXX-XX-XXXX" 
                        type="password"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    For tax reporting purposes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Payment Method</FormLabel>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <label className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${field.value === 'direct_deposit' ? 'border-primary' : 'border-input'}`}>
                    <DollarSign className="mb-3 h-6 w-6 text-primary" />
                    <div className="space-y-1 text-center">
                      <h4 className="text-sm font-semibold">Direct Deposit</h4>
                    </div>
                    <input
                      type="radio"
                      className="sr-only"
                      value="direct_deposit"
                      checked={field.value === "direct_deposit"}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </label>
                  <label className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${field.value === 'check' ? 'border-primary' : 'border-input'}`}>
                    <FileText className="mb-3 h-6 w-6 text-primary" />
                    <div className="space-y-1 text-center">
                      <h4 className="text-sm font-semibold">Paper Check</h4>
                    </div>
                    <input
                      type="radio"
                      className="sr-only"
                      value="check"
                      checked={field.value === "check"}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </label>
                  <label className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer hover:bg-accent ${field.value === 'other' ? 'border-primary' : 'border-input'}`}>
                    <Wallet className="mb-3 h-6 w-6 text-primary" />
                    <div className="space-y-1 text-center">
                      <h4 className="text-sm font-semibold">Other</h4>
                    </div>
                    <input
                      type="radio"
                      className="sr-only"
                      value="other"
                      checked={field.value === "other"}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Banking Information"}
            </Button>
          </div>
        </form>
      </Form>
    </AnimatedContainer>
  );
};

export default BankInfoForm;
