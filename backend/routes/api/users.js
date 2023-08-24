const express = require('express')
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Team, Project, Issue, Comment } = require('../../db/models');
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
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Please provide a first name with at least 3 characters.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Please provide a first name with no more than 50 characters.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage('Please provide a last name with at least 3 characters.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage('Please provide a last name with no more than 50 characters.'),
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
    const { email, password, username, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword, firstName, lastName });

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


    let user = await User.findByPk(req.user.id, {
      include: {
        model: Team,
        include: {
          model: Project,
          include: {
            model: Issue,
            include: {
              model: Comment,
              include: {
                model: Comment,
                attributes: ['id'],
                as: 'Replies',
              }
            }
          }
        }
      }
    })
    let teams = user.Teams;
    let newTeams = await Promise.all(teams.map(async (team) => {
      let mems = await team.getUsers();
      team = await team.toJSON();
      team.Members = mems;
      delete team.Member;
      return team;
    }))
    return res.json(newTeams);
  }
)

module.exports = router;
