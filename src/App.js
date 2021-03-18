import { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import Input from "./components/Input";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import "./App.css";

function App() {
  const [jobsList, setJobsList] = useState([]);
  const [search, setSearch] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");

  const handleJobs = (jobslist) => {
    setJobsList(jobslist);
  };

  const handleSearch = (search) => {
    setSearch(search);
  };

  const handleIsLoggedIn = (status) => {
    setIsLoggedIn(status);
  };

  const handleUserID = (id) => {
    setUserID(id);
  };

  const _handleLogOutClick = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setUserID("");
  };

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Link to="/">
            <h1 className="f-light">Jumble</h1>
          </Link>
          {isLoggedin ? (
            <button type="button" onClick={_handleLogOutClick}>
              Log Out
            </button>
          ) : (
            <Login
              handleIsLoggedIn={handleIsLoggedIn}
              handleUserID={handleUserID}
            />
          )}
        </header>
        <Route exact path="/">
          <Input handleJobs={handleJobs} handleSearch={handleSearch} />
          {!!search ? (
            <JobList jobsList={jobsList} userID={userID} />
          ) : (
            <p>Choose a language and location to find available jobs</p>
          )}
        </Route>
        <Route path="/job/:id">
          <JobDetails jobsList={jobsList} userID={userID} />
        </Route>
        <Route path="/signup">
          <CreateAccount />
        </Route>
      </Router>
    </div>
  );
}

export default App;
