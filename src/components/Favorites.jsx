import FaveListItem from "./FaveListItem";

const Favorites = ({
  favoritesList,
  setFavoritesList,
  userID,
  appliedList,
  setAppliedList,
}) => {
  return (
    <>
      <h1>You favorite Jobs!</h1>
      {!!favoritesList.length ? (
        <ul data-testid="jobsList" className="ul">
          {favoritesList.map((job) => {
            return (
              <FaveListItem
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

export default Favorites;
