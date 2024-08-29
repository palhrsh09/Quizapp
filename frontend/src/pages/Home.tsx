import React, { useEffect, useState } from 'react';
import { getAssessments } from '../services/assessmentService';

// Step 1: Define the type for assessment objects
interface Assessment {
  _id: string;
  title: string;
  // Add other properties that exist in your assessment objects, if any
}

const Home: React.FC = () => {
  // Step 2: Specify the type of state as an array of assessments
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    async function fetchAssessments() {
      const data = await getAssessments();
      setAssessments(data);
    }
    fetchAssessments();
  }, []);

  return (
    <div>
      <h1>My Assessments</h1>
      <ul>
        {assessments.map((assessment) => (
          <li key={assessment._id}>{assessment.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
