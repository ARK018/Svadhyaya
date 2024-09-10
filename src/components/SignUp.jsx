import React from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "@/config/firebase-config";
import { setDoc, doc } from "firebase/firestore";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignupwithgoogle = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log(result);
      console.log("user logged in successfully");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignupwithemail = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          uid: user.uid,
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          password: password,
          department: department,
          semester: semester,
        });
      }
      navigate("/dashboard");
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="h-16 py-5 px-[100px] w-full flex items-center justify-between border-b-2">
        <h1
          onClick={handleHomeClick}
          id="logo"
          className=" uppercase text-base font-bold leading-6 tracking-[5%] text-black cursor-pointer;"
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
            src="src\assets\girl.png"
            alt="Woman working on laptop"
            className="absolute  h-100% object-cover "
          />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <form action="" className="w-[480px] space-y-10">
            <div className="flex justify-between">
              <div className="min-h-full w-[215px]">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="First Name"
                  className="w-full py-2 border-b border-gray-300 focus:outline-none"
                  placeholder="Akshay"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="min-h-full w-[215px]">
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="w-full py-2 border-b border-gray-300 focus:outline-none"
                  placeholder="Kambli"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="min-h-full w-[215px]">
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
                  className="w-full py-2 border-b border-gray-300 focus:outline-none"
                  placeholder="akshay@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative w-[215px]">
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
                  placeholder="••••••"
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
            </div>

            <div className="flex justify-between">
              <div className="min-h-full w-[215px]">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                </label>
                <select
                  id="department"
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full py-2 border-b border-gray-300 focus:outline-none bg-white"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a Department
                  </option>
                  <option value="IT">Information Technology</option>
                </select>
              </div>
              <div className="min-h-full w-[215px]">
                <label
                  htmlFor="semester"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Semester
                </label>
                <select
                  id="semester"
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full py-2 border-b border-gray-300 focus:outline-none bg-white"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a semester
                  </option>
                  <option value="Sem 3">Sem 3</option>
                  <option value="Sem 4">Sem 4</option>
                  <option value="Sem 5">Sem 5</option>
                  <option value="Sem 6">Sem 6</option>
                  <option value="Sem 7">Sem 7</option>
                  <option value="Sem 8">Sem 8</option>
                </select>
              </div>
            </div>
          </form>

          <div className=" w-[480px] flex items-center gap-4 mt-10">
            <button
              onClick={handleSignupwithgoogle}
              className="border-[1.5px] w-1/2 border-black text-black py-3 px-4 rounded-full hover:bg-gray-50 transition duration-300 flex items-center justify-center"
            >
              <img
                src="src\assets\google.svg"
                alt="Google logo"
                className="mr-2 h-5 w-5"
              />
              Sign Up with Google
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-500">OR</span>
            </div>

            <button
              type="submit"
              onClick={handleSignupwithemail}
              className=" bg-black text-white w-1/2 hover:bg-gray-800 py-3 px-4 rounded-full transition duration-300"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
