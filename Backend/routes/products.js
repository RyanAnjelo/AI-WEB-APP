    const express=require('express');
    const { route } = require('../app');

    const router=express.Router();
     
    const {getProducts,newProduct,getSingleProduct,updateProducts,deleteProduct}=require('../controllers/products')

    const {isAuthenticatedUser,authorizationOfRoles}=require('../middleware/authenticateRoutes');
    
    //Get req

    router.route('/products').get(isAuthenticatedUser,getProducts);//all products being loaded

    router.route('/product/:id').get(getSingleProduct);// single product being obtained

    //PUT req
    router.route('/admin/product/:id').put(isAuthenticatedUser,authorizationOfRoles('admin'),updateProducts); //update product 
    router.route('/admin/product/:id').put(isAuthenticatedUser,authorizationOfRoles('admin'),updateProducts).delete(isAuthenticatedUser,deleteProduct); //delete product
    
    //Post req

    router.route('/admin/product/new').post(isAuthenticatedUser,authorizationOfRoles('admin'),newProduct);// new product being added

    module.exports=router;

