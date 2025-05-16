import Header from "@components/Header";
import Loading from "@components/Loading";
import { saveUserInfo } from "@redux/slices/authSlice";
import { useGetAuthUserQuery } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const response = useGetAuthUserQuery();
  console.log({ response });

  const dispatch = useDispatch();
  useEffect(() => {
    if (response.isSuccess) {
      dispatch(saveUserInfo(response.data));
    }
  }, [response.isSuccess, dispatch, response.data]);

  if (response.isLoading) {
    return <Loading />;
  }

  // if (!response?.data?._id) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
export default ProtectedLayout;
