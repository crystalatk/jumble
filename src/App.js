import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import Input from "./components/Input";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Favorites from "./components/Favorites";
import Applied from "./components/Applied";
import "./App.css";

function App() {
  const [jobsList, setJobsList] = useState([]);
  const [search, setSearch] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [favoritesList, setFavoritesList] = useState([]);
  const [appliedList, setAppliedList] = useState([]);

  const fetchFaves = async () => {
    const favesData = await fetch(
      `http://127.0.0.1:3232/users/userList?user_id=${userID}&table=favorites`
    );
    setFavoritesList(await favesData.json());
  };

  useEffect(() => {
    fetchFaves();
  }, [userID]);

  const fetchApplied = async () => {
    const appliedData = await fetch(
      `http://127.0.0.1:3232/users/userList?user_id=${userID}&table=applied`
    );
    setAppliedList(await appliedData.json());
  };

  useEffect(() => {
    fetchApplied();
  }, [userID]);

  const _handleLogOutClick = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setUserID("");
    setAppliedList([]);
    setFavoritesList([]);
  };

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Link to="/">
            <h1 className="f-light">Jumble</h1>
          </Link>
          {isLoggedin ? (
            <>
              <button type="button" onClick={_handleLogOutClick}>
                Log Out
              </button>
              <Link to="/favorites" className="f-light f-small m-10">
                Click here to view Favorites
              </Link>
              <Link to="/applied" className="f-light f-small m-10">
                Click here to view Jobs Applied
              </Link>
            </>
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} setUserID={setUserID} />
          )}
        </header>
        <Route exact path="/">
          <Input setJobsList={setJobsList} setSearch={setSearch} />
          {!!search ? (
            <JobList
              jobsList={jobsList}
              userID={userID}
              favoritesList={favoritesList}
              setFavoritesList={setFavoritesList}
              appliedList={appliedList}
              setAppliedList={setAppliedList}
            />
          ) : (
            <p className="f-light">
              Choose a language and location to find available jobs
            </p>
          )}
        </Route>
        <Route path="/job/:id">
          <JobDetails
            jobsList={jobsList}
            userID={userID}
            setFavoritesList={setFavoritesList}
            favoritesList={favoritesList}
            appliedList={appliedList}
            setAppliedList={setAppliedList}
          />
        </Route>
        <Route path="/signup">
          <CreateAccount />
        </Route>
        <Route path="/favorites">
          <Favorites
            userID={userID}
            favoritesList={favoritesList}
            setFavoritesList={setFavoritesList}
            appliedList={appliedList}
            setAppliedList={setAppliedList}
          />
        </Route>
        <Route path="/applied">
          <Applied
            userID={userID}
            favoritesList={favoritesList}
            setFavoritesList={setFavoritesList}
            appliedList={appliedList}
            setAppliedList={setAppliedList}
          />
        </Route>
      </Router>
    </div>
  );
}

export default App;
