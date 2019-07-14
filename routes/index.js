var express=require("express");
var router =express.Router({mergeParams: true});
var passport=require("passport");
var user = require("../models/user"); // could be a issue


router.get("/",function(req,res){
    
    res.render("campground/landing");
    // res.send("welcome");
    
    
});



router.get("/register",function(req,res){
    
    res.render("register");
});

router.post("/register",function(req, res) {
   
   var newUser= new user({username:req.body.username});
   user.register(newUser,req.body.password,function(err,user){
       
       if(err){
          console.log(err);
            req.flash("error",err.message);
            // return res.render("register");
            return res.redirect("/register");
       }
       passport.authenticate("local")(req,res,function(){
           req.flash("success","welcome to YelpCamp");
           res.redirect("/campground");
       });
       
   });
    
});

router.get("/login",function(req,res){
    
    res.render("login");

});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/campground",
    failureRedirect: "/login"
}),function(req, res) {
    
});

router.get("/logout", function(req,res){
    
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campground");
    
});

// function isLoggedIn(req,res,next){
    
//     if(req.isAuthenticated()){
        
//         return next();
        
//     }
//     res.redirect("/login");
    
// }


module.exports=router;