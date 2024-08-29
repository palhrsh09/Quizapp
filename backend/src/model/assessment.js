const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['quiz', 'assignment', 'survey'],
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question', // Reference to a Question model
    }
  ],
  gradingOptions: {
    autoGrading: {
      type: Boolean,
      default: false,
    },
    manualGrading: {
      type: Boolean,
      default: false,
    },
  },
  instructions: {
    type: String,
  },
  timeLimit: {
    type: Number, // Time in minutes
  },
  attemptsAllowed: {
    type: Number,
    default: 1,
  },
  feedbackOptions: {
    type: String,
    enum: ['immediate', 'delayed'],
    default: 'immediate',
  },
  linkedCourseContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseModule', // Reference to a CourseModule model
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Assessment', assessmentSchema);
