const FaveIcon = ({
  userID,
  isFavorite,
  job,
  jobID,
  setFavoritesList,
  favoritesList,
  faveIcon,
  trashedList,
  setTrashedList,
}) => {
  const _handleAddToFaveClick = async (e) => {
    e.preventDefault();
    const addToFaveResponse = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/add`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userID,
          job_id: jobID,
          title: job.title,
          location: job.location,
          company: job.company,
          company_url: job.company_url,
          created_at: job.created_at,
          description: job.description,
          how_to_apply: job.how_to_apply,
          company_logo: job.company_logo,
          table: "favorites",
        }),
      }
    );
    setFavoritesList([
      {
        job_id: jobID,
        title: job.title,
        location: job.location,
        company: job.company,
        company_url: job.company_url,
        created_at: job.created_at,
        description: job.description,
        how_to_apply: job.how_to_apply,
        company_logo: job.company_logo,
      },
      ...favoritesList,
    ]);
    const DeleteTrashedResponse = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/delete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userID,
          job_id: jobID,
          table: "trashed",
        }),
      }
    );
    console.log("THIS IS THE TRASHED LIST ON THE FAVEICON: ", trashedList);
    setTrashedList(trashedList.filter((trashed) => trashed.job_id !== jobID));
  };

  const _handleDeleteFaveClick = async (e) => {
    e.preventDefault();
    const DeleteFaveResponse = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/delete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userID,
          job_id: jobID,
          table: "favorites",
        }),
      }
    );
    setFavoritesList(
      favoritesList.filter((favorite) => favorite.job_id !== jobID)
    );
  };

  return (
    <>
      {userID ? (
        <div className="img__wrap  in-line">
          {isFavorite ? (
            <>
              <img
                src={faveIcon}
                className="icons"
                onClick={_handleDeleteFaveClick}
              />
              <span className="img__description">Remove from favorites</span>
            </>
          ) : (
            <>
              <img
                src={faveIcon}
                className="icons"
                onClick={_handleAddToFaveClick}
              />
              <span className="img__description">Add to favorites</span>
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default FaveIcon;
