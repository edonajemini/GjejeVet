import { SetStateAction, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import { CompanyDetails } from "./pages/CompanyDetails";
import { CompanyReviews } from "./pages/CompanyReviews";
import { Employers } from "./pages/Employers";
import { FindJobs } from "./pages/FindJobs";
import { JobDetails } from "./pages/JobDetails";
import { PostReviews } from "./pages/PostReviews";
import { RecentSearchPage } from "./pages/RecentSearchPage";
import { SignInPage } from "./pages/SignInPage";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import { SelectRolePage } from "./pages/SelectRolePage";
import { Jobs } from "./types";
import * as API from "./api";
import { PostJob } from "./pages/PostJob";

function App() {
  const [jobs, setJobs] = useState<Jobs[]>([]);
  const [currentUser, setCurrentUser] = useState(null);

  function signIn(data: { user: any; token: string }) {
    setCurrentUser(data.user);
    localStorage.token = data.token;
  }

  function signOut() {
    setCurrentUser(null);
    localStorage.removeItem("token");
  }

  useEffect(() => {
    if (localStorage.token) {
      API.validate().then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          signIn(data);
        }
      });
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/homepage" />} />
        <Route
          path="/homepage"
          element={
            <FindJobs
              currentUser={currentUser}
              signOut={signOut}
              jobs={jobs}
              setJobs={setJobs}
            />
          }
        />
        <Route
          path="/company/:id"
          element={
            <CompanyDetails currentUser={currentUser} signOut={signOut} />
          }
        />
        <Route
          path="/companyreviews"
          element={
            <CompanyReviews currentUser={currentUser} signOut={signOut} />
          }
        />
        <Route
          path="/employers"
          element={<Employers currentUser={currentUser} signOut={signOut} />}
        />
        <Route
          path="/postreview/"
          element={<PostReviews currentUser={currentUser} signOut={signOut} />}
        />
        <Route
          path="/postjob"
          element={
            <PostJob
              jobs={jobs}
              setJobs={setJobs} currentUser={currentUser} signOut={signOut }            />
          }
        />
        <Route path="/signin" element={<SignInPage signIn={signIn} />} />
        <Route path="/select-role" element={<SelectRolePage />} />
        <Route
          path="/sign-up"
          element={<CreateAccountPage signIn={signIn} />}
        />

        <Route
          path="/recentsearchpage"
          element={
            <RecentSearchPage currentUser={currentUser} signOut={signOut} />
          }
        />

        <Route
          path="/job-detail/:id"
          element={
            <JobDetails
              jobs={jobs}
              setJobs={setJobs}
              currentUser={currentUser}
              signOut={signOut}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
