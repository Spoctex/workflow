const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Team, Project, Issue } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  }
);

router.get('/teams',
  requireAuth,
  async (req, res) => {
    let teams = await req.user.getTeams();
    let rtrn = [];
    await Promise.all(teams.map(async (team) => {
      let projs = await team.getProjects();
      let mems = await team.getUsers();
      team = await team.toJSON();
      team.Members = mems;
      let processedProjects = [];
      await Promise.all(projs.map(async (project) => {
        let issues = await project.getIssues();
        project = await project.toJSON();
        project.Issues = issues;
        processedProjects.push(project);
      }))
      team.Projects = processedProjects;
      delete team.Member;
      rtrn.push(team)
    }))
    return res.json(rtrn)
  }
)

module.exports = router;
