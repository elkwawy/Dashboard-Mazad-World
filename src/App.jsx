import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import Login from "@/modules/auth/Login";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import Dashboard from "./modules/dashboard/Dashboard";
import Users from "./modules/users/Users";
import Categories from "./modules/categories/Categories";
import Products from "./modules/products/Products";
import Customers from "./modules/customers/Customers";
import Sellers from "@/modules/sellers/Sellers";
import { path } from "@/constant/paths";
import "./App.css";
import PublicRoutes from "@/modules/auth/PublicRoutes";
import ProtectedRoutes from "@/modules/auth/ProtectedRoutes";
import { useEffect } from "react";
import Cookies from "js-cookie";
import NotFound from "./modules/NotFound";
import Tester from "./layouts/testing/Tester";
import TestList from "./layouts/testing/pages/TestList";
import LatestNews from "./modules/latestNews/LatestNews";
import Faqs from "./modules/faqs/Faqs";
import Auctions from "./modules/auctions/Auctions";
function App() {
  const token = Cookies.get(path.token);
  const isAuthenticated = Boolean(token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate(`/${path.main}/authentication`, { replace: true });
    }
  }, [navigate, token]);

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(`/${path.main}/dashboard`, { replace: true });
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <Routes>
        {/* Public Routes */}
        <Route
          path={`/${path.main}/authentication`}
          element={
            <PublicRoutes isAuthenticated={isAuthenticated}>
              <Login />
            </PublicRoutes>
          }
        ></Route>
        {/* Redirect `/main` to `/main/dashboard` automatically */}
        <Route
          path={`/${path.main}`}
          element={<Navigate to={`/${path.main}/dashboard`} replace />}
        />
        {/* Protected Routes */}
        <Route
          path={`/${path.main}`}
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <DashboardLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="categories" element={<Categories />} />
          <Route path="Customers" element={<Customers />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="auctions" element={<Auctions />} />
          <Route path="latestNews" element={<LatestNews />} />
          <Route path="products" element={<Products />} />
          <Route path="test" element={<TestList />} />
          <Route path="tester" element={<Tester />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
