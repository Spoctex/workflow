const express = require('express')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { User, Issue } = require('../../db/models');
const { issueStatus } = require('../../../enumGlobal');

const router = express.Router();

router.get(
    '/:id',
    async (req, res, next) => {
        let iss = await Issue.findByPk(req.params.id);
        if (!iss) {
            let err = new Error('Issue could not be found');
            err.status = 404;
            return next(err);
        }
        return res.json(iss)
    }
);

const validateNewIssue = [
    check('projectId')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a project ID'),
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an issue title'),
    handleValidationErrors
];

router.post('/',
    validateNewIssue,
    async (req, res, next) => {
        const { projectId, title, description, priority, label, assignedId, status } = req.body;
        let iss = await Issue.create({
            creatorId: req.user.id,
            projectId,
            title,
            description,
            assignedId,
            priority,
            label,
            status
        })
        return res.json(iss)
    }
)

router.delete('/:id', async (req, res, next) => {
    let iss = await Issue.findByPk(req.params.id);
    await iss.destroy();
    return res.json({message: 'Successfully destroyed'});
})

router.put('/:id', async (req,res,next) =>{
    let iss = await Issue.findByPk(req.params.id);
    const { projectId, title, description, priority, label, assignedId, status } = req.body;
    iss.title = title;
    iss.projectId = projectId;
    iss.description = description;
    iss.priority =priority;
    iss.label = label;
    iss.status = status;
    iss.assignedId = assignedId;
    await iss.save();
    return res.json(iss);
})



module.exports = router;
