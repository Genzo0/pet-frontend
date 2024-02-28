import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { envVariable } from "../config/env";

import TextInput from "../components/TextInput";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
      name,
      phoneNumber,
      address,
    };

    try {
      const response = await fetch(`${envVariable.API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (response.status === 201) {
        navigate("/login");
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
    <div className="h-screen flex justify-center items-center">
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        {error && (
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span class="block sm:inline">{error}</span>
          </div>
        )}
        <form class="space-y-3" onSubmit={handleSubmit}>
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Sign up to our platform
          </h5>
          <TextInput
            label="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div>
            <label
              for="password"
              class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <TextInput
            label="PhoneNumber"
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
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign up
          </button>
          <div class="text-sm font-medium text-gray-500 dark:text-gray-300 flex">
            Already have an account?
            <p
              class="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer ml-1"
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          </div>
          <p
            class="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer text-sm"
            onClick={() => navigate("/")}
          >
            Back home
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
