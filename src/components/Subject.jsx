import React from "react";
import Navbar from "./navbar.jsx";
import { useRecoilState } from "recoil";
import { subjectState } from "@/atoms/store";
import Questions from "./Questions.jsx";
import { useLocation } from "react-router-dom";
import * as questionConstants from "@/utils/constants.js";

const Subject = () => {
  const location = useLocation();
  const [selectedSubject, setSelectedSubject] = useRecoilState(subjectState);

  const h1ClassName =
    "pl-[108px] flex flex-col items-start justify-center pt-[40px] pb-4 text-2xl";

  const subjectMap = {
    "/it/em3": {
      title: "Engineering Mathematics III",
      questions: questionConstants.ENGINEERING_MATHEMATICS_III_QUESTIONS,
    },
    "/it/dsa": {
      title: "Data Structure and Analysis",
      questions: questionConstants.DATA_STRUCTURE_AND_ANALYSIS_QUESTIONS,
    },
    "/it/dbms": {
      title: "Database Management System",
      questions: questionConstants.DATABASE_MANAGEMENT_SYSTEM_QUESTIONS,
    },
    "/it/poc": {
      title: "Principle of Communication",
      questions: questionConstants.PRINCIPLE_OF_COMMUNICATION_QUESTIONS,
    },
    "/it/pcpf": {
      title: "Paradigms and Computer Programming Fundamentals",
      questions:
        questionConstants.PARADIGMS_AND_COMPUTER_PROGRAMMING_FUNDAMENTALS_QUESTIONS,
    },
    "/it/em4": {
      title: "Engineering Mathematics IV",
      questions: questionConstants.ENGINEERING_MATHEMATICS_IV_QUESTIONS,
    },
    "/it/cnnd": {
      title: "Computer Network and Network Design",
      questions:
        questionConstants.COMPUTER_NETWORK_AND_NETWORK_DESIGN_QUESTIONS,
    },
    "/it/os": {
      title: "Operating System",
      questions: questionConstants.OPERATING_SYSTEM_QUESTIONS,
    },
    "/it/at": {
      title: "Automata Theory",
      questions: questionConstants.AUTOMATA_THEORY_QUESTIONS,
    },
    "/it/coa": {
      title: "Computer Organization and Architecture",
      questions:
        questionConstants.COMPUTER_ORGANIZATION_AND_ARCHITECTURE_QUESTIONS,
    },
    "/it/ip": {
      title: "Internet Programming",
      questions: questionConstants.INTERNET_PROGRAMMING_QUESTIONS,
    },
    "/it/cns": {
      title: "Computer Network Security",
      questions: questionConstants.COMPUTER_NETWORK_SECURITY_QUESTIONS,
    },
    "/it/eeb": {
      title: "Entrepreneurship and E-Business",
      questions: questionConstants.ENTREPRENEURSHIP_AND_E_BUSINESS_QUESTIONS,
    },
    "/it/se": {
      title: "Software Engineering",
      questions: questionConstants.SOFTWARE_ENGINEERING_QUESTIONS,
    },
    "/it/admt": {
      title: "Advance Data Management Technologies",
      questions:
        questionConstants.ADVANCE_DATA_MANAGEMENT_TECHNOLOGIES_QUESTIONS,
    },
    "/it/dmbi": {
      title: "Data Mining and Business Intelligence",
      questions:
        questionConstants.DATA_MINING_AND_BUSINESS_INTELLIGENCE_QUESTIONS,
    },
    "/it/wx": { title: "Web X", questions: questionConstants.WEB_X_QUESTIONS },
    "/it/wt": {
      title: "Wireless Technology",
      questions: questionConstants.WIRELESS_TECHNOLOGY_QUESTIONS,
    },
    "/it/aids1": {
      title: "AI and Data Science I",
      questions: questionConstants.AI_AND_DS_I_QUESTIONS,
    },
    "/it/sa": {
      title: "Software Architecture",
      questions: questionConstants.SOFTWARE_ARCHITECTURE_QUESTIONS,
    },
    "/it/aids2": {
      title: "AI and Data Science II",
      questions: questionConstants.AI_AND_DS_II_QUESTIONS,
    },
    "/it/ioe1": {
      title: "Internet of Everything I",
      questions: questionConstants.INTERNET_OF_EVERYTHING_I_QUESTIONS,
    },
    "/it/is": {
      title: "Infrastructure Security",
      questions: questionConstants.INFRASTRUCTURE_SECURITY_QUESTIONS,
    },
    "/it/arvr": {
      title: "AR and VR",
      questions: questionConstants.AR_VR_QUESTIONS,
    },
    "/it/csal": {
      title: "Cyber Security and Laws",
      questions: questionConstants.CYBER_SECURITY_AND_LAWS_QUESTIONS,
    },
    "/it/bda": {
      title: "Big Data Analytics",
      questions: questionConstants.BIG_DATA_ANALYTICS_QUESTIONS,
    },
    "/it/ioe2": {
      title: "Internet of Everything II",
      questions: questionConstants.INTERNET_OF_EVERYTHING_II_QUESTIONS,
    },
    "/it/uid": {
      title: "User Interaction Design",
      questions: questionConstants.USER_INTERACTION_DESIGN_QUESTIONS,
    },
    "/it/iprp": {
      title: "IPR and Patenting",
      questions: questionConstants.IPR_AND_PATENTING_QUESTIONS,
    },
  };

  const subjectContent = subjectMap[location.pathname];

  return (
    <div>
      <Navbar />
      {subjectContent ? (
        <>
          <h1 className={h1ClassName}>{subjectContent.title}</h1>
          <Questions questions={subjectContent.questions} />
        </>
      ) : (
        <div>Unknown subject</div>
      )}
    </div>
  );
};

export default Subject;
