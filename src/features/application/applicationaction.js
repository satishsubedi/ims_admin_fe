import {
  getAllApplications,
  getApplicationByIdApi,
  deleteApplicationApi,
} from "./applicationapi.js";
import { setAllApplications, setApplications } from "./applicationslice.js";

export const getAllApplicationAction = () => async (dispatch) => {
  const applicationInfo = await getAllApplications();
  const { status, payload } = applicationInfo;

  if (status === "success") {
    dispatch(setAllApplications(payload));
  }
};

export const getApplicationByIdAction = (applicationId) => async (dispatch) => {
  try {
    const applicationInfo = await getApplicationByIdApi(applicationId);
    if (!applicationInfo) {
      console.error("getApplicationByIdApi returned no response");
      return;
    }
    const { status, payload } = applicationInfo;
    if (status === "success") {
      dispatch(setApplications(payload));
    } else {
      console.error("Failed to fetch application:", applicationInfo.message);
    }
  } catch (error) {
    console.error("Error in getApplicationByIdAction:", error);
  }
};

export const deleteApplicationAction = (applicationId) => async (dispatch) => {
  try {
    const result = await deleteApplicationApi(applicationId);
    if (result?.status === "success") {
      dispatch(getAllApplicationAction());
      return { success: true };
    }
    return { success: false, message: result?.message };
  } catch (error) {
    console.error("Error in deleteApplicationAction:", error);
    return { success: false, message: "An error occurred" };
  }
};
