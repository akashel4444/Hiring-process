const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const server = express();

server.use(bodyParser.urlencoded({extended : true}));
server.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/hiring" , {useNewUrlParser : true});
const hiringProcessSchema = {
  company_id : Number ,
  oa : Number,
  interview : Number ,
  description : String
}

const Hire = mongoose.model("Hire" , hiringProcessSchema);
server.route("/hiringprocess")
.get(function(req ,res){
  Hire.find({} , function(err ,foundhire){
    if(!err){
      res.send(foundhire);
    }else {
      res.send(err);
    }
  });
})
.post(function(req , res){

  const newHire = new Hire({
    company_id : req.body.Company_id,
    oa : req.body.NumbersOfOA ,
    interview : req.body.NumberOfInterviews ,
    description : req.body.Description

  });
 newHire.save(function(err){
   if(!err){
     res.send("succesfully saved without err");
   }else {
     res.send("err in posting request");
   }
 })

})
.delete(function(req , res){
  Hire.deleteOne({company_id : req.body.Company_id} , function(err){
    if(!err){
      res.send("succesfully deleted with company id");
    }else {
      res.send("err in deleting");
    }
  });


});

server.listen(3000 , function(){
  console.log("server has been started on server 3000");
});
