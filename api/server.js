const express = require('express');
const projectsRouter = require('../api/projects/projects-router');
const actionsRouter = require('../api/actions/actions-router');

// Complete your server here!
// Do NOT `server.listen()` inside this file!
const server = express();

server.use(express.json());

server.use(projectsRouter);
server.use(actionsRouter);

module.exports = server;
