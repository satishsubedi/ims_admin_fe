import { apiProcessor } from "../../services/apiprocessor";
const apiBaseUrl = import.meta.env.VITE_BASE_API_URL;

export const internshipApi = apiBaseUrl + "/api/v1/internship";
export const getAllInternships = async () => {
  const url = `${internshipApi}/get-all-internships`;
  const method = "GET";
  return await apiProcessor({ url, method, isPrivate: true });
};

export const createInternshipApi = async (payload) => {
  const url = `${internshipApi}/add-internship`;
  const method = "POST";
  return await apiProcessor({ url, method, payload, isPrivate: true });
};

export const getInternshipBySlugApi = async (slug) => {
  const url = `${internshipApi}/${slug}`;
  const method = "GET";
  return await apiProcessor({ url, method, isPrivate: true });
};

export const updateInternshipBySlugApi = async (slug, payload) => {
  try {
    const url = `${internshipApi}/update/${slug}`;
    const method = "PUT";
    const result = await apiProcessor({
      url,
      method,
      payload,
      isPrivate: true,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const deleteInternshipByIdApi = async (id) => {
  const url = `${internshipApi}/delete/${id}`;
  const method = "DELETE";
  return await apiProcessor({ url, method, isPrivate: true });
};
