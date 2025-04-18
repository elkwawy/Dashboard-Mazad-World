import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleAuction = (clientId, updateForm) => {
	const getClient = async () => {
		const response = await axios.get(`admin/clients/edit`, { params: { clientId } });
		updateForm(response.data);

		return response.data;
	};
	return useQuery({
		queryKey: ["clients", clientId],
		queryFn: () => getClient(),
		enabled: !!clientId,
	});
};