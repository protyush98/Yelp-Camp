var express=require("express");
var router =express.Router({mergeParams: true});
var campground=require("../models/campground");
var comment=require("../models/comment");
var middleware=require("../middleware/index.js"); 

router.get("/new",middleware.isLoggedIn,function(req, res) {
   
   campground.findById(req.params.id,function(err,foundCampground){
      
      if(err){
          console.log(err);
          
      } 
      else
      {
          res.render("comment/new",{campground:foundCampground});
      }
   });
   
   
});

// router.get("/:id/edit",function(req,res){
    
//     res.render("campground/edit");
    
    
    
// });

router.get("/:comment_id/edit",middleware.checkCommentAuthentication, function(req,res){
    
    comment.findById(req.params.comment_id,function(err, foundCampground) {
        if(err){
            res.redirect("back");
        }
        else{
            
            res.render("comment/edit",{campground_id:req.params.id,comment:foundCampground});
            
        }
    });
});
    
router.put("/:comment_id",middleware.checkCommentAuthentication,function(req,res){
    
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,update){
        
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campground/"+req.params.id);
        }
    });
});    
    
    
router.delete("/:comment_id",middleware.checkCommentAuthentication,function(req,res){
    
    console.log("delete route");
    comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else
        {
            req.flash("success","successfuly deleted the comment");
            res.redirect("/campground/"+req.params.id);
        }
    });
});    


router.post("/",middleware.isLoggedIn,function(req,res){
    console.log("comment post");
    
    campground.findById(req.params.id,function(err, foundCampground) {
        if(err){
            console.log(err);
            res.redirect("/campground");
        }
        else{
            
            comment.create(req.body.comment,function(err,comment){
                
                if(err){
                    console.log(err);
                }
                else
                {
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    
                    
                    console.log(comment);
                    foundCampground.comment.push(comment._id);
                    foundCampground.save();
                    req.flash("success","successfuly added the comment");
                    res.redirect("/campground/"+foundCampground._id);
                }
                
            });
            
        }
        
    });
    
    
});


// function checkCommentAuthentication(req,res,next){
    
//     if(req.isAuthenticated()){
                 
//           comment.findById(req.params.comment_id,function(err,foundComment){
          
//           if(err){
//               res.redirect("back");
//           }
//           else{
              
//               if(foundComment.author.id.equals(req.user._id)){
                  
//                   next();
                  
//               }
//               else
//               {
//                   res.redirect("back");
//               }
//           }
          
//       });
      
           
//       }
//       else{
//           res.redirect("back");
//       }
// }


module.exports=router;