import { useParams } from "react-router-dom";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import { useEffect, useState } from "react";
import JoblyApi from "./api";

/** Companies Component
 * 
 * state: companies
 * 
 * RoutesList -> Companies -> CompanyCard
 */

function Companies() {
  const [companies, setCompanies] = useState(
    {
      data: [],
      isLoading: true
    }
  );

  useEffect(() => {
    async function getCompanies() {
      const resp = await JoblyApi.request("companies");
      setCompanies({ data: resp.companies, isLoading: false });
    };
    getCompanies();
  }, []);

  if (companies.isLoading) return <div>Loading ...</div>;

  console.log("COMPANY DATA", companies.data);
  return (
    <div className="Companies">
      <SearchForm />
      {companies.data.map(company => <CompanyCard company={company} />)}
    </div>
  );
}

export default Companies;