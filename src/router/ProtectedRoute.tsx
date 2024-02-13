import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { id, email, username, phone } = useAppSelector(state => state.userInfo);

  if (!id || !email || !username || !phone) {
    return <Navigate to='/login' replace={true} />
  }

  return <>
    {children}
  </>
}
