const Project = require('../models/project.model');

const saveProject = async (req, res) => {
  try {
    const newProject = new Project({ files: req.body.files });
    await newProject.save();
    res.status(201).json({ projectId: newProject._id });
  } catch (error) {
    res.status(500).json({ message: 'Error saving project' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error loading project' });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    project.files = req.body.files;
    await project.save();
    res.status(200).json({ message: 'Project updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while updating project.' });
  }
};

module.exports = {
  saveProject,
  getProjectById,
  updateProject,
};