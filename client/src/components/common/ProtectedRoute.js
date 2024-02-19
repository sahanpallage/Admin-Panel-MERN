import { Outlet, Navigate } from "react-router-dom";
import { Navigationbar } from "./navbar/NavBar";

const ProtectedRoute = ({ auth }) => {
  console.log(auth);
  return auth ? (
    <>
      <Navigationbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
