import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthModal from "./AuthModal";

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log("RequireAuth", auth);

  return auth?.roles?.find((role) => allowedRoles?.includes(role) || role === 5150) ? (
    <Outlet />
  ) : !auth?.accessToken ? ( //changed from user to accessToken to persist login after refresh
    <>
      <Outlet />
      <AuthModal authRequired />
    </>
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
