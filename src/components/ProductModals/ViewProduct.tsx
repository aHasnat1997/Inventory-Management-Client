import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetSingleProductsQuery, useUpdateProductMutation } from "@/redux/features/products/productApi";
import { FaEye } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TUserRole } from "@/types";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const formSchema = z.object({
  productName: z.string().min(1, { message: "product name is empty" }).optional(),
  price: z.number().min(1, { message: "minimum value 1" }).optional(),
  quantity: z.number().min(1, { message: "minimum value 1" }).optional(),
  category: z.string().min(1, { message: "category is empty" }).optional(),
  subCategory: z.string().min(1, { message: "sub-category is empty" }).optional(),
  brand: z.string().min(1, { message: "brand is empty" }).optional(),
  compatibility: z.array(z.string().min(1, { message: "compatibility is empty" })).optional(),
  condition: z.string().min(1, { message: "condition is empty" }).optional(),
  availability: z.string().min(1, { message: "availability is empty" }).optional(),
  specification: z.object({}).optional(),
});

export default function ViewProduct({ id, userRole }: { id: string, userRole: string }) {
  const [productId, setProductId] = useState('');
  const { data: productData } = useGetSingleProductsQuery(id);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const { toast } = useToast();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (isLoading) {
      toast({
        title: 'Update Processing...'
      });
    }
  }, [isLoading, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: productData?.doc?.productName,
      price: productData?.doc?.price,
      quantity: productData?.doc?.quantity,
      category: productData?.doc?.category,
      subCategory: productData?.doc?.subCategory,
      brand: productData?.doc?.brand,
      compatibility: productData?.doc?.compatibility,
      condition: productData?.doc?.condition,
      availability: productData?.doc?.availability,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updateData = {
      productName: values.productName ? values.productName : productData?.doc?.productName,
      price: values.price ? values.price : productData?.doc?.price,
      quantity: values.quantity ? values.quantity : productData?.doc?.quantity,
      category: values.category ? values.category : productData?.doc?.category,
      subCategory: values.subCategory ? values.subCategory : productData?.doc?.subCategory,
      brand: values.brand ? values.brand : productData?.doc?.brand,
      compatibility: values.compatibility ? values.compatibility : productData?.doc?.compatibility,
      condition: values.condition ? values.condition : productData?.doc?.condition,
      availability: values.availability ? values.availability : productData?.doc?.availability,
    }

    try {
      const result = await updateProduct({ id: productId, productInfo: updateData });
      if ('data' in result) {
        toast({
          title: 'Success',
          description: 'Product update Success 👍',
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
        description: 'An error occurred during update. Please try again.',
        duration: 2000,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="text-2xl hover:text-white"
          onClick={() => setProductId(productData.doc._id)}
        >
          <FaEye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View Product</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">

              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border border-gray-500"
                        defaultValue={productData?.doc?.productName}
                        readOnly={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border border-gray-500"
                          onBlur={(e) => form.setValue("price", Number(e.target.value))}
                          defaultValue={productData?.doc?.price}
                          readOnly={!isEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border border-gray-500"
                          onBlur={(e) => form.setValue("quantity", Number(e.target.value))}
                          defaultValue={productData?.doc?.quantity}
                          readOnly={!isEdit}
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border border-gray-500"
                          defaultValue={productData?.doc?.category}
                          readOnly={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border border-gray-500"
                          defaultValue={productData?.doc?.subCategory}
                          readOnly={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border border-gray-500"
                        defaultValue={productData?.doc?.brand}
                        readOnly={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="compatibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Compatibility</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border border-gray-500"
                        onBlur={(e) => form.setValue("compatibility", [e.target.value])}
                        defaultValue={productData?.doc?.compatibility.map((i: string) => i)}
                        readOnly={!isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Condition</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border border-gray-500"
                          defaultValue={productData?.doc?.condition}
                          readOnly={!isEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border border-gray-500"
                          defaultValue={productData?.doc?.availability}
                          readOnly={!isEdit}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {
                userRole !== TUserRole.buyer ? <div className="pt-8">
                  <DialogFooter>
                    <div className="flex items-center space-x-2">
                      <Switch id="airplane-mode" onClick={() => setIsEdit(!isEdit)} />
                      <Label htmlFor="airplane-mode">Edit Mode(Want to Update Data)</Label>
                    </div>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        disabled={!isEdit}
                      >
                        Update
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </div> : <></>
              }

            </form>
          </Form>

        </div>
      </DialogContent>
    </Dialog>
  )
}
