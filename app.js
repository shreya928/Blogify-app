if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const wrapAsync = require("./utils/wrapAsync");
const expressError = require("./utils/expressError");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");
const userRoutes = require("./routes/user");
const mongoUrl = process.env.MONGO_URL;

main()
    .then(()=>{
        console.log("connection successful");
    })
    .catch((err)=>console.log(err));

//MogoDB connection
async function main(){
    await mongoose.connect(mongoUrl);
}
//App setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Session config
app.use(session({
    secret: process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge:7*24*60*60*1000, //time is in milliseconds 
    }
}));
// Flash messages
app.use(flash());

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// HOME ROUTE
app.get("/", (req, res) => {
    res.render("home.ejs");
});
// Make flash messages & current user available in all templates
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Routes
app.use("/", userRoutes); 
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);

app.use((req, res, next) => {
  next(new expressError(404, "Page not found"));
});
//error handler
app.use((err,req,res,next)=>{
    let {statusCode=500, message="Something went wrong"} = err;
    res.status(statusCode).render("error.ejs",{err});
})
//start server
app.listen(8080, ()=>{
    console.log("server running on 8080");
});
