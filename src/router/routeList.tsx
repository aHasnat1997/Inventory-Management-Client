import Dashboard from "@/pages/dashboard";
import { TUserRoutePath } from "@/types";
import { MdOutlineDashboard } from "react-icons/md";
import { CiBoxes } from "react-icons/ci";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import AllProducts from "@/pages/products/AllProducts";
import AllSales from "@/pages/sales/AllSales";
import AddProduct from "@/pages/products/AddProduct";


export const routeList: TUserRoutePath[] = [
  {
    path: '/',
    title: 'Dashboard',
    icon: <MdOutlineDashboard />,
    element: <Dashboard />
  },
  {
    title: 'Products',
    icon: <CiBoxes />,
    children: [
      {
        path: '/all-products',
        title: 'All Products',
        element: <AllProducts />
      },
      {
        path: '/add-product',
        title: 'Add Product',
        element: <AddProduct />
      }
    ]
  },
  {
    path: '/all-sales',
    title: 'Sales History',
    icon: <LiaFileInvoiceDollarSolid />,
    element: <AllSales />
  }
];