import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import JoblyApi from "../api";
import CompaniesList from "../CompaniesList/CompaniesList";
import userContext from "../userContext";

/** Companies Component
 * Props: none
 * State: companies
 * RoutesList -> Companies -> CompanyCard
 */

function Companies() {

  const [companies, setCompanies] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    async function getCompanies() {
      const resp = await JoblyApi.getAllCompanies();
      setCompanies({ data: resp.companies, isLoading: false });
    }
    getCompanies();
  }, []);

  const { username } = useContext(userContext);
  if (!username) return <Navigate to={"/"} />;

  /** makes API call for companies name from form search term */
  async function search(formData) {
    const { searchTerm } = formData;
    const resp = await JoblyApi.searchCompanies(searchTerm);
    setCompanies({ data: resp.companies, isLoading: false });
  }

  if (companies.isLoading) return <Loading />;

  return (
    <div className="Companies">
      <SearchForm search={search} />
      <CompaniesList companies={companies.data} />
    </div>
  );
}

export default Companies;
