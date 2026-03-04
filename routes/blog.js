const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const middleware = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

// INDEX
router.get("/", async (req, res) => {
    const blogs = await Blog.find({});
    res.render("blogs/index", { blogs });
});

// New Form
router.get("/new",  middleware.isLoggedIn,(req, res) => {
    res.render("blogs/new");
});

router.post("/", middleware.isLoggedIn,
     upload.single('blog[image]'),
      middleware.validateBlog,
       wrapAsync(async (req, res) => {
    let blog = new Blog(req.body.blog);

    // if no image uploaded
    if(!req.file){
        blog.image = {
            url: "https://images.unsplash.com/vector-1738590593450-647695dbf9d0?w=600&auto=format&fit=crop&q=60",
            filename: "default.jpg"
        };
    } else {
        // if image uploaded
        blog.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    blog.owner = req.user._id;
    await blog.save();
    req.flash("success", "Successfully created a blog!");
    res.redirect(`/blogs`);
}));


// SHOW ROUTE
router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id)
        .populate({
            path: "comments",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
        if(!blog){
            req.flash("error","blog you requested does not exist");
            res.redirect("/blogs");
        }
        console.log(blog);
    res.render("blogs/show", { blog ,user: req.user});
});

// EDIT FORM route
router.get("/:id/edit",middleware.isLoggedIn, middleware.isBlogAuthor,  async (req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    res.render("blogs/edit", { blog });
});
//UPDATE
router.put("/:id", 
    middleware.isLoggedIn,
     middleware.isBlogAuthor,
     upload.single('blog[image]'), 
     async (req, res) => {
   try {
        const { id } = req.params;

        // Update title and content
        const blog = await Blog.findByIdAndUpdate(id, { ...req.body.blog }, { new: true });

        // Update image if a new file is uploaded
        if(req.file){
            blog.image = { url: req.file.path, filename: req.file.filename };
            await blog.save();
        }

        req.flash("success", "Blog updated successfully!");
        res.redirect(`/blogs/${id}`);
    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong.");
        res.redirect(`/blogs`);
    }
});
//DELETE
router.delete("/:id",middleware.isLoggedIn, middleware.isBlogAuthor, async (req, res) => {
    const { id } = req.params;
    let blog = await Blog.findByIdAndDelete(id);
    console.log(blog);
    req.flash("success", "Blog deleted successfully!");
    res.redirect("/blogs");
});

module.exports = router;
