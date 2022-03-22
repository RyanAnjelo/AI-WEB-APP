import React, { Fragment, useEffect , useState } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch , useSelector } from 'react-redux'
import { getProducts } from '../actions/products'
import Product from './products/Products'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import Pagination from "react-js-pagination";
import {useParams} from 'react-router-dom'
 
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
 
const { createSliderWithTooltip } = Slider;//Error occurs here**
const Range = createSliderWithTooltip(Slider.Range) 
 
const Home = () => {
  
 
  const [currentPage,setCurrentPage]=useState(1);
  const [price,setPrice]=useState([1,1000]);
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0)
  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    "Books",
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
]
  let params=useParams();
  const dispatch= useDispatch();
  const alert=useAlert();
  const {loading,products,error,productsCount,resPerPage,filteredProductsCount }= useSelector(state=>state.products)
  const keyword=params.keyword;
 
  useEffect(() => {
    if (error) {
      return alert.error("error");
    }
    dispatch(getProducts(keyword, currentPage,price,category,rating));
 }, [dispatch, alert, error, currentPage, keyword,price,category,rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
}
 
  return (
    <Fragment>
    {loading ? <Loader>Loading ...</Loader>:(
    <Fragment>
    <MetaData title={'Buy Electronics , Household Items and Many Others Online'} />
    <h1 id="products_heading">Latest Products</h1>
    <section id="products" className="container mt-5">
      <div className="row">
      
      <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                           Price Range: <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />
                                           <hr className="my-5" />

<div className="mt-5">
    <h4 className="mb-3">
        Categories
    </h4>

    <ul className="pl-0">
        {categories.map(category => (
            <li
                style={{
                    cursor: 'pointer',
                    listStyleType: 'none'
                }}
                key={category}
                onClick={() => setCategory(category)}
            >
                {category}
            </li>
        ))}
    </ul>
    </div>
    <hr className="my-3" />

<div className="mt-5">
    <h4 className="mb-3">
        Ratings
    </h4>

    <ul className="pl-0">
        {[5, 4, 3, 2, 1].map(star => (
            <li
                style={{
                    cursor: 'pointer',
                    listStyleType: 'none'
                }}
                key={star}
                onClick={() => setRating(star)}
            >
                <div className="rating-outer">
                    <div className="rating-inner"
                        style={{
                            width: `${star * 20}%`
                        }}
                    >
                    </div>
                </div>
            </li>
        ))}
    </ul>
</div>
                                            </div>
                                            </div>
                                            </Fragment>
                                          
   
      {products.map(product => (
      <Product key={product._id} product={product} col={4} style={{innerHeight:50,outerHeight:50}} />
      ))}
      
      </div>
      </section>
      <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}//sets current page no as it changes for state management
                                nextPageText={'Next'}
                                prevPageText={'Prev'}
                                
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    
    </Fragment>
    
    
  )
}
</Fragment>
)}
export default Home