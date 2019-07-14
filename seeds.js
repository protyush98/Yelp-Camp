var mongoose=require("mongoose")
var Campground=require("./models/campground");
var comment =require("./models/comment");

var data=[
    {
    name:"luke lake",
    image:"https://www.africanmonarchlodges.com/wp-content/uploads/2016/01/campsite.jpg",
    description:"Placing assured be if removed it besides on. Far shed each high read are men over day. Afraid we praise lively he suffer family estate is. Ample order up in of in ready. Timed blind had now those ought set often which. Or snug dull he show more true wish. No at many deny away miss evil. On in so indeed spirit an mother. Amounted old strictly but marianne admitted. People former is remove remain as."
},

{
    name:"luke lake",
    image:"https://www.roxannereid.co.za/uploads/3/7/7/8/3778676/437398_orig.jpg",
    description:"Placing assured be if removed it besides on. Far shed each high read are men over day. Afraid we praise lively he suffer family estate is. Ample order up in of in ready. Timed blind had now those ought set often which. Or snug dull he show more true wish. No at many deny away miss evil. On in so indeed spirit an mother. Amounted old strictly but marianne admitted. People former is remove remain as."
},

{
    name:"luke lake",
    image:"https://www.africanmonarchlodges.com/wp-content/uploads/2016/01/campsite.jpg",
    description:"Placing assured be if removed it besides on. Far shed each high read are men over day. Afraid we praise lively he suffer family estate is. Ample order up in of in ready. Timed blind had now those ought set often which. Or snug dull he show more true wish. No at many deny away miss evil. On in so indeed spirit an mother. Amounted old strictly but marianne admitted. People former is remove remain as."
},

{
    name:"luke lake",
    image:"https://www.roxannereid.co.za/uploads/3/7/7/8/3778676/437398_orig.jpg",
    description:"Placing assured be if removed it besides on. Far shed each high read are men over day. Afraid we praise lively he suffer family estate is. Ample order up in of in ready. Timed blind had now those ought set often which. Or snug dull he show more true wish. No at many deny away miss evil. On in so indeed spirit an mother. Amounted old strictly but marianne admitted. People former is remove remain as."
}

]

function seedDB(){

Campground.remove({},function(err){
    if(err){
        console.log(err);
    }
    else
    {
        console.log("removed campground");
        data.forEach(function(seed){
    
    Campground.create(seed,function(err,camp){
        
        if(err){
            console.log(err);
        }
        else{
        console.log("camp added");
        
        comment.create({
            text: "This is a great place but no internet",
            author:"hamer"
        },function(err,comment){
            
            if(err){
                console.log(err);
                
            }
            else
            {
                camp.comment.push(comment._id);
                camp.save();
            }
            
        });
        
        }
    });
    
});
    }
});


    
}

module.exports=seedDB;