import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const JobListItem = ({ job, userID, favoritesList, setFavoritesList }) => {
  const [faveIcon, setFaveIcon] = useState("/icons/heart-3-line.png");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favoritesList.some((favorite) => favorite.job_id === job.id));
  }, [favoritesList]);

  useEffect(() => {
    setFaveIcon(
      isFavorite ? "/icons/heart-3-fill.png" : "/icons/heart-3-line.png"
    );
  }, [isFavorite]);

  const _handleAddToFaveClick = async (e) => {
    e.preventDefault();
    const addToFaveResponse = await fetch("http://127.0.0.1:3232/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userID,
        job_id: job.id,
        table: "favorites",
      }),
    });
    setFavoritesList([
      ...favoritesList,
      {
        job_id: job.job_id,
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
  };

  return (
    <>
      <li>
        <Link data-testid={job.id} to={`/job/${job.id}`}>
          <img src={job.company_logo} alt="Company Logo" className="logo" />
          <br />
          <strong>{job.title}</strong>
          <h6>@ {job.company}</h6>
          {userID ? <img src={faveIcon} className="icons" /> : null}
        </Link>
        <hr />
      </li>
    </>
  );
};

export default JobListItem;
