import React, { Fragment, useEffect , useState } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch , useSelector } from 'react-redux'
import { getProducts } from '../actions/products'
import Product from './products/Products'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import Pagination from "react-js-pagination";
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
 
const { createSliderWithTooltip } = Slider;
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
const styleObj = {

    fontSize: 4,

    color: "#4a54f1",

    textAlign: "center",

    paddingTop: "100px",

}
    
  return (
    <Fragment>
    {loading ? <Loader>Loading ...</Loader>:(
    <Fragment>
    <MetaData title={'Buy Electronics , Household Items and Many Others Online'} />
   <div class="container">
            <h2 class="title-page mt-4">Category products</h2>
            <nav>
            <ol class="breadcrumb text-white">
                <li class="breadcrumb-item" ><Link to="/" style={{color:'white'}}>Home</Link></li>
                <li class="breadcrumb-item"><Link to="/" style={{color:'white'}}>Latest Products</Link></li>
            </ol>  
                      </nav>
                   
                  </div>  
   <section class="section-content padding-y mt-5">
        <div class="container mt-5">

        <div class="row">
            <aside class="col-md-3">
                
        <div class="card">
            <article class="filter-group">
                                          <header class="card-header">
                         <p className="mb-3 " style={{color:'#30AADD',fontWeight:'bold'}}>Product Type</p>
                    <Link to="#" data-toggle="collapse" data-target="#collapse_1" aria-expanded="true" class="">
                        <i class="icon-control fa fa-chevron-down"></i>
                         
                    </Link>
                </header>
                <div class="filter-content collapse show" id="collapse_1">
                    <div class="card-body">
                        <form class="pb-3">
                        <div class="input-group">
                          <input type="text" class="form-control" placeholder="Search" />
                          <div class="input-group-append">
                            <button class="btn btn-light" type="button"><i class="fa fa-search"></i></button>
                          </div>
                        </div>
                        </form>
                        
                        <ul class="list-menu">
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
                </div>
            </article>
          
            <article class="filter-group">
                                          <header class="card-header">
                            <p className="mb-3 " style={{color:'#30AADD',fontWeight:'bold'}}>Price Range</p>
                    <Link to="#" data-toggle="collapse" data-target="#collapse_3" aria-expanded="true" class="">
                        <i class="icon-control fa fa-chevron-down"></i>
                    </Link>
                </header>
                <div class="filter-content collapse show" id="collapse_3">
                    <div class="card-body">
                        <div class="form-row">
                        Range: <Range
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
                                                onChange={price => setPrice(price)}/>
                        </div> 
                       
                    </div>
                </div>
            </article> 
            
            <article class="filter-group">
                                          <header class="card-header">
                                              <div className="mt-5">
    <p className="mb-3 " style={{color:'#30AADD',fontWeight:'bold'}}>
        Ratings
    </p>

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
                    </header>
            </article> 
        </div> 

                              </aside> 
                              
       <main class="col-md-9">
    <section id="products" className="container mt-5">
        <div class="row">
            
       {products.map(product => (
      <Product key={product._id} product={product} col={4} style={{ styleObj}} />
      ))}
           
                                      </div>
                                  </section>
                                
<df-messenger
  intent="WELCOME"
  chat-title="Ambay-chat-bot"
  agent-id="4aa6ad3c-51a7-4474-8ec5-9ff27c4af924"
  language-code="en"
></df-messenger>
        </main>

        </div>

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