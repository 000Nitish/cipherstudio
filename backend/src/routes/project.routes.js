const express = require('express');
const router = express.Router();
const { saveProject, getProjectById } = require('../controllers/project.controller');

router.post('/', saveProject);
router.get('/:id', getProjectById);

module.exports = router;
