import { useParams, useHistory } from "react-router-dom";
import parse from "html-react-parser";

const JobDetails = ({ jobsList }) => {
  const { id } = useParams();
  const history = useHistory();
  const job = jobsList.find((job) => {
    return job.id === id ? job : null;
  });

  return (
    <>
      <div>I am in the job details</div>
      <img src={job.company_logo} alt="Company Logo" className="logo" />
      <h1>{job.title}</h1>
      <h3>{job.location}</h3>
      <h4>{job.company}</h4>
      {!!job.company_url ? (
        <a href={job.company_url}>{job.company_url}</a>
      ) : null}
      <h5>{job.created_at}</h5>
      <div>{parse(job.description)}</div>
      <button
        data-testid="backButton"
        type="button"
        onClick={() => history.goBack()}
      >
        GO BACK
      </button>
    </>
  );
};

export default JobDetails;
