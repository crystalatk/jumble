import { Link } from "react-router-dom";
import FaveListItem from "./FaveListItem";

const Favorites = ({
  favoritesList,
  setFavoritesList,
  userID,
  appliedList,
  setAppliedList,
  trashedList,
  setTrashedList,
}) => {
  return (
    <>
      {!!userID ? (
        <>
          <h1>Your Favorite Jobs!</h1>
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
                    trashedList={trashedList}
                    setTrashedList={setTrashedList}
                  />
                );
              })}
            </ul>
          ) : (
            <>
              <p>No Favorite Jobs Yet...</p>
              <Link to="/" className="f-light">
                Click here to search!
              </Link>
            </>
          )}
        </>
      ) : (
        <h1>Login to see Favorites</h1>
      )}
    </>
  );
};

export default Favorites;
