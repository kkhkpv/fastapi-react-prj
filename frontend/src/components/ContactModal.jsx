import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const ContactModal = ({ active, handleModal, token, id, setErrorMessage }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getContact = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/contacts/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setPhoneNumber(data.phone_number);
        setAddress(data.address);
      } catch (error) {
        setErrorMessage("can't get this contact");
      }
    };
    if (id) {
      getContact();
    }
  }, [id, token]);

  const cleanForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setAddress("");
  };

  const handleCreateContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/contacts",
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          address: address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      cleanForm();
      handleModal();
    } catch (error) {
      setErrorMessage("Failed to create contact");
    }
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      const response = axios.put(
        `http://localhost:8000/api/contacts/${id}`,
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone_number: phoneNumber,
          address: address,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      cleanForm();
      handleModal();
    } catch (error) {
      setErrorMessage("can't update this contact");
    }
  };

  return (
    <>
      {active ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto border border-blue-600 rounded-md shadow-black shadow-md max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-center p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Contact Info</h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {id ? (
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={handleUpdateContact}
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={handleCreateContact}
                    >
                      Create
                    </button>
                  )}

                  <button
                    className="text-white bg-red-500 active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default ContactModal;
