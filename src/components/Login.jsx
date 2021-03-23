import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({ setIsLoggedIn, setUserID }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginFail, setLoginFail] = useState(false);

  const _handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const _handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const _handleLogin = async (e) => {
    e.preventDefault();
    console.log("THIS IS THE ENV: ", process.env.REACT_APP_SERVER_URL);
    const loginResponse = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      }
    )
      .then((response) => response.json())
      .catch((err) => {
        console.log(err.message);
        setUserName("");
        setPassword("");
        setIsLoggedIn(false);
        setLoginFail(true);
      });
    console.log("LOGIN RESPONSE IS: ", loginResponse);
    setUserName("");
    setPassword("");
    if (loginResponse?.isValid) {
      setIsLoggedIn(true);
      setUserID(loginResponse.user_id);
      setLoginFail(false);
    }
  };

  return (
    <div className="login">
      <h3 data-testid="title">Login to Save Jobs or view your favorites!</h3>
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
        {!!loginFail ? (
          <h6 className="f-red f-small">
            Your username and password do not match
          </h6>
        ) : null}
      </form>
      <Link to="/signup" className="f-small f-light">
        Don't have a login? Click here and join the Jumble!
      </Link>
    </div>
  );
};

export default Login;
