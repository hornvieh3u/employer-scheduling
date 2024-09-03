import * as api from './api';
import {
  fetchProgression,
  fetchProgressionCategories,
  deleteProgressionSuccess,
  deleteProgressionFail,
  resetDeleteProgressionStatus,
  fetchProgressionFail,
  fetchProgressionStatusReset,
  fetchProgressionSuccess,
  addProgressionFail,
  addProgressionSuccess,
  resetAddProgressionStatus,
  editProgressionFail,
  editProgressionSuccess,
  resetEditProgressionStatus,
  addProgressionCategoriesSuccess,
  addProgressionCategoriesFail,
  resetAddProgressionCategoriesStatus,
  editProgressionCategoriesFail,
  editProgressionCategoriesSuccess,
  deleteProgressionCategoriesFail,
  deleteProgressionCategoriesSuccess,
  resetDeleteProgressionCategoriesStatus,
  resetEditProgressionCategoriesStatus,
  fetchProgressionCategoriesRank,
  resetProgressionCategoriesRank,
  fetchProgressionCategoriesRankFail,
  fetchProgressionCategoriesRankSuccess,
  addProgressionCategoriesRankFail,
  addProgressionCategoriesRankSuccess,
  resetAddProgressionCategoriesRankStatus,
  deleteProgressionCategoriesRankSuccess,
  deleteProgressionCategoriesRankFail,
  resetDeleteProgressionCategoriesRankStatus,
  editProgressionCategoriesRankFail,
  editProgressionCategoriesRankSuccess,
  resetEditProgressionCategoriesRankStatus
} from './reducer';
//parent progression
export const progressionFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProgression();
    dispatch(fetchProgression(data?.data));
  } catch (error) {}
};
export const progressionAddAction = (progressionData) => async (dispatch) => {
  try {
    const { data } = await api.addProgression(progressionData);
    if (data.success === true) {
      dispatch(addProgressionSuccess(true));
    } else {
      dispatch(addProgressionFail(true));
    }
    dispatch(resetAddProgressionStatus());
    dispatch(progressionFetchAction());
  } catch (error) {}
};
export const progressionDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteProgression(id);
    if (data.success === true) {
      dispatch(deleteProgressionSuccess(true));
    } else {
      dispatch(deleteProgressionFail(true));
    }
    dispatch(resetDeleteProgressionStatus());
    dispatch(progressionFetchAction());
  } catch (error) {}
};
export const progressionEditAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.editProgression(payload);
    if (data.success === true) {
      dispatch(editProgressionSuccess(true));
    } else {
      dispatch(editProgressionFail(true));
    }
    dispatch(resetEditProgressionStatus());
    dispatch(progressionFetchAction());
  } catch (error) {}
};

//progression categories
export const progressionCategoriesFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProgressionCategories();
    dispatch(fetchProgressionCategories(data?.data));
  } catch (error) {}
};
export const progressionCategoriesAddAction = (categoriesData) => async (dispatch) => {
  try {
    const { data } = await api.addProgressionCategories(categoriesData);
    if (data.success === true) {
      dispatch(addProgressionCategoriesSuccess(true));
      dispatch(progressionFetchAction());
    } else {
      dispatch(addProgressionCategoriesFail(true));
    }
    dispatch(resetAddProgressionCategoriesStatus());
  } catch (error) {}
};
export const progressionCategoriesDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteProgressionCategories(id);
    if (data.success === true) {
      dispatch(deleteProgressionCategoriesSuccess(true));
    } else {
      dispatch(deleteProgressionCategoriesFail(true));
    }
    dispatch(resetDeleteProgressionCategoriesStatus());
    dispatch(progressionFetchAction());
  } catch (error) {}
};
export const progressionCategoriesEditAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.editProgressionCategories(payload);
    if (data.success === true) {
      dispatch(editProgressionCategoriesSuccess());
    } else {
      dispatch(editProgressionCategoriesFail());
    }
    dispatch(resetEditProgressionCategoriesStatus());
    dispatch(progressionFetchAction());
  } catch (error) {}
};
//categories  ranks
export const progressionCategoriesRankFetchAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchProgressionCategoriesRank(id);
    dispatch(fetchProgressionCategoriesRank(data?.data));
  } catch (error) {}
};
export const progressionCategoriesRankResetAction = () => async (dispatch) => {
  try {
    dispatch(resetProgressionCategoriesRank());
  } catch (error) {}
};
export const progressionCategoriesRankAddAction = (formdata, categoryId) => async (dispatch) => {
  try {
    const { data } = await api.addProgressionCategoriesRank(formdata,categoryId);
    if (data.success) {
      dispatch(addProgressionCategoriesRankSuccess());
    } else {
      dispatch(addProgressionCategoriesRankFail());
    }
    dispatch(resetAddProgressionCategoriesRankStatus())
    dispatch(progressionCategoriesRankFetchAction(categoryId));
  } catch (error) {}
};
export const progressionCategoriesRankEditAction =
  (formdata,categoryId,rankId) => async (dispatch) => {
    try {
      const { data } = await api.editProgressionCategoriesRank(formdata,rankId)
      if (data.success) {
        dispatch(editProgressionCategoriesRankSuccess());
      } else {
        dispatch(editProgressionCategoriesRankFail());
      }
      dispatch(resetEditProgressionCategoriesRankStatus());
      dispatch(progressionCategoriesRankFetchAction(categoryId));
    } catch (error) {}
  };
export const progressionCategoriesRankDeleteAction = (id, categoryId) => async (dispatch) => {
  try {
    const { data } = await api.deleteProgressionCategoriesRank(id);
    if (data.success) {
      dispatch(deleteProgressionCategoriesRankSuccess());
    } else {
      dispatch(deleteProgressionCategoriesRankFail());
    }
    dispatch(resetDeleteProgressionCategoriesRankStatus());
    dispatch(progressionCategoriesRankFetchAction(categoryId));
  } catch (error) {}
};
