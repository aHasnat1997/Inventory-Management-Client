import { TUserRole, TUserRoutePath } from "@/types";
import RoleProtection from "./RoleProtection";
import { MdOutlineDashboard } from "react-icons/md";
import Dashboard from "@/pages/dashboard";
import { CiBoxes } from "react-icons/ci";
import AllProducts from "@/pages/products/AllProducts";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GrServices } from "react-icons/gr";
import AddProduct from "@/pages/products/AddProduct";
import MyOrders from "@/pages/sales/MyOrders";

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
    element: <RoleProtection roles={[TUserRole.buyer, TUserRole.seller, TUserRole.superAdmin]}><AllProducts /></RoleProtection>,
  },
  {
    path: '/my-orders',
    title: 'Order History',
    icon: <LiaFileInvoiceDollarSolid />,
    element: <RoleProtection roles={[TUserRole.buyer]}><MyOrders /></RoleProtection>
  },
  {
    path: '/my-servicing',
    title: 'Servicing',
    icon: <GrServices />,
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