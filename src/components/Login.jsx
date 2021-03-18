import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({ handleIsLoggedIn, handleUserID }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const _handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const _handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const _handleLogin = async (e) => {
    e.preventDefault();
    const loginResponse = await fetch("http://127.0.0.1:3232/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    }).then((response) => response.json());
    console.log("LOGIN RESPONSE IS: ", loginResponse);
    setUserName("");
    setPassword("");
    if (loginResponse.isValid) {
      handleIsLoggedIn(true);
      handleUserID(loginResponse.user_id);
    } else handleIsLoggedIn(false);
  };

  return (
    <div className="login">
      <h3>Login to Save Jobs or view your favorites!</h3>
      <form onSubmit={_handleLogin}>
        <label>
          {" "}
          Username:
          <input
            type="text"
            placeholder="Username"
            onChange={_handleUserNameChange}
            value={userName}
          />
        </label>
        <label>
          {" "}
          Password:
          <input
            type="password"
            placeholder="Password"
            onChange={_handlePasswordChange}
            value={password}
          />
        </label>
        <button type="submit">Login!</button>
      </form>
      <Link to="/signup" className="f-small">
        Don't have a login? Click here and join the Jumble!
      </Link>
    </div>
  );
};

export default Login;
