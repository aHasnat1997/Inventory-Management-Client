import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { TRole } from "@/types";
import { verifyToken } from "@/utils/verifyToken";

type TRoleProtection = {
  children: ReactNode,
  roles: TRole[]
}
export default function RoleProtection({ children, roles }: TRoleProtection) {
  const { token } = useAppSelector(state => state.userInfo);
  const { role } = verifyToken(token?.access as string);
  console.log(role);


  if (roles && !roles.includes(role as TRole)) {
    return <Navigate to='/demo-page' replace={true} />
  }

  return <>
    {children}
  </>
}
