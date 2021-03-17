import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import ProgLangInput from "./components/ProgLangInput";
import "./App.css";

function App() {
  const [jobsList, setJobsList] = useState([]);
  const [reload, setReload] = useState(false);

  const handleJobs = (status) => {
    setJobsList(status);
  };
  const handleReload = (status) => {
    setReload(status);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jumble</h1>
      </header>
      <Router>
        <ProgLangInput handleJobs={handleJobs} handleReload={handleReload} />
        <JobList jobsList={jobsList} />
        <JobDetails />
      </Router>
    </div>
  );
}

export default App;
