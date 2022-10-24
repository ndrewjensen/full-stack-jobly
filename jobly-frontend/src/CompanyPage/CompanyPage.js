import { useParams, Navigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import JobsList from "../JobsList/JobsList";
import JoblyApi from "../api";
import Loading from '../Loading/Loading';
import userContext from "../userContext";



/** Company Detail Page Component
 * Props: none
 * State: company
 * RoutesList -> CompanyPage -> Job
 */

function CompanyPage() {
  const params = useParams(); //returns an object
  const [company, setCompany] = useState({
    data: {},
    isLoading: true,
  });

  useEffect(() => {
    async function getCompany() {
      const resp = await JoblyApi.request(`companies/${params.handle}`);
      setCompany({ data: resp.company, isLoading: false });
    }
    getCompany();
  }, [params.handle]);

  const { username } = useContext(userContext);
  if (!username) return <Navigate to={"/"} />;

  if (company.isLoading) return <Loading />;

  return (
    <div className="CompanyPage">
      <h3>{company.data.name}</h3>
      <p>{company.data.description}</p>
      <JobsList jobs={company.data.jobs} />
    </div>
  );
}

export default CompanyPage;