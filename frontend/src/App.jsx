import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserContext } from "./context/UserContext";

const App = () => {
  const [message, setMessage] = useState("");
  const [token] = useContext(UserContext);

  const getWelcomeMessage = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api");
      const data = await response.data;
      console.log(data);
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <div className="grid justify-center">
      <Header title={message} />
      <div>
        <div></div>
        <div>
          {!token ? (
            <div className="flex border border-blue-600">
              <Register />
              <Login />
            </div>
          ) : (
            <Contact />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
