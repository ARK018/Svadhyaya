import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { subjectState } from "@/atoms/store";

const Dropdown = () => {
  const navigate = useNavigate();

  const [selectedSubject, setSelectedSubject] = useRecoilState(subjectState);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>IT</DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Semester</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Semester 5</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Internet Programming");
                    navigate("/it/ip");
                  }}
                >
                  Internet Programming
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Computer Network Security");
                    navigate("/it/cns");
                  }}
                >
                  Computer Nertwork Security
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Entrepreneurship and E-business");
                    navigate("/it/eeb");
                  }}
                >
                  Entrepreneurship and E-business
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Software Engineering");
                    navigate("/it/se");
                  }}
                >
                  Software Engineering
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Advance Data Management Technologies");
                    navigate("/it/admt");
                  }}
                >
                  Advance Data Management Technologies
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Semester 6</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Data Mining & Business Intelligence");
                    navigate("/it/dmbi");
                  }}
                >
                  Data Mining & Business Intelligence
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Web X.0");
                    navigate("/it/wx");
                  }}
                >
                  Web X.0
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Wireless Technology");
                    navigate("/it/wt");
                  }}
                >
                  Wireless Technology
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("AI and DS I");
                    navigate("/it/aids1");
                  }}
                >
                  AI and DS I
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Software Architecture");
                    navigate("/it/sa");
                  }}
                >
                  Software Architecture
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
