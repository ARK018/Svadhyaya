import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { db, auth } from "@/config/firebase-config";
import DashboardSubjects from "./DashboardSubjects";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GeminiQuiz from "./GeminiQuiz";
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    semester: "",
    branch: "",
  });
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    semester: "",
    branch: "",
  });

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = doc(db, "Users", user.uid); // Assuming 'Users' collection has user document by UID
      const docSnap = await getDoc(userDoc);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || user.email || "",
          password:
            data.password || "No password since you logged in with Google",
          semester: data.semester || "Semester 5",
          branch: data.branch || "IT",
        });
        setEditData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || user.email || "",
          password:
            data.password || "No password since you logged in with Google",
          semester: data.semester || "",
          branch: data.branch || "",
        });
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
    document.getElementById("logo");
  };

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const handleProfileUpdate = async () => {
    setOpen(false);
    const user = auth.currentUser;
    if (user) {
      try {
        await updateDoc(doc(db, "Users", user.uid), {
          firstName: editData.firstName,
          lastName: editData.lastName,
          semester: editData.semester,
          branch: editData.branch,
        });
        setUserData(editData); // Update the user data with edited values
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-[#F7F7F7]">
      {/* Sidebar */}
      <div className="w-80 bg-[#F7F7F7] flex flex-col justify-between">
        <div>
          <div
            className="flex items-center pt-6 pl-6 mb-10 cursor-pointer"
            onClick={handleHomeClick}
          >
            <div className="w-6 h-6 bg-purple-600 rounded-full mr-2"></div>
            <span className="text-lg font-semibold">Svadhyaya</span>
          </div>
          <h2 className="text-2xl pl-6 font-semibold mb-10">
            {getGreeting()} <br /> {userData.firstName}
          </h2>
          <DashboardSubjects semester="SEM V" />
          <h3 className="text-xs text-black font-semibold opacity-40 pl-6 mb-3">
            MORE
          </h3>
          <ul className="px-3">
            <li
              onClick={() => navigate("/about")}
              className="p-3 flex items-center justify-between cursor-pointer"
            >
              About
              <img src="/arrow-top-right.svg" alt="arrow" />
            </li>
            <li
              onClick={() => navigate("/contact")}
              className="p-3 flex items-center justify-between cursor-pointer"
            >
              Contact
              <img src="\arrow-top-right.svg" alt="arrow" />
            </li>
          </ul>
        </div>
        <div className="h-16 px-6 py-4 flex justify-between items-center border-t">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Avatar className="cursor-pointer w-8 h-8">
                <AvatarImage src="/girl.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 border-b border-gray-300 focus:outline-none"
                    value={editData.firstName}
                    onChange={(e) =>
                      setEditData({ ...editData, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 border-b border-gray-300 focus:outline-none"
                    value={editData.lastName}
                    onChange={(e) =>
                      setEditData({ ...editData, lastName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 border-b border-gray-300 focus:outline-none bg-white cursor-not-allowed"
                    value={userData.email}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 border-b border-gray-300 focus:outline-none bg-white cursor-not-allowed"
                    value={userData.password}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Semester
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 border-b border-gray-300 focus:outline-none cursor-not-allowed"
                    value={editData.semester}
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Branch
                  </label>
                  <input
                    type="text"
                    className="w-full py-2 border-b border-gray-300 focus:outline-none cursor-not-allowed"
                    value={editData.branch}
                    disabled
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleProfileUpdate}
                >
                  Save
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleSignout}
                >
                  Sign Out
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <p className="text-xs font-normal text-black opacity-50">
            © 2024 Svadhaya
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-10 pb-8 my-2 mr-2 bg-white rounded-lg">
        <div className="max-w-[760px] w-full mx-auto">
          <h1 className="text-2xl font-semibold mb-5">Web Technology</h1>
          <p className="text-black opacity-50 text-[17px] font-medium leading-[150%] mb-10">
            Web Technology is a multifaceted field that encompasses the
            principles, tools, and techniques used in creating, maintaining, and
            optimizing web-based systems. It's a rapidly evolving domain that
            forms the backbone of our digital world, powering everything from
            simple websites to complex web applications.
          </p>
          <h2 className="text-black opacity-50 text-xs tracking-wider font-semibold mb-5">
            COMPLETED
          </h2>
          <div className="space-y-5 mb-10">
            <div className="bg-[#F7F7F7] p-5 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-medium">Quiz I</h3>
                <p className="text-base font-medium text-black opacity-50">
                  20 Questions · 18 Correct Answers
                </p>
              </div>
              <div className="w-12 h-12">
                <CircularProgressbar
                  styles={{
                    path: {
                      // Path color
                      stroke: `rgb(25, 144, 66)`,
                    },
                    text: {
                      // Text color
                      fill: "#199042",
                      // Text size
                      fontSize: "32px",
                      fontWeight: 600,
                    },
                  }}
                  strokeWidth={12}
                  value={85}
                  text={`89`}
                />
              </div>
            </div>
            <div className="bg-[#F7F7F7] p-5 rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-medium">Quiz II</h3>
                <p className="text-base font-medium text-black opacity-50">
                  20 Questions · 13 Correct Answers
                </p>
              </div>
              <div className="w-12 h-12">
                <CircularProgressbar
                  styles={{
                    path: {
                      // Path color
                      stroke: `rgb(106,144,25)`,
                    },
                    text: {
                      // Text color
                      fill: "#6A9019",
                      // Text size
                      fontSize: "32px",
                      fontWeight: 600,
                    },
                  }}
                  strokeWidth={12}
                  value={65}
                  text={`65`}
                />
              </div>
            </div>
          </div>
          <h2 className="text-black opacity-50 text-xs tracking-wider font-semibold mb-5">
            NEW QUIZ
          </h2>
          <GeminiQuiz
            subject="Internet Programming"
            subjectDescription="Internet programming involves developing software and applications that operate over the web. Our syllabus covers basics of html, css, javascript, ReactJs, NodeJs, etc."
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
