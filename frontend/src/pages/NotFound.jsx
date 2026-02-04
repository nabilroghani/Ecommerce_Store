import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGhost } from "react-icons/fa6";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <FaGhost size={80} className="text-blue-500 animate-bounce" />
        </div>
        
        <h1 className="text-9xl font-extrabold text-gray-200 tracking-widest">404</h1>
        
        <div className="bg-blue-600 px-2 text-sm rounded rotate-12 absolute transform -translate-y-16 ml-24 hidden sm:block text-white">
          Page Not Found
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mt-4">Oops! Aap bhatak gaye hain.</h2>
        <p className="text-gray-500 mt-4 text-lg max-w-md mx-auto">
          Jo page aap dhoond rahe hain wo shayad delete ho gaya hai ya uska link tabdeel ho gaya hai.
        </p>

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
          >
            <FaArrowLeft /> Wapas Home Par Jayein
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;