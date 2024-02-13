import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

type ProductsFilterProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}
export default function ProductsFilter({ setQuery }: ProductsFilterProps) {
  const form = useForm({
    defaultValues: {
      category: '',
      brand: '',
      compatibility: '',
      price: '',
      condition: ''
    },
  });
  const { data: categoriesData } = useGetAllCategoriesQuery('', { pollingInterval: 30000, skipPollingIfUnfocused: true });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const categoryTitles = categoriesData?.doc?.map((list: { category: any; }) => list?.category)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    console.log(data);

    const filterString = Object.keys(data)
      .filter(key => data[key] !== undefined && data[key] !== null && data[key] !== '')
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
    setQuery(filterString);

    toast({
      title: "Filter successful...",
      duration: 1000
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="border border-gray-500 duration-200 hover:text-white">Filter</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Products</SheetTitle>
          <SheetDescription>
            Make your filter here. Click Filter when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full mt-16">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filter by Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="border border-gray-400">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          categoryTitles.map((list: string) => <SelectItem key={list} value={list}>{list}</SelectItem>)
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filter by Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Brand Name" {...field} className="border border-gray-400" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compatibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filter by Compatibility</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl className="border border-gray-400">
                        <SelectTrigger>
                          <SelectValue placeholder="Select Compatibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="windows">Windows</SelectItem>
                        <SelectItem value="mac">Mac</SelectItem>
                        <SelectItem value="linux">Linux</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filter by Price Range</FormLabel>
                    <FormControl>
                      <Input placeholder="Price Range" {...field} className="border border-gray-400" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filter by Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="border border-gray-400">
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

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" className="w-full">Filter</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>

        </div>
      </SheetContent>
    </Sheet>
  )
}
