import { Routes, Route } from "react-router-dom";
import Join from "../../Pages/Join";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Groups from "../../Pages/Groups";
import SingleGroup from "../../Pages/SingleGroup";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/dashboard/" element={<Dashboard />}></Route> */}
      <Route path="/login" element={<Login />}></Route>
      <Route path="/join" element={<Join />}></Route>
      <Route path="/groups" element={<Groups />}></Route>
      <Route path="/groups/:groupId" element={<SingleGroup />} />
    </Routes>
  );
};

export default PageRoutes;
