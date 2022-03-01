    const express=require('express');
    const { route } = require('../app');

    const router=express.Router();
     
    const { 
            getProducts,newProduct,getSingleProduct,
            updateProducts,deleteProduct,createProductReview,
            getProductReviews,deleteReview
          }
        =require('../controllers/products');

    const {isAuthenticatedUser,authorizationOfRoles}=require('../middleware/authenticateRoutes');
    
    //Get req

    router.route('/products').get(getProducts);//all products being loaded

    router.route('/product/:id').get(isAuthenticatedUser,getSingleProduct);// single product being obtained
    router.route('/reviews').get(isAuthenticatedUser, getProductReviews);//get all reviews of a product

    //PUT req
    router.route('/admin/product/:id').put(isAuthenticatedUser,authorizationOfRoles('admin'),updateProducts); //update product 
    router.route('/admin/product/:id').put(isAuthenticatedUser,authorizationOfRoles('admin'),updateProducts).delete(isAuthenticatedUser,deleteProduct); //delete product
    router.route('/review').put(isAuthenticatedUser,createProductReview);
    //Post req

    router.route('/admin/product/new').post(isAuthenticatedUser,authorizationOfRoles('admin'),newProduct);// new product being added
    //Delete req
    router.route('/reviews/delete').delete(isAuthenticatedUser, deleteReview)
    module.exports=router;

