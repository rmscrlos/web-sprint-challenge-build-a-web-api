const projectdb = require('../api/projects/projects-model');

const checkProjectId = () => (req, res, next) => {
	projectdb.get(req.params.id).then(project => {
		if (project) {
			next();
		} else {
			res.status(404).json({
				message: 'Project not found.'
			});
		}
	});
};

const checkProjectData = () => (req, res, next) => {
	if (!req.body.name || !req.body.description) {
		return res.status(400).json({
			message: 'Missing name or description'
		});
	}
	next();
};

module.exports = {
	checkProjectId,
	checkProjectData
};
