import { useState, useEffect } from "react";

const ProgLangInput = () => {
  const [jobs, setJobs] = useState([]);
  const [progLang, setProgLang] = useState("");

  const _handleLangChange = (e) => {
    setProgLang(e.target.value.toLowerCase());
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const submitResponse = await fetch(
      `http://127.0.0.1:3232/jobs/${progLang}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response)
      .catch((e) => {
        console.log(e);
      });
    setJobs(await submitResponse.json());
    console.log(jobs);
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
    </>
  );
};

export default ProgLangInput;
