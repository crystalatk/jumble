import { Link } from "react-router-dom";
import { useState } from "react";
import JobListItem from "./JobListItem";

const JobList = ({ jobsList, userID, favoritesList, setFavoritesList }) => {
  return (
    <>
      <h1>Available Jobs:</h1>
      {!!jobsList.length ? (
        <ul data-testid="jobsList">
          {jobsList.map((job) => {
            return (
              <JobListItem
                job={job}
                userID={userID}
                favoritesList={favoritesList}
                setFavoritesList={setFavoritesList}
              />
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
