import JobListItem from "./JobListItem";

const JobList = ({
  jobsList,
  userID,
  favoritesList,
  setFavoritesList,
  appliedList,
  setAppliedList,
  trashedList,
  setTrashedList,
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
                trashedList={trashedList}
                setTrashedList={setTrashedList}
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
