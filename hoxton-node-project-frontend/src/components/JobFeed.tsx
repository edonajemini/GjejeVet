import { SetStateAction, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Company, Jobs } from "../types";
import { AllJobs } from "./AllJobs";
type Props = {
  jobs: any;
  setJobs: React.Dispatch<SetStateAction<Jobs[]>>;
};

type Job = {
  id: number;
  title: string;
  location: string;
  details: [];
  jobSummary: string;
  jobDescription: string;
  createdAt: string;
  companyId: number;
  jobApplication: [];
};

export function JobFeed({ jobs, setJobs }: Props) {
  useEffect(() => {
    fetch("http://localhost:3005/jobs")
      .then((resp) => resp.json())
      .then((jobsFromServer) => setJobs(jobsFromServer));
  }, []);
  const [job, setJob] = useState<Job | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    fetch("http://localhost:3005/companies")
      .then((resp) => resp.json())
      .then((companiesFromServer) => setCompanies(companiesFromServer));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/job-detail/1`)
      .then((resp) => resp.json())
      .then((jobsFromServer) => setJob(jobsFromServer));
  }, []);

  function handleClick() {
    fetch("http://localhost:3005/jobs")
      .then((resp) => resp.json())
      .then((jobsFromServer) => setJobs(jobsFromServer));
  }

  if (job === null) return <h2>Loading... </h2>;
  return (
    <div className="job-feed">
      <ul>
        <Link className="jobfeed-btn" to={"/homepage"}>
          <button
            onClick={() => {
              handleClick();
            }}
          >
            Job feed
          </button>
        </Link>
        <Link className="jobfeed-btn" to={"/recentsearchpage"}>
          <button>Recent searches</button>
        </Link>
      </ul>
      <div className="all-jobs">
        <AllJobs jobs={jobs} setJobs={setJobs} />
        <div className="job-detail">
          {companies
            .filter((company) => company.id === job.companyId)
            .map((companies) => (
              <>
                <div className="company-name">
                  <img src={companies.imageURL} width="50px" />
                  <h2 className="username">{companies.name}</h2>
                </div>
              </>
            ))}
          <button className="job-apply-btn">Apply</button>
          <div className="jobs">
            <h3>
              <u>{job.title}</u>
            </h3>
            <h5>
              <i>{job.jobSummary}</i>
            </h5>
            <h4>Job Details</h4>
            <p>{job.jobDescription}</p>
            <p>
              Address: <u>{job.location}</u>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
