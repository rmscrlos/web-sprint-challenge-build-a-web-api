// Write your "projects" router here!
const express = require('express');
const projectsdb = require('./projects-model');
const { checkProjectId, checkProjectData } = require('../../middleware/projects');

const router = express.Router();

// get all projects
router.get('/api/projects', (req, res, next) => {
	projectsdb
		.get()
		.then(projects => {
			res.status(200).json(projects);
		})
		.catch(next);
});

// get project by id
router.get('/api/projects/:id', checkProjectId(), (req, res, next) => {
	projectsdb
		.get(req.params.id)
		.then(project => {
			res.status(200).json(project);
		})
		.catch(next);
});

// create new project
router.post('/api/projects', checkProjectData(), (req, res, next) => {
	projectsdb
		.insert(req.body)
		.then(project => {
			res.status(201).json(project);
		})
		.catch(next);
});

// update existing project
router.put('/api/projects/:id', checkProjectData(), checkProjectId(), (req, res, next) => {
	projectsdb
		.update(req.params.id, req.body)
		.then(project => {
			res.status(200).json(project);
		})
		.catch(next);
});

// delete existing project
router.delete('/api/projects/:id', checkProjectId(), (req, res, next) => {
	projectsdb
		.remove(req.params.id)
		.then(project => {
			res.status(200).json({
				message: 'Nuked forver.'
			});
		})
		.catch(next);
});

// get actions of a project
router.get('/api/projects/:id/actions', checkProjectId(), (req, res, next) => {
	projectsdb
		.getProjectActions(req.params.id)
		.then(actions => {
			res.status(200).json(actions);
		})
		.catch(next);
});

module.exports = router;
