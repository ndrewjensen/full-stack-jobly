import React, { useState, useEffect } from "react";

import JobsList from "../JobsList/JobsList";
import SearchForm from "../SearchForm/SearchForm";
import Loading from "../Loading/Loading";
import JoblyApi from "../api";

/** Jobs Page Component
 *
 * state: jobs
 *
 * RoutesList -> Jobs -> Job
 */

function Jobs() {
  const [jobs, setjobs] = useState({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    async function getjobs() {
      const resp = await JoblyApi.request("jobs");
      setjobs({ data: resp.jobs, isLoading: false });
    }
    getjobs();
  }, []);

  /** makes API call for jobs title from form search term */
  async function search(formData) {
    const { searchTerm } = formData;
    const resp = await JoblyApi.request("jobs", { title: searchTerm });
    setjobs({ data: resp.jobs, isLoading: false });
  }

  if (jobs.isLoading) return <Loading />;

  return (
    <div className="jobs">
      {/* <Loading /> */}
      <SearchForm search={search} />
      <JobsList jobs={jobs.data} />
    </div>
  );
}
export default Jobs;
