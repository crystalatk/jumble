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
    // addToAppliedResponse
    await fetch(`${process.env.REACT_APP_SERVER_URL}users/add`, {
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
    });
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
    // addToFaveResponse
    await fetch(`${process.env.REACT_APP_SERVER_URL}users/add`, {
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
    // deleteAppliedResponse
    await fetch(`${process.env.REACT_APP_SERVER_URL}users/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userID,
        job_id: jobID,
        table: "applied",
      }),
    });
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
                alt="Checkbox empty"
                className="icons"
                onClick={_handleDeleteAppliedClick}
              />
              <span className="img__description">Remove from Applied</span>
            </>
          ) : (
            <>
              <img
                src={appliedIcon}
                alt="Checkbox checked"
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
