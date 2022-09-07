import CompanyCard from "../CompanyCard/CompanyCard";
import SearchForm from "../SearchForm/SearchForm";
import { useEffect, useState } from "react";
import JoblyApi from "../api";

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
//TODO: add loading component
//TODO: Key
  if (companies.isLoading) return <div>Loading...</div>;

  return (
    <div className="Companies">
      <SearchForm />
      {companies.data.map((company) => (
        <CompanyCard company={company} />
      ))}
    </div>
  );
}

export default Companies;
