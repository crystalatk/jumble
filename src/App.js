import { BrowserRouter as Router } from "react-router-dom";
import JobList from "./components/JobList";
import JobDetails from "./components/JobDetails";
import ProgLangInput from "./components/ProgLangInput";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jumble</h1>
      </header>
      <Router>
        <ProgLangInput />
        <JobList />
        <JobDetails />
      </Router>
    </div>
  );
}

export default App;
