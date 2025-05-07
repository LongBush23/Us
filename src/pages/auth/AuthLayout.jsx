import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const AuthLayout = () => {
  return (
    <div className="bg-st-200 flex h-screen items-center justify-center">
      <div className="h-fit w-[450px] bg-white px-8 py-10">
        <img className="mx-auto mb-6" src="/logo.png" alt="" />
        <Suspense fallback={<p>loading</p>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
export default AuthLayout;
