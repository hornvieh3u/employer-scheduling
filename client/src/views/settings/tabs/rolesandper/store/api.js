import { customInterIceptors } from '../../../../../lib/AxiosProvider';

const API = customInterIceptors();

export const addRoles = (payload) => {
  return API.post('role/create', payload);
};
export const fetchRoles = () => {
  return API.get('role');
};
export const deleteRoles = (id) => {
  return API.delete('role/roleId/' + id);
};
export const editRoles = (payload,id) => {
  return API.put('role/roleId/' + id,payload);
};

// //categories
// export const fetchRolesCategories = () => {
//   return API.get('/category/categoryDetails');
// };
// export const addRolesCategories = (categoriesData) => {
//   return API.post('category/addCategory/' + categoriesData.id, categoriesData);
// };

// export const fetchRolesCategoriesRank = (name) => {
//   return API.get('rank-category/category_rank_info/' + name);
// };
// export const addRolesCategoriesRank = (formdata) => {
//   return API.post('rank-category/add_category_rank', formdata);
// };
