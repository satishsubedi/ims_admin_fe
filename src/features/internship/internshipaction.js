import { toast } from "react-toastify";
import {
  deleteInternshipByIdApi,
  getAllInternships,
  getInternshipBySlugApi,
  updateInternshipBySlugApi,
} from "./internshipapi.js";
import {
  deleteInternshipById,
  setInternshipBySlug,
  setInternships,
} from "./internshipslice.js";

export const fetchInternshipActions = () => async (dispatch) => {
  const internshipInfo = await getAllInternships();
  const { status, payload } = internshipInfo;
  status === "success" && dispatch(setInternships(payload));
};

export const fetchInternshipActionsByslug = (slug) => async (dispatch) => {
  // API call to get internship by slug can be implemented here
  const internshipInfo = await getInternshipBySlugApi(slug);
  const { status, payload } = internshipInfo;
  status === "success" && dispatch(setInternshipBySlug(payload));
};

export const deleteInternshipByIdActions = (id) => async (dispatch) => {
  // API call to delete internship by ID can be implemented here
  const { status } = await deleteInternshipByIdApi(id);
  if (status === "success") {
    toast.success("Internship deleted successfully");
  }

  // After successful deletion, you might want to dispatch an action to update the state
  dispatch(deleteInternshipById(id));
};

export const updateInternshipActionsBySlug = (slug, payload) => async (dispatch) => {
  const result = await updateInternshipBySlugApi(slug, payload);
  if (result?.status === "success") {
    // Optionally refresh the data or update state directly
    dispatch(fetchInternshipActionsByslug(slug));
    return { success: true };
  }
  return { success: false, message: result?.message };
};
