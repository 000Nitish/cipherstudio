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

// The first argument 'Project' is the singular name of the collection
// your model is for. Mongoose automatically looks for the plural,
// lowercased version of your model name (i.e., 'projects').
module.exports = mongoose.model('Project', ProjectSchema);