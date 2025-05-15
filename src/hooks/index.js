// hooks/useAuth.js

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut as logOutAction } from "@redux/slices/authSlice";

// Custom hook để logout
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logOutAction());
    navigate("/login", { replace: true });
  };

  return { logOut };
};

// Custom hook để lấy thông tin người dùng
export const useUserInfo = () => {
  return useSelector((state) => state.auth.userInfo);
};
