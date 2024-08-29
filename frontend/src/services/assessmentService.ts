import axios from 'axios';

const API_URL = 'http://localhost:5000/api/assessments';

export const getAssessments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch assessments', error);
    return [];
  }
};

// Other functions for creating, updating, and deleting assessments can be added here.
