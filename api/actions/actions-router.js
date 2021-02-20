// Write your "actions" router here!
const express = require('express');
const actiondb = require('./actions-model');
const { checkActionData, checkActionId } = require('../../middleware/actions');

const router = express.Router();

// get all actions
router.get('/api/actions', (req, res, next) => {
	actiondb
		.get()
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(next);
});

//get action by id
router.get('/api/actions/:id', checkActionId(), (req, res, next) => {
	actiondb
		.get()
		.then(action => {
			res.status(200).json(action);
		})
		.catch(next);
});

// create a new action
router.post('/api/actions', checkActionData(), (req, res, next) => {
	actiondb
		.insert(req.body)
		.then(action => {
			res.status(201).json(action);
		})
		.catch(next);
});

// update existing action
router.put('/api/actions/:id', checkActionData(), checkActionId(), (req, res, next) => {
	actiondb
		.update(req.params.id, req.body)
		.then(action => {
			res.status(200).json(action);
		})
		.catch(next);
});

// delete exiting action
router.delete('/api/actions/:id', checkActionId(), (req, res, next) => {
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
		.catch(next);
});

module.exports = router;
