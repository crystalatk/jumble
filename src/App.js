import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import Input from "./components/Input";
import Login from "./components/Login";
import Logout from "./components/Logout";
import CreateAccount from "./components/CreateAccount";
import Favorites from "./components/Favorites";
import Applied from "./components/Applied";
import Trashed from "./components/Trashed";
import JobDetailsFave from "./components/JobDetailsFave";
import JobDetailsApplied from "./components/JobDetailsApplied";
import JobDetailsTrashed from "./components/JobDetailsTrashed";
import "./App.css";

function App() {
  const [jobsList, setJobsList] = useState([]);
  const [search, setSearch] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [appliedList, setAppliedList] = useState([]);
  const [trashedList, setTrashedList] = useState([]);

  const fetchFaves = async () => {
    const favesData = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/userList?user_id=${userID}&table=favorites`
    );
    setFavoritesList(await favesData.json());
  };

  useEffect(() => {
    userID && fetchUserInfo();
  }, [userID]);

  const fetchUserInfo = async () => {
    const userData = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/userInfo?user_id=${userID}&table=users`
    );
    setUserInfo(await userData.json());
  };

  useEffect(() => {
    userID && fetchFaves();
  }, [userID]);

  const fetchApplied = async () => {
    const appliedData = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/userList?user_id=${userID}&table=applied`
    );
    setAppliedList(await appliedData.json());
  };

  useEffect(() => {
    userID && fetchApplied();
  }, [userID]);

  const fetchTrashed = async () => {
    const trashedData = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/userList?user_id=${userID}&table=trashed`
    );
    setTrashedList(await trashedData.json());
  };

  useEffect(() => {
    userID && fetchTrashed();
  }, [userID]);

  useEffect(() => {
    setJobsList(
      jobsList.filter(
        (job) =>
          !favoritesList.some((faveJob) => job.id === faveJob.job_id) &&
          !appliedList.some((appliedJob) => job.id === appliedJob.job_id) &&
          !trashedList.some((trashedJob) => job.id === trashedJob.job_id)
      )
    );
  }, [favoritesList, appliedList, trashedList, userID]);

  useEffect(() => {
    console.log("USER INFO:", userInfo);
  }, [userInfo]);

  return (
    <div className="App">
      <Router>
        <header
          className="App-header"
          style={{
            backgroundImage: `url(${userInfo.picture})`,
            backgroundSize: "100vw",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Link to="/">
            <h1 className="f-light f-shadow-big">Jumble</h1>
          </Link>
          {isLoggedin ? (
            <>
              <div>
                {/* <img
                  className="avatar in-line"
                  src={userInfo.picture}
                  alt="user avatar"
                /> */}
                <h4 className="m-10 in-line  f-shadow-med">
                  Welcome, {userInfo.first_name}!
                </h4>
              </div>

              <Logout
                setIsLoggedIn={setIsLoggedIn}
                setUserID={setUserID}
                setAppliedList={setAppliedList}
                setFavoritesList={setFavoritesList}
                setUserInfo={setUserInfo}
              />
              <Link
                to="/favorites"
                className="f-light f-small m-10  f-shadow-tiny"
              >
                Click here to view Favorites
              </Link>
              <Link
                to="/applied"
                className="f-light f-small m-10  f-shadow-tiny"
              >
                Click here to view Jobs Applied
              </Link>
              <Link
                to="/trashed"
                className="f-light f-small m-10  f-shadow-tiny"
              >
                Need to dig through the trash? See your trashed jobs here.
              </Link>
            </>
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} setUserID={setUserID} />
          )}
        </header>

        <Route exact path="/">
          <Input
            setJobsList={setJobsList}
            setSearch={setSearch}
            favoritesList={favoritesList}
            appliedList={appliedList}
            trashedList={trashedList}
          />

          {!!search ? (
            <JobList
              jobsList={jobsList}
              userID={userID}
              favoritesList={favoritesList}
              setFavoritesList={setFavoritesList}
              appliedList={appliedList}
              setAppliedList={setAppliedList}
              trashedList={trashedList}
              setTrashedList={setTrashedList}
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
        <Route path="/fave/:id">
          <JobDetailsFave
            jobsList={jobsList}
            userID={userID}
            setFavoritesList={setFavoritesList}
            favoritesList={favoritesList}
            appliedList={appliedList}
            setAppliedList={setAppliedList}
            trashedList={trashedList}
            setTrashedList={setTrashedList}
          />
        </Route>
        <Route path="/app/:id">
          <JobDetailsApplied
            jobsList={jobsList}
            userID={userID}
            setFavoritesList={setFavoritesList}
            favoritesList={favoritesList}
            appliedList={appliedList}
            setAppliedList={setAppliedList}
          />
        </Route>
        <Route path="/trash/:id">
          <JobDetailsTrashed trashedList={trashedList} />
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
            trashedList={trashedList}
            setTrashedList={setTrashedList}
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
        <Route path="/trashed">
          <Trashed
            favoritesList={favoritesList}
            setFavoritesList={setFavoritesList}
            userID={userID}
            trashedList={trashedList}
            setTrashedList={setTrashedList}
          />
        </Route>
      </Router>
    </div>
  );
}

export default App;
