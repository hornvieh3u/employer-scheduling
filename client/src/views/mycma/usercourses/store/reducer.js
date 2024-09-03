import { createSlice } from '@reduxjs/toolkit';

export const course = createSlice({
  name: 'course',
  initialState: {
    // Course
    courseList: [],
    courseListSuccess: false,
    courseListFail: false,
    isCourseLoading: false,
    // Add Course
    courseAddSuccess: false,
    courseAddFail: false,
    // Delete Course
    courseDeleteSuccess: false,
    courseDeleteFail: false,
    //Edit Course
    courseEditSuccess: false,
    courseEditFail: false,
    //courseCategories
    // courseCategories: [],
    // courseCategoriesAddSuccess: false,
    // courseCategoriesAddFail: false,

    // courseCategoriesDeleteSuccess: false,
    // courseCategoriesDeleteFail: false,

    // courseCategoriesEditSuccess: false,
    // courseCategoriesEditFail: false,
    // //
    // courseCategoriesRank: [],
    // courseCategoriesRankAddSuccess: false,
    // courseCategoriesRankAddFail: false,
    // courseCategoriesRankDeleteSuccess: false,
    // courseCategoriesRankDeleteFail: false,
    // courseCategoriesRankEditSuccess: false,
    // courseCategoriesRankEditFail: false
  },
  reducers: {
    // fetching course
    fetchCourse: (state, action) => {
      state.courseList = action?.payload;
    },

    fetchCourseSuccess: (state, action) => {
      state.courseListSuccess = action?.payload;
    },
    fetchCourseFail: (state, action) => {
      state.courseListFail = action?.payload;
    },
    fetchCourseStatusReset: (state, action) => {
      state.courseListSuccess = false;
      state.courseListSuccess = false;
    },

    //addin course

    addCourseSuccess: (state, action) => {
      state.courseAddSuccess = action?.payload;
    },
    addCourseFail: (state, action) => {
      state.courseAddFail = action?.payload;
    },
    resetAddCourseStatus: (state, action) => {
      state.courseAddSuccess = false;
      state.courseAddFail = false;
    },
    //delete course
    deleteCourseSuccess: (state, action) => {
      state.courseDeleteSuccess = action?.payload;
    },
    deleteCourseFail: (state, action) => {
      state.courseDeleteFail = action?.payload;
    },
    resetDeleteCourseStatus: (state) => {
      state.courseDeleteSuccess = false;
      state.courseDeleteFail = false;
    },
    //edit course
    editCourseSuccess: (state, action) => {
      state.courseEditSuccess = action?.payload;
    },
    editCourseFail: (state, action) => {
      state.courseEditFail = action?.payload;
    },
    resetEditCourseStatus: (state) => {
      state.courseEditSuccess = false;
      state.courseEditFail = false;
    },

    // // fetch course CAtegories
    // fetchCourseCategories: (state, action) => {
    //   state.courseCategories = action?.payload;
    // },
    // addCourseCategoriesSuccess: (state) => {
    //   state.courseCategoriesAddSuccess = true;
    // },
    // addCourseCategoriesFail: (state, action) => {
    //   state.courseCategoriesAddFail = true;
    // },
    // resetAddCourseCategoriesStatus: (state) => {
    //   state.courseCategoriesAddFail = false;
    //   state.courseCategoriesAddSuccess = false;
    // },
    // deleteCourseCategoriesSuccess: (state) => {
    //   state.courseCategoriesDeleteSuccess = true;
    // },
    // deleteCourseCategoriesFail: (state) => {
    //   state.courseCategoriesDeleteFail = true;
    // },
    // resetDeleteCourseCategoriesStatus: (state) => {
    //   state.courseCategoriesDeleteFail = false;
    //   state.courseCategoriesDeleteSuccess = false;
    // },
    // editCourseCategoriesSuccess: (state) => {
    //   state.courseCategoriesEditSuccess = true;
    // },
    // editCourseCategoriesFail: (state) => {
    //   state.courseCategoriesEditFail = true;
    // },
    // resetEditCourseCategoriesStatus: (state) => {
    //   state.courseCategoriesEditFail = false;
    //   state.courseCategoriesEditSuccess = false;
    // },

    // //fetch rank
    // fetchCourseCategoriesRank: (state, action) => {
    //   state.courseCategoriesRank = action?.payload;
    // },
    // resetCourseCategoriesRank: (state) => {
    //   state.courseCategoriesRank = [];
    // },

    // addCourseCategoriesRankSuccess: (state) => {
    //   state.courseCategoriesRankAddSuccess = true;
    // },
    // addCourseCategoriesRankFail: (state) => {
    //   state.courseCategoriesRankAddFail = true;
    // },
    // editCourseCategoriesRankSuccess: (state) => {
    //   state.courseCategoriesRankEditSuccess = true;
    // },
    // editCourseCategoriesRankFail: (state) => {
    //   state.courseCategoriesRankEditFail = true;
    // },
    // resetEditCourseCategoriesRankStatus: (state) => {
    //   state.courseCategoriesRankEditFail = false;
    //   state.courseCategoriesRankEditSuccess = false;
    // },

    // deleteCourseCategoriesRankSuccess: (state) => {
    //   state.courseCategoriesRankDeleteSuccess = true;
    // },
    // deleteCourseCategoriesRankFail: (state) => {
    //   state.courseCategoriesRankDeleteFail = true;
    // },
    // resetDeleteCourseCategoriesRankStatus: (state) => {
    //   state.courseCategoriesRankDeleteFail = false;
    //   state.courseCategoriesRankDeleteSuccess = false;
    // }
  }
});

export const {
  // course
  fetchCourse,
  fetchCourseFail,
  fetchCourseSuccess,
  fetchCourseStatusReset,
  addCourseFail,
  addCourseSuccess,
  resetAddCourseStatus,
  deleteCourseFail,
  deleteCourseSuccess,
  resetDeleteCourseStatus,
  editCourseFail,
  editCourseSuccess,
  resetEditCourseStatus,
  // //categories
  // fetchCourseCategories,
  // addCourseCategoriesSuccess,
  // addCourseCategoriesFail,
  // resetAddCourseCategoriesStatus,
  // deleteCourseCategoriesFail,
  // deleteCourseCategoriesSuccess,
  // resetDeleteCourseCategoriesStatus,
  // editCourseCategoriesFail,
  // editCourseCategoriesSuccess,
  // resetEditCourseCategoriesStatus,
  // //categories rank
  // fetchCourseCategoriesRank,
  // resetCourseCategoriesRank,
  // fetchCourseCategoriesRankSuccess,
  // fetchCourseCategoriesRankFail,
  // addCourseCategoriesRankFail,
  // addCourseCategoriesRankSuccess,
  // deleteCourseCategoriesRankSuccess,
  // deleteCourseCategoriesRankFail,
  // resetDeleteCourseCategoriesRankStatus,
  // editCourseCategoriesRankFail,
  // editCourseCategoriesRankSuccess,
  // resetEditCourseCategoriesRankStatus
} = course.actions;

export default course.reducer;
