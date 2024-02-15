import MainLayout from "./layout/MainLayout";
import { useAppSelector } from "./redux/hooks";
import ProtectedRoute from "./router/ProtectedRoute";

export default function App() {
  const userData = useAppSelector((state) => state.userInfo);
  console.log(userData);

  return (
    <>
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </>
  )
}
