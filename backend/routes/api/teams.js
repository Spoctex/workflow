const express = require('express');
const {welcomeIssues} = require('./welcomeData')

const { User, Issue, Team, Project, Member } = require('../../db/models');

const router = express.Router();


router.post('/', async (req, res, next) => {
    console.log(req.body)
    let newTeam = await Team.create({
        name: req.body.name,
        ownerId: req.user.id
    });
    let newProj = await newTeam.createProject({
        name: 'Global',
        leadId: req.user.id
    });
    welcomeIssues.map(async (iss) => {
        await newProj.createIssue({ ...iss, creatorId: req.user.id });
    });
    await Member.create({
        userId: req.user.id,
        teamId: newTeam.id
    })
    let teamFormd = await Team.findByPk(newTeam.id, {
        include: {
            model: Project,
            include: Issue
        }
    });
    teamFormd = await teamFormd.toJSON();
    teamFormd.Members = [{
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        username: req.user.username
    }];
    console.log(teamFormd)
    return res.json(teamFormd);
})

router.put(`/:teamId`, async (req, res, next) => {
    let team = await Team.findByPk(req.body.id);
    team.name = req.body.name;
    await team.save();
    return res.json(team);
})

router.delete('/:teamId', async(req,res,next)=>{
    let team = await Team.findByPk(req.params.teamId);
    await team.destroy();
    return res.json({message:'Team deleted'});
})




module.exports = router;
