import { Outlet } from "react-router-dom";
import { Suspense } from "react";
// Supports weights 100-900
import "@fontsource-variable/public-sans";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "@redux/slices/snackbarSlice";
import Loading from "@components/Loading";

const RootLayout = () => {
  const dispatch = useDispatch();

  const { open, type, message } = useSelector((state) => {
    console.log("RootLayout", state);
    return state.snackbar;
  });

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => dispatch(closeSnackBar())}
      >
        <Alert
          // onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default RootLayout;
