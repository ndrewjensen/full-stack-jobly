import { Routes, Route, Navigate } from "react-router-dom";
import Companies from "../Companies/Companies";
import Jobs from "../Jobs/Jobs";
import Homepage from "../Homepage/Homepage";
import CompanyPage from "../CompanyPage/CompanyPage";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

/** RoutesList Component
 * Props: none
 * State: none
 * App -> RoutesList -> { Companies, Jobs, Homepage CompanyPage}
 */

function RoutesList({ loginUser, registerUser, updateUser }) {
  return (
    <Routes className="RoutesList">
      <Route path="/" element={<Homepage />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/companies/:handle" element={<CompanyPage />} />
      <Route path="/register" element={<Register registerUser={registerUser} />} />
      <Route path="/login" element={<Login loginUser={loginUser} />} />
      <Route path="/profile" element={<Profile updateUser={updateUser}/>} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
