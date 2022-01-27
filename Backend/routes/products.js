    const express=require('express');
    const { route } = require('../app');

    const router=express.Router();

    const {getProducts,newProduct,getSingleProduct,updateProducts,deleteProduct}=require('../controllers/products')

    //Get req

    router.route('/products').get(getProducts);//all products being loaded

    router.route('/product/:id').get(getSingleProduct);// single product being obtained

    //PUT req
    router.route('/admin/product/:id').put(updateProducts); //update product 
    router.route('/admin/product/:id').put(updateProducts).delete(deleteProduct); //delete product
    
    //Post req

    router.route('/admin/product/new').post(newProduct);// new product being added



    module.exports=router;

