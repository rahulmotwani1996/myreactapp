var express = require('express');
var app = express();
var myParser = require("body-parser");
var mongo = require('mongoose');
var cors = require('cors');
app.use(cors());

app.use(myParser.json());
app.use(express.static(__dirname));


app.get('/', function(req, res) {
    console.log("success");
    res.sendFile(path.join(__dirname + './myapprepo-master/myapprepo-master/dist/my-app/index.html'));
});


var uri = "mongodb+srv://rahul123:rahul1212@devcluster-f4dmv.mongodb.net/test?retryWrites=true&w=majority";
mongo.connect(uri);
var db = mongo.connection;
var schema = mongo.Schema({
    username : String,
    food : Number,
    atmosphere : Number,
    cleanliness : Number,
    service : Number,
    valueForMoney : Number,
    overall:Number,
    suggestion : String,
    promocode : String,
    amt:String,
    date :{type:Date , default : Date.now}
});
var FeedBack = mongo.model("FeedBack",schema);

db.on("error",(err)=>{
    console.log(err);
}) ;

db.once("open",()=>{
    console.log("Connection established");
}
);
/***************************************************************************************************/
//code to generate promocode
function getPromoCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };

    var tmp = FeedBack.find({promocode:result}).limit(1).size();
    if(tmp ==1)
        getPromoCode(7);
    else
        return result;
}


/****************************************************************************/
//code for posting single feedbacks taken from user to the database

app.post('/postFeedback', (req,res)=>{
    var fb = req.body;

    //code to generate promocode
function getPromoCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    };

    var tmp = FeedBack.find({promocode:result}).limit(1).size();
    if(tmp ==1)
        getPromoCode(7);
    else
        return result;
    };

    //end of promocode generation

    var newFeedback = new FeedBack();
    newFeedback.username = fb.username;
    newFeedback.food = fb.ratings.food;
    newFeedback.cleanliness = fb.ratings.Cleanliness;
    newFeedback.service = fb.ratings.Service;
    newFeedback.atmosphere = fb.ratings.Atmosphere;
    newFeedback.valueForMoney = fb.ratings.ValueForMoney;
    newFeedback.overall = fb.ratings.Overall;
    newFeedback.suggestion = fb.suggestion;
    newFeedback.promocode = getPromoCode(7);
    newFeedback.amt = fb.amt ;
    // newFeedback.date = Date.now
    
    
    newFeedback.save(function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("New feedback added by "+newFeedback.username);
            res.json({promo:newFeedback.promocode});
            
        }
    })
    
});

/***********************************************************************************/
//code to fetch all the feedbacks from the database
// the output of this will be an array of javascript objects which contain all the feedbacks 

app.get('/getAllFeedbacks',(req,resp)=>{
 
   // FeedBack.find({},{"sort":[['date','desc']]},function(err,result){
       FeedBack.find().sort('-date').exec(function(err,result){
       
      
        resp.json(result);
        })
    
    
});

/*************************************************************************************/
//code to get average ratings as a single javascript object

app.get('/avgRating' , (req,res)=>{

    var temp ={
        counter:Number,
        food : Number,
        atmosphere : Number,
        cleanliness : Number,
        service : Number,
        valueForMoney : Number,
        overall:Number,
        count : Number
    };
    temp.counter = 0;
    FeedBack.aggregate([{$group :{_id : 1,avgFoodRating : {$avg : "$food"}}}],function(err,result){
        if (err){
            //code to show error message
        }else{
          temp.food=result[0].avgFoodRating; 
          temp.counter++;
          if(temp.counter==7)
            res.json(temp);
        }
    });
    
    //average cleanliness rating
    FeedBack.aggregate([{$group :{_id : 2,avgCleanlinessRating : {$avg : "$cleanliness"}}}],function(err,result){
        if (err){
            //code to show error message
        }else{
            temp.cleanliness=result[0].avgCleanlinessRating;
            temp.counter++;
            if(temp.counter==7)
            res.json(temp);
            
        }
    });
    
    //average atmosphere rating
    FeedBack.aggregate([{$group :{_id : 3,avgAtmosRating : {$avg : "$atmosphere"}}}],function(err,result){
        if (err){
            //code to show error message
        }else{
           temp.atmosphere=result[0].avgAtmosRating;
           temp.counter++;
           if(temp.counter==7)
            res.json(temp);
        }
    });
    
    //average service rating
    FeedBack.aggregate([{$group :{_id :4,avgServiceRating : {$avg :  "$service"}}}],function(err,result){
        if (err){
            //code to show error message
        }else{
            temp.service=result[0].avgServiceRating;
            temp.counter++;
            if(temp.counter==7)
            res.json(temp);
        }
    });
    
    //average valueForMoney rating
    FeedBack.aggregate([{$group :{_id :5 ,avgVFMRating : {$avg : "$valueForMoney"}}}],function(err,result){
        if (err){
            //code to show error message
        }else{
           temp.valueForMoney=result[0].avgVFMRating;
           temp.counter++;
           if(temp.counter==7)
            res.json(temp);
        }
    });

   
    FeedBack.count({"overall":[1,2,3,4,5]}, function(err , count){
        temp.count=count;
        temp.counter++;
        if(temp.counter==7)
            res.json(temp);
    })
    
    
    
    //average overall rating
    FeedBack.aggregate([{$group :{_id : 6,avgOverallRating : {$avg : "$overall"}}}],function(err,result){
        if (err){
            //code to show error message
        }else{
            temp.overall=result[0].avgOverallRating;
            temp.counter++;
            if(temp.counter==7)
            res.json(temp);
        
        }
    });
    
    

});





app.listen(9000 , ()=>{
    console.log('Server Runing at port 9000');
})