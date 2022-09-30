import { NavLink } from "react-router-dom";
import logoblack from "../assets/logoblack.png";
import { BsBellFill, BsPersonFill } from "react-icons/bs";

type Props = {
  currentUser: any;
  signOut: () => void;
};

export function EmployersNavBar({ currentUser, signOut }: Props) {
  return (
    <div className="navbar-employer">
      <ul className="employer-navbar">
        <li className="employer-navbar-list">
          <img src={logoblack} width="200px" alt="indeed-logo" />
        </li>
        <li className="employer-navbar-list-left">
          <NavLink to={"/homepage"}>Find Jobs</NavLink>
        </li>
        <li className="employer-navbar-list-left-two">
          <NavLink to="/companyreviews">Company Reviews</NavLink>
        </li>
        {currentUser === null ? (
          <>
            <li className="employer-navbar-list-right">
              <NavLink to="/signin">Sign in</NavLink>
            </li>
            <li className="employer-navbar-list-right-two">
              <NavLink to="/employers">Employers / Post Job</NavLink>
            </li>
          </>
        ) : (
          <div className="signed-in">
            <li className="find-job-navbar-company">
              <BsBellFill />
            </li>
            <li className="find-job-navbar-list-right-two">
              <BsPersonFill />
            </li>
            <li className="find-job-navbar-list-right-three">
              {currentUser.name}
            </li>
            <button
              onClick={() => {
                signOut();
                localStorage.removeItem("token");
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </ul>
    </div>
  );
}
