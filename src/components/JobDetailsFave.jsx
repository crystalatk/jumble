import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import parse from "html-react-parser";
import HowToApply from "./HowToApply";
import FaveIcon from "./FaveIcon";
import AppliedIcon from "./AppliedIcon";

const JobDetailsFave = ({
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
  const job = favoritesList?.find((job) => {
    console.log("THIS IS THE JOB ID: ", job.job_id);
    return job.job_id === id ? job : null;
  });
  const [faveIcon, setFaveIcon] = useState("/icons/heart-3-fill.png");
  const [isFavorite, setIsFavorite] = useState(true);
  const [appliedIcon, setAppliedIcon] = useState(
    "/icons/checkbox-blank-line.png"
  );
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    setIsFavorite(favoritesList.some((favorite) => favorite.job_id === id));
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
            className="back-button"
            onClick={() => history.goBack()}
          >
            GO BACK
          </button>
          <div className="job-details">
            {/* {userID ? (
              <div className="block">
                <FaveIcon
                  userID={userID}
                  isFavorite={isFavorite}
                  job={job}
                  jobID={job.job_id}
                  favoritesList={favoritesList}
                  setFavoritesList={setFavoritesList}
                  faveIcon={faveIcon}
                  trashedList={trashedList}
                  setTrashedList={setTrashedList}
                />
                <AppliedIcon
                  userID={userID}
                  isApplied={isApplied}
                  job={job}
                  jobID={job.id}
                  appliedList={appliedList}
                  setAppliedList={setAppliedList}
                  appliedIcon={appliedIcon}
                />
              </div>
            ) : null} */}

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
        <Link to="/favorites">
          <h3 className="f-light">No job loaded. Click to return to search.</h3>
        </Link>
      )}
    </>
  );
};

export default JobDetailsFave;
