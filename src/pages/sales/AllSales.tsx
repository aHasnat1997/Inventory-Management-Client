import { useGetAllSalesQuery } from "@/redux/features/sales/salesApi";
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

export default function AllSales() {
  const [query, setQuery] = useState<string>('');
  const { data: salesData } = useGetAllSalesQuery(query);

  return (
    <section>
      <div className="w-full py-4 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-semibold italic">All Sales</h2>
        </div>
      </div>
      <ScrollArea className='w-full h-[75vh]'>
        {
          !salesData || salesData.doc.length === 0 ?
            <h1 className="text-4xl text-center">No Data Found</h1> :
            <Table>
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Buyer Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  salesData?.doc?.map((data: Record<string, ReactNode>) => <TableRow
                    key={data._id as number}
                  >
                    <TableCell>{data?.productName}</TableCell>
                    <TableCell>{data?.buyerName}</TableCell>
                    <TableCell>$ {data?.price}</TableCell>
                    <TableCell>{data?.quantity}</TableCell>
                    <TableCell>{new Date(data?.createdAt as string).toDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button>Action</Button>
                    </TableCell>
                  </TableRow>)
                }
              </TableBody>
            </Table>
        }
      </ScrollArea>
      <div className={`flex justify-between ${salesData?.meta?.limit >= 10 ? 'block ' : 'hidden'}`}>
        <Button
          variant={'outline'}
          className={`underline hover:text-white ${salesData?.meta?.page === 1 ? 'opacity-20' : ''}`}
          onClick={() => setQuery(`page=${salesData?.meta?.page === 1 ? salesData?.meta.page : salesData?.meta?.page - 1}`)}
        >
          Previous
        </Button>
        <Button
          variant={'outline'}
          className={`underline hover:text-white ${salesData?.meta?.totalPage === salesData?.meta?.page ? 'opacity-20' : ''}`}
          onClick={() => setQuery(`page=${salesData.meta.totalPage !== salesData.meta.page ? salesData.meta.page + 1 : salesData.meta.totalPage}`)}
        >
          Next
        </Button>
      </div>
    </section>
  )
}
