import React from "react";
import { useNavigate } from "react-router-dom";
import { envVariable } from "../config/env";

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  return (
    <div
      key={pet.id}
      className="bg-cyan-400 rounded-lg overflow-hidden shadow-md"
    >
      <img
        className="w-full h-40 object-cover object-center"
        src={`${envVariable.API_URL}/${pet.picture}`}
        alt={pet.name}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{pet.name}</h2>
        <p className="text-sm text-gray-700 mb-4">{pet.description}</p>
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/adopt/${pet._id}`)}
            className="inline-block px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Adopt
          </button>
          <span className="text-sm text-gray-600">{pet.age} years old</span>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
