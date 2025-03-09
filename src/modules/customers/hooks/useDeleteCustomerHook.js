import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useDeleteCustomerHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (customerId) => {
      await axiosInstance.delete(`v1/customers/delete/${customerId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] }); 
      message.success("Customer deleted successfully!");
    },
    onError: (error) => {
      message.error(error?.response?.data?.message || "Failed to delete customer.");
    },
  });

  return mutation;
};
