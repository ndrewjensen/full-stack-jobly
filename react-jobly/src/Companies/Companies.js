import { useEffect, useState } from "react";

import CompanyCard from "../CompanyCard/CompanyCard";
import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
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

  if (companies.isLoading) return <Loading />;

  return (
    <div className="Companies">
      <SearchForm />
      {companies.data.map((company) => (
        <CompanyCard key={company.handle} company={company} />
      ))}
    </div>
  );
}

export default Companies;
