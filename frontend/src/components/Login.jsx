import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitLogin = async () => {
    try {
      const response = await axios.postForm("http://localhost:8000/api/token", {
        username: email,
        password: password,
      });
      const data = await response.data;
      console.log(data.access_token);
      setToken(data.access_token);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.detail);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <div className="mt-5 block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-6">
          <label
            htmlFor="inputEmailLogin"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            className="form-control block w-full px-3 py-1.5 text-base
            font-normal text-gray-700 bg-white bg-clip-padding
            border border-solid border-gray-300 rounded
            transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="inputEmailLogin"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="inputPasswordLogin"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control block w-full px-3 py-1.5 text-base
            font-normal text-gray-700 bg-white bg-clip-padding
            border border-solid border-gray-300 rounded
            transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="inputPasswordLogin"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <ErrorMessage props={errorMessage} />
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
