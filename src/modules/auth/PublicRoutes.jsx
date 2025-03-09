import { Navigate } from "react-router-dom";
import { path } from "@/constant/paths";

const PublicRoutes = ({ isAuthenticated, children }) => {
  return isAuthenticated ? (
    <Navigate to={`/${path.main}/dashboard`} replace />
  ) : (
    children
  );
};

export default PublicRoutes;
