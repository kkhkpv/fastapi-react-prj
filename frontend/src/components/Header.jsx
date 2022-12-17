import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Header = ({ title }) => {
  const [token, setToken] = useContext(UserContext);
  const handleLogout = () => {
    setToken(null);
  };
  return (
    <div className="m-6 grid justify-center content-center">
      <h1 className="text-xl">{title}</h1>
      {token && (
        <button
          className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
