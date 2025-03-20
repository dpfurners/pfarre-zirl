import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthModal from "./AuthModal";
import { ROLES } from "../../constants.ts";

const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.some(
    (role) => allowedRoles.includes(role) || role === ROLES.Admin
  ) ? (
    <Outlet />
  ) : !auth?.accessToken ? ( //changed from user to accessToken to persist login after refresh
    <>
      Loading...
      <AuthModal authRequired />
    </>
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
