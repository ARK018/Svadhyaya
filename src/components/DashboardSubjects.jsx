import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; // Firestore imports
import { db } from "../config/firebase-config"; // Firebase configuration

const DashboardSubjects = ({ semester }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Reference to the specific semester document (e.g., "Sem V")
        const semesterDoc = await getDoc(doc(db, "Semesters", semester));

        if (semesterDoc.exists()) {
          const data = semesterDoc.data();
          // Assuming each field in the document represents a subject
          const subjectsArray = Object.values(data); // Convert object to array of subjects
          setSubjects(subjectsArray);
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

  if (loading) {
    return <div>Loading subjects...</div>;
  }

  return (
    <div>
      <h3 className="text-sm text-gray-500 mb-4">SUBJECTS FOR SEMESTER 5</h3>
      <ul className="space-y-2 mb-8">
        {subjects.map((subject, index) => (
          <li key={index} className="cursor-pointer">
            {subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSubjects;
