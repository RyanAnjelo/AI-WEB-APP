const mongoose=require('mongoose');

const productScheme= new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter Product name:'],
        trim:true,
        maxlength:[100,'Product Name exceeded 100 characters']
    },
    price:{
        type:Number,
        required:[true,'Enter Product price:'],
        maxlength:[5,'Product Price exceeded 5 characters'],
        default:0.0
    },
    description:{
        type:String,
        required:[true,'Enter Product Description:'],
        
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        
        }
    }
    ],
    category:{
        type:String,
        required:[true,'Please Select a Product Category'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes',
                'Beauty/Health',
                'Sports',
                'Phones'
            ],
            message:'Please select an valid category'
        }
        
    },
    seller:{
        type:String,
        required:[true,'Enter Product Seller'],
        
    },
    stock:{
        type:Number,
        required:[true,'Enter Product stock:'],
        maxlength:[5,'Stock cant exceed 5 characters'],
        default:0
        
    },
    numOfReviews:{
        type:Number,
        default:0
        
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now

    }
})

module.exports =mongoose.model('Product',productScheme);