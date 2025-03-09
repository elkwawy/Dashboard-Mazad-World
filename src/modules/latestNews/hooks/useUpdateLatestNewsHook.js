import axiosInstance from "@/hooks/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useUpdateLatestNewsHook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ newsId, newsData }) =>
      axiosInstance.post(`v1/LatestNews/update/${newsId}`, newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["latestNews"] });
      message.success("News updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to update news.";
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
