import { SetStateAction, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Jobs } from "../types";
type Props ={
  jobs: any,
  setJobs: React.Dispatch<SetStateAction<Jobs[]>>
}

  export function AllJobs({jobs, setJobs}:Props){
    useEffect(() => {
      fetch("http://localhost:3005/jobs")
        .then((resp) => resp.json())
        .then((jobsFromServer) => setJobs(jobsFromServer));
    }, []);
    return(
        <>
        <div className="jobs-feed">
          {jobs.map((job:any) => (
              <>
              <Link to={`/job-detail/${job.id}`}>
              <div className="jobs-feed-item">
                <h3><u>{job.title}</u></h3>
                <p>{job.location}</p>
                <p className="date-time">{job.createdAt}</p>
                <button>View job</button>
                </div>
                </Link>
              </>
            ))}
            </div>
        </>
    )
}