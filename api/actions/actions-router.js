// Write your "actions" router here!
const express = require('express');
const actiondb = require('./actions-model');

const router = express.Router();

// get all actions
router.get('/api/actions', (req, res) => {
	actiondb
		.get()
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(err => {
			res.status(500).json({
				message: 'Unable to get actions. Something went wrong.'
			});
		});
});

//get action by id
router.get('/api/actions/:id', (req, res) => {
	actiondb
		.get(req.params.id)
		.then(action => {
			if (action) {
				res.status(200).json(action);
			} else {
				res.status(404).json({
					message: 'Action not found.'
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				message: 'Error retrieving action.'
			});
		});
});

// create a new action
router.post('/api/actions', (req, res) => {
	if (!req.body.project_id || !req.body.description || !req.body.notes) {
		return res.status(400).json({
			message: 'Missing project id, description or notes'
		});
	}

	actiondb
		.insert(req.body)
		.then(action => {
			res.status(201).json(action);
		})
		.catch(err => {
			res.status(500).json({
				message: 'Error creating action.'
			});
		});
});

// update existing action
router.put('/api/actions/:id', (req, res) => {
	if (!req.body.project_id || !req.body.description || !req.body.notes) {
		return res.status(400).json({
			message: 'Missing project id, description or notes'
		});
	}

	actiondb.update(req.params.id, req.body).then(action => {
		if (action) {
			res.status(200).json(action);
		} else {
			res.status(404).json({
				message: 'Action not found.'
			});
		}
	});
});

// delete exiting action
router.delete('/api/actions/:id', (req, res) => {
	actiondb
		.remove(req.params.id)
		.then(action => {
			if (action) {
				res.status(200).json({
					message: 'Gone forver!'
				});
			} else {
				res.status(404).json({
					message: 'Action not found.'
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				message: 'Error deleting action.'
			});
		});
});

module.exports = router;
