import React from "react";
import { useNavigate } from "react-router-dom";

const Step1 = ({
  formData,
  handleChange,
  nextStep,
  handleSignupWithGoogle,
}) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  return (
    <>
      <div className="h-16 py-5 px-[100px] w-full flex items-center justify-between border-b-2">
        <h1
          onClick={handleHomeClick}
          id="logo"
          className=" uppercase text-base font-bold leading-6 tracking-[5%] text-black cursor-pointer"
        >
          Svadhyaya
        </h1>
        <div>
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={handleSignin}
            className="text-green-600 font-semibold"
          >
            Sign In
          </button>
        </div>
      </div>

      {/*Sign In section*/}
      <div className="relative grid grid-cols-2 items-center justify-center h-[calc(100vh-64px)]">
        <div className="relative aspect-[2/1] w-full">
          <img
            src="/girl.png"
            alt="Woman working on laptop"
            className="absolute  h-100% object-cover "
          />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <form action="" className="w-[440px] space-y-10">
            <div className="flex justify-between">
              <div className="min-h-full w-[200px]">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  className="w-full py-2 border-b border-gray-300 focus:outline-none"
                  placeholder="Akshay"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="min-h-full w-[200px]">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  className="w-full py-2 border-b border-gray-300 focus:outline-none"
                  placeholder="Kambli"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="min-h-full w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="w-full py-2 border-b border-gray-300 focus:outline-none"
                placeholder="akshay@gmail.com"
                onChange={handleChange}
                required
              />
            </div>
          </form>

          <div className=" w-[440px] flex flex-col items-center gap-4 mt-10">
            <button
              type="submit"
              onClick={nextStep}
              className=" bg-black text-white w-full hover:bg-gray-800 py-3 px-4 rounded-full transition duration-300"
            >
              Next Step
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-500">OR</span>
            </div>

            <button
              onClick={handleSignupWithGoogle}
              className="border-[1.5px] w-full border-black text-black py-3 px-4 rounded-full hover:bg-gray-50 transition duration-300 flex items-center justify-center"
            >
              <img
                src="/google.svg"
                alt="Google logo"
                className="mr-2 h-5 w-5"
              />
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1;
