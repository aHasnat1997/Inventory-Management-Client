import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAddServicingMutation } from "@/redux/features/servicing/servicingApi";
import { useAppSelector } from "@/redux/hooks";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";


const formSchema = z.object({
  servicingPart: z.string().min(1, { message: "product name is empty" }),
  preferredDate: z.date(),
  issueDescription: z.string().min(1, { message: "product name is empty" }),
});

export default function AddServicing() {
  const { id: userId } = useAppSelector((state) => state.userInfo);
  const [addServicing] = useAddServicingMutation();
  const { toast } = useToast();


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      servicingPart: "",
      preferredDate: new Date,
      issueDescription: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    const serviceData = {
      userId,
      servicingPart: values.servicingPart,
      issueDescription: values.issueDescription,
      preferredDate: values.preferredDate
    }
    try {
      const result = await addServicing(serviceData);
      if ('data' in result) {
        toast({
          title: 'Success',
          description: 'Product create Success 👍',
          duration: 2000,
        });
      } else if ('error' in result) {
        console.log(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const issueMessage = result.error as any
        const errorMessage = issueMessage.data?.issue[0]?.message;
        toast({
          title: 'Error',
          description: `🛑 ${errorMessage}`,
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'An error occurred during registration. Please try again.',
        duration: 2000,
      });
    }
  }

  return (
    <section>
      <h2 className="text-4xl font-semibold italic">Add Servicing</h2>
      <div className="w-full mt-16 px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="servicingPart"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Servicing Part</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="The part or component you want to service"
                        {...field}
                        className="w-full border border-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem className="w-[50%] flex flex-col">
                    <FormLabel>Preferred Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"ghost"}
                            className={cn(
                              "w-full pl-3 text-left font-normal border border-gray-500 hover:bg-transparent",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date <= new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issueDescription"
                render={({ field }) => (
                  <FormItem className="w-[50%]">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about issue..."
                        className="w-full h-80 border border-gray-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-8">
              <Button
                type="submit"
                className="border border-gray-300"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}
