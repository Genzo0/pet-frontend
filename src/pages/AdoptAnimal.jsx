import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { envVariable } from "../config/env";

import TextInput from "../components/TextInput";

const AdoptAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState({});
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await fetch(`${envVariable.API_URL}/api/animal/${id}`);
        const data = await response.json();
        setAnimal(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimal();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      phoneNumber,
      address,
    };
    console.log(data);
    try {
      const response = await fetch(`${envVariable.API_URL}/api/animal/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (response.status === 200) {
        setSuccess(res.message);
        setTimeout(() => {
          setName("");
          setPhoneNumber("");
          setAddress("");
          setSuccess(""); // Clear the success message after another short delay
          navigate("/"); // Navigate to the homepage
        }, 3000);
      } else {
        setError(res.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div class="container mx-auto py-8 flex flex-wrap justify-center">
        <div class="shadow-lg bg-cyan-400 rounded-lg p-6 m-4 flex">
          <div>
            <h1 class="text-4xl font-bold mb-4">{animal.name}</h1>
            <div class="flex items-center mb-4 justify-between">
              <p class="text-lg">{animal.species}</p>
              <p class="text-md">{animal.age} years old</p>
            </div>
            <p class="text-lg mb-8">{animal.description}</p>
          </div>
          <div class="ml-8">
            <img
              src={`${envVariable.API_URL}/${animal.picture}`}
              alt={`${animal.name}`}
              class="w-40 h-40 object-cover rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="block p-6 border border-gray-200 rounded-lg shadow bg-gray-800 w-2/5">
          {error && (
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span class="block sm:inline">{error}</span>
            </div>
          )}
          {success && (
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              <span class="block sm:inline">{success}</span>
            </div>
          )}

          <h1 className="text-3xl font-semibold mb-5 text-white">Adopt Form</h1>
          <form class="mx-auto" onSubmit={handleSubmit}>
            <TextInput
              label="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextInput
              label="Phone Number"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextInput
              label="Address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send data
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdoptAnimal;
