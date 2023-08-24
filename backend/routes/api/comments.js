const express = require('express');

const { User, Issue, Team, Project, Member, Comment } = require('../../db/models');

const router = express.Router();


router.post('/', async(req,res,next)=>{
    const {issueId,comment,posterId,replyOf} = req.body;
    let newComm = await Comment.create({
        issueId,
        comment,
        posterId,
        replyOf
    });
    return res.json(newComm);
});




module.exports = router;
