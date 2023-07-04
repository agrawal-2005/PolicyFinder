import adminModel from '../models/admin.js'
import state_policyModel from '../models/state_policy.js'
import central_policyModel from '../models/central_policy.js'


import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'
const currentDate = new Date();

class adminController {
    static Polcy_addon = async (req, res) => {
        const token=req.body.token;
        var name = req.body.name;
        var qualification =req.body.qualification;
        var ageNumber= req.body.ageNumber;
        var gender = req.body.gender;
        var state = req.body.state;
        var occupassion = req.body.occupation;
        var caste = req.body.caste;
        var family_income = req.body.income;
        var region =  req.body.Region;
        var policy_category =  req.body.policy_category;
        var link = req.body.link;
        var details =req.body.details;
      
        var dt = currentDate;
        if(region==="Center"){
        
              try {
                const doc = new central_policyModel({
                  policy_name: name,
                  date_added: dt,
                  policy_category: policy_category,
                  gender:gender,
                  occupassion:occupassion,
                  qualification:qualification,
                  income:family_income,
                  caste:caste,
                  age:ageNumber,
                  details:details,
                  policy_link:link
    
                })
                await doc.save()
                // Generate JWT Token
    
              } catch (error) {
                console.log(error)
                res.send({ "status": "failed", "message": "Unable to Register Central_policy" })
              }
            }
          
            else{
                try {
                const doc = new state_policyModel({
                    policy_name: name,
                    date_added: dt,
                    policy_category: policy_category,
                    gender:gender,
                    occupassion:occupassion,
                    qualification:qualification,
                    income:family_income,
                    caste:caste,
                    state:state,
                    age:ageNumber,
                    details:details,
                    policy_link:link
      
                  })
                  await doc.save()
                  
              } catch (error) {
                console.log(error)
                res.send({ "status": "failed", "message": "Unable to Register state Policy" })
              }

            }
            res.redirect( `adminHome?token=${token}`);

      }
    
  static adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await adminModel.findOne({ email: email })
        
        if (user != null) {
        //   const isMatch = await bcrypt.compare(password, user.person_password)
          if ((user.email === email) && password===user.password) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })

            res.redirect( `adminHome?token=${token}`);
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.send({ "status": "failed", "message": "You are not a Registered User" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Unable to Login" })
    }
  }

 
 
 
  static adminHomeDirect=async(req,res)=>{
  
    let result;
    const token = req.query.token;
    await state_policyModel
      .find({})
      .then((data) => {
        if (!data) {
         console.log("NULL data")
        }
        if (data) {
          result=data;
        }
      })
      .catch((err) => console.log(err));
    res.render("adminHome.ejs",{result,token});

  }
  static adminDelDirect=async(req,res)=>{
  
    let result,result2;
    const token = req.query.token;
   
    res.render("adminDel.ejs",{token});
  }
  static delete_policy=async(req,res)=>{
  
    let result,result2;
    const token = req.query.token;
const region= req.body.region;
const policy_id =req.body.policy_id

if(region=="Centre"){
    central_policyModel.deleteOne({ policy_id: policy_id }, (err) => {
        if (err) {
          console.error(err);
          // Handle error
        } else {
          // Deletion successful
          console.log('Data deleted successfully.');
        }
      });
    }
    else{
      state_policyModel.deleteOne({ policy_id: policy_id }, (err) => {
        if (err) {
          console.error(err);
          // Handle error
        } else {
          // Deletion successful
          console.log('Data deleted successfully.');
        }
      });
    }
    res.render("adminDel.ejs",{token});
  }

  static adminViewDirect=async(req,res)=>{
  
    let result,result2;
    const token = req.query.token;
    await state_policyModel
      .find({})
      .then((data) => {
        if (!data) {
         console.log("NULL data")
        }
        if (data) {
          result=data;
        }
      })
      .catch((err) => console.log(err));
      await central_policyModel
      .find({})
      .then((data) => {
        if (!data) {
         console.log("NULL data")
        }
        if (data) {
          result2=data;
        }
      })
      .catch((err) => console.log(err));
              res.render("adminView.ejs",{result,result2,token});
  }

  
}

export default adminController