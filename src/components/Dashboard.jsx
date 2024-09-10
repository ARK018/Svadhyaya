import React from "react";
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
import { auth } from "@/config/firebase-config";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await auth.signOut();
      console.log("User logged out");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen ] ">
      {/* Sidebar */}
      <div className="w-64 bg-[#F7F7F7] p-6 flex flex-col justify-between">
        <div className="">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-purple-600 rounded-full mr-2"></div>
            <span className="text-lg font-semibold">Svadhyaya</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Good Morning Akshay</h2>
          <h3 className="text-sm text-gray-500 mb-4">SUBJECTS FOR SEM IV</h3>
          <ul className="space-y-2 mb-8">
            <li className="font-semibold">Web Technology</li>
            <li>Physics</li>
            <li>Advanced Java</li>
            <li>Database Management System</li>
            <li>Mathematics</li>
          </ul>
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
        <div className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="submit" onClick={handleSignout}>
                  Sign Out
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
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
              <p className="text-sm text-gray-500">15 Questions</p>
            </div>
            <button className="px-4 py-2 bg-gray-200 rounded-md">
              START TEST
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Quiz IV</h3>
              <p className="text-sm text-gray-500">10 Questions</p>
            </div>
            <button className="px-4 py-2 bg-black text-white rounded-md">
              START TEST
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Quiz V</h3>
              <p className="text-sm text-gray-500">10 Questions</p>
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
