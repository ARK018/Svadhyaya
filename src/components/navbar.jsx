import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import Dropdown from "./dropdown";
import { auth } from "../config/firebase-config"; // Assuming your firebase config file
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"; // Assuming you have avatar UI component
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Track user's authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  const handleHomeClick = () => {
    navigate("/");
    document.getElementById("logo");
  };

  return (
    <div className="h-16 py-5 px-[100px] w-full flex items-center justify-between border-b-2">
      <div className="flex gap-16 items-center">
        <div
          className="flex items-center pl-6 cursor-pointer"
          onClick={handleHomeClick}
        >
          <img src="/logo.svg" alt="Svadhyaya logo" className="mr-2 h-6 w-6" />
          <span className="uppercase text-base font-bold leading-6 tracking-[5%] text-black cursor-pointer">
            Svadhyaya
          </span>
        </div>
        <div className="flex gap-8">
          <a onClick={() => navigate("/")} className="cursor-pointer">
            Home
          </a>
          {user ? (
            <a
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer"
            >
              Dashboard
            </a>
          ) : (
            ""
          )}
          <a onClick={() => navigate("/contact")} className="cursor-pointer">
            Contact Us
          </a>
          <Dropdown />
        </div>
      </div>
      {/* Show Sign In button if not signed in, otherwise show profile */}
      {user ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Avatar className="cursor-pointer w-8 h-8">
              <AvatarImage src={user.photoURL || "src/assets/girl.png"} />
              <AvatarFallback>
                {user.displayName ? user.displayName[0] : "CN"}
              </AvatarFallback>
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
                  Email
                </label>
                <input
                  type="text"
                  className="w-full py-2 border-b border-gray-300 focus:outline-none bg-white cursor-not-allowed"
                  value={user.email}
                  disabled
                />
              </div>
              {/* Additional profile fields */}
            </div>
            <DialogFooter>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => console.log("Profile updated!")}
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
      ) : (
        <button
          onClick={handleSignin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-[6px] px-4 rounded-lg transition duration-300"
        >
          Sign In
        </button>
      )}
    </div>
  );
};

export default Navbar;
