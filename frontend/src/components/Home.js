import React, { Fragment, useEffect , useState } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch , useSelector } from 'react-redux'
import { getProducts } from '../actions/products'
import Product from './products/Products'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'
import Pagination from "react-js-pagination";
import {useParams} from 'react-router-dom'


const Home = () => {
  

  const [currentPage,setCurrentPage]=useState(1);
  let params=useParams();
  const dispatch= useDispatch();
  const alert=useAlert();
  const {loading,products,error,productsCount,resPerPage,filteredProductsCount }= useSelector(state=>state.products)
  const keyword=params.keyword;

  useEffect (()=>{
    if(error){
      return alert.error('error');
    }
    dispatch(getProducts(keyword,currentPage));
  },[dispatch,alert,error,currentPage])
  
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
      {products.map(product => (
      <Product key={product._id} product={product} col={4} />
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