import { useGetMyOrdersQuery } from "@/redux/features/sales/salesApi";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode, useState } from "react";

export default function MyOrders() {
  const [query, setQuery] = useState<string>('');
  const { data: orderData, isFetching } = useGetMyOrdersQuery(query);

  return (
    <section>
      <div className="w-full py-4 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-semibold italic">My Orders</h2>
        </div>
      </div>
      <ScrollArea className='w-full h-[75vh]'>
        {
          isFetching ? <div>Loading...</div> :
            !orderData || orderData.doc.length === 0 ?
              <h1 className="text-4xl text-center">No Data Found</h1> :
              <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    orderData?.doc?.map((data: Record<string, ReactNode>) => <TableRow
                      key={data._id as number}
                    >
                      <TableCell>{data?.productName}</TableCell>
                      <TableCell>$ {data?.price}</TableCell>
                      <TableCell>{data?.quantity}</TableCell>
                      <TableCell>{new Date(data?.createdAt as string).toDateString()}</TableCell>
                    </TableRow>)
                  }
                </TableBody>
              </Table>
        }
      </ScrollArea>
      <div className={`flex justify-between ${orderData?.meta?.limit >= 10 ? 'block ' : 'hidden'}`}>
        <Button
          variant={'outline'}
          className={`underline hover:text-white ${orderData?.meta?.page === 1 ? 'opacity-20' : ''}`}
          onClick={() => setQuery(`page=${orderData?.meta?.page === 1 ? orderData?.meta.page : orderData?.meta?.page - 1}`)}
        >
          Previous
        </Button>
        <Button
          variant={'outline'}
          className={`underline hover:text-white ${orderData?.meta?.totalPage === orderData?.meta?.page ? 'opacity-20' : ''}`}
          onClick={() => setQuery(`page=${orderData.meta.totalPage !== orderData.meta.page ? orderData.meta.page + 1 : orderData.meta.totalPage}`)}
        >
          Next
        </Button>
      </div>
    </section>
  )
}
