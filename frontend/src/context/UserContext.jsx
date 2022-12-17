import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users/me", {
          headers: { Authorization: "JWT" + token },
        });
      } catch (error) {
        console.log(error.response.status);
        // setToken(null);
      }

      localStorage.setItem("token", token);
    };
    fetchUser();
  }, [token]);
  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};
