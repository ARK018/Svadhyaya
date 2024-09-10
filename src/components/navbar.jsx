import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import Dropdown from "./dropdown";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleHomeClick = () => {
    navigate("/");
    document.getElementById("logo");
  };

  return (
    <div className="h-16 py-5 px-[100px] w-full flex items-center justify-between border-b-2">
      <div className="flex gap-16 items-center">
        <h1
          onClick={handleHomeClick}
          id="logo"
          className=" uppercase text-base font-bold leading-6 tracking-[5%] text-black cursor-pointer;"
        >
          Svadhyaya
        </h1>
        <div className="flex gap-9">
          <a onClick={handleAboutClick} className="cursor-pointer">
            About
          </a>
          <a onClick={handleContactClick} className="cursor-pointer">
            Contact Us
          </a>
          <Dropdown />
        </div>
      </div>
      <Button onClick={handleSignin}>Sign In</Button>
    </div>
  );
};

export default Navbar;
