import { Routes, Route, Navigate } from "react-router-dom";
import Companies from "../Companies/Companies";
import Jobs from "../Jobs/Jobs";
import Homepage from "../Homepage/Homepage";
import CompanyPage from "../CompanyPage/CompanyPage";

/** RoutesList Component
 *
 * App -> RoutesList -> { Companies, Jobs, Homepage CompanyPage}
 */

function RoutesList() {
  return (
    <Routes className="RoutesList">
      <Route path="/" element={<Homepage />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/companies/:handle" element={<CompanyPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RoutesList;
