import { TUserRole, TUserRoutePath } from "@/types";
import RoleProtection from "./RoleProtection";
import { MdOutlineDashboard } from "react-icons/md";
import Dashboard from "@/pages/dashboard";
import { CiBoxes } from "react-icons/ci";
import AllProducts from "@/pages/products/AllProducts";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GrServices } from "react-icons/gr";
import AllSales from "@/pages/sales/AllSales";
import AddProduct from "@/pages/products/AddProduct";

export const routeForSuperAdmin: TUserRoutePath[] = [
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
        element: <RoleProtection roles={[TUserRole.buyer, TUserRole.seller, TUserRole.superAdmin]}><AllProducts /></RoleProtection>
      },
      {
        path: '/add-product',
        title: 'Add Product',
        element: <RoleProtection roles={[TUserRole.seller, TUserRole.superAdmin]}><AddProduct /></RoleProtection>
      }
    ]
  },
  {
    path: '/all-sales',
    title: 'Sales History',
    icon: <LiaFileInvoiceDollarSolid />,
    element: <RoleProtection roles={[TUserRole.seller, TUserRole.superAdmin]}><AllSales /></RoleProtection>
  },
  {
    path: '/all-servicing',
    title: 'Servicing',
    icon: <GrServices />,
    element: <RoleProtection roles={[TUserRole.seller, TUserRole.superAdmin]}><AllProducts /></RoleProtection>
  }
];