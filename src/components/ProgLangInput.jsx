import { useState } from "react";

const ProgLangInput = ({ handleJobs, handleReload, handleSearch }) => {
  const [progLang, setProgLang] = useState("");
  const [submitError, setSubmitError] = useState("");

  const _handleLangChange = (e) => {
    setProgLang(e.target.value.toLowerCase());
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    handleSearch(true);
    const submitResponse = await fetch(
      `http://127.0.0.1:3232/jobs/?url=https://jobs.github.com/positions.json?description=${progLang}`,
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
      handleReload(true);
      handleJobs(submitResponse);
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
          />
        </label>
        <button type="submit">Search</button>
      </form>
      {!!submitError && <div className="error">{submitError}</div>}
    </>
  );
};

export default ProgLangInput;
