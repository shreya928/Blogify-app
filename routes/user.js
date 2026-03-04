const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware");
const Blog = require("../models/blog");

// SIGNUP FORM
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// SIGNUP USER
router.post("/signup", async (req, res, next) => {
  console.log("SIGNUP ROUTE HIT");

  try {
      const { username, email, password } = req.body;

      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);

      req.login(registeredUser, (err) => {
          if (err) return next(err);

          req.flash("success", "Welcome to Blogify");
          return res.redirect("/blogs");
      });

  } catch (err) {
      req.flash("error", err.message);
      return res.redirect("/signup");
  }
});


// LOGIN FORM
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// LOGIN USER
router.post("/login",saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), async(req, res) => {
    req.flash("success", "Welcome back to blogify!"); 
    let redirectUrl = res.locals.redirectUrl || "/blogs";
    res.redirect(redirectUrl);
});


// LOGOUT
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "Logged out!");
        res.redirect("/blogs");
    });
});
module.exports = router;
