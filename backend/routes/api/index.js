const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const issuesRouter = require('./issues.js');
const teamsRouter = require('./teams.js');
const commentsRouter = require('./comments.js');
const projectsRouter = require('./projects.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/issues', issuesRouter);

router.use('/teams', teamsRouter);

router.use('/comments', commentsRouter);

router.use('/projects', projectsRouter);

module.exports = router;
