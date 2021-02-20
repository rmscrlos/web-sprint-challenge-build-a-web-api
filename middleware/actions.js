const actiondb = require('../api/actions/actions-model');

const checkActionData = () => (req, res, next) => {
	if (!req.body.project_id || !req.body.description || !req.body.notes) {
		return res.status(400).json({
			message: 'Missing project id, description or notes'
		});
	}

	next();
};

const checkActionId = () => (req, res, next) => {
	actiondb.get(req.params.id).then(action => {
		if (action) {
			next();
		} else {
			res.status(404).json({
				message: 'Action not found.'
			});
		}
	});
};

module.exports = {
	checkActionData,
	checkActionId
};
