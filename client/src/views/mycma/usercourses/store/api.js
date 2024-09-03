import { customInterIceptors } from '../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addCourse = (courseData) => {
  return API.post('/course/create', courseData);
};
export const fetchCourses = () => {
  return API.get('/course/');
};
export const fetchSingleCourse = () => {
  return API.get('/course/courseId/:id');
};
export const deleteCourse = (id) => {
  return API.delete('/course/courseId/'+ id);
};
export const editCourse = (payload) => {
  return API.put('/course/update/course_update/' + payload?.id, payload);
};

//categories
// export const fetchCourseCategories = () => {
//   return API.get('/category/categoryDetails');
// };
// export const addCourseCategories = (categoriesData) => {
//   return API.post('category/addCategory/' + categoriesData.id, categoriesData);
// };
// export const deleteCourseCategories = (payload) => {
//   return API.delete('category/categoryDelete/' + payload);
// };
// export const editCourseCategories = (payload) => {
//   return API.put('category/categoryUpdate/' + payload?.id, payload);
// };

// export const fetchCourseCategoriesRank = (name) => {
//   return API.get('rank-category/category_rank_info/' + name);
// };
// export const addCourseCategoriesRank = (formdata) => {
//   return API.post('rank-category/add_category_rank', formdata);
// };
// export const editCourseCategoriesRank = (payload, id) => {
//   return API.put('rank-category/update_category_rank/' + id, payload);
// };
// export const deleteCourseCategoriesRank = (id) => {
//   return API.delete('rank-category/delete_category_rank/' + id);
// };
