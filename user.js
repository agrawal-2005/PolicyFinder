var mysql = require("mysql2")
const express = require("express");
const path = require("path");
const app = express();
const port =4000;
const hbs = require("ejs")
const alert =  require("alert");

const occupation = ["farmer","student","teacher","lawyer","self-employed","government_official"];

   
module.exports = function (con, name, password, qualification, occupassion, ageNumber, gender, email,state,family_income,caste){
    con.connect(function(err) {
        if (err) throw err;
   
      let check =true;
    //    while(check){
        let user_id= Math.floor(Math.random() * 100000);
        let person_id = "user"+user_id;
        let date_time = new Date();
        let date = date_time.toISOString().split('T')[0];
        con.query("SELECT count(*) as counter FROM person where person_id=(?)",[person_id] ,function (err, result, fields) {
                      console.log(result[0]);
            if (err) throw err;
            else if(result[0].counter==0){
               check =false;
               console.log(check);
               console.log("djnckjd");
   
           }});
    //    }
       
            con.query('INSERT INTO person (person_id, age ,person_name, person_password, gender,email,state , occupation , qualification , income, caste, last_active) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?,?)',
             [person_id,ageNumber,name,password, gender,email,state ,occupassion,qualification,family_income,caste,date],(error, 
        results) => {
            if (error)  throw error;
            });
      });
}