import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
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
import ProductsFilter from "@/features/filter/ProductsFilter";
import ViewProduct from "@/components/ProductModals/ViewProduct";
import ProductSale from "@/components/ProductModals/ProductSale";
import DeleteDialog from "@/components/DeleteProduct/DeleteDialog";
import { useAppSelector } from "@/redux/hooks";
import { TUserRole } from "@/types";
import TableSkeleton from "@/components/Loader/TableSkeleton";

export default function AllProducts() {
  const { role: userRole, id: userId, username } = useAppSelector((state) => state.userInfo);
  const [query, setQuery] = useState<string>('');
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const { data: productData, isFetching } = useGetAllProductsQuery(query);
  const loadingArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  /**
   * Function for select and deselect id
   * @param id product id
   */
  const idsFromCheckboxFun = (id: string) => {
    const idMatch = deleteIds.find(i => i === id)
    if (idMatch) {
      const rest = deleteIds.filter(i => i !== id);
      setDeleteIds(rest);

    } else {
      setDeleteIds([...deleteIds, id])
    }
  }

  return (
    <section>
      <div className="w-full py-4 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-semibold italic">All Products</h2>
        </div>
        <div className="flex items-center gap-8">
          <div className={deleteIds.length === 0 || userRole === TUserRole.buyer ? 'hidden' : 'block'}>
            <DeleteDialog deleteIdArray={deleteIds} emptyArray={setDeleteIds} />
          </div>
          <ProductsFilter setQuery={setQuery} />
        </div>
      </div>
      <ScrollArea className='w-full h-[75vh]'>
        {
          isFetching ? loadingArray.map(i => <TableSkeleton key={i} />) :
            !productData || productData.doc.length === 0 ?
              <h1 className="text-4xl text-center">No Data Found</h1> :
              <Table>
                <TableCaption></TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[10px]"></TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    productData?.doc?.map((data: Record<string, ReactNode>) => <TableRow
                      key={data._id as string}
                    >
                      <TableCell>
                        <input
                          id={data._id as string}
                          type="checkbox"
                          onChange={() => idsFromCheckboxFun(data._id as string)}
                        />
                      </TableCell>
                      <TableCell>
                        <label
                          htmlFor={data._id as string}
                        >
                          {data?.productName}
                        </label>
                      </TableCell>
                      <TableCell>{data?.availability}</TableCell>
                      <TableCell>{data?.quantity}</TableCell>
                      <TableCell>$ {data?.price}</TableCell>
                      <TableCell className="w-[13rem] text-right">
                        <ViewProduct
                          id={data?._id as string}
                          userRole={userRole as string}
                          userId={userId as string}
                          firstName={username.firstName as string}
                          lastName={username.lastName as string}
                          productName={data?.productName as string}
                          price={data?.price as number}
                        />
                        {userRole === TUserRole.buyer ? <ProductSale
                          id={data?._id as string}
                          userId={userId as string}
                          firstName={username.firstName as string}
                          lastName={username.lastName as string}
                          productName={data?.productName as string}
                          price={data?.price as number}
                        /> : <></>}
                      </TableCell>
                    </TableRow>)
                  }
                </TableBody>
              </Table>
        }
      </ScrollArea>
      <div className={`flex justify-between ${productData?.meta?.limit >= 10 ? 'block ' : 'hidden'}`}>
        <Button
          variant={'outline'}
          className={`underline hover:text-white ${productData?.meta?.page === 1 ? 'opacity-20' : ''}`}
          onClick={() => setQuery(`page=${productData?.meta?.page === 1 ? productData?.meta?.page : productData?.meta?.page - 1}`)}
        >
          Previous
        </Button>
        <Button
          variant={'outline'}
          className={`underline hover:text-white ${productData?.meta?.totalPage === productData?.meta?.page ? 'opacity-20' : ''}`}
          onClick={() => setQuery(`page=${productData?.meta?.totalPage !== productData?.meta?.page ? productData?.meta?.page + 1 : productData?.meta?.totalPage}`)}
        >
          Next
        </Button>
      </div>
    </section>
  )
}
