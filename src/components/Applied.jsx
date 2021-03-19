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
      <h1>Your Applied Jobs!</h1>
      {!!appliedList.length ? (
        <ul data-testid="jobsList" className="ul">
          {appliedList.map((job) => {
            return (
              <AppliedListItem
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
        <p>No Favorite Jobs</p>
      )}
    </>
  );
};

export default Applied;
