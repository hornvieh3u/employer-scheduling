import http from "../../library/http";
import { ENDPOINTS } from "../endpoints";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

// Fetch All User
async function fetchUsersRQ() {
  const { data } = await http.get(ENDPOINTS.GET_USERS);
  return data;
}

export function useGetUsers() {
  return useQuery("users", fetchUsersRQ);
}

// Delete User
async function deleteUserRQ(id) {
  const { data } = await http.delete(`${ENDPOINTS.DELETE_USER}/${id}`);
  return data;
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation(deleteUserRQ, {
    onSuccess: () => {
      toast.success("User Deleted Successfully");
      queryClient.invalidateQueries("users");
    },
    onError: () => {
      toast.error("Unable to delete this User");
    },
  });
}

// Ban User
async function banUserRQ(id) {
  const { data } = await http.patch(`${ENDPOINTS.BAN_USER}/${id}`);
  return data;
}

export function useBanUser() {
  const queryClient = useQueryClient();
  return useMutation(banUserRQ, {
    onSuccess: () => {
      toast.success("User Updated Successfully");
      queryClient.invalidateQueries("users");
    },
    onError: () => {
      toast.error("Unable to ban this User");
    },
  });
}
