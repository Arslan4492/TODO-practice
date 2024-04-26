import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const AppLayout = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
