import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { envVariable } from "../config/env";
import { useAuth } from "../hooks/AuthProvider";
import PetCard from "../components/PetCard";

const LandingPage = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch(`${envVariable.API_URL}/api/animal`);
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter((pet) =>
    pet.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div class="container mx-auto py-8 flex flex-wrap justify-center">
      <div class="shadow-lg bg-cyan-400 rounded-lg p-6 m-4 flex items-center">
        <div>
          <h1 class="text-4xl font-bold mb-4">Welcome to Pet Heaven Society</h1>
          <p class="text-lg mb-8">
            A place where pets find their forever homes
          </p>
        </div>
        <div class="ml-8">
          <img
            src="https://img.freepik.com/free-photo/isolated-happy-smiling-dog-white-background-portrait-4_1562-693.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709078400&semt=ais"
            alt="Welcome"
            class="w-60 h-60 object-cover rounded-full"
          />
        </div>
      </div>

      <div class="container mx-auto py-8 flex flex-wrap justify-center">
        <div class="max-w-xs bg-amber-200 shadow-lg rounded-lg p-6 m-4">
          <h2 class="text-2xl font-semibold mb-4">Our Purpose</h2>
          <p class="text-lg">
            Pet Heaven Society is dedicated to providing shelter, care, and love
            to animals in need. We believe that every pet deserves a loving
            home, and we work tirelessly to find forever families for our furry
            friends.
          </p>
        </div>

        <div class="max-w-xs bg-amber-200 shadow-lg rounded-lg p-6 m-4">
          <h2 class="text-2xl font-semibold mb-4">Our Facilities</h2>
          <ul class="list-disc list-inside">
            <li class="mb-2">
              Easy-to-use website interface for browsing available pets
            </li>
            <li class="mb-2">
              Comprehensive pet profiles with detailed information
            </li>
            <li class="mb-2">Secure online adoption application process</li>
            <li class="mb-2">Convenient pet release form for owners</li>
            <li class="mb-2">
              Responsive customer support to assist with adoption and release
              inquiries
            </li>
          </ul>
        </div>

        <div class="max-w-xs bg-amber-200 shadow-lg rounded-lg p-6 m-4">
          <h2 class="text-2xl font-semibold mb-4">Pet Information</h2>
          <p class="text-lg">
            Visit our website to view our available pets and learn more about
            their personalities, needs, and adoption process.
          </p>
          {auth.token ? (
            <button
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
              onClick={() => navigate("/add")}
            >
              Release a Pet
            </button>
          ) : (
            <button
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
              onClick={() => navigate("/login")}
            >
              Login to Release a pet
            </button>
          )}
        </div>
      </div>

      <div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by species"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="grid grid-cols-4 gap-10">
          {filteredPets.map((pet) => (
            <PetCard pet={pet} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
