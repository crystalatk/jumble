import { useHistory } from "react-router-dom";

const Logout = ({
  setIsLoggedIn,
  setUserID,
  setAppliedList,
  setFavoritesList,
  setUserInfo,
}) => {
  const history = useHistory();

  const _handleLogOutClick = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setUserID("");
    setAppliedList([]);
    setFavoritesList([]);
    setUserInfo([]);
    history.push("/");
  };

  return (
    <button type="button" onClick={_handleLogOutClick}>
      Log Out
    </button>
  );
};

export default Logout;
