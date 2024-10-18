import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import About from "./components/about.jsx";
import Contact from "./components/contact.jsx";
import { RecoilRoot } from "recoil";
import Subject from "./components/Subject.jsx";
import Success from "./components/Success.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { auth } from "./config/firebase-config";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Quiz from "./components/Quiz.jsx";
import Result from "./components/Result.jsx";
import SkeletonCard from "./components/SkeletonCard.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Set loading to false once auth check is complete
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SkeletonCard />
      </div> // Show a loader while checking authentication
    );
  }
  return (
    <>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/success" element={<Success />} />
            <Route path="/it" element={<Home />} />
            <Route path="/it/:subject" element={<Subject />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/signin" />}
            />
            <Route
              path="/quiz"
              element={user ? <Quiz /> : <Navigate to="/signin" />}
            />
            <Route
              path="/result"
              element={user ? <Result /> : <Navigate to="/signin" />}
            />
          </Routes>
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
