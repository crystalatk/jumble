import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FaveIcon from "./FaveIcon";

const TrashedListItem = ({
  userID,
  setFavoritesList,
  favoritesList,
  job,
  jobID,
  trashedList,
  setTrashedList,
}) => {
  const [faveIcon, setFaveIcon] = useState("/icons/heart-3-line.png");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(
      favoritesList.some((favorite) => favorite.job_id === job.job_id)
    );
  }, [favoritesList]);

  useEffect(() => {
    setFaveIcon(
      isFavorite ? "/icons/heart-3-fill.png" : "/icons/heart-3-line.png"
    );
  }, [isFavorite]);

  return (
    <>
      <li className="card">
        <Link data-testid={job.id} to={`/trash/${jobID}`}>
          <div className="card-header">
            <img src={job.company_logo} alt="Company Logo" className="logo" />
            <br />
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
            <br />
          </div>
          <div className="card-body">
            <strong>{job.title}</strong>
            <h6>@ {job.company}</h6>
          </div>
        </Link>
      </li>
    </>
  );
};

export default TrashedListItem;
