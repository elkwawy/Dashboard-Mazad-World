import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/context/userProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { ConfigProvider } from "antd";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <Router>
        <ConfigProvider>
          <App />
        </ConfigProvider>
      </Router>
    </UserProvider>
  </QueryClientProvider>
);
