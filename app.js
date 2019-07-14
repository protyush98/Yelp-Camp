var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var methodOverride =require("method-override");
var campground=require("./models/campground");
var passport=require("passport");
var localStrategy = require("passport-local");
var user = require("./models/user");
var comment=require("./models/comment");
var seedDB = require("./seeds");
var flash=require("connect-flash");


app.use(flash());
app.use(methodOverride("_method"));




// mongoose.connect("mongodb://protyush:moinak420@ds115971.mlab.com:15971/yelp_camp");
mongoose.connect("mongodb://localhost:27017/blog_app");
// seedDB();



//passport config
app.use(require("express-session")({

    secret:"I am a good boy",
    resave: false,
    saveUninitialized: false


}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



//  campground.create({
//      name:"kanpur",
//      image:"https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg",
//      description:"This is a camp"
//  },function(err,campground){
//     if(err){
//         console.log("Something went  wrong");
//     }
//     else{
//         console.log("Added");
//         console.log(campground);
//     }
//  });
app.use(function(req,res,next){

    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();

});


app.use(bodyParser.urlencoded({extended:true}));

//routes
var commentRoutes=require("./routes/comments");
var campgroundRoutes=require("./routes/campgrounds");
var indexRoutes=require("./routes/index");
// var path=require("path");


app.use("/campground/:id/comment",commentRoutes);
app.use("/campground",campgroundRoutes);
app.use("/",indexRoutes);





// app.use('/stylesheet', express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname+"/public"));
// console.log(__dirname);
// app.use(express.static("public"));
app.set("view engine","ejs");


    // var camps=[{name:"Barrackpore",image:"http://underonebotswanasky.com/blog/wp-content/uploads/2015/04/photo_26-800x500.jpg"},
    //             {name:"kanpur",image:"https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
    //             {name:"sodepur",image:"https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-246977.jpg"},
    //             {name:"kolkata",image:"https://camptrillium.com/wp-content/uploads/2013/11/COCA-2013-Best-of-Show-Camp-Trillium.jpg"},
    //             {name:"kanpur",image:"https://invinciblengo.org/photos/event/slider/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810.jpg"},
    //             {name:"sodepur",image:"https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-246977.jpg"},
    //             {name:"kolkata",image:"https://camptrillium.com/wp-content/uploads/2013/11/COCA-2013-Best-of-Show-Camp-Trillium.jpg"},

    // ];

// app.get("/",function(req,res){

//     res.render("campground/landing");
//     // res.send("welcome");


// });

// app.get("/campground",function(req,res){

//     campground.find({},function(err,campground){
//         if(!err){
//         res.render("campground/campground",{camps:campground, currentUser: req.user});
//         }
//         else
//         console.log(err);
//     });




// });

// app.post("/campground",function(req,res){

//     var name=req.body.name;
//     var image=req.body.image;
//     var description=req.body.description;
//     var newCampGround={
//         name:name,
//         image:image,
//         description:description
//     };
//     // camps.push(newCampGround);
//     // var campground = mongoose.model("Campground",campgroundSchema);
//  campground.create(newCampGround,function(err,campground){
//     if(err){
//         console.log("Something went  wrong");
//     }
//     else{
//         console.log("Added");
//         console.log(campground);
//     }
//  });

//     res.redirect("/campground");
// });

// app.get("/campground/new",function(req,res){

//     res.render("campground/new");


// });

// app.get("/campground/:id",function(req,res){

//     // campground.findById(req.params.id,function(err,campw){

//     //     if(err){
//     //       console.log(err);
//     //     }
//     //     else
//     //         console.log(campw);

//     // });

//   campground.findById(req.params.id).populate("comment").exec(function(err,foundCampground){

//       if(err){
//           console.log(err);

//       }
//       else{
//         //   console.log(foundCampground);
//             res.render("campground/show",{campground:foundCampground});
//       }

//   });


//     // res.send("Okay");

// });

// app.get("/campground/:id/comment/new",isLoggedIn,function(req, res) {

//   campground.findById(req.params.id,function(err,foundCampground){

//       if(err){
//           console.log(err);

//       }
//       else
//       {
//           res.render("comment/new",{campground:foundCampground});
//       }
//   });


// });


// app.post("/campground/:id/comment",isLoggedIn,function(req,res){
//     console.log("comment post");

//     campground.findById(req.params.id,function(err, foundCampground) {
//         if(err){
//             console.log(err);
//             res.redirect("/campground");
//         }
//         else{

//             comment.create(req.body.comment,function(err,comment){

//                 if(err){
//                     console.log(err);
//                 }
//                 else
//                 {
//                     console.log(comment);
//                     foundCampground.comment.push(comment._id);
//                     foundCampground.save();
//                     res.redirect("/campground/"+foundCampground._id);
//                 }

//             });

//         }

//     });


// });

// app.get("/register",function(req,res){

//     res.render("register");
// });

// app.post("/register",function(req, res) {

//   var newUser= new user({username:req.body.username});
//   user.register(newUser,req.body.password,function(err,user){

//       if(err){
//           console.log(err);
//           return res.render("register");
//       }
//       passport.authenticate("local")(req,res,function(){
//           res.redirect("/campground");
//       });

//   });

// });

// app.get("/login",function(req,res){

//     res.render("login");

// });

// app.post("/login",passport.authenticate("local",{
//     successRedirect: "/campground",
//     failureRedirect: "/login"
// }),function(req, res) {

// });

// app.get("/logout", function(req,res){

//     req.logout();
//     res.redirect("/campground");

// });

// function isLoggedIn(req,res,next){

//     if(req.isAuthenticated()){

//         return next();

//     }
//     res.redirect("/login");

// }




// app.listen(process.env.PORT,process.env.IP,function(){
    // console.log("Server Started");
// });
app.listen(8080,function(){
    console.log("Server Started");
});
