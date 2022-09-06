import { useParams } from "react-router-dom";
import Company from "./Company";
import SearchForm from "./SearchForm";
import { useEffect, useState } from "react";
import JoblyApi from "./api";

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
      {companies.data.map(company => <Company company={company} />)}
    </div>
  );
}

export default Companies;