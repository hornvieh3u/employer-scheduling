import { useMutation, useQuery, useQueryClient } from "react-query";
import http from "../../library/http";
import { ENDPOINTS } from "../endpoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Log in to panel
async function logInRQ(payload) {
  const { data } = await http.post(ENDPOINTS.LOGIN, payload);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  return data;
}

export function useLogin() {
  const navigate = useNavigate();
  return useMutation(logInRQ, {
    onSuccess: () => {
      toast.success("Logged In Successfully");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });
}

// Log Out Admin
async function logOutRQ() {
  localStorage.removeItem("user");
}

export function useLogout() {
  const navigate = useNavigate();
  return useMutation(logOutRQ, {
    onSuccess: () => {
      toast.success("Logged Out Successfully");
      navigate("/login");
    },
    // onError: (error) => {
    //   toast.error(error);
    // },
  });
}
