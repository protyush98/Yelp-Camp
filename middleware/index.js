var campground=require("../models/campground");
var comment=require("../models/comment");

var middlewareObj={};

middlewareObj.checkAuthentication=function(req,res,next){
    
    if(req.isAuthenticated()){
                 
          campground.findById(req.params.id,function(err,foundCampground){
          
          if(err){
              req.flash("error","Campground not found");
              res.redirect("back");
          }
          else{
              
              if(foundCampground.author.id.equals(req.user._id)){
                  
                  next();
                  
              }
              else
              {
                  req.flash("error","You dont have the permission to do that");
                  res.redirect("back");
              }
          }
          
      });
      
           
       }
       else{
           req.flash("error","You need to be logged in");
           res.redirect("back");
       }
};


middlewareObj.checkCommentAuthentication=function(req,res,next){
    
    if(req.isAuthenticated()){
                 
          comment.findById(req.params.comment_id,function(err,foundComment){
          
          if(err){
              res.redirect("back");
          }
          else{
              
              if(foundComment.author.id.equals(req.user._id)){
                  
                  next();
                  
              }
              else
              {
                  res.redirect("back");
              }
          }
          
      });
      
           
       }
       else{
           res.redirect("back");
       }
};

middlewareObj.isLoggedIn=function(req,res,next){
    
    if(req.isAuthenticated()){
        
        return next();
        
    }
    req.flash("error","Please Login first");
    res.redirect("/login");
    
};


module.exports=middlewareObj;