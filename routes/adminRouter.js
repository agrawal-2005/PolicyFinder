import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import checkAuth from '../middlewares/userAuth-middleware.js';

// ROute Level Middleware - To Protect Route
router.use('/adminHome',checkAuth);
router.use('/adminView',checkAuth);
router.use('/adminDel',checkAuth);




// Public Routes
router.post('/adminlogin',(req,res,next)=>{
    next();
}, adminController.adminLogin);
router.post('/policy_add',(req,res,next)=>{
    next();
}, adminController.Polcy_addon);
router.post('/delete_policy',(req,res,next)=>{
    next();
}, adminController.delete_policy);



// Protected Routes
router.get('/adminHome',(req,res,next)=>{
    next()    
},adminController.adminHomeDirect);
router.get('/adminView',(req,res,next)=>{
    next()    
},adminController.adminViewDirect);
router.get('/adminDel',(req,res,next)=>{
    next()    
},adminController.adminDelDirect);
export default router