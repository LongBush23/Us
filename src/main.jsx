// src/index.js
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@pages/RootLayout";
// import ModalProvider from "@context/ModalProvider";
import { lazy } from "react";
import { ThemeProvider } from "@emotion/react";
const HomePage = lazy(() => import("@pages/HomePage"));
import theme from "./configs/muiConfig";
import RegisterPage from "@pages/auth/RegisterPage";
import AuthLayout from "@pages/auth/AuthLayout";
import LoginPage from "@pages/auth/LoginPage";
import OTPVerifyPage from "@pages/auth/OTPVerifyPage";
import { Provider } from "react-redux";
import { persistor, store } from "@redux/store";
import ProtectedLayout from "@pages/ProtectedLayout";
import MessagePage from "@pages/MessagePage";
import { PersistGate } from "redux-persist/integration/react";
import Dialog from "@components/Dialog";
import Loading from "@components/Loading";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/messages", element: <MessagePage /> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/verify-otp",
            element: <OTPVerifyPage />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ThemeProvider theme={theme}>
        {/* <ModalProvider> */}
        <RouterProvider router={router} />
        <Dialog />
        {/* </ModalProvider> */}
      </ThemeProvider>
    </PersistGate>
  </Provider>,
);
