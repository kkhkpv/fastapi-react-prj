import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);

  const submitRegistration = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/users", {
        email: email,
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
    if (password === confirmationPassword && password.length > 5) {
      submitRegistration();
    } else if (password !== confirmationPassword) {
      setErrorMessage("password doesn't match");
    } else {
      setErrorMessage("password's length isn't greater than 5 chars");
    }
  };

  return (
    <div className="mt-5 block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-6">
          <label
            htmlFor="inputEmailRegister"
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
            id="inputEmailRegister"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="inputPasswordRegister"
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
            id="inputPasswordRegister"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-6">
          <label
            htmlFor="confirmPassword"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Confirm password
          </label>
          <input
            type="password"
            className="form-control block w-full px-3 py-1.5 text-base
            font-normal text-gray-700 bg-white bg-clip-padding
            border border-solid border-gray-300 rounded
            transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="confirmPassword"
            placeholder="Repeat your password"
            value={confirmationPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
