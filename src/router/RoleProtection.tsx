import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { TRole } from "@/types";

type TRoleProtection = {
  children: ReactNode,
  roles: TRole[]
}
export default function RoleProtection({ children, roles }: TRoleProtection) {
  const { role } = useAppSelector(state => state.userInfo);

  if (roles && !roles.includes(role as TRole)) {
    return <Navigate to='/demo-page' replace={true} />
  }

  return <>
    {children}
  </>
}
