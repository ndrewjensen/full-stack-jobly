import { useEffect, useState } from "react";

import CompanyCard from "../CompanyCard/CompanyCard";
import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import JoblyApi from "../api";
import { NavLink } from "react-router-dom";
import CompaniesList from "../CompaniesList/CompaniesList";

/** Companies Component
 *
 * state: companies
 *
 * RoutesList -> Companies -> CompanyCard
 */

function Companies() {
  const [companies, setCompanies] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    async function getCompanies() {
      const resp = await JoblyApi.request("companies");
      setCompanies({ data: resp.companies, isLoading: false });
    }
    getCompanies();
  }, []);

  /** makes API call for companies name from form search term */
  async function search(formData) {
    const { searchTerm } = formData;
    const resp = await JoblyApi.request("companies", { name: searchTerm });
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
