import React from "react";
import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <>
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://img.freepik.com/free-vector/sitting-brown-puppy-dog-logo-template_1051-3347.jpg"
              class="h-8 rounded-full"
              alt="Pet Logo"
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Pet Heaven Society
            </span>
          </a>
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <p class="text-sm  text-gray-500 dark:text-white ">
              contact us at g92711835@gmail.com
            </p>
            {auth.token ? (
              <button
                onClick={auth.logout}
                class="text-sm  text-red-600 dark:text-red-500 hover:underline"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                class="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
