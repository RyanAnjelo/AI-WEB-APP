//Importing modules to be used 
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAysncErrors = require('../middleware/asyncError');
const APIFeatures = require('../utils/api');
const cloudinary = require('cloudinary');


exports.newProduct = catchAysncErrors(async (req, res, next) => {

    let images = []
    // handles imgs
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

//get all products => /api/v1/products

exports.getProducts = catchAysncErrors(async (req, res, next) => {

    const resPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query;


    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })

})
// Get single Product data => /api/v1/product/id:
exports.getSingleProduct = catchAysncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));

    }
    res.status(200).json({
        sucess: true,
        product
    })

})

// Update the product => /api/v1/admin/product/:id
exports.updateProducts = catchAysncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

        if (!product) {
        return res.status(404).json({
            sucess: false,
            message: 'Product not found'
        })
    }
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }

    //find by id and updat
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        sucess: true,
        product
    })

})
//Delete product => api/v1/admin/product/:id
exports.deleteProduct = catchAysncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);


    if (!product) {
        return res.status(404).json({
            sucess: false,
            message: 'Product not found'
        })
    }

    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.deleteOne();

    res.status(200).json({
        sucess: true,
        message: 'Product is removed'
    })



})

// Create reviews for the products 
exports.createProductReview = catchAysncErrors(async (req, res, next) => {

    const {
        rating,
        comment,
        productId
    } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true
    })

})

// Get all reviews for Specific Product
exports.getProductReviews = catchAysncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})
//Delete the product Reviews 
exports.deleteReview = catchAysncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    console.log(product);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})



// Get all products
exports.getAdminProducts = catchAysncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

})