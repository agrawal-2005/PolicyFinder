import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import checkAuth from '../middlewares/userAuth-middleware.js';

// ROute Level Middleware - To Protect Route
router.use('/changepassword', checkUserAuth)
router.use('/loggeduser', checkUserAuth)
router.use('/userHomeCenter',checkAuth);
router.use('/userHomeState',checkAuth);
router.use('/profile',checkAuth);
router.use('/edit',checkAuth);
router.use('/update',checkAuth);
router.use('/notification',checkAuth);




// Public Routes
router.post('/register',(req,res,next)=>{
    next();
}, UserController.userRegistration)

router.post('/userlogin',(req,res,next)=>{
    next();
}, UserController.userLogin);

router.get('/index',(req,res)=>{
    res.render("index.ejs");
});


// Protected Routes
router.post('/changepassword', UserController.changeUserPassword)
router.get('/loggeduser', UserController.loggedUser)
router.get('/userHomeCenter',(req,res,next)=>{
    next()    
},UserController.userHomeDirect);
router.post('/update',(req,res,next)=>{
    next()    
},UserController.userUpdate);

router.get('/notification',(req,res,next)=>{
    next()    
},UserController.userNotificationDirect);


router.get('/userHomeState',(req,res,next)=>{
    next()    
},UserController.userHomeStateDirect);
router.get('/profile',(req,res,next)=>{
    next()    
},UserController.userProfileDirect);
router.get('/edit',(req,res,next)=>{
    next()    
},UserController.userEditDirect);

export default router