const express=require('express');//importing express js
const router=express.Router();

const {
    createNewOrder,getOrderDetails,myOrders,
    getAllOrders,updateDeliveryStatus,updateStock,
    deleteOrder,updateOrder
}=require('../controllers/orders');//getting order method invoked

const {isAuthenticatedUser,authorizationOfRoles}=require('../middleware/authenticateRoutes');//getting authorization for routing

//Routing the routes 
//get req
router.route('/order/new').post(isAuthenticatedUser,createNewOrder);
router.route('/order/:id').get(isAuthenticatedUser,getOrderDetails);
router.route('/orders/me').get(isAuthenticatedUser,myOrders);
router.route('/admin/orders').get(isAuthenticatedUser, authorizationOfRoles('admin'), getAllOrders);

//put req
router.route('/admin/order/process/:id').put(isAuthenticatedUser,authorizationOfRoles('admin'),updateDeliveryStatus);

//delete req
router.route('/admin/order/:id').delete(isAuthenticatedUser, authorizationOfRoles('admin'), deleteOrder);




//export the module

module.exports=router;