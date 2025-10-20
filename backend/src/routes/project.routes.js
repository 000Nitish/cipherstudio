const express = require('express');
const router = express.Router();
// CORRECT: This should only import the project controller
const { saveProject, getProjectById, updateProject } = require('../controllers/project.controller');

router.post('/', saveProject);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);

module.exports = router;