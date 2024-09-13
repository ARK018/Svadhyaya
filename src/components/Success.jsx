import React from "react";
import Navbar from "./navbar";

const Success = () => {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh_-_80px)] flex-col bg-gray-100">
        <img src="/tick.webp" alt="Success Tick" className="w-24 h-24 mb-4" />
        <h1 className="text-xl font-semibold text-gray-800">
          Your response has been successfully submitted!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your feedback. We appreciate your input and will get
          back to you soon.
        </p>
      </div>
    </>
  );
};

export default Success;
