import { SetStateAction } from "react";
import { JobFeed } from "../components/JobFeed";
import { JobFeedDetails } from "../components/JobFeedDetails";
import { JobSearch } from "../components/JobSearch";
import { NavBarFindJobs } from "../components/NavBarFindJobs";
import { Jobs } from "../types";
type Props = {
  jobs: any;
  setJobs: React.Dispatch<SetStateAction<Jobs[]>>;
  currentUser: any;
  signOut: () => void;
};
export function JobDetails({ jobs, setJobs, currentUser, signOut }: Props) {
  return (
    <>
      <NavBarFindJobs currentUser={currentUser} signOut={signOut} />
      <JobSearch setJobs={setJobs} />
      <JobFeedDetails jobs={jobs} setJobs={setJobs} />
    </>
  );
}
