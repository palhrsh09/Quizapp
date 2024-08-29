const express = require('express');
const router = express.Router();
const { getAssessments, createAssessment  } = require('../controller/assessment');
const authMiddleware = require('../middleware/authmiddleware');
const roleMiddleware = require('../middleware/rolemiddleware');

// Routes
router.get('/', authMiddleware, roleMiddleware('teacher'), getAssessments);
router.post('/',authMiddleware, roleMiddleware('teacher'),createAssessment);
// router.route('/:id').get(getAssessmentById).put(updateAssessment).delete(deleteAssessment);

module.exports = router;
