import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; // Firestore imports
import { db } from "../config/firebase-config"; // Firebase configuration

const DashboardSubjects = ({ semester }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const semesterDoc = await getDoc(doc(db, "Semesters", semester));

        if (semesterDoc.exists()) {
          const data = semesterDoc.data();
          const subjectsArray = data.subjects || []; // Default to empty array if no subjects
          setSubjects(subjectsArray);

          // Set the first subject as selected by default if subjects are not empty
          if (subjectsArray.length > 0) {
            setSelectedSubject(subjectsArray[0]);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching subjects: ", error);
      }
      setLoading(false);
    };

    fetchSubjects();
  }, [semester]);

  const handleClick = (subject) => {
    setSelectedSubject(subject);
  };

  if (loading) {
    return <div>Loading subjects...</div>;
  }

  return (
    <div className="">
      <h3 className="text-xs text-black font-semibold opacity-40 pl-6 mb-3">
        SUBJECTS FOR {semester}
      </h3>
      <ul className="mb-[42px] px-3">
        {subjects.map((subject, index) => (
          <li
            key={index}
            onClick={() => handleClick(subject)}
            className={`cursor-pointer p-3 rounded-lg h-[48px] flex items-center ${
              selectedSubject === subject ? "bg-white" : ""
            }`}
          >
            {subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSubjects;
