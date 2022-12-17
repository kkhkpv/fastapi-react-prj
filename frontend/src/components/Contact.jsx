import axios from "axios";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import ErrorMessage from "./ErrorMessage";
import moment from "moment";
import ContactModal from "./ContactModal";

const Contact = () => {
  const [token] = useContext(UserContext);
  const [contacts, setContacts] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [id, setId] = useState(null);

  const handleUpdate = async (id) => {
    setId(id);
    setActiveModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/contacts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      getContacts();
    } catch (error) {
      setErrorMessage("Failed to delete contact");
    }
  };

  const getContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.data;
      console.log(data);
      setContacts(data);
      setLoaded(true);
    } catch (error) {
      setErrorMessage(error.response.data.detail);
    }
  };

  const handleModal = () => {
    setActiveModal(!activeModal);
    getContacts();
    setId(null);
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="grid">
      <ContactModal
        active={activeModal}
        handleModal={handleModal}
        token={token}
        id={id}
        setErrorMessage={setErrorMessage}
      />
      <button
        onClick={() => setActiveModal(true)}
        className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
          leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Create contact
      </button>
      <ErrorMessage props={errorMessage} />
      {loaded && contacts ? (
        <table className="m-5">
          <thead>
            <tr className="text-center text-xs">
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Address</th>
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="text-center text-xs">
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone_number}</td>
                <td>{contact.address}</td>
                <td>{moment(contact.create_at).format("MMM Do YY")}</td>
                <td className="px-5 py-5 grid">
                  <button
                    className="px-6 py-2.5 text-yellow-400 font-medium text-xs
                    leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => handleUpdate(contact.id)}
                  >
                    Update
                  </button>
                  <button
                    className="px-6 py-2.5 text-red-600 font-medium text-xs
                    leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Contact;
