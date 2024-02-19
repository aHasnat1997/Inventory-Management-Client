import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteProductMutation } from "@/redux/features/products/productApi";
import { useEffect } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { useToast } from "../ui/use-toast";

/**
 * Product delete Dialog
 * @param deleteIdArray array of ids
 * @returns Dialog for confirmation
 */
export default function DeleteDialog({ deleteIdArray, emptyArray }: { deleteIdArray: string[], emptyArray: React.Dispatch<React.SetStateAction<string[]>> }) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading) {
      toast({
        title: 'Update Processing...'
      });
    }
  }, [isLoading, toast]);

  const handleDelete = async () => {
    const result = await deleteProduct(deleteIdArray);
    if (result) {
      emptyArray([])
      toast({
        title: 'Success',
        description: 'Product update Success 👍',
        duration: 2000,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className='w-full text-2xl hover:text-white'
        >
          <div className="flex items-center gap-2 ">
            <RiDeleteBinFill />
            <span className="text-base">Delete Product</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="w-full text-center py-4">
          <h3 className="text-xl font-bold">Confirmation Product Delete</h3>
          <p>Are you want to delete product?</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={'outline'}
              className="border-gray-400 hover:text-white"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={'destructive'} onClick={handleDelete}>
              <div className="flex items-center gap-2 ">
                <RiDeleteBinFill />
                <span className="text-base">Delete</span>
              </div>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
