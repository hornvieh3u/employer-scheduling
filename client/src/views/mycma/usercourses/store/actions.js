import * as api from './api';
import {
  fetchCourse,
  deleteCourseSuccess,
  deleteCourseFail,
  resetDeleteCourseStatus,
  addCourseFail,
  addCourseSuccess,
  resetAddCourseStatus,
  editCourseFail,
  editCourseSuccess,
  resetEditCourseStatus,

} from './reducer';
//parent course
export const courseFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCourses();  
    dispatch(fetchCourse(data));
  } catch (error) {}
};
export const courseAddAction = (courseData) => async (dispatch) => {
  try {
    const { data } = await api.addCourse(courseData);
    if (data.success === true) {
      dispatch(addCourseSuccess(true));
    } else {
      dispatch(addCourseFail(true));
    }
    dispatch(resetAddCourseStatus());
    dispatch(courseFetchAction());
  } catch (error) {}
};
export const courseDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteCourse(id);
    if (data.success === true) {
      dispatch(deleteCourseSuccess(true));
    } else {
      dispatch(deleteCourseFail(true));
    }
    dispatch(resetDeleteCourseStatus());
    dispatch(courseFetchAction());
  } catch (error) {}
};
export const courseEditAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.editCourse(payload);
    if (data.success === true) {
      dispatch(editCourseSuccess(true));
    } else {
      dispatch(editCourseFail(true));
    }
    dispatch(resetEditCourseStatus());
    dispatch(courseFetchAction());
  } catch (error) {}
};

//course categories
// export const courseCategoriesFetchAction = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchCourseCategories();
//     dispatch(fetchCourseCategories(data?.data));
//   } catch (error) {}
// };
// export const courseCategoriesAddAction = (categoriesData) => async (dispatch) => {
//   try {
//     const { data } = await api.addCourseCategories(categoriesData);
//     if (data.success === true) {
//       dispatch(addCourseCategoriesSuccess(true));
//       dispatch(courseFetchAction());
//     } else {
//       dispatch(addCourseCategoriesFail(true));
//     }
//     dispatch(resetAddCourseCategoriesStatus());
//   } catch (error) {}
// };
// export const courseCategoriesDeleteAction = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.deleteCourseCategories(id);
//     if (data.success === true) {
//       dispatch(deleteCourseCategoriesSuccess(true));
//     } else {
//       dispatch(deleteCourseCategoriesFail(true));
//     }
//     dispatch(resetDeleteCourseCategoriesStatus());
//     dispatch(courseFetchAction());
//   } catch (error) {}
// };
// export const courseCategoriesEditAction = (payload) => async (dispatch) => {
//   try {
//     const { data } = await api.editCourseCategories(payload);
//     if (data.success === true) {
//       dispatch(editCourseCategoriesSuccess());
//     } else {
//       dispatch(editCourseCategoriesFail());
//     }
//     dispatch(resetEditCourseCategoriesStatus());
//     dispatch(courseFetchAction());
//   } catch (error) {}
// };
// //categories  ranks
// export const courseCategoriesRankFetchAction = (name) => async (dispatch) => {
//   try {
//     const { data } = await api.fetchCourseCategoriesRank(name);
//     dispatch(fetchCourseCategoriesRank(data?.data));
//   } catch (error) {}
// };
// export const courseCategoriesRankResetAction = () => async (dispatch) => {
//   try {
//     dispatch(resetCourseCategoriesRank());
//   } catch (error) {}
// };
// export const courseCategoriesRankAddAction = (formdata, categoryName) => async (dispatch) => {
//   try {
//     const { data } = await api.addCourseCategoriesRank(formdata);
//     if (data.sucess) {
//       dispatch(addCourseCategoriesRankSuccess());
//     } else {
//       dispatch(addCourseCategoriesRankFail());
//     }
//     dispatch(courseCategoriesRankFetchAction(categoryName));
//   } catch (error) {}
// };
// export const courseCategoriesRankEditAction =
//   (formdata, categoryName, id) => async (dispatch) => {
//     try {
//       const { data } = await api.editCourseCategoriesRank(formdata, id);

//       if (data.success) {
//         dispatch(editCourseCategoriesRankSuccess());
//       } else {
//         dispatch(editCourseCategoriesRankFail());
//       }
//       dispatch(resetEditCourseCategoriesRankStatus());
//       dispatch(courseCategoriesRankFetchAction(categoryName));
//     } catch (error) {}
//   };
// export const courseCategoriesRankDeleteAction = (id, categoryName) => async (dispatch) => {
//   try {
//     const { data } = await api.deleteCourseCategoriesRank(id);
//     if (data.success) {
//       dispatch(deleteCourseCategoriesRankSuccess());
//     } else {
//       dispatch(deleteCourseCategoriesRankFail());
//     }
//     dispatch(resetDeleteCourseCategoriesRankStatus());
//     dispatch(courseCategoriesRankFetchAction(categoryName));
//   } catch (error) {}
// };
