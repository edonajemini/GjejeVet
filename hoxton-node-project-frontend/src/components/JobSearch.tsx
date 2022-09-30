import { SetStateAction, useEffect, useState } from "react";
import { Jobs } from "../types";
type Props = {
  setJobs: React.Dispatch<SetStateAction<Jobs[]>>;
};
export function JobSearch({ setJobs }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const jobTitle = form.jobtitle.value;
    const jobLocation = form.joblocation.value;

    
      if (jobTitle && jobLocation ) {
      //fetch both
      fetch(`http://localhost:3005/jobs/${jobTitle}/${jobLocation}`)
      .then((resp) => resp.json())
      .then((jobsFromServer) => setJobs(jobsFromServer));
    } else if (jobTitle && jobLocation === "") {
      //fetch jobTitle
      fetch(`http://localhost:3005/job/${jobTitle}`)
      .then((resp) => resp.json())
      .then((jobsFromServer) => setJobs(jobsFromServer));
    } else if (jobLocation && jobTitle === "") {
      //fetch joblocation
      fetch(`http://localhost:3005/jobs/${jobLocation}`)
      .then((resp) => resp.json())
      .then((jobsFromServer) => setJobs(jobsFromServer));
    } else {
      //fetch all jobs
      useEffect(() => {
        fetch("http://localhost:3005/jobs")
          .then((resp) => resp.json())
          .then((jobsFromServer) => setJobs(jobsFromServer));
      }, []);
    }
  }
  return (
    <div className="job-search">
      <form
        className="job-search-form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <input
          className="job-search-input"
          name="jobtitle"
          type="search"
          placeholder="What"
        ></input>
        <input
          className="job-search-input"
          name="joblocation"
          type="search"
          placeholder="Where"
        ></input>
        <button className="job-search-btn">Find Jobs</button>
      </form>
    </div>
  );
}
  