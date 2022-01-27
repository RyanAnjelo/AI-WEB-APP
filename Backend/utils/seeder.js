const Product = require('../models/product');
const dotenv=require('dotenv');
const connectDatabase=require('../config/db');

const products=require('../data/product');

const { connect } = require('mongoose');

dotenv.config({path:'Backend/config/config.env'})

connectDatabase();

const seedProducts = async () =>{
    try {
         await Product.deleteMany();
         console.log('Products being deleted');

         await Product.insertMany(products);
         console.log('Products being added');
         process.exit();
        
    } catch (error) {
        console.log(error.message);
        process.exit;
    }
}

seedProducts();