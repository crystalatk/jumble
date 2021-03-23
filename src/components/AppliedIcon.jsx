const AppliedIcon = ({
  userID,
  isApplied,
  job,
  jobID,
  setAppliedList,
  appliedList,
  appliedIcon,
  setFavoritesList,
  favoritesList,
}) => {
  console.log("THIS IS THE FAVORITES LIST : ", favoritesList);
  const _handleAddToAppliedClick = async (e) => {
    e.preventDefault();
    const addToAppliedResponse = await fetch(
      "http://127.0.0.1:3232/users/add",
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
          table: "applied",
        }),
      }
    );
    setAppliedList([
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
      ...appliedList,
    ]);
    const addToFaveResponse = await fetch("http://127.0.0.1:3232/users/add", {
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
    });
    if (!favoritesList.some((fave) => fave.job_id === jobID)) {
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
    }
  };

  const _handleDeleteAppliedClick = async (e) => {
    e.preventDefault();
    const DeleteAppliedResponse = await fetch(
      "http://127.0.0.1:3232/users/delete",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userID,
          job_id: jobID,
          table: "applied",
        }),
      }
    );
    setAppliedList(appliedList.filter((applied) => applied.job_id !== jobID));
  };

  return (
    <>
      {userID ? (
        <div className="img__wrap in-line">
          {isApplied ? (
            <>
              <img
                src={appliedIcon}
                className="icons"
                onClick={_handleDeleteAppliedClick}
              />
              <span className="img__description">Remove from Applied</span>
            </>
          ) : (
            <>
              <img
                src={appliedIcon}
                className="icons"
                onClick={_handleAddToAppliedClick}
              />
              <span className="img__description">Add to Applied</span>
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default AppliedIcon;
