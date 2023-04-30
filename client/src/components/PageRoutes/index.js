import { Routes, Route } from "react-router-dom";
import Join from "../../Pages/Join";
import Home from "../../Pages/Home";
import Dashboard from "../../Pages/Dashboard";
import Login from "../../Pages/Login";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard/" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/join" element={<Join />}></Route>
    </Routes>
  );
};

export default PageRoutes;
