const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  files: {
    type: Object,
    required: [true, 'Project files are required.'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);