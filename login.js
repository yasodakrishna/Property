var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_zn69xqhf:pplo9p5dcjqn6i3l0cdeiov71v@ds259250.mlab.com:59250/heroku_zn69xqhf";
//"mongodb://krishnamongo:k9550793089@ds153460.mlab.com:53460/property";
var money = require("money-math");
var autoIncrement = require("mongodb-autoincrement");
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Validate User
exports.UserValidate=function(req, res){
    var input = req.body;
    mongoose.connect(url, function(err, db){ 
                var dbo = db.db("property");
                var query = { Email : input.Email , Password : input.Password };
                dbo.collection('CLC_User').find(query).toArray(function(err,result){
                    if (err) throw err;
                    console.log('Went to find query');
                    console.log(result.length);
                    if(result.length == 1){
                        res.json({status : 'success', message : 'OK', result : result});
                    }
                    else{
                        res.json({status : 'error', message : 'Username Or Password Incorrect', result : null});
                    }
                })
            })
        }

// User Registration
exports.signUp = function(req, res){
    var input = req.body; 
    console.log('input is:'); 
    console.log(input);
    mongoose.connect(url, function(err, db){ 
                var dbo = db.db("property");
                var collectionName="CLC_User";
                autoIncrement.getNextSequence(dbo, collectionName,"UserID", function (err, autoIndex) {
                var query = { 
                    UserID:autoIndex,
                    Email : input.Email ,
                    Password : input.Password,
                    UserType: input.UserType,
                    UserProfileImage: input.UserProfileImage};
                dbo.collection(collectionName).insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                  });
                });
            });
        }

// Update User Details
exports.UpdateUserDetails = function(req, res){
            var input = req.body;
            MongoClient.connect(url, function(err, db){ 
                  var dbo = db.db("property");
                  var email = { Email : input.Email };
                   var newValues = { $set: {Email : input.Email , Password : input.Password,UserType: input.UserType,
                    UserProfileImage: input.UserProfileImage } };
                  dbo.collection("CLC_User").updateOne(email, newValues, function(err, res) {
                    if (err) throw err;
                    console.log(input.Email);
                    console.log("User Details Updated Successfully !!");
                    db.close();
                  });
            });
}


//Get Employee Details
exports.DeleteRecord = function(req, res){
    console.log("Hi");
    console.log(req);
    var input = req.body;
    
    MongoClient.connect(url, function(err, db){ 
    var dbo = db.db("EmployeeDetails"); 
    var myQuery = { EmpNo: input.EmpNo};           
        dbo.collection("mycollection").deleteOne(myQuery,function(err, result) {
            if (err) throw err;
            console.log(myQuery)
            console.log("Successfully Deleted");
            res.json({status : 'Successfully Deleted', message : 'OK', result : result});
            db.close();
          });                
    });
}
//==============================Property Region=================================
//create PropertyList
exports.CreateProperty = function(req, res){
    var input = req.body;      
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("property");
                var collectionName="CLC_property";
                autoIncrement.getNextSequence(dbo, collectionName,"PropertyId", function (err, autoIndex) {
                var query = { 
                    PropertyId : autoIndex,
                    Property_Type : input.Property_Type,
                    BHKType : input.BHKType,
                    Location: input.Location,
                    Zip: Number(input.Zip),
                    Photos:input.Photos,
                    Price:input.Price,
                    Property_Status:input.Property_Status,
                    Possession:input.Possession,
                    Age_of_Property:input.Age_of_Property,
                    ListedBy:input.ListedBy,
                    Aminities:input.Aminities,
                    Facilities:input.Facilities,
                    Bathrooms:Number(input.Bathrooms),
                    Facing:input.Facing,
                    Parking:Number(input.Parking),
                    BuildUp_Area:Number(input.BuildUp_Area),
                    Floor_Type:input.Floor_Type,
                    Balconies:Number(input.Balconies),
                    Property_Description:input.PropertyDescription};
                dbo.collection(collectionName).insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                  });
                });
            });
        }


//Update PropertyList
exports.UpdateProperty = function(req, res){
    console.log('went into update')
    var input = req.body;      
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("property");
                var Propertyidval={ UserID: input.UserID };
                console.log('userid is ' );
                console.log(Propertyidval);
                var query = { $set: { 
                    Property_Type : input.Property_Type,
                    BHKType : input.BHKType,
                    Location: input.Location,
                    Zip: Number(input.Zip),
                    Photos:input.Photos,
                    Price:money.Price(input.Price),
                    Property_Status:input.Property_Status,
                    Possession:input.Possession,
                    Age_of_Property:input.Age_of_Property,
                    ListedBy:input.ListedBy,
                    Aminities:input.Aminities,
                    Facilities:input.Facilities,
                    Bathrooms:Number(input.Bathrooms),
                    Facing:input.Facing,
                    Parking:Number(input.Parking),
                    BuildUp_Area:Number(input.BuildUp_Area),
                    Floor_Type:input.Floor_Type,
                    Balconies:Number(input.Balconies),
                    Property_Description:input.PropertyDescription}};
                dbo.collection("CLC_property").updateOne(Propertyidval,query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document Updated");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                  });
            });
        }


//GetBookingPropertyList
exports.GetBookingProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("property");
           var newValues = {Buyerid : input.Buyerid};
          dbo.collection("CLC_property").find(newValues, function(err, res) {
            if (err) throw err;
            console.log("Got one record Successfully !!");
            db.close();
          });
    });
}

//Get PropertyList
exports.GetProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("property");
          //var email = { Email : input.Email };
           var newValues = { Location : input.Location , Property_Type : input.Property_Type,BHKType: input.BHKType};
          dbo.collection('CLC_property').find(newValues).toArray(function(err,result){
            if (err) throw err;
            console.log(result.length);
            if(result.length == 1){
                res.json({status : 'success', message : 'Records found', result : result});
            }
            else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
        })
    });
}

//GetSelling PropertyList
exports.GetSellingProperty = function(req, res){
    var input = req.body;
    MongoClient.connect(url, function(err, db){ 
          var dbo = db.db("property");
           var newValues = {UserID: input.UserID};
        //   dbo.collection("CLC_property").findOne( newValues, function(err, res) {
        //     if (err) throw err;
        //     console.log("Got the Selling property details");
        //     db.close();
        //   });
          dbo.collection('CLC_property').find(newValues).toArray(function(err,result){
            if (err) throw err;
            console.log(result.length);
            if(result.length == 1){
                res.json({status : 'success', message : 'Records found', result : result});
            }
            else{
                res.json({status : 'error', message : 'No records found', result : null});
            }
        })
    });
}
//==============================Property Region End=================================

//Sechdule Appointment
exports.SechduleAppointment = function(req, res){
    var input = req.body;      
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("property");
                var query = { Date : input.Date , Time : input.Time,BuyerDetails: input.BuyerDetails};
                dbo.collection("CLC_Appointments").insertOne(query, function(err, result) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    res.json({status : 'success', message : 'OK', result : input});
                    db.close();
                  });
            });
        }

//Accept Appointment
exports.AcceptAppointment = function(req, res){
    var input = req.body;      
            MongoClient.connect(url, function(err, db){ 
                var dbo = db.db("property");                
                var value=input.Acceptappointment
                if(value !=null){
                    var query = { Acceptappointment: input.Acceptappointment};
                    dbo.collection("CLC_Appointments").insertOne(query, function(err, result) {
                        if (err) throw err;
                        console.log("Accept document inserted");
                        res.json({status : 'success', message : 'OK', result : input});
                        db.close();
                      });
                }
                else{
                    var query = { $set: { Acceptappointment: input.Acceptappointment}};
                    dbo.collection("CLC_Appointments").updateOne(query, function(err, result) {
                        if (err) throw err;
                        console.log("Accept document inserted");
                        res.json({status : 'success', message : 'OK', result : input});
                        db.close();
                      });
                }
          
            });
        }

        //Cancel Appointment
        exports.CancelAppointment = function(req, res){
            var input = req.body;      
                    MongoClient.connect(url, function(err, db){ 
                        var dbo = db.db("property");
                        var query = { Cancelappointment: input.Cancelappointment};
                        dbo.collection("CLC_Appointments").insertOne(query, function(err, result) {
                            if (err) throw err;
                            console.log("Cancel document inserted");
                            res.json({status : 'success', message : 'OK', result : input});
                            db.close();
                          });
                    });
                }
//=========================Appointment Region End=============================

//TODO:Tracking Buyer and Agents




function loginValidation(input, callback){
    var errorMessage = "";
    console.log(Object.keys(input));
    if (Object.keys(input).length == 0){
        errorMessage = "Parameters missing";
    }else{
        if(input.EmpNo == '' || input.EmpNo == null){
            errorMessage = "Missing Employee Num";
        }else if(input.EmpName == '' || input.EmpName == null){
             errorMessage = 'Missing EmpName';
        }
    }
    callback(errorMessage);
}


