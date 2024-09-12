// Signup.js
import React, { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";
import Step1 from "./Step1"; // Import Step1 component
import Step2 from "./Step2"; // Import Step2 component
import { auth, db } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // State to track which step the user is on
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    semester: "Semester 5",
    branch: "IT",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Go to next step
  const nextStep = () => {
    setStep(2);
  };

  const handleSignupWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const userDocRef = doc(db, "Users", user.uid); // Reference to the user document in Firestore

      // Check if the user already exists in Firestore
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If user doesn't exist, add a new document
        await setDoc(userDocRef, {
          firstName: user.displayName.split(" ")[0], // Assuming the first word is the first name
          lastName: user.displayName.split(" ")[1] || "", // Assuming the second word is the last name (may be empty)
          email: user.email,
          uid: user.uid,
          password: "", // Google users won't have a password, so leave this empty
          branch: formData.branch,
          semester: formData.semester,
        });

        console.log("New user added to Firestore.");
      } else {
        console.log("User already exists in Firestore.");
      }

      // Redirect to the dashboard after successful sign-in
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // Submit form data
  const submitForm = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          uid: user.uid,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: user.email,
          password: formData.password,
          branch: formData.branch,
          semester: formData.semester,
        });
      }
      navigate("/dashboard");
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {step === 1 ? (
        <Step1
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          handleSignupWithGoogle={handleSignupWithGoogle}
        />
      ) : (
        <Step2
          formData={formData}
          handleChange={handleChange}
          submitForm={submitForm}
          handleSignupWithGoogle={handleSignupWithGoogle}
        />
      )}
    </div>
  );
};

export default Signup;
