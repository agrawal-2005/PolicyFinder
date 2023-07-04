import UserModel from '../models/User.js'
import state_policyModel from '../models/state_policy.js'
import central_policyModel from '../models/central_policy.js'


import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'
const currentDate = new Date();

class UserController {
  static userRegistration = async (req, res) => {
    console.log("user enter for registration");
  //  const { name, email, password} = req.body
 var name = req.body.name;
 var password = req.body.password;
 var password_confirmation = req.body.password;
 var qualification =req.body.qualification;
 var age= req.body.ageNumber;
 var gender = req.body.gender;
 var email = req.body.email;
 var state = req.body.state;
 var occupassion = req.body.occupation;
 var caste = req.body.caste;
 var family_income = req.body.income;  
    var last_active = currentDate;
    const user = await UserModel.findOne({ email: email })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" })
    } else {
      if (name && email && password && password_confirmation ) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const doc = new UserModel({
              person_name: name,
              email: email,
              person_password: hashPassword,
              gender:gender,
              last_active:last_active,
              occupassion:occupassion,
              qualification:qualification,
              income:family_income,
              caste:caste,
              state:state,
              age:age

            })
            await doc.save()
            const saved_user = await UserModel.findOne({ email: email })
            // Generate JWT Token
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })

            res.redirect( `userHomeCenter?token=${token}`);
          } catch (error) {
            console.log(error)
            res.render("index",{ "status": "failed", "message": "Unable to Register" })
          }
        } else {
          res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
        }
      } else {
        res.send({ "status": "failed", "message": "All fields are required" })
      }
    }
  }

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await UserModel.findOne({ email: email })
        
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.person_password)
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            var last_active = currentDate;

            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            await UserModel.findByIdAndUpdate(user._id, { $set: { last_active:last_active  } })

            res.redirect( `userHomeCenter?token=${token}`);
          } else {
            res.render("index",{ "status": "failed", "message": "Unable to login" })
          }
        } else {
          res.render("index",{ "status": "failed", "message": "Unable to Register" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Unable to Login" })
    }
  }

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
      } else {
        const salt = await bcrypt.genSalt(10)
        const newHashPassword = await bcrypt.hash(password, salt)
        await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
        res.send({ "status": "success", "message": "Password changed succesfully" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  }

  static loggedUser = async (req, res) => {
    res.send({ "user": req.user })
  }

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body
    if (email) {
      const user = await UserModel.findOne({ email: email })
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
        const link = `http://127.0.0.1:8000/reset-password/${user._id}/${token}`
        console.log(link)
        // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "PolicyFinder - Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`
        })
        res.render("index",{ "status": "Success", "message": "mail send successfully" })
      } else {
        res.render("index",{ "status": "failed", "message": "Email not exist" })
      }
    } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
    }
  }

  static userPasswordReset1 = async (req, res,next) => {
    const { id, token } = req.params
    const user = await UserModel.findById(id)
    const new_secret = user._id + process.env.JWT_SECRET_KEY
    try {
     const payload= jwt.verify(token, new_secret)
     const email=user.email;
    //  console.log("Email=",email);

        res.render("PasswordReset",{email});
    } catch (error) {
      console.log(error)
    }
  }
  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation ,email} = req.body
    // console.log("Email=",email);
    try {
      const user = await UserModel.findOne({ email: email })

          const salt = await bcrypt.genSalt(10)
          const newHashPassword = await bcrypt.hash(password, salt)
          await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
          res.render("index",{ "status": "success", "message": "Password update successfully" })
       
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
    }
  }
 
  static userHomeDirect=async(req,res)=>{
  
    let result2;
    let result=req.user
    const token = req.query.token;
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

// write algorithm for selecting the policies which fit for user among state Policy given in result2 and update result2







    res.render("userHomecenter.ejs",{result2,result,token});
  }
  static userHomeStateDirect=async(req,res)=>{
    // user.
  //  console.log("waiting for policies");
    let result2;
    let result=req.user
    const token = req.query.token;

    await state_policyModel
      .find({})
      .then((data) => {
        if (!data) {
         console.log("NULL data")
        }
        if (data) {
          result2=data;
          // console.log(data);
        }
      })
      .catch((err) => console.log(err));


// write algorithm for selecting the policies which fit for user among state Policy given in result2 and update result2




    res.render("userHomeState.ejs",{result2,result,token});
  }
  static userProfileDirect=async(req,res)=>{
    const token = req.query.token;
    let user=req.user;
    res.render("profile.ejs",{user,token});
  }
  static userEditDirect=async(req,res)=>{
    const token = req.query.token;
    let user=req.user;
    res.render("edit.ejs",{user,token});
  }
  static userNotificationDirect=async(req,res)=>{
    const token = req.query.token;
    let user=req.user;
    let result,result2;
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
    res.render("notification.ejs",{result,result2,token});
  }
  static userUpdate=async(req,res)=>{
    const token = req.body.token;
    var name = req.body.name;
 
    var qualification =req.body.qualification;
    var age= req.body.ageNumber;
    var gender = req.body.gender;
    var email = req.body.email;
    var state = req.body.state;
    var occupassion = req.body.occupation;
    var caste = req.body.caste;
    var family_income = req.body.income; 
    await UserModel.findByIdAndUpdate(req.user._id, { $set: {  
           person_name: name,
      email: email,
      gender:gender,
      occupassion:occupassion,
      qualification:qualification,
      income:family_income,
      caste:caste,
      state:state,
      age:age } })
let user =req.user;
    
res.redirect( `profile?token=${token}`);
}
}

export default UserController