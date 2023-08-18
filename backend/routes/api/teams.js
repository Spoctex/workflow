const express = require('express');
const {welcomeIssues} = require('./welcomeData');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { User, Issue, Team, Project, Member } = require('../../db/models');
const { issueStatus } = require('../../../enumGlobal');

const router = express.Router();






router.post('/', async (req,res,next)=>{
    console.log(req.body)
    let newTeam = await Team.create({
        name: req.body.name,
        ownerId: req.user.id
    });
    let newProj = await newTeam.createProject({
        name: 'Global',
        leadId: req.user.id
    });
    welcomeIssues.map(async(iss)=>{
        await newProj.createIssue({...iss, creatorId:req.user.id});
    });
    await Member.create({
        userId:req.user.id,
        teamId:newTeam.id
    })
    let teamFormd = await Team.findByPk(newTeam.id,{
        include:{
            model: Project,
            include: Issue
        }
    });
     teamFormd = await teamFormd.toJSON();
     teamFormd.Members = [{
        id:req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        username: req.user.username
     }];
     return res.json(teamFormd);
})




module.exports = router;