import React from "react";
import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";
import { envVariable } from "../config/env";
import { useNavigate } from "react-router-dom";

import TextInput from "../components/TextInput";

const AddAnimal = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [picture, setPicture] = useState("");
  const [ownerId] = useState(auth.userId);
  const [pictureChanged, setPictureChanged] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const maxAllowedSize = 1 * 1024 * 1024;
    if (e.target.files[0].size > maxAllowedSize) {
      setError("File size exceeds 1MB");
      setPicture("");
      setPictureChanged(false);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    setPicture(e.target.files[0]);
    setPictureChanged(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("species", species);
    formData.append("age", age);
    formData.append("picture", picture);
    formData.append("ownerId", ownerId);
    try {
      const response = await fetch(`${envVariable.API_URL}/api/animal`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        body: formData,
      });
      const res = await response.json();
      if (response.status === 201) {
        setName("");
        setDescription("");
        setSpecies("");
        setAge("");
        setPicture("");
        setPictureChanged(false);
        navigate("/");
      } else {
        setError(res.message);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-grow my-10 justify-center">
      <div className="block p-6 border border-gray-200 rounded-lg shadow bg-gray-800 w-2/5">
        {error && (
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span class="block sm:inline">{error}</span>
          </div>
        )}
        <h1 className="text-3xl font-semibold mb-5 text-white">
          Release a pet
        </h1>
        <form class="mx-auto" onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Species"
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
          <div class="mb-5">
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label
              for="age"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Age (years)
            </label>
            <input
              type="number"
              id="age"
              name="age"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="picture"
            >
              Picture
            </label>
            {pictureChanged && (
              <img
                src={URL.createObjectURL(picture)}
                alt={name}
                class="w-full"
              />
            )}
            <input
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="picture"
              name="picture"
              type="file"
              accept="image/png, image/gif, image/jpeg, image/jpg"
              required
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAnimal;
