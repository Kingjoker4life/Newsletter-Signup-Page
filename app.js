// const express = require("express");
// const bodyParser = require("body-parser");
// const request = require("request");
// const app = express();
// const client = require("@mailchimp/mailchimp_marketing");
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));
// app.get("/", function (req, res) {
//     res.sendFile(__dirname+"/signup.html")
// })
// client.setConfig({apiKey: "288fb433f751848fa569d158a7ee76b2-us21",  
// server: "us21"});
// //post method for input fields
// app.post("/", function (req, res) {
//     var firstName = req.body.fName;
//     var lastName = req.body.lName;
//     var email = req.body.email;

//    console.log(firstName, lastName, email);
// //enter list ID
//     const listId = "2fdb4c478c";
// //Creating an object with the users data
//     const subscribingUser = {
//         firstName: firstName, 
//         lastName: lastName,
//          email: email
//         };
// //Uploading the data to the server
// async function run() {
//     const response = await client.lists.addListMember(listId, {
//       email_address: subscribingUser.email,
//       status: "subscribed",
//       merge_fields: {
//           FNAME: subscribingUser.firstName,
//           LNAME: subscribingUser.lastName
//       }
//     });
//     console.log(response); // (optional) 
//     res.sendFile(__dirname + "/success.html")
//     console.log(
//    `Successfully added contact as an audience member. The contact's id is ${
//     response.id
//     }.`);
//   };
// })
// app.listen("3000",function(){
//     console.log("server is running at port 3000")});
// // //If all goes well logging the contact's id
// // res.sendFile(__dirname + "/success.html")
// // console.log(
// // `Successfully added contact as an audience member. The contact's id is ${
// // response.id
// // }.`
// // );
// // app.listen("3000",function(){
// //     console.log("server is running at port 3000");

// // // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
// // run().catch(e => res.sendFile(__dirname + "/failure.html"));
// // });

// //API Key
// //288fb433f751848fa569d158a7ee76b2-us21

// //list id
// //2fdb4c478c.


//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
//Creating a dotenv config to hide the API key
require('dotenv').config();

const app = express();
//Using body-parser
app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS
app.use("/public",express.static(__dirname+"/public"));
//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});
app.post("/failure", function (req, res) {
    res.redirect("/");
});
//Setting up MailChimp
mailchimp.setConfig({
//*****************************ENTER YOUR API KEY HERE******************************
 apiKey: process.env.API_KEY,
//*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
 server: "us21"
});
//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {
//*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
//*****************************ENTER YOU LIST ID HERE******************************
const listId = "2fdb4c478c";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: lastName,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});

//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
    `Successfully added contact as an audience member. The contact's id is ${
      response.id
    }.`
  );
}

//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});