import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import ProgLangInput from "./components/ProgLangInput";
import "./App.css";

function App() {
  const [jobsList, setJobsList] = useState([]);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState(false);

  const handleJobs = (status) => {
    setJobsList(status);
  };
  const handleReload = (status) => {
    setReload(status);
  };

  const handleSearch = (status) => {
    setSearch(status);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jumble</h1>
      </header>
      <Router>
        <Route exact path="/">
          <ProgLangInput
            handleJobs={handleJobs}
            handleReload={handleReload}
            handleSearch={handleSearch}
          />
          {!!search ? (
            <JobList jobsList={jobsList} />
          ) : (
            <p>Choose a Language to find available jobs</p>
          )}
        </Route>
        <Route path="/job/:id">
          <JobDetails jobsList={jobsList} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
