import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useUpdateCustomerHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ customerId, customerData }) =>
      axiosInstance.post(`v1/customers/update/${customerId}`, customerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      message.success("Customer updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update customer.";
      if (typeof errorMessage === "object") {
        Object.values(errorMessage)
          .flat()
          .forEach((msg) => message.error(msg));
      } else {
        message.error(errorMessage);
      }
    },
  });

  return mutation;
};
