let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");
/* if url = /api/post/(postID)?action="like&?user="(userID)"
    then it will add that users ID to the like array of the post ID 
    and if action = unlike then it will pull the users ID from the array */
router.get("/", (req, res) => {
  Controllers.postController.getPosts(res);
});

router.post("/create", (req, res) => {
  Controllers.postController.createPost(req.body, res);
});

router.put("/:id", (req, res) => {
  const action = req.query.action;
    /* if url = /api/post/(postID)?action=like then it will add 
    that users ID in the req body to the like array of the post ID 
    and if action = unlike then it will pull the users ID in the 
    req body from the array. and if it has the action comment then
    it will take the req body and add it to the comment array of the post ID.
    if no action is selected then it will just regualary update the post*/
  if (action == "like") {
    Controllers.postController.like(req, res);
  } else if (action == "unlike") {
    Controllers.postController.unlike(req, res);
  } else if (action == "comment") {
    Controllers.postController.addComment(req, res)
  } else {
    Controllers.postController.updatePost(req, res);
  }
});
router.delete("/:id", (req, res) => {
  Controllers.postController.deletePost(req, res);
});

module.exports = router;
