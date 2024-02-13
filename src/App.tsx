import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./router/ProtectedRoute";

export default function App() {
  // const userData = useAppSelector((state) => state.userInfo);
  return (
    <>
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </>
  )
}
