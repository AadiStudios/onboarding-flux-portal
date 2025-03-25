
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, User, UserPlus, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AnimatedContainer from "../ui/AnimatedContainer";

// Form schema validation
const familyMemberSchema = z.object({
  relationship: z.string({
    required_error: "Please select a relationship",
  }),
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  dateOfBirth: z.string().refine((date) => {
    return new Date(date) < new Date();
  }, {
    message: "Date of birth must be in the past",
  }),
  isDependent: z.boolean().default(false),
});

const formSchema = z.object({
  maritalStatus: z.string({
    required_error: "Please select a marital status",
  }),
  hasChildren: z.enum(["yes", "no"], {
    required_error: "Please specify if you have children",
  }),
  childrenCount: z.string().optional(),
  emergencyContact: z.object({
    name: z.string().min(2, {
      message: "Contact name must be at least 2 characters.",
    }),
    relationship: z.string({
      required_error: "Please specify relationship",
    }),
    phone: z.string().min(10, {
      message: "Please enter a valid phone number",
    }),
  }),
});

const FamilyDetailsForm = () => {
  const { toast } = useToast();
  const [isComplete, setIsComplete] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<z.infer<typeof familyMemberSchema>[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maritalStatus: "",
      hasChildren: "no",
      childrenCount: "0",
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
    },
  });

  // Initialize the family member form
  const familyMemberForm = useForm<z.infer<typeof familyMemberSchema>>({
    resolver: zodResolver(familyMemberSchema),
    defaultValues: {
      relationship: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      isDependent: false,
    },
  });

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Show success notification
    toast({
      title: "Family details updated",
      description: "Your family information has been saved successfully.",
    });
    
    setIsComplete(true);
    console.log({ ...values, familyMembers });
  };

  // Add family member handler
  const handleAddFamilyMember = (values: z.infer<typeof familyMemberSchema>) => {
    setFamilyMembers([...familyMembers, values]);
    familyMemberForm.reset();
    setOpenAddDialog(false);
    
    toast({
      title: "Family member added",
      description: `${values.firstName} ${values.lastName} has been added to your family details.`,
    });
  };

  // Remove family member handler
  const handleRemoveFamilyMember = (index: number) => {
    const updatedMembers = [...familyMembers];
    updatedMembers.splice(index, 1);
    setFamilyMembers(updatedMembers);
    
    toast({
      title: "Family member removed",
      description: "Family member has been removed from your details.",
    });
  };

  return (
    <AnimatedContainer className="my-8">
      <Card className="p-6 relative overflow-hidden">
        {isComplete && (
          <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
            <div className="bg-background rounded-lg p-4 shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Family Details Complete</h3>
              <p className="text-muted-foreground mb-4">All your family information has been saved.</p>
              <Button onClick={() => setIsComplete(false)} variant="outline">Edit Details</Button>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Family Details</h2>
          <p className="text-muted-foreground">
            Provide information about your family and emergency contacts
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="domestic_partnership">Domestic Partnership</SelectItem>
                        <SelectItem value="separated">Separated</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasChildren"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Do you have children?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex gap-6"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Yes
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              No
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("hasChildren") === "yes" && (
                  <FormField
                    control={form.control}
                    name="childrenCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of children</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                            <SelectItem value="more">More than 6</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium">Family Members</h3>
                  <p className="text-sm text-muted-foreground">Add spouse, children, or other dependents</p>
                </div>
                <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline" className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add Family Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Family Member</DialogTitle>
                      <DialogDescription>
                        Enter the details of your family member below.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={familyMemberForm.handleSubmit(handleAddFamilyMember)} className="space-y-4 py-4">
                      <FormField
                        control={familyMemberForm.control}
                        name="relationship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select relationship" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="spouse">Spouse</SelectItem>
                                <SelectItem value="partner">Partner</SelectItem>
                                <SelectItem value="child">Child</SelectItem>
                                <SelectItem value="parent">Parent</SelectItem>
                                <SelectItem value="sibling">Sibling</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={familyMemberForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="First name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={familyMemberForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={familyMemberForm.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={familyMemberForm.control}
                        name="isDependent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                Will be claimed as a dependent
                              </FormLabel>
                              <p className="text-sm text-muted-foreground">
                                This person qualifies as your dependent for tax and benefits purposes.
                              </p>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpenAddDialog(false)}>
                          Cancel
                        </Button>
                        <Button type="submit">Add Member</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              {familyMembers.length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg">
                  <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No family members added</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add your family members to include them in your benefits
                  </p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setOpenAddDialog(true)} 
                    className="mt-4"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Family Member
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {familyMembers.map((member, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {member.firstName} {member.lastName}
                          </h4>
                          <p className="text-sm text-muted-foreground capitalize">
                            {member.relationship}{member.isDependent ? " (Dependent)" : ""}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFamilyMember(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="emergencyContact.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emergencyContact.relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="Relationship to you" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emergencyContact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Save Family Details</Button>
            </div>
          </form>
        </Form>
      </Card>
    </AnimatedContainer>
  );
};

export default FamilyDetailsForm;
