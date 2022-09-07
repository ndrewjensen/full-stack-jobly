import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import JobsList from "../JobsList/JobsList";
import JoblyApi from "../api";
import Loading from '../Loading/Loading';

/** Company Detail Page Component
 *
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