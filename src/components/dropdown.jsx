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
            <DropdownMenuSubTrigger>Semester 3</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Engineering Mathematics III");
                    navigate("/it/em3");
                  }}
                >
                  Engineering Mathematics III
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Data Structure and Analysis");
                    navigate("/it/dsa");
                  }}
                >
                  Data Structure and Analysis
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Database Management System");
                    navigate("/it/dbms");
                  }}
                >
                  Database Management System
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Principle of Communication");
                    navigate("/it/poc");
                  }}
                >
                  Principle of Communication
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject(
                      "Paradigms & Computer Programming Fundamentals"
                    );
                    navigate("/it/pcpf");
                  }}
                >
                  Paradigms & Computer Programming Fundamentals
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Semester 4</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Engineering Mathematics IV");
                    navigate("/it/em4");
                  }}
                >
                  Engineering Mathematics IV
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Computer Network and Network Design");
                    navigate("/it/cnnd");
                  }}
                >
                  Computer Network and Network Design
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Operating System");
                    navigate("/it/os");
                  }}
                >
                  Operating System
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Automata Theory");
                    navigate("/it/at");
                  }}
                >
                  Automata Theory
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject(
                      "Computer Organization and Architecture"
                    );
                    navigate("/it/coa");
                  }}
                >
                  Computer Organization and Architecture
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Semester 7</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("AI and DS II");
                    navigate("/it/aids2");
                  }}
                >
                  AI and DS II
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Internet of Everything I");
                    navigate("/it/ioe1");
                  }}
                >
                  Internet of Everything I
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Infrastructure Security");
                    navigate("/it/is");
                  }}
                >
                  Infrastructure Security
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("AR - VR");
                    navigate("/it/arvr");
                  }}
                >
                  AR - VR
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Cyber Security and Laws");
                    navigate("/it/csal");
                  }}
                >
                  Cyber Security and Laws
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Semester 8</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Big Data Analytics");
                    navigate("/it/bda");
                  }}
                >
                  Big Data Analytics
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("Internet of Everything II");
                    navigate("/it/ioe2");
                  }}
                >
                  Internet of Everything II
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("User Interaction Design");
                    navigate("/it/uid");
                  }}
                >
                  User Interaction Design
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setSelectedSubject("IPR and Patenting");
                    navigate("/it/iprp");
                  }}
                >
                  IPR and Patenting
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
