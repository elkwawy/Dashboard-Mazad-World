import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token-MazedWorld");

const axiosInstance = axios.create({
  baseURL: "https://auc.masar-soft.com/api",
});
console.log(token);

axiosInstance.defaults.headers.get["Authorization"] = `Bearer ${token}`;
axiosInstance.defaults.headers.put["Authorization"] = `Bearer ${token}`;
axiosInstance.defaults.headers.delete["Authorization"] = `Bearer ${token}`;
axiosInstance.defaults.headers.post["Authorization"] = `Bearer ${token}`;
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
