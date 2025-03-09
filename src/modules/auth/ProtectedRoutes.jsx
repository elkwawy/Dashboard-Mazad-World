import { Navigate } from "react-router-dom";
import { path } from "@/constant/paths";

const ProtectedRoutes = ({ isAuthenticated, children }) => {
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={`/${path.main}/authentication`} replace />
  );
};

export default ProtectedRoutes;
