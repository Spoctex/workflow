const express = require('express')
const { User, Team, Project, Issue } = require('../../db/models');

const router = express.Router();


router.post('/', async (req, res, next) => {
    let newProj = await Project.create({
        teamId: req.body.teamId,
        name: req.body.name,
        description: req.body.description,
        leadId: req.user.id
    });
    return res.json(newProj);
});

router.put('/:projId', async(req,res,next)=>{
    let proj = await Project.findByPk(req.body.id);
    proj.name = req.body.name;
    proj.description = req.body.description;
    await proj.save();
    return res.json(proj);
});

router.delete('/:projId', async(req,res,next)=>{
    let proj = await Project.findByPk(req.params.projId);
    await proj.destroy();
    return res.json({message: 'Successfully destroyed'});
})




module.exports = router;
