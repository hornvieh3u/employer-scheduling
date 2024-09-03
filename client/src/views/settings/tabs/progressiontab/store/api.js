import { customInterIceptors } from '../../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addProgression = (progressionData) => {
  return API.post('/progression/add_progression', progressionData);
};
export const fetchProgression = () => {
  return API.get('/progression/get/progression_details');
};
export const deleteProgression = (id) => {
  return API.delete('/progression/delete/progression_remove/' + id);
};
export const editProgression = (payload) => {
  return API.put('progression/update/progression_update/' + payload?.id, payload);
};

//categories
export const fetchProgressionCategories = () => {
  return API.get('/category/categoryDetails');
};
export const addProgressionCategories = (categoriesData) => {
  return API.post('category/addCategory/' + categoriesData.id, categoriesData);
};
export const deleteProgressionCategories = (payload) => {
  return API.delete('category/categoryDelete/' + payload);
};
export const editProgressionCategories = (payload) => {
  return API.put('category/categoryUpdate/' + payload?.id, payload);
};

export const fetchProgressionCategoriesRank = (id) => {
  return API.get('rank-category/category_rank_info/' + id);
};
export const addProgressionCategoriesRank = (formdata,categoryId) => {
  return API.post('rank-category/add_category_rank/'+categoryId,formdata);
};
export const editProgressionCategoriesRank = (payload, id) => {
  return API.put('rank-category/update_category_rank/' + id, payload);
};
export const deleteProgressionCategoriesRank = (id) => {
  return API.delete('rank-category/delete_category_rank/' + id);
};
