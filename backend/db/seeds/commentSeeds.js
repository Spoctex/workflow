const { issueAmount } = require("./issueSeeds");

const baseComments = JSON.parse(`[
    {
      "posterId": 1,
      "comment": "Great work on resolving this issue! The login page is working smoothly now."
    },
    {
      "posterId": 12,
      "comment": "I like the new UI design improvements. It's much more user-friendly."
    },
    {
      "posterId": 1,
      "comment": "This new feature is fantastic! It really enhances the user experience."
    },
    {
      "posterId": 12,
      "comment": "The documentation updates are very helpful. Thanks for keeping it current!"
    },
    {
      "posterId": 1,
      "comment": "The API calls are much faster now. Great job optimizing performance!"
    },
    {
      "posterId": 12,
      "comment": "I can now register without any issues. Thanks for fixing this problem."
    },
    {
      "posterId": 1,
      "comment": "I appreciate the feedback system. It shows you care about user input."
    },
    {
      "posterId": 12,
      "comment": "The improved search functionality is making my life easier. Thank you!"
    },
    {
      "posterId": 1,
      "comment": "The payment gateway is working flawlessly now. No more payment failures!"
    },
    {
      "posterId": 12,
      "comment": "I love the dark mode feature. It's so much easier on the eyes."
    }
  ]`);


  const replies = JSON.parse(`[
    {
      "posterId": 12,
      "comment": "I agree! The login page issue was a hassle, but it's great to see it fixed."
    },
    {
      "posterId": 1,
      "comment": "Absolutely! The UI improvements have made the app much more appealing."
    },
    {
      "posterId": 12,
      "comment": "I've been waiting for this feature! It's a game-changer."
    },
    {
      "posterId": 1,
      "comment": "The updated documentation is a great resource. Thanks for the effort."
    },
    {
      "posterId": 12,
      "comment": "App performance has improved noticeably. Kudos to the team!"
    },
    {
      "posterId": 1,
      "comment": "I had trouble registering before, but now it's smooth sailing."
    },
    {
      "posterId": 12,
      "comment": "User feedback is crucial for making improvements. Glad to see it implemented."
    },
    {
      "posterId": 1,
      "comment": "Searching for information is now a breeze. Great job on the update!"
    },
    {
      "posterId": 12,
      "comment": "No more payment headaches—excellent news!"
    },
    {
      "posterId": 1,
      "comment": "Dark mode is a fantastic addition. Thanks for making it happen!"
    }
  ]`);


function generateComments (){
    rtrn = []
    // let issAmt = 0;
    // let commTtl = 0;
    for (let i = 1; i <= issueAmount; i++){
        // issAmt++;
        let commentsToAdd = Math.floor(Math.random() * 4);
        // console.log(commentsToAdd, i)
        for (let j = 0; j < commentsToAdd; j++){
            // commTtl++;
            let commToAddIdx = Math.floor(Math.random() * 10);
            // console.log(commToAddIdx)
            let comm = {...baseComments[commToAddIdx]};
            comm.issueId = i;
            rtrn.push(comm);
        }
    }
    const baseCommsAmount = rtrn.length;
    // console.log(baseCommsAmount)
    for (let i = 1; i <= baseCommsAmount; i++){
        let repliesToAdd = Math.floor(Math.random() * 4);
        for (let j = 0; j < repliesToAdd; j++){
            let rplyToAddIdx = Math.floor(Math.random() * 10);
            let rply = {...replies[rplyToAddIdx]};
            rply.replyOf = i;
            rply.issueId = rtrn[i-1].issueId;
            rtrn.push(rply);
        }
    }
    // console.log(issAmt, commTtl)
    return rtrn;
    return [baseCommsAmount];
}

// let comms = generateComments();
// console.log(...comms, comms[0].length)

module.exports = {generateComments}