exports.saveProject = (req, res) => {
  res.json({ message: "Project saved successfully!", data: req.body });
};

exports.getProjectById = (req, res) => {
  res.json({ message: "Project fetched successfully!", id: req.params.id });
};
