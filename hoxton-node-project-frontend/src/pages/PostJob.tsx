import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployersNavBar } from "../components/EmployersNavBar";
import { NavBarFindJobs } from "../components/NavBarFindJobs";
import { Jobs } from "../types";
import "./PostJob.css";

type Props = {
  jobs: any;
  setJobs: React.Dispatch<SetStateAction<Jobs[]>>;
  currentUser: any;
  signOut: () => void;
};

export function PostJob({ jobs, setJobs, currentUser, signOut }: Props) {
  useEffect(() => {
    fetch(`http://localhost:3005/jobs`)
      .then((resp) => resp.json())
      .then((jobsFromServer) => setJobs(jobsFromServer));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="job-posting">
      <EmployersNavBar currentUser={currentUser} signOut={signOut} />
      <h1 className="post-h1">READY TO HIRE?</h1>
      <form
        className="post-job"
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          let companyId: number;
          const companyName = form.companyName.value;
          fetch(`http://localhost:3005/companies/company/${companyName}`)
            .then((resp) => resp.json())
            .then((company) => {
              companyId = Number(company[0].id);
            });

          setTimeout(() => {
            const detail1 = form.detail1.value;
            const detail2 = form.detail2.value;
            const detail3 = form.detail3.value;

            let newJob = {
              //@ts-ignore
              title: event.target.title.value,
              location: form.location.value,
              jobSummary: form.jobSummary.value,
              jobDescription: form.jobDescription.value,
              companyId: companyId,
              details: [detail1, detail2, detail3],
            };

            fetch("http://localhost:3005/jobs", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newJob),
            })
              .then((resp) => resp.json())
              .then((jobsFromServer) => setJobs(jobsFromServer));
            navigate("/employers");
          }, 500);
        }}
      >
        <input
          type="text"
          name="title"
          id="title"
          placeholder="What is the job title?"
          required
        ></input>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="What is the location of the job?"
          required
        ></input>
        <textarea
          name="jobSummary"
          id="jobSummary"
          placeholder="Write the job summary here..."
          required
        ></textarea>
        <span>
          <input
            type="text"
            name="detail1"
            id="detail1"
            placeholder="Salary expectation"
            required
          ></input>
          <input
            type="text"
            name="detail2"
            id="detail2"
            placeholder="Full-time/Part-time"
            required
          ></input>
        </span>
        <input
          type="text"
          name="detail3"
          id="detail3"
          placeholder="Work hours"
          required
        ></input>
        <textarea
          name="jobDescription"
          id="jobDescription"
          placeholder="Job description goes here..."
          rows={5}
          required
        ></textarea>
        <input
          type="text"
          name="companyName"
          id="companyName"
          placeholder="Your Company name?"
        ></input>
        <button className="review-btn">POST</button>
      </form>
    </div>
  );
}
