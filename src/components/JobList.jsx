import { Link } from "react-router-dom";

const JobList = ({ jobsList }) => {
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
