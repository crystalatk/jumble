import { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import parse from "html-react-parser";
import HowToApply from "./HowToApply";

const JobDetailsTrashed = ({ trashedList }) => {
  const { id } = useParams();
  const history = useHistory();
  const job = trashedList?.find((job) => {
    console.log("THIS IS THE JOB ID: ", job.id);
    return job.job_id === id ? job : null;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!!job ? (
        <>
          <h1>Job Details:</h1>
          <button
            data-testid="backButton"
            type="button"
            className="back-button"
            onClick={() => history.goBack()}
          >
            GO BACK
          </button>
          <div className="job-details">
            <br />
            <img
              src={job.company_logo}
              alt="Company Logo"
              className="logo m-20"
            />
            <h1>{job.title}</h1>
            <h3>{job.location}</h3>
            <h4>{job.company}</h4>
            {!!job.company_url ? (
              <a href={job.company_url} target="_blank">
                {job.company_url}
              </a>
            ) : null}
            <h5>Posted: {job.created_at}</h5>
            <div>{parse(job.description)}</div>

            <HowToApply how_to_apply={parse(job.how_to_apply)} />
          </div>
        </>
      ) : (
        <Link to="/trashed">
          <h3 className="f-light">No job loaded. Click to return to search.</h3>
        </Link>
      )}
    </>
  );
};

export default JobDetailsTrashed;
