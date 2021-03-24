import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import parse from "html-react-parser";
import HowToApply from "./HowToApply";
import FaveIcon from "./FaveIcon";
import AppliedIcon from "./AppliedIcon";

const JobDetailsApplied = ({
  jobsList,
  userID,
  setFavoritesList,
  favoritesList,
  appliedList,
  setAppliedList,
  trashedList,
  setTrashedList,
}) => {
  const { id } = useParams();
  const history = useHistory();
  const job = appliedList?.find((job) => {
    console.log("THIS IS THE JOB ID: ", job.id);
    return job.job_id === id ? job : null;
  });
  const [faveIcon, setFaveIcon] = useState("/icons/heart-3-line.png");
  const [isFavorite, setIsFavorite] = useState(false);
  const [appliedIcon, setAppliedIcon] = useState(
    "/icons/checkbox-blank-line.png"
  );
  const [isApplied, setIsApplied] = useState(true);

  useEffect(() => {
    setIsFavorite(favoritesList.some((favorite) => favorite.job_id === job.id));
  }, [favoritesList]);

  useEffect(() => {
    setFaveIcon(
      isFavorite ? "/icons/heart-3-fill.png" : "/icons/heart-3-line.png"
    );
  }, [isFavorite]);

  useEffect(() => {
    setIsApplied(appliedList.some((applied) => applied.job_id === job.id));
  }, [appliedList]);

  useEffect(() => {
    setAppliedIcon(
      isApplied ? "/icons/checkbox-fill.png" : "/icons/checkbox-blank-line.png"
    );
  }, [isApplied]);

  useEffect(() => {
    console.log(favoritesList);
  }, [favoritesList]);

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
            className="back-button button-light"
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
        <Link to="/applied">
          <h3 className="f-light">No job loaded. Click to return.</h3>
        </Link>
      )}
    </>
  );
};

export default JobDetailsApplied;
