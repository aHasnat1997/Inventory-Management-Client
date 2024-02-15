import { TUserRole, TUserRoutePath } from "@/types";
import RoleProtection from "./RoleProtection";
import { MdOutlineDashboard } from "react-icons/md";
import Dashboard from "@/pages/dashboard";
import { CiBoxes } from "react-icons/ci";
import AllProducts from "@/pages/products/AllProducts";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import AllSales from "@/pages/sales/AllSales";
import AddProduct from "@/pages/products/AddProduct";

export const routeForBuyer: TUserRoutePath[] = [
  {
    path: '/',
    title: 'Dashboard',
    icon: <MdOutlineDashboard />,
    element: <Dashboard />
  },
  {
    path: '/all-products',
    title: 'Products',
    icon: <CiBoxes />,
    element: <RoleProtection roles={[TUserRole.buyer]}><AllProducts /></RoleProtection>,
  },
  {
    path: '/my-orders',
    title: 'Order History',
    icon: <LiaFileInvoiceDollarSolid />,
    element: <RoleProtection roles={[TUserRole.buyer]}><AllSales /></RoleProtection>
  },
  {
    path: '/my-servicing',
    title: 'Servicing',
    icon: <LiaFileInvoiceDollarSolid />,
    children: [
      {
        path: '/my-servicing',
        title: 'My Servicing',
        element: <RoleProtection roles={[TUserRole.buyer]}><AllProducts /></RoleProtection>
      },
      {
        path: '/add-servicing',
        title: 'Add servicing',
        element: <RoleProtection roles={[TUserRole.buyer]}><AddProduct /></RoleProtection>
      }
    ]
  }
];