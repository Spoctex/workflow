const express = require('express')
const { User, Team, Project, Issue } = require('../../db/models');

const router = express.Router();


router.post('/', async (req, res, next) => {
    console.log(req.body)
    let newProj = await Project.create({
        teamId: req.body.teamId,
        name: req.body.name,
        description: req.body.description,
        leadId: req.user.id
    });
    return res.json(newProj);
})




module.exports = router;
