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
    const url = `http://127.0.0.1:3232/jobs/?progLang=${progLang}&zip=${zip}`;
    const submitResponse = await fetch(
      url ||
        `${process.env.REACT_APP_SERVER_URL}/jobs/?progLang=${progLang}&zip=${zip}`,
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
      <form onSubmit={_handleSubmit}>
        <label>
          Programming Language
          <input
            name="prog_lang"
            type="text"
            value={progLang}
            onChange={_handleLangChange}
            data-testid="inputField"
          />
        </label>
        <label>
          Zip Code
          <input
            name="zipCode"
            type="text"
            value={zip}
            onChange={_handleZipChange}
          />
        </label>
        <button type="submit" data-testid="searchButton">
          Search
        </button>
      </form>
      {!!submitError && <div className="error">{submitError}</div>}
    </>
  );
};

export default ProgLangInput;
