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
import { useGetAllServicingQuery } from "@/redux/features/servicing/servicingApi";
import { FaEye } from "react-icons/fa";

export default function AllServicing() {
  const [query, setQuery] = useState<string>('');
  const { data: servicingData, isFetching } = useGetAllServicingQuery(query);

  return (
    <section>
      <div className="w-full py-4 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-semibold italic">All Servicing</h2>
        </div>
      </div>
      <ScrollArea className='w-full h-[75vh]'>
        {
          isFetching ? <div>Loading...</div> :
            !servicingData || servicingData.doc.length === 0 ?
              <h1 className="text-4xl text-center">No Data Found</h1> :
              <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Servicing Part</TableHead>
                    <TableHead>Preferred Date</TableHead>
                    <TableHead>Servicing Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    servicingData?.doc?.map((data: Record<string, ReactNode>) => <TableRow
                      key={data._id as number}
                    >
                      <TableCell>{data?.servicingPart}</TableCell>
                      <TableCell>{new Date(data?.preferredDate as string).toDateString()}</TableCell>
                      <TableCell>{data?.isServicingDone ? 'Complete' : 'Pending'}</TableCell>
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
      <div className={`flex justify-between ${servicingData?.meta?.limit >= 10 ? 'block ' : 'hidden'}`}>
        <Button
          variant={'outline'}
          className={`underline hover:text-white ${servicingData?.meta?.page === 1 ? 'opacity-20' : ''}`}
          onClick={() => setQuery(`page=${servicingData?.meta?.page === 1 ? servicingData?.meta.page : servicingData?.meta?.page - 1}`)}
        >
          Previous
        </Button>
        <Button
          variant={'outline'}
          className={`underline hover:text-white ${servicingData?.meta?.totalPage === servicingData?.meta?.page ? 'opacity-20' : ''}`}
          onClick={() => setQuery(`page=${servicingData.meta.totalPage !== servicingData.meta.page ? servicingData.meta.page + 1 : servicingData.meta.totalPage}`)}
        >
          Next
        </Button>
      </div>
    </section>
  )
}
