const Blog = require("./models/blog");
const Comment = require("./models/comment");
const expressError = require("./utils/expressError");
const { blogSchema, commentSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
        if (req.originalUrl.includes("/comments")) {
            const { id } = req.params;    
            req.session.redirectUrl = `/blogs/${id}`;
        } else {
            req.session.redirectUrl = req.originalUrl;
        }
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};

// Save redirect URL for later use
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
// Check if current user is the blog author
module.exports.isBlogAuthor = async (req, res, next) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog.owner.equals(req.user._id)) {
        req.flash("error", "You are not the author of this blog");
        return res.redirect(`/blogs/${id}`);
    }
    next();
};
// Validate blog form data
module.exports.validateBlog = (req, res, next) => {
    const { error } = blogSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        req.flash("error", msg);
        return res.redirect("/blogs/new");
    }
    next();
};
// Check if current user is the comment author
module.exports.isCommentAuthor = async (req, res, next) => {
    const { commentId, id } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this comment");
        return res.redirect(`/blogs/${id}`);
    }
    next();
};

// Validate comment form data
module.exports.validateComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new expressError(400, msg);
    } else {
        next();
    }
};
