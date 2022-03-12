import React , {Fragment, useEffect} from 'react'
import { useDispatch , useSelector} from 'react-redux'
import {clearErrors ,getProductDetails} from '../../actions/products'
import {useAlert} from 'react-alert'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import { Carousel } from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import Product from './Products'

const ProductDetails=()=>{
   
    const dispatch= useDispatch();
    const alert=useAlert();
    const {loading,error,product}=useSelector(state =>state.productDetails)
    let params=useParams();
    useEffect (()=>{
        dispatch(getProductDetails(params.id))
        if(error){
            alert.error();
           dispatch(clearErrors())
        }
    },[dispatch,alert,error,params.id])
    return ( 
    
    <Fragment>
        {loading ? <Loader>Loading ...</Loader>:(
        <Fragment>
         <MetaData title={product.name} />
         <div class="container container-fluid">
        <div class="row f-flex justify-content-around">

        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                            <Carousel pause='hover' >
                                {product.images && product.images.map(image => (
                                    <Carousel.Item key={image.public_id}>
                                        <img className="d-block w-100 h-20" src={image.url} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                      
            <div class="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">{product._id}</p>

                <hr/>

                <div class="rating-outer">
                <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                </div>
                <span id="no_of_reviews">{product.numOfReviews} Reviews</span>

                <hr/>

                <p id="product_price">${product.price}</p>
                <div class="stockCounter d-inline">
                    <span class="btn btn-danger minus">-</span>

                    <input type="number" class="form-control count d-inline" value="1" readOnly />

                    <span class="btn btn-primary plus">+</span>
                </div>
                 <button type="button" id="cart_btn" class="btn btn-primary d-inline ml-4">Add to Cart</button>

                <hr/>

                <p>Status: <span id="stock_status">In Stock</span></p>

                <hr/>

                <h4 class="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr/>
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
				
				<button id="review_btn" type="button" class="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>
				
				<div class="row mt-2 mb-5">
                    <div class="rating w-50">

                        <div class="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="ratingModalLabel">Submit Review</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">

                                        <ul class="stars" >
                                            <li class="star"><i class="fa fa-star"></i></li>
                                            <li class="star"><i class="fa fa-star"></i></li>
                                            <li class="star"><i class="fa fa-star"></i></li>
                                            <li class="star"><i class="fa fa-star"></i></li>
                                            <li class="star"><i class="fa fa-star"></i></li>
                                        </ul>

                                        <textarea name="review" id="review" class="form-control mt-3">

                                        </textarea>

                                        <button class="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
						
            </div>

        </div>

    </div>
    </div>
        </Fragment>
        )}
   </Fragment>
    

    )
}
export default ProductDetails