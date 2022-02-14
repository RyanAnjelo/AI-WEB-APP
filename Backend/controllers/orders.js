//Importing modules
const Order=require('../models/orders');
const Product=require('../models/product');

//Error Handling
const catchAsyncErrors=require('../middleware/asyncError');
const ErrorHandler=require('../utils/ErrorHandler');
const product = require('../models/product');


//Creating a new order 
exports.createNewOrder=catchAsyncErrors(async (req,res,next)=>{
const {
    orderItems,
    shippingInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo
}=req.body;

const order= await Order.create({
    orderItems,
    shippingInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt:Date.now(),
    user:req.user._id
})
res.status(200).json({
    sucess:true,
    order
})

})

//get single order details
exports.getOrderDetails=catchAsyncErrors(async (req,res,next)=>{
    
    
    const order= await Order.findById(req.params.id).populate('user','name email');

    if(!order){
        return next(new ErrorHandler('Order not found '),404);
    }
    res.status(200).json({
        sucess:true,
        order
    })
    
})

//Get logged in user orders 
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})
//Get all ordered products
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice// used to display sales in dashboard of admin
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//update the process of deleivery status -ADMIN
exports.updateDeliveryStatus = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})
//Update Order 

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
        order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
    })
})



//Update inventory - ADMIN
async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false })
}
//Delete order -Admins
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler('No Order found with this ID', 404))
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})