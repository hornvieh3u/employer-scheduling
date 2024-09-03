import * as api from './api';
import {
  fetchRoles,
  deleteRolesSuccess,
  deleteRolesFail,
  resetDeleteRolesStatus,
  fetchRolesFail,
  fetchRolesStatusReset,
  fetchRolesSuccess,
  addRolesFail,
  addRolesSuccess,
  resetAddRolesStatus,
  editRolesFail,
  editRolesSuccess,
  resetEditRolesStatus,
  fetchRolesCategoriesRankFail,
  fetchRolesCategoriesRankSuccess
} from './reducer';
//parent roles
export const rolesFetchAction = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRoles();

    dispatch(fetchRoles(data));
  } catch (error) {}
};
export const rolesAddAction = (payload) => async (dispatch) => {
  try {
    const { data } = await api.addRoles(payload);
    if (data.success === true) {
      dispatch(addRolesSuccess(true));
    } else {
      dispatch(addRolesFail(true));
    }
    dispatch(resetAddRolesStatus());
    dispatch(rolesFetchAction());
  } catch (error) {}
};
export const rolesEditAction = (payload,id) => async (dispatch) => {
  try {
    const { data } = await api.editRoles(payload,id);
    if (data.success === true) {
      dispatch(editRolesSuccess(true));
    } else {
      dispatch(editRolesFail(true));
    }
    dispatch(resetEditRolesStatus());
    dispatch(rolesFetchAction());
  } catch (error) {}
};
export const rolesDeleteAction = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteRoles(id);
    if (data.success === true) {
      dispatch(deleteRolesSuccess());
    } else {
      dispatch(deleteRolesFail());
    }
    dispatch(resetDeleteRolesStatus());
    dispatch(rolesFetchAction());
  } catch (error) {}
};

// //roles categories
// export const rolesCategoriesFetchAction = () => async (dispatch) => {
//   try {
//     const { data } = await api.fetchRolesCategories();
//     dispatch(fetchRolesCategories(data?.data));
//   } catch (error) {}
// };
// export const categoriesAddAction = (categoriesData) => async (dispatch) => {
//   try {
//     const { data } = await api.addRolesCategories(categoriesData);
//     if (data.success === true) {
//       dispatch(fetchRolesCategoriesSuccess(true));
//       dispatch(rolesFetchAction());
//     } else {
//       dispatch(fetchRolesCategoriesFail(true));
//     }
//     dispatch(resetFetchRolesCategories());
//   } catch (error) {}
// };
// //categories  ranks
// export const rolesCategoriesRankFetchAction = (name) => async (dispatch) => {
//   try {
//     const { data } = await api.fetchRolesCategoriesRank(name);
//     dispatch(fetchRolesCategoriesRank(data?.data));
//   } catch (error) {}
// };
// export const rolesCategoriesRankAddAction = (formdata) => async (dispatch) => {
//   try {
//     const { data } = await api.addRolesCategoriesRank(formdata);
//     dispatch(rolesCategoriesRankFetchAction(formdata?.categoryName));
//   } catch (error) {}
// };
