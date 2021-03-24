import { useState } from "react";

const ProgLangInput = ({
  setJobsList,
  setSearch,
  favoritesList,
  appliedList,
  trashedList,
}) => {
  const [progLang, setProgLang] = useState("");
  const [zip, setZip] = useState("");
  const [submitError, setSubmitError] = useState("");

  const _handleLangChange = (e) => {
    setProgLang(e.target.value.toLowerCase());
  };

  const _handleZipChange = (e) => {
    setZip(e.target.value.toLowerCase());
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    setSearch(true);
    const submitResponse = await fetch(
      `${process.env.REACT_APP_SERVER_URL}jobs/?progLang=${progLang}&zip=${zip}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .catch((e) => {
        console.log(e);
      });
    console.log("This is the jobList DATA: ", submitResponse);
    if (submitResponse) {
      setJobsList(
        submitResponse.filter(
          (job) =>
            !favoritesList.some((faveJob) => job.id === faveJob.job_id) &&
            !appliedList.some((appliedJob) => job.id === appliedJob.job_id) &&
            !trashedList.some((trashedJob) => job.id === trashedJob.job_id)
        )
      );
      setSubmitError(null);
    } else {
      setSubmitError(
        "You've been triple crystalized!!!! i.e. you don't have any data coming in..."
      );
    }
  };

  return (
    <>
      <h2>Search Available Jobs:</h2>
      <form onSubmit={_handleSubmit}>
        <div className="no-wrap">
          <label htmlFor="progLang">Programming Language:</label>
          <input
            id="progLang"
            name="prog_lang"
            type="text"
            value={progLang}
            onChange={_handleLangChange}
            data-testid="inputField"
          />
        </div>
        <div className="no-wrap">
          <label htmlFor="zipCode" className="no-in-line">
            Zip Code:
          </label>
          <input
            id="zipCode"
            name="zipCode"
            type="text"
            value={zip}
            onChange={_handleZipChange}
          />
        </div>
        <button
          className="button-light"
          type="submit"
          data-testid="searchButton"
        >
          Search
        </button>
      </form>
      {!!submitError && <div className="error">{submitError}</div>}
    </>
  );
};

export default ProgLangInput;
