import { getAllUsers, getUserProfile, loginUser, updateProfile, inviteStaff, deleteUserApi, resetPasswordByToken, getUserProfileByIdApi, updateAnyUserApi } from "./userapi.js";
import { setUsersList, setUser, setSelectedUser } from "./userslice.js";
export const loginAction = (userData) => async (dispatch) => {
  const result = await loginUser(userData);

  const { status, payload, message } = result;

  if (status === "success" && message === "change password") {
    return { status, payload, message };
  }

  if (status === "success" && payload) {
    sessionStorage.setItem("accessToken", payload.accessToken);
    localStorage.setItem("refreshToken", payload.refreshToken);
    const user = await getUserProfile();
    if (user.status === "success" && user.payload) {
      dispatch(setUser(user.payload));
      return { status: "success" };
    }
  }
  return result;
};



export const updateProfileAction = (profileData) => async (dispatch) => {
  const user = await updateProfile(profileData);
  if (user.status === "success" && user.payload) {
    return dispatch(setUser(user.payload));
  }
};

export const changePasswordAction = (passwordData) => async (dispatch) => {
  const user = await changePassword(passwordData);
  if (user.status === "success" && user.payload) {
    return dispatch(setUser(user.payload));
  }
};
export const fethProfileAction = () => async (dispatch) => {
  const user = await getUserProfile();
  if (user.status === "success" && user.payload) {
    return dispatch(setUser(user.payload));
  }
};

export const getAllUsersAction = () => async (dispatch) => {
    const response = await getAllUsers();
    if (response.status === "success" && response.payload) {
        return dispatch(setUsersList(response.payload));
    }
}



export const autologinAction = () => {
  return async (dispatch) => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return;
    }
    // dispatch(setLoading(true));
    
    try {
      if (accessToken) {
        // dispatch(fetchProfileAction());
        const response = await getUserProfile();
        if (
          response?.status === "error" &&
          response?.message === "jwt expired"
        ) {
          const tokens = await fetchNewAccessTokenApi();
          
          if (tokens.status === "success" && tokens?.payload) {
            sessionStorage.setItem("accessToken", tokens?.payload);

            const getUser = await getUserProfile();
            if (getUser?.status === "success") {
              dispatch(setUser(getUser?.payload));
              return { success: true };
            }
          }
        }
        if (response?.status === "success" && response?.payload) {
          dispatch(setUser(response?.payload));
          return { success: true };
        }
      }
    } catch (error) {
      console.error("Auto-login error:", error);
      throw error;
    }
  };
};


export const logoutAction = () => {
  return async (dispatch) => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed on server:", error);
    } finally {
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
      return { success: true };
    }
  };
};

export const deleteUserAction = (userId) => async (dispatch) => {
    const response = await deleteUserApi(userId);
    if (response.status === "success") {
        dispatch(getAllUsersAction()); // Refresh the list
        return { success: true, message: response.message };
    }
    return { success: false, message: response.message };
};
export const resetPasswordByTokenAction = (passwordData, token) => async (dispatch) => {
    const response = await resetPasswordByToken(passwordData, token);
    return response;
};
export const getUserProfileByIdAction = (userId) => async (dispatch) => {
  try {
    const result = await getUserProfileByIdApi(userId);
    if (result?.status === "success") {
      dispatch(setSelectedUser(result.payload));
      return { success: true };
    }
    return { success: false, message: result?.message };
  } catch (error) {
    console.error("Error in getUserProfileByIdAction:", error);
    return { success: false, message: "An error occurred" };
  }
};
export const updateAnyUserAction = (id, data) => async (dispatch) => {
  try {
    const result = await updateAnyUserApi(id, data);
    if (result?.status === "success") {
       dispatch(getAllUsersAction()); // Refresh list
       return { success: true };
    }
    return { success: false, message: result?.message };
  } catch (error) {
    console.error("Error in updateAnyUserAction:", error);
    return { success: false, message: "An error occurred" };
  }
};
