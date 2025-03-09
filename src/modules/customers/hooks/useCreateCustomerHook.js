import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateCustomerHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (customerData) =>
      axiosInstance.post("v1/customers/create", customerData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      message.success("Customer added successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to add customer.";
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
