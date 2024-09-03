import { useMutation, useQuery, useQueryClient } from "react-query";
import http from "../../library/http";
import { ENDPOINTS } from "../endpoints";
import toast from "react-hot-toast";

// Create New Admin
async function createAdminRQ(payload) {
  const { data } = await http.post(ENDPOINTS.CREATE_ADMIN, payload);
  return data;
}

export function useCreateAdmin() {
  const queryClient = useQueryClient();
  return useMutation(createAdminRQ, {
    onSuccess: () => {
      toast.success("Admin Created Successfully");
      queryClient.invalidateQueries("admins");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
}

// Fetch All Admin
async function fetchAdminsRQ() {
  const { data } = await http.get(ENDPOINTS.GET_ADMINS);
  return data;
}

export function useGetAdmins() {
  return useQuery("admins", fetchAdminsRQ);
}

// Update Admin
async function updateAdminRQ(id, payload) {
  const { data } = await http.patch(`${ENDPOINTS.UPDATE_ADMIN}/${id}`, payload);
  return data;
}

export function useUpdateAdmin() {
  return useMutation(updateAdminRQ, {
    onSuccess: () => {
      toast.success("Admin Updated Successfully");
    },
    onError: () => {
      toast.error("Unable to update this Admin");
    },
  });
}

// Delete Admin
async function deleteAdminRQ(id) {
  const { data } = await http.delete(`${ENDPOINTS.DELETE_ADMIN}/${id}`);
  return data;
}

export function useDeleteAdmin() {
  const queryClient = useQueryClient();
  return useMutation(deleteAdminRQ, {
    onSuccess: () => {
      toast.success("Admin Deleted Successfully");
      queryClient.invalidateQueries("admins");
    },
    onError: () => {
      toast.error("Unable to delete this Admin");
    },
  });
}
