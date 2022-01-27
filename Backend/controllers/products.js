            
            //Importing modules to be used 
            const product = require('../models/product');
            const Product = require('../models/product');
            const ErrorHandler=require('../utils/errorHandler');
            const catchAysncErrors=require('../middleware/asyncError');
            const APIFeatures=require('../utils/api')
            
            //add new products => /api/v1/admin/product/new
            exports.newProduct = catchAysncErrors( async(req,res,next)=>{
                const product= await Product.create(req.body);//creating product from the data in body
                res.status(201).json({
                    success:true,
                    product
                })//Status code for proceeding

            })

            //get all products => /api/v1/products
                exports.getProducts= catchAysncErrors ( async (req,res,next) =>{
                    const resPerPage=4;
                    const productCount= await Product.countDocuments();
                    const apiFeatures = new APIFeatures(Product.find(), req.query)
                    .search()
                    .filter()
                    .pagination(resPerPage)
                    let products = await apiFeatures.query;
                    let filteredProductsCount = products.length;
                
                    apiFeatures.pagination(resPerPage);
                res.status(200).json({
                    success:true,
                    count:products.length,
                    productCount,
                    products
                })
                })
            // Get single Product data => /api/v1/product/id:
            exports.getSingleProduct= catchAysncErrors ( async(req,res,next) =>{
                const product= await Product.findById(req.params.id);
                if(!product){
                    return next(new ErrorHandler('Product not found',404));

                }
                res.status(200).json({
                    sucess:true,
                    product
                })

            })

        // Update the product => /api/v1/admin/product/:id
        exports.updateProducts= catchAysncErrors ( async (req,res,next) =>{
            let product= await Product.findById(req.params.id);

            if(!product){
                return res.status(404).json({
                    sucess:false,
                    message:'Product not found'
                })
            }
            //find by id and updat
            product = await Product.findByIdAndUpdate(req.params.id,req.body ,{ 
                new: true,
                runValidators: true
            })
            res.status(200).json({
                sucess:true,
                product
            })

        })
        //Delete product => api/v1/admin/product/:id
        exports.deleteProduct = catchAysncErrors(async (req, res , next)=>{
            const product= await Product.findById(req.params.id);
            
            if(!product){
                return res.status(404).json({
                    sucess:false,
                    message:'Product not found'
                })
            }

            await product.deleteOne();

            res.status(200).json({
                sucess:true,
                message:'Product is removed'
            })



        })