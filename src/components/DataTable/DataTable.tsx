import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DataTable() {
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]"></TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <input type="checkbox" />
          </TableCell>
          <TableCell>productName</TableCell>
          <TableCell>availability</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$ 299.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
