import { getRequest, postRequest } from "@/lib/fetch";

export const useCategory = () => {
  const fetchAllCategories = async () => {
    let endPointUrl = `/api/category`;
    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };
  return {
    fetchAllCategories,
  };
};
