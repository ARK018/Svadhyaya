import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "@/config/firebase-config";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleSigninwithemail = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
      console.log("user logged in successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSigninwithgoogle = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const userDocRef = doc(db, "Users", user.uid); // Reference to the user document in Firestore

      // Check if the user already exists in Firestore
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If user doesn't exist, create a new document
        await setDoc(userDocRef, {
          firstName: user.displayName.split(" ")[0], // Assuming the first word is the first name
          lastName: user.displayName.split(" ")[1] || "", // Assuming the second word is the last name (may be empty)
          email: user.email,
          uid: user.uid,
          password: "", // Google users won't have a password, so leave this empty
          branch: "IT",
          semester: "Semester 5",
        });

        console.log("New user added to Firestore during sign-in.");
      } else {
        console.log("User already exists in Firestore.");
      }

      // Redirect to the dashboard after successful sign-in
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full">
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
            onClick={handleSignup}
            className="text-green-600 font-semibold"
          >
            Sign Up
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
          <form action="" className="space-y-10">
            <div className="w-[400px] min-h-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2 border-b border-gray-300 focus:outline-none"
                placeholder="akshay@gmail.com"
                required
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2 border-b border-gray-300 pr-10 focus:outline-none"
                placeholder="•••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 rounded"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              type="submit"
              onClick={handleSigninwithemail}
              className="w-full bg-black text-white py-3 px-4 rounded-full hover:bg-gray-800 transition duration-300 flex items-center justify-center"
            >
              Sign In
            </button>
          </form>

          <div className="w-[400px] h-full mt-6 flex flex-col justify-center items-center  text-center">
            <div className="flex justify-center items-center gap-[12px]">
              <img className="w-[180px]" src="/line.svg" />
              <span className="text-[11px] text-gray-500">OR</span>
              <img className="w-[180px]" src="/line.svg" />
            </div>
          </div>

          <button
            onClick={handleSigninwithgoogle}
            className="w-[400px] mt-6 border-[1.5px] border-black text-black py-3 px-4 rounded-full hover:bg-gray-50 transition duration-300 flex items-center justify-center"
          >
            <img src="/google.svg" alt="Google logo" className="mr-2 h-5 w-5" />
            Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
