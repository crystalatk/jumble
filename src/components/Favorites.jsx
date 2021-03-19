import FaveListItem from "./FaveListItem";

const Favorites = ({ favoritesList, setFavoritesList, userID }) => {
  return (
    <>
      <h1>You favorite Jobs!</h1>
      {!!favoritesList.length ? (
        <ul data-testid="jobsList">
          {favoritesList.map((job) => {
            return (
              <FaveListItem
                job={job}
                userID={userID}
                favoritesList={favoritesList}
                setFavoritesList={setFavoritesList}
                key={job.id}
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
