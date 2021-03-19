import { Link } from "react-router-dom";
import { useState } from "react";
import JobListItem from "./JobListItem";

const JobList = ({
  jobsList,
  userID,
  favoritesList,
  setFavoritesList,
  appliedList,
  setAppliedList,
}) => {
  return (
    <>
      <h1>Available Jobs:</h1>
      {!!jobsList.length ? (
        <ul data-testid="jobsList" className="ul">
          {jobsList.map((job) => {
            return (
              <JobListItem
                job={job}
                userID={userID}
                favoritesList={favoritesList}
                setFavoritesList={setFavoritesList}
                key={job.id}
                appliedList={appliedList}
                setAppliedList={setAppliedList}
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
