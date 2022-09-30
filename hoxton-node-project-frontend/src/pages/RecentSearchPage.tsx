import { Link } from "react-router-dom";
import { NavBarFindJobs } from "../components/NavBarFindJobs";
import "./RecentSearchPage.css";

type Props = {
  currentUser: any;
  signOut: () => void;
};

export function RecentSearchPage({ currentUser, signOut }: Props) {
  return (
    <div className="recent-container">
      <div className="recent-page">
        <NavBarFindJobs currentUser={currentUser} signOut={signOut} />
        <ul>
          <Link className="jobfeed-btn" to={"/homepage"}>
            <button>Job feed</button>{" "}
          </Link>
          <Link className="jobfeed-btn" to={"/recentsearchpage"}>
            <button>Recent searches</button>
          </Link>
        </ul>
      </div>
      <h2>No recent searches!</h2>
    </div>
  );
}
