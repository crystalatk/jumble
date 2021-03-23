import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppliedIcon from "./AppliedIcon";

const FaveListItem = ({
  job,
  userID,
  favoritesList,
  setFavoritesList,
  appliedList,
  setAppliedList,
  trashedList,
  setTrashedList,
}) => {
  console.log("THIS IS THE JOB.ID: ", job.id);
  console.log("THIS IS THE JOB.JOB_ID: ", job.job_id);
  const [appliedIcon, setAppliedIcon] = useState(
    "/icons/checkbox-blank-line.png"
  );
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    setIsApplied(appliedList.some((applied) => applied.job_id === job.job_id));
  }, [appliedList]);

  useEffect(() => {
    setAppliedIcon(
      isApplied ? "/icons/checkbox-fill.png" : "/icons/checkbox-blank-line.png"
    );
  }, [isApplied]);

  const _handleDeleteFaveClick = async (e) => {
    e.preventDefault();
    const addToTrashResponse = await fetch("http://127.0.0.1:3232/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userID,
        job_id: job.job_id,
        title: job.title,
        location: job.location,
        company: job.company,
        company_url: job.company_url,
        created_at: job.created_at,
        description: job.description,
        how_to_apply: job.how_to_apply,
        company_logo: job.company_logo,
        table: "trashed",
      }),
    });
    const DeleteFaveResponse = await fetch(
      "http://127.0.0.1:3232/users/delete",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userID,
          job_id: job.job_id,
          table: "favorites",
        }),
      }
    );

    setTrashedList([
      {
        job_id: job.id,
        title: job.title,
        location: job.location,
        company: job.company,
        company_url: job.company_url,
        created_at: job.created_at,
        description: job.description,
        how_to_apply: job.how_to_apply,
        company_logo: job.company_logo,
      },
      ...trashedList,
    ]);
    setFavoritesList(
      favoritesList.filter((favorite) => favorite.job_id !== job.job_id)
    );
  };

  return (
    <>
      <li className="card">
        <Link data-testid={job.id} to={`/fave/${job.job_id}`}>
          <div className="card-header">
            <img src={job.company_logo} alt="Company Logo" className="logo" />
            <br />

            <br />
          </div>
          <div className="card-body">
            <strong>{job.title}</strong>
            <h6>@ {job.company}</h6>

            {userID ? (
              <>
                <div className="img__wrap in-line m-20">
                  <img
                    src="/icons/delete-bin-line.png"
                    className="icons "
                    onClick={_handleDeleteFaveClick}
                  />
                  <span className="img__description">
                    Delete from favorites
                  </span>
                </div>
                <AppliedIcon
                  userID={userID}
                  isApplied={isApplied}
                  job={job}
                  jobID={job.job_id}
                  appliedList={appliedList}
                  setAppliedList={setAppliedList}
                  appliedIcon={appliedIcon}
                  setFavoritesList={setFavoritesList}
                  favoritesList={favoritesList}
                />
              </>
            ) : null}
          </div>
        </Link>
      </li>
    </>
  );
};

export default FaveListItem;
