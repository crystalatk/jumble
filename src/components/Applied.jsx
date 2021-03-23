import AppliedListItem from "./AppliedListItem";

const Applied = ({
  favoritesList,
  setFavoritesList,
  userID,
  appliedList,
  setAppliedList,
}) => {
  return (
    <>
      {!!userID ? (
        <>
          <h1>Your Applied Jobs!</h1>
          {!!appliedList.length ? (
            <ul data-testid="jobsList" className="ul">
              {appliedList.map((job) => {
                return (
                  <AppliedListItem
                    job={job}
                    userID={userID}
                    key={job.id}
                    appliedList={appliedList}
                    setAppliedList={setAppliedList}
                  />
                );
              })}
            </ul>
          ) : (
            <p>No Applied Jobs</p>
          )}
        </>
      ) : (
        <h1>Login to see Applied Jobs</h1>
      )}
    </>
  );
};

export default Applied;
