const express=require('express');
const router=express.Router();
// Importing modules

const {
    registerUser,loginUser,logout, forgotPassword,
    resetPassword, getUserProfile,updatePassword,
    updateProfile,getAllUsers,getUserDetials
    }=require('../controllers/authentication');

const {isAuthenticatedUser,authorizationOfRoles}=require('../middleware/authenticateRoutes');

//Establsihing routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/profile').get(isAuthenticatedUser,getUserProfile);
router.route('/password/update').put(isAuthenticatedUser,updatePassword);
router.route('/profile/update').put(isAuthenticatedUser,updateProfile);
router.route('/admin/getAllUsers').get(isAuthenticatedUser,authorizationOfRoles('admin'),getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizationOfRoles('admin'),getUserDetials);


module.exports=router;
