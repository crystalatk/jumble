import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

const CreateAccount = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState("");
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [matchingPasswords, setMatchingPasswords] = useState(true);
  const history = useHistory();
  const myAlert = useAlert();

  const _handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const _handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length === 0) {
      setMatchingPasswords(true);
    }
  };
  const _handlePassword2Change = (e) => {
    setPassword2(e.target.value);
    if (password.length === e.target.value.length) {
      if (password === e.target.value) {
        setMatchingPasswords(true);
      } else {
        setMatchingPasswords(false);
      }
    }
    if (e.target.value.length === 0) {
      setMatchingPasswords(true);
    }
  };
  const _handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const _handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const _handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };
  const _handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const _handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const _handleSubmit = async (e) => {
    e.preventDefault();
    const isUsername = await fetch(
      `${process.env.REACT_APP_SERVER_URL}users/username/?username=${userName}`
    ).then((response) => response.json());
    console.log("THIS IS THE ISUSESRNAME RESPONSE: ", isUsername);
    if (isUsername) {
      if (password2 === password) {
        const submitResponse = await fetch(
          `${process.env.REACT_APP_SERVER_URL}users/signup`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: userName,
              password: password,
              first_name: firstName,
              last_name: lastName,
              zip_code: zipCode,
              phone_num: phoneNumber,
              picture: avatar,
            }),
          }
        ).then((response) => response);
        myAlert.success("Your account has been created!");
        setAvatar("");
        setFirstName("");
        setLastName("");
        setMatchingPasswords(true);
        setPassword("");
        setPassword2("");
        setPhoneNumber("");
        setUserName("");
        setZipCode("");
        setUsernameTaken(false);
        history.push("/");
      } else {
        myAlert.error("You broke it...");
      }
    } else {
      myAlert.error("You broke it!");
      setTimeout(() => {
        myAlert.error("Just kidding.");
      }, 1000);
      setTimeout(() => {
        myAlert.error("That username is super popular.");
      }, 2000);
      setTimeout(() => {
        myAlert.error("Choose something else.");
      }, 3000);
      setUsernameTaken(true);
    }
  };

  return (
    <>
      <h1>Create an Account:</h1>
      <form onSubmit={_handleSubmit} className="create-account b-blue ">
        <label>
          Create a UserName
          <input
            type="text"
            value={userName}
            onChange={_handleUserNameChange}
          />
        </label>
        {!!usernameTaken ? (
          <h6 className="f-red f-small">Please choose another username.</h6>
        ) : null}
        <br />
        <label>
          Create a Password
          <input
            type="password"
            value={password}
            onChange={_handlePasswordChange}
          />
        </label>
        <br />
        <label>
          Retype your password
          <input
            type="password"
            value={password2}
            onChange={_handlePassword2Change}
          />
        </label>
        {!!matchingPasswords ? null : (
          <h6 className="f-red f-small">Your passwords do not match</h6>
        )}
        <br />
        <label>
          Name:
          <input
            type="text"
            placeholder="first name..."
            value={firstName}
            onChange={_handleFirstNameChange}
          />
          <input
            type="text"
            placeholder="last name..."
            value={lastName}
            onChange={_handleLastNameChange}
          />
        </label>
        <br />
        <label>
          Zip Code:
          <input type="text" value={zipCode} onChange={_handleZipCodeChange} />
        </label>
        <br />
        <label>
          Phone #:
          <input
            type="text"
            value={phoneNumber}
            onChange={_handlePhoneNumberChange}
          />
        </label>
        <br />
        <h3 className="m-10">Please choose an avatar:</h3>
        <br />
        <div>
          <label>
            <img
              src={"/images/baloons.jpg"}
              className="avatar"
              alt="baloons over a field"
            />
            <input
              type="radio"
              name="avatar"
              value="/images/baloons.jpg"
              checked
              onChange={_handleAvatarChange}
            />
          </label>
          <label>
            <img
              src={"/images/farms.jpg"}
              className="avatar"
              alt="a road through farms"
            />
            <input
              type="radio"
              name="avatar"
              value="/images/farms.jpg"
              onChange={_handleAvatarChange}
            />
          </label>
          <label>
            <img
              src={"/images/field.jpg"}
              className="avatar"
              alt="blue skies over a field of yellow grain"
            />
            <input
              type="radio"
              name="avatar"
              value="/images/field.jpg"
              onChange={_handleAvatarChange}
            />
          </label>
          <br />
          <label>
            <img
              src={"/images/fog.jpg"}
              className="avatar"
              alt="a river in a gorge leading to fog"
            />
            <input
              type="radio"
              name="avatar"
              value="/images/fog.jpg"
              onChange={_handleAvatarChange}
            />
          </label>
          <label>
            <img
              src={"/images/lake_peace.jpg"}
              className="avatar"
              alt="a peaceful lake at sunset with a pink and purple sky"
            />
            <input
              type="radio"
              name="avatar"
              value="/images/lake_peace.jpg"
              onChange={_handleAvatarChange}
            />
          </label>
          <label>
            <img
              src={"/images/night.jpg"}
              className="avatar"
              alt="a valley at dusk with lights of a town"
            />
            <input
              type="radio"
              name="avatar"
              value="/images/night.jpg"
              onChange={_handleAvatarChange}
            />
          </label>

          <label>
            <img
              src={"/images/snow_lake.jpg"}
              className="avatar"
              alt="a lake surrounded by snowy, rocky mountains with a peach and teal sky"
            />
            <input
              type="radio"
              name="avatar"
              value="/images/snow_lake.jpg"
              onChange={_handleAvatarChange}
            />
          </label>
          <br />
          <label>
            <img
              src={"/images/snow.jpg"}
              className="avatar"
              alt="a sunny snowscape with mountains in the background"
            />
            <input
              type="radio"
              name="avatar"
              value="/images/snow.jpg"
              onChange={_handleAvatarChange}
            />
          </label>
          <label>
            <img
              src={"/images/stars.jpg"}
              className="avatar"
              alt="the night sky"
            />
            <input
              type="radio"
              name="avatar"
              value="/images/stars.jpg"
              onChange={_handleAvatarChange}
            />
          </label>
          <label>
            <img
              src={"/images/sunrise.jpg"}
              className="avatar"
              alt="a sunsest over the ocean"
            />
            <input
              type="radio"
              name="avatar"
              value="/images/sunrise.jpg"
              onChange={_handleAvatarChange}
            />
          </label>
        </div>
        <button type="submit">Create my Account!</button>
        {!!usernameTaken ? (
          <h6 className="f-red f-small">Your username is taken.</h6>
        ) : null}
      </form>
    </>
  );
};

export default CreateAccount;
