import TrashedListItem from "./TrashedListItem";

const Trashed = ({
  userID,
  trashedList,
  setTrashedList,
  setFavoritesList,
  favoritesList,
}) => {
  return (
    <>
      <h1>Dumpster Fire!</h1>
      {!!trashedList.length ? (
        <ul data-testid="jobsList" className="ul">
          {trashedList.map((job) => {
            return (
              <TrashedListItem
                job={job}
                jobID={job.job_id}
                userID={userID}
                favoritesList={favoritesList}
                setFavoritesList={setFavoritesList}
                key={job.job_id}
                trashedList={trashedList}
                setTrashedList={setTrashedList}
              />
            );
          })}
        </ul>
      ) : (
        <p>Trashcan is empty</p>
      )}
    </>
  );
};

export default Trashed;
