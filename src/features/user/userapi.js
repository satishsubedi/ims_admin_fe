import { apiProcessor } from "../../services/apiprocessor.js";

const apiBaseUrl = import.meta.env.VITE_BASE_API_URL;

export const userApi = apiBaseUrl + "/api/v1/auth";

export const getUserProfile = async () => {
  const url = `${userApi}/profile`;
  const method = "GET";
  return await apiProcessor({ url, method, isPrivate: true });
};

export const loginUser = async (userData) => {
  const url = `${userApi}/login`;
  const method = "POST";
  const payload = userData;
  return await apiProcessor({ url, method, payload });
};


export const updateProfile = async (profileData) => {
  const url = `${userApi}/profile`;
  const method = "PUT";
  const payload = profileData;
  return await apiProcessor({ url, method, payload, isPrivate: true });
};

export const changePassword = async (passwordData) => {
  const url = `${userApi}/change-password`;
  const method = "PUT";
  const payload = passwordData;
  return await apiProcessor({ url, method, payload, isPrivate: true });
};

export const fetchNewAccessTokenApi = async () => {
  const url = `${userApi}/refresh-token`;
  const method = "POST";
  return await apiProcessor({ url, method, isPrivate: true,isAcessJWT:false });
};  

export const logoutUser = async () => {
  const method = "POST";
  return await apiProcessor({ url, method, isPrivate: true });
};

export const getAllUsers = async () => {
    const url = `${userApi}/all`;
    const method = "GET";
    return await apiProcessor({ url, method, isPrivate: true });
};

export const inviteStaff = async (data) => {
  return await apiProcessor({
      url: `${userApi}/invite-staff`,
      method: "POST",
      payload: data,
      isPrivate: true,
  });
};

export const deleteUserApi = async (userId) => {
  return await apiProcessor({
      url: `${userApi}/delete-user/${userId}`,
      method: "DELETE",
      isPrivate: true,
  });
};

export const resetPasswordByToken = async (passwordData, token) => {
  const url = `${userApi}/reset-password-token`;
  const method = "POST";
  const payload = passwordData;
  return await apiProcessor({
    url,
    method,
    payload,
    isPrivate: true,
    token, // Pass the token specifically for this request
  });
};
export const getUserProfileByIdApi = async (userId) => {
  const url = `${userApi}/profile/${userId}`;
  const method = "GET";
  return await apiProcessor({ url, method, isPrivate: true });
};
export const updateAnyUserApi = async (id, data) => {
  const url = `${userApi}/update-user/${id}`;
  const method = "PUT";
  const payload = data;
  return await apiProcessor({ url, method, payload, isPrivate: true });
};
