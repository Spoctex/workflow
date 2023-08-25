const express = require('express');

const { User, Issue, Team, Project, Member, Comment } = require('../../db/models');

const router = express.Router();


router.post('/', async (req, res, next) => {
    const { issueId, comment, posterId, replyOf } = req.body;
    let newComm = await Comment.create({
        issueId,
        comment,
        posterId,
        replyOf
    });
    return res.json(newComm);
});


router.put('/:id', async (req, res, next) => {
    let comm = await Comment.findByPk(req.params.id);
    comm.comment = req.body.comm;
    await comm.save();
    return res.json(comm);
});

router.delete('/:id', async (req, res, next) => {
    let comm = await Comment.findByPk(req.params.id);
    await comm.destroy();
    return res.json({ message: 'Successfully deleted' });
})




module.exports = router;
