const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import checkAuth from '../middlewares/userAuth-middleware.js';
import express from 'express';

router.use('/userHomeCenter',checkAuth);

router.get('/',(req,res)=>{
    res.render("index.ejs");
});
router.get('/index',(req,res)=>{
    res.render("index.ejs");
});
router.get('/userLogin',(req,res)=>{
    res.render("userLogin.ejs");
});
router.get('/adminLogin',(req,res)=>{
    res.render("adminLogin.ejs");
});
router.get('/register',(req,res)=>{
    res.render("register.ejs");
});

router.get("/adminDel",(req,res)=>{
    res.render("adminDel.ejs");
})
router.get("/forgotPassword",(req,res)=>{
    res.render("forgotPassword.ejs");
})
router.get("/PasswordReset",(req,res)=>{
    res.render("PasswordReset.ejs");
})
router.post('/confirmPassword', UserController.userPasswordReset)

router.get('/reset-password/:id/:token', UserController.userPasswordReset1)


router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset1)
export default router