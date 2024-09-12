import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ArrowUpRight } from "lucide-react";
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
import { QuizDifficulty } from "./QuizDifficulty";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.log(error);
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
      <div className="w-64 bg-[#F7F7F7] p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-purple-600 rounded-full mr-2"></div>
            <span className="text-lg font-semibold">Svadhyaya</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Hello, <br /> {userData.firstName} {userData.lastName}
          </h2>
          <DashboardSubjects semester="Sem5" />
          <h3 className="text-sm text-gray-500 mb-2">MORE</h3>
          <ul className="space-y-2">
            <li className="flex items-center justify-between">
              About
              <ArrowUpRight size={16} />
            </li>
            <li className="flex items-center justify-between">
              Contact
              <ArrowUpRight size={16} />
            </li>
          </ul>
        </div>
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
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
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 my-2 mr-2 bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Web Technology</h1>
        <p className="text-gray-600 mb-6">
          Web Technology is a multifaceted field that encompasses the
          principles, tools, and techniques used in creating, maintaining, and
          optimizing web-based systems. It's a rapidly evolving domain that
          forms the backbone of our digital world, powering everything from
          simple websites to complex web applications.
        </p>
        <h2 className="text-xl font-semibold mb-4">COMPLETED</h2>
        <div className="space-y-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Quiz I</h3>
              <p className="text-sm text-gray-500">
                20 Questions · 18 Correct Answers
              </p>
            </div>
            <div className="w-12 h-12">
              <CircularProgressbar value={89} text={`89%`} />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Quiz II</h3>
              <p className="text-sm text-gray-500">
                20 Questions · 13 Correct Answers
              </p>
            </div>
            <div className="w-12 h-12">
              <CircularProgressbar value={65} text={`65%`} />
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-4">PENDING</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Quiz III</h3>
              <div className="flex gap-20">
                <QuizDifficulty />
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-200 rounded-md">
              START TEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
