import { apiProcessor } from "../../services/apiprocessor";
const apiBaseUrl = import.meta.env.VITE_BASE_API_URL;

const applicationApi = apiBaseUrl + "/api/v1/application";
export const getAllApplications = async () => {
  const url = `${applicationApi}/get-all-applications`;
  const method = "GET";
  return await apiProcessor({ url, method, isPrivate: true });
};
export const updateApplicationStatusApi = async (applicationId, status) => {
  const url = `${applicationApi}/update-application-status/${applicationId}`;
  const method = "PATCH";
  const payload = { status };
  return await apiProcessor({ url, method, payload, isPrivate: true });
};

export const getApplicationByIdApi = async (applicationId) => {
  const url = `${applicationApi}/get-application-by-id/${applicationId}`;
  const method = "GET";
  return await apiProcessor({ url, method, isPrivate: true });
};

export const deleteApplicationApi = async (applicationId) => {
  const url = `${applicationApi}/delete/${applicationId}`;
  const method = "DELETE";
  return await apiProcessor({ url, method, isPrivate: true });
};
