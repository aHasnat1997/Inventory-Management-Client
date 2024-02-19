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
import { FaEye } from "react-icons/fa";
import TableSkeleton from "@/components/Loader/TableSkeleton";

export default function AllSales() {
  const [query, setQuery] = useState<string>('');
  const { data: salesData, isFetching } = useGetAllSalesQuery(query);
  const loadingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <section>
      <div className="w-full py-4 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-semibold italic">All Sales</h2>
        </div>
      </div>
      <ScrollArea className='w-full h-[75vh]'>
        {
          isFetching ? loadingArray.map(i => <TableSkeleton key={i} />) :
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
                    <TableHead></TableHead>
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
                        <Button
                          variant={'ghost'}
                          className="text-2xl hover:text-white"
                        >
                          <FaEye />
                        </Button>
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
