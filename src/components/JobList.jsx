import { Link } from "react-router-dom";
import { useState } from "react";

const JobList = ({ jobsList, userID }) => {
  const [faveIcon, setFaveIcon] = useState("/icons/heart-3-line.png");

  const _handleAddToFaveClick = async (e, key) => {
    e.preventDefault();
    const addToFaveResponse = await fetch("http://127.0.0.1:3232/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userID,
        job_id: key,
        table: "favorites",
      }),
    });
  };

  return (
    <>
      <h1>Available Jobs:</h1>
      {!!jobsList.length ? (
        <ul data-testid="jobsList">
          {jobsList.map((job) => {
            return (
              <li key={job.id}>
                <Link data-testid={job.id} to={`/job/${job.id}`}>
                  <img
                    src={job.company_logo}
                    alt="Company Logo"
                    className="logo"
                  />
                  <br />
                  <strong>{job.title}</strong>
                  <h6>@ {job.company}</h6>
                  {userID ? (
                    <img
                      src={faveIcon}
                      alt="favorites icon"
                      className="icons"
                    />
                  ) : null}
                </Link>
                <hr />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Jobs Loading....</p>
      )}
    </>
  );
};

export default JobList;
