import { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import parse from "html-react-parser";
import HowToApply from "./HowToApply";

const JobDetails = ({ jobsList, userID, setFavoritesList, favoritesList }) => {
  const { id } = useParams();
  const history = useHistory();
  const job = jobsList?.find((job) => {
    return job.id === id
      ? job
      : favoritesList?.find((favorite) => {
          return favorite.job_id === id ? favorite : null;
        });
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const _handleAddToFaveClick = async (e) => {
    e.preventDefault();
    const addToFaveResponse = await fetch("http://127.0.0.1:3232/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userID,
        job_id: job.id,
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
    }).then((response) => response.json());
    console.log("THIS IS THE ADDTOFAVERESPONSE: ", addToFaveResponse);
    setFavoritesList([
      ...favoritesList,
      {
        job_id: job.id,
        title: job.title,
        location: job.location,
        company: job.company,
        company_url: job.company_url,
        created_at: job.created_at,
        description: job.description,
        how_to_apply: job.how_to_apply,
        company_logo: job.company_logo,
      },
    ]);
  };

  const _handleAppliedClick = async (e) => {
    e.preventDefault();
    const addToFaveResponse = await fetch("http://127.0.0.1:3232/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userID,
        job_id: job.id,
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
  };

  return (
    <>
      {!!job ? (
        <>
          <h1>Job Details:</h1>
          {userID ? (
            <>
              {}
              <button type="button" onClick={_handleAddToFaveClick}>
                Add to Favorites
              </button>
              <button type="button" onClick={_handleAppliedClick}>
                I Applied!!
              </button>
              <br />
            </>
          ) : null}
          <button
            data-testid="backButton"
            type="button"
            onClick={() => history.goBack()}
          >
            GO BACK
          </button>
          <br />
          <img
            src={job.company_logo}
            alt="Company Logo"
            className="logo m-20"
          />
          <h1>{job.title}</h1>
          <h3>{job.location}</h3>
          <h4>{job.company}</h4>
          {!!job.company_url ? (
            <a href={job.company_url}>{job.company_url}</a>
          ) : null}
          <h5>Posted: {job.created_at}</h5>
          <div>{parse(job.description)}</div>

          <HowToApply how_to_apply={parse(job.how_to_apply)} />
        </>
      ) : (
        <Link to="/">
          <h3>No Job Loaded. Click to return to search.</h3>
        </Link>
      )}
    </>
  );
};

export default JobDetails;
