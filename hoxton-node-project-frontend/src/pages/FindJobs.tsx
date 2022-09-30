import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

import { JobFeed } from "../components/JobFeed";
import { JobSearch } from "../components/JobSearch";
import { NavBarFindJobs } from "../components/NavBarFindJobs";
import { Jobs } from "../types";
import "./FindJobs.css";

type Props = {
  currentUser: any;
  signOut: () => void;
  jobs: any;
  setJobs: React.Dispatch<SetStateAction<Jobs[]>>;
};

export function FindJobs({ jobs, setJobs, currentUser, signOut }: Props) {
  const navigate = useNavigate();
  return (
    <>
      {currentUser === "EMPLOYER" ? (
        navigate("/employers")
      ) : (
        <>
          <NavBarFindJobs currentUser={currentUser} signOut={signOut} />
          <JobSearch setJobs={setJobs} />
          <JobFeed jobs={jobs} setJobs={setJobs} />
        </>
      )}
    </>
  );
}
