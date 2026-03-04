const express = require("express");
const router = express.Router({ mergeParams: true });
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const middleware = require("../middleware");

// CREATE comment
router.post("/",
     middleware.isLoggedIn,
      middleware.validateComment, 
      async (req, res) => {

    let blog = await Blog.findById(req.params.id);
    let comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    blog.comments.push(comment);
    console.log(req.params);
    console.log(blog);

    await comment.save();
    await blog.save();
    req.flash("success", "Comment added!");
    res.redirect(`/blogs/${blog._id}`);
});

// DELETE comment
router.delete("/:commentId",
     middleware.isLoggedIn, 
     middleware.isCommentAuthor, 
     async (req, res) => {
    const { id, commentId } = req.params;
    await Blog.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash("success", "Comment deleted!");
    res.redirect(`/blogs/${id}`);
});

module.exports = router;
