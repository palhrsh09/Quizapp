const assessment = require('../model/assessment');
const Assessment = require('../model/assessment');

// Get all assessments
const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ createdBy: req.user._id });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new assessment
const createAssessment = async (req, res) => {
  const {
    title,
    type,
    questions,
    gradingOptions,
    instructions,
    timeLimit,
    attemptsAllowed,
    feedbackOptions,
    linkedCourseContent,
    status,
  } = req.body;

  
  try {
    if (!title || !type) {
      return res.status(400).json({ message: 'Title and type are required' });
    }
    const newAssessment = new Assessment({
      title,
      type,
      questions,
      gradingOptions,
      instructions,
      timeLimit,
      attemptsAllowed,
      feedbackOptions,
      linkedCourseContent,
      status,
      createdBy: req.user._id,
    });
    const createdAssessment = await newAssessment.save();
    res.status(201).json(createdAssessment);
  } catch (error) {
    console.error('Error creating assessment:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', details: error.errors });
    }

    res.status(500).json({ message: 'Server Error' });
  }
};

  const deleteAssessment = async (req,res) => {
      try {
        const {id} = req.params
        const deleted = await Assessment.findByIdAndDelete(id)
        if(deleted) {
          res.status(200).json({ message: 'Assessment deleted successfully' });
        }
        else {
          res.status(404).json({ message: 'Assessment not found' });
        }
      } catch (error) {
        console.error('Error deleting assessment:', error);
        res.status(500).json({ message: 'Internal server error' });
      }

      
  }

// Other functions (getAssessmentById, updateAssessment, deleteAssessment) will follow similar patterns.

module.exports = { getAssessments, createAssessment,
  //  getAssessmentById, updateAssessment, 
  deleteAssessment 
  };