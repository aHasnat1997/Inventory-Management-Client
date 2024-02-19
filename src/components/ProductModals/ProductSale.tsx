import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { FaDollyFlatbed } from "react-icons/fa";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { useAddSaleMutation } from "@/redux/features/sales/salesApi";

type TPayload = {
  id: string,
  productName: string,
  price: number,
  userId: string,
  firstName: string,
  lastName: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonTitle?: any,
}
export default function ProductSale({ id, productName, price, userId, firstName, lastName, buttonTitle = '' }: TPayload) {
  const [productId, setProductId] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [saleProduct, { isLoading }] = useAddSaleMutation()
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading) {
      toast({
        title: 'Order Processing...'
      });
    }
  }, [isLoading, toast])

  const form = useForm({
    defaultValues: {
      productName: name,
      buyerName: `${firstName} ${lastName}`,
      quantity: 1,
      price: productPrice
    },
  });

  async function onSubmit(values: Record<string, unknown>) {
    const saleData = {
      productId: productId,
      userId,
      productName: name,
      price: productPrice,
      quantity: values.quantity,
      buyerName: values.buyerName
    }

    try {
      const result = await saleProduct(saleData);
      if ('data' in result) {
        toast({
          title: 'Success',
          description: 'Product sale Success 👍',
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
        description: 'An error occurred during sale. Please try again.',
        duration: 2000,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {
          buttonTitle === '' ?
            <Button
              variant={'ghost'}
              className="text-2xl hover:text-white"
              onClick={() => {
                setProductId(id);
                setName(productName);
                setProductPrice(price as number);
              }}
            >
              <FaDollyFlatbed />
            </Button> :
            <Button
              onClick={() => {
                setProductId(id);
                setName(productName);
                setProductPrice(price as number);
              }}
            >
              <span>{buttonTitle}</span>
            </Button>
        }

      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order this Product</DialogTitle>
          <DialogDescription>
            Make your order here. Select Quantity and click order when you're done.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">

              <FormField
                control={form.control}
                name="buyerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border border-gray-500 text-gray-500"
                        placeholder="Name of product"
                        value={name}
                        readOnly={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="buyerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buyer Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full border border-gray-500 text-gray-500"
                        placeholder="Name of buyer"
                        readOnly={true}
                        value={`${firstName} ${lastName}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border border-gray-500 text-gray-500"
                          value={productPrice}
                          readOnly={true}
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
                          type="number"
                          className="w-full border border-gray-500"
                          onBlur={(e) => form.setValue("quantity", Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-8">
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                    >
                      Order
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
