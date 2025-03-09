import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useCreateLatestNewsHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newsData) =>
      axiosInstance.post("v1/LatestNews/create", newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestNews"] });
      message.success("News added successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to add news.";
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
