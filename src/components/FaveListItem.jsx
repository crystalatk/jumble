import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const FaveListItem = ({ job, userID, favoritesList, setFavoritesList }) => {
  const _handleDeleteFaveClick = async (e) => {
    e.preventDefault();
    const addToFaveResponse = await fetch("http://127.0.0.1:3232/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userID,
        job_id: job.job_id,
        table: "favorites",
      }),
    });
    setFavoritesList(
      favoritesList.filter((favorite) => favorite.job_id === job.id)
    );
  };

  return (
    <>
      <li>
        <Link data-testid={job.id} to={`/job/${job.job_id}`}>
          <img src={job.company_logo} alt="Company Logo" className="logo" />
          <br />
          <strong>{job.title}</strong>
          <h6>@ {job.company}</h6>
        </Link>
        {userID ? (
          <img src="/icons/delete-bin-line.png" className="icons" />
        ) : null}
        <hr />
      </li>
    </>
  );
};

export default FaveListItem;
