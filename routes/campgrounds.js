var express=require("express");
var router =express.Router({mergeParams: true});
var campground=require("../models/campground");
var middleware=require("../middleware/index.js"); 


router.get("/",function(req,res){
    
    campground.find({},function(err,campground){
        if(!err){
        res.render("campground/campground",{camps:campground, currentUser: req.user});
        }
        else
        console.log(err);
    });
    
    
    
    
});

router.post("/",middleware.isLoggedIn,function(req,res){
    
    var name=req.body.name;
    var image=req.body.image;
    var price=req.body.price;
    var description=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    
    var newCampGround={
        name:name,
        image:image,
        description:description,
        price:price,
        author:author
    };
    // camps.push(newCampGround);
    // var campground = mongoose.model("Campground",campgroundSchema);
 campground.create(newCampGround,function(err,campground){
    if(err){
        console.log("Something went  wrong");
    }
    else{
        console.log("Added");
        console.log(campground);
    } 
 });

    res.redirect("/campground");
});

router.get("/new",middleware.isLoggedIn,function(req,res){
    
    res.render("campground/new");
    
    
});

router.get("/:id",function(req,res){
    
    // campground.findById(req.params.id,function(err,campw){
        
    //     if(err){
    //       console.log(err); 
    //     }
    //     else
    //         console.log(campw);
        
    // });
    
   campground.findById(req.params.id).populate("comment").exec(function(err,foundCampground){
       
       if(err){
           console.log(err);
           
       }
       else{
        //   console.log(foundCampground);
            res.render("campground/show",{campground:foundCampground});       
       }
       
   });
   
});
   
   router.get("/:id/edit",middleware.checkAuthentication,function(req, res) {
       
    //   if(req.isAuthenticated()){
                 
          campground.findById(req.params.id,function(err,foundCampground){
          
        //   if(err){
            //   res.redirect("/campgrounds");
        //   }
        //   else{
              
            //   if(foundCampground.author.id.equals(req.user._id)){
                  
                  res.render("campground/edit",{campground:foundCampground});
                  
            //   }
            //   else
            //   {
                //   res.send("you do not have the permission to do that");
            //   }
        //   }
          
      });
      
           
    //   }
    //   else{
        //   res.send("You need to login for that");
    //   }
      
      
       
   });
   
   router.put("/:id",middleware.checkAuthentication,function(req,res){
       console.log("in put");
       campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err, updateCampground) {
           if(err){
               
               res.redirect("/camground");
           }
           else
           {
               res.redirect("/campground//"+updateCampground._id);
           }
           
       });
       
   }); 
   
router.delete("/:id",middleware.checkAuthentication,function(req,res){
    
    campground.findByIdAndRemove(req.params.id,function(err){
        
        if(err){
            
            console.log(err);
        }
        res.redirect("/campground");
    });
    
});

// function isLoggedIn(req,res,next){
    
//     if(req.isAuthenticated()){
        
//         return next();
        
//     }
//     res.redirect("/login");
    
// }

// function checkAuthentication(req,res,next){
    
//     if(req.isAuthenticated()){
                 
//           campground.findById(req.params.id,function(err,foundCampground){
          
//           if(err){
//               res.redirect("back");
//           }
//           else{
              
//               if(foundCampground.author.id.equals(req.user._id)){
                  
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