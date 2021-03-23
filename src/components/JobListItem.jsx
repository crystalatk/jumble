import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import FaveIcon from "./FaveIcon";
import AppliedIcon from "./AppliedIcon";

const JobListItem = ({
  job,
  userID,
  favoritesList,
  setFavoritesList,
  appliedList,
  setAppliedList,
}) => {
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("I went left!");
    },
    onSwipedRight: async () => {
      console.log("I went right!");
      const addToFaveResponse = await fetch("http://127.0.0.1:3232/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userID,
          job_id: job.id,
          title: job.title,
          location: job.location,
          company: job.company,
          company_url: job.company_url,
          created_at: job.created_at,
          description: job.description,
          how_to_apply: job.how_to_apply,
          company_logo: job.company_logo,
          table: "favorites",
        }),
      });
      setFavoritesList([
        ...favoritesList,
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
      ]);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
  const [faveIcon, setFaveIcon] = useState("/icons/heart-3-line.png");
  const [isFavorite, setIsFavorite] = useState(false);
  const [appliedIcon, setAppliedIcon] = useState(
    "/icons/checkbox-blank-line.png"
  );
  const [isApplied, setIsApplied] = useState(false);

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

  return (
    <>
      <li className="card">
        <Link data-testid={job.id} to={`/job/${job.id}`}>
          <div {...handlers}>
            <div className="card-header">
              <img src={job.company_logo} alt="Company Logo" className="logo" />
              <br />
              <FaveIcon
                userID={userID}
                isFavorite={isFavorite}
                job={job}
                jobID={job.id}
                favoritesList={favoritesList}
                setFavoritesList={setFavoritesList}
                faveIcon={faveIcon}
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
              <br />
            </div>
            <div className="card-body">
              <strong>{job.title}</strong>
              <h6>@ {job.company}</h6>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
};

export default JobListItem;
