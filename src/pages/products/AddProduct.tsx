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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAddProductMutation } from "@/redux/features/products/productApi";
import { cn } from "@/lib/utils"
import { Check } from "lucide-react";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";


const formSchema = z.object({
  productName: z.string().min(1, { message: "product name is empty" }),
  price: z.number().min(1, { message: "minimum value 1" }),
  quantity: z.number().min(1, { message: "minimum value 1" }),
  category: z.string().min(1, { message: "category is empty" }),
  subCategory: z.string().min(1, { message: "sub-category is empty" }),
  brand: z.string().min(1, { message: "brand is empty" }),
  compatibility: z.array(z.string().min(1, { message: "compatibility is empty" })),
  condition: z.string().min(1, { message: "condition is empty" }),
  availability: z.string().min(1, { message: "availability is empty" }),
  specification: z.object({}).optional(),
});

export default function AddProduct() {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const { toast } = useToast();
  const { data: categoriesData } = useGetAllCategoriesQuery('');
  // console.log(categoriesData);

  useEffect(() => {
    if (isLoading) {
      toast({
        title: 'Adding Product Processing...'
      });
    }
  }, [isLoading, toast]);


  const compatibilityOption = [
    {
      id: 'windows',
      label: 'Windows'
    },
    {
      id: 'mac',
      label: 'MAC'
    },
    {
      id: 'linux',
      label: 'Linux'
    }
  ]


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      price: 0,
      quantity: 0,
      category: "",
      subCategory: "",
      brand: "",
      compatibility: [],
      condition: "",
      availability: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // const productData: TProduct = {}
    try {
      const result = await addProduct(values);
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
      <h2 className="text-4xl font-semibold italic">Add Product</h2>
      <div className="w-full mt-16 px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
            <div className="w-full flex items-center gap-4">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem className="w-[20%]">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="High-Performance Gaming PC" {...field} className="w-full border border-gray-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-[20%]">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1499.99"
                        {...field}
                        className="w-full border border-gray-500"
                        onBlur={(e) => form.setValue("price", Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="w-[20%]">
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="40" {...field} className="w-full border border-gray-500"
                        onBlur={(e) => form.setValue("quantity", Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-[20%]">
                    <Popover>
                      <PopoverTrigger className="w-full flex flex-col items-start gap-4">
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Category"
                            className="w-full border border-gray-500"
                          />
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandGroup>
                            <Input
                              {...field}
                              placeholder="Category Name"
                              className="w-full border border-gray-500 mb-4"
                            />
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {categoriesData?.doc?.map((data: any) => (
                              <CommandItem
                                value={data.category}
                                key={data.category}
                                onSelect={() => {
                                  form.setValue("category", data.category)
                                }}
                                className="w-72"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4",
                                    data.category === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {data.category}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem className="w-[20%]">
                    <FormLabel>Sub Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Gaming PC" {...field} className="w-full border border-gray-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex items-center gap-4">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="w-[20%]">
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="TechMaster" {...field} className="w-full border border-gray-500" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem className="w-[20%]">
                    <FormLabel>Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="w-full border border-gray-500">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="used">Used</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem className="w-[20%]">
                    <FormLabel>Availability</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="w-full border border-gray-500">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="in-stock">in-stock</SelectItem>
                        <SelectItem value="up-coming">up-coming</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="compatibility"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Compatibility</FormLabel>
                  </div>
                  <div className="flex items-center gap-8">
                    {compatibilityOption.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="compatibility"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-1 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  className="border-secondary"
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.id])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
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
