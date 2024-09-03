import { createSlice } from '@reduxjs/toolkit';

export const roles = createSlice({
  name: 'roles',
  initialState: {
    // Roles
    // isRolesLoading: false,
    rolesList: [],
    rolesListSuccess: false,
    rolesListFail: false,
    // Add Roles
    rolesAddSuccess: false,
    rolesAddFail: false,
    // Edit roles
    rolesEditSuccess: false,
    rolesEditFail: false,
    // Delete Roles
    rolesDeleteSuccess: false,
    rolesDeleteFail: false

    // //rolesCategories
    // rolesCategories: [],
    // rolesCategoriesAddSuccess: false,
    // rolesCategoriesAddFail: false,
    // //
    // rolesCategoriesRank: [],
    // rolesCategoriesRankAddSuccess: false,
    // rolesCategoriesRankAddFail: false
  },
  reducers: {
    // fetching roles
    fetchRoles: (state, action) => {
      state.rolesList = action?.payload;
    },

    fetchRolesSuccess: (state, action) => {
      state.rolesListSuccess = action?.payload;
    },
    fetchRolesFail: (state, action) => {
      state.rolesListFail = action?.payload;
    },
    fetchRolesStatusReset: (state, action) => {
      state.rolesListSuccess = false;
      state.rolesListSuccess = false;
    },

    //addin roles

    addRolesSuccess: (state, action) => {
      state.rolesAddSuccess = action?.payload;
    },
    addRolesFail: (state, action) => {
      state.rolesAddFail = action?.payload;
    },
    resetAddRolesStatus: (state, action) => {
      state.rolesAddSuccess = false;
      state.rolesAddFail = false;
    },
    editRolesSuccess: (state, action) => {
      state.rolesEditSuccess = action?.payload;
    },
    editRolesFail: (state, action) => {
      state.rolesEditFail = action?.payload;
    },
    resetEditRolesStatus: (state, action) => {
      state.rolesEditSuccess = false;
      state.rolesEditFail = false;
    },
    deleteRolesSuccess: (state) => {
      state.rolesDeleteSuccess = true;
    },
    deleteRolesFail: (state) => {
      state.rolesDeleteFail = true;
    },
    resetDeleteRolesStatus: (state, action) => {
      state.rolesDeleteSuccess = false;
      state.rolesDeleteFail = false;
    }
    // //delete roles
    // deleteRolesSuccess: (state, action) => {
    //   state.rolesDeleteSuccess = action?.payload;
    // },
    // deleteRolesFail: (state, action) => {
    //   state.rolesDeleteFail = action?.payload;
    // },
    // resetDeleteRolesStatus: (state) => {
    //   state.rolesDeleteSuccess = false;
    //   state.rolesDeleteFail = false;
    // },

    // // fetch roles CAtegories
    // fetchRolesCategories: (state, action) => {
    //   state.rolesCategories = action?.payload;
    // },
    // fetchRolesCategoriesSuccess: (state, action) => {
    //   state.rolesCategoriesAddSuccess = action?.payload;
    // },
    // fetchRolesCategoriesFail: (state, action) => {
    //   state.rolesCategoriesAddFail = action?.payload;
    // },
    // resetFetchRolesCategories: (state) => {
    //   state.rolesCategoriesAddFail = false;
    //   state.rolesCategoriesAddSuccess = false;
    // },
    // //fetch rank
    // fetchRolesCategoriesRank: (state, action) => {
    //   state.rolesCategoriesRank = action?.payload;
    // },
    // fetchRolesCategoriesRankSuccess: (state, action) => {
    //   state.rolesCategoriesRankAddSuccess = action?.payload;
    // },
    // fetchRolesCategoriesRankFail: (state, action) => {
    //   state.rolesCategoriesRankAddFail = action?.payload;
    // }
  }
});

export const {
  // roles
  fetchRoles,
  fetchRolesFail,
  fetchRolesSuccess,
  fetchRolesStatusReset,
  addRolesFail,
  addRolesSuccess,
  resetAddRolesStatus,
  editRolesFail,
  editRolesSuccess,
  resetEditRolesStatus,
  deleteRolesFail,
  deleteRolesSuccess,
  resetDeleteRolesStatus
  // //categories
  // fetchRolesCategories,
  // fetchRolesCategoriesSuccess,
  // fetchRolesCategoriesFail,
  // resetFetchRolesCategories,
  // //categories rank
  // fetchRolesCategoriesRank,
  // fetchRolesCategoriesRankSuccess,
  // fetchRolesCategoriesRankFail
} = roles.actions;

export default roles.reducer;
