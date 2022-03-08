import React, { Fragment, useEffect } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch , useSelector } from 'react-redux'
import { getProducts } from '../actions/products'
import Product from './products/Products'
import Loader from './layouts/Loader'
import { useAlert } from 'react-alert'


const Home = () => {
  
  const dispatch= useDispatch();
  const alert=useAlert();
  const {loading,products,error,productsCount}= useSelector(state=>state.products)
  useEffect (()=>{
    if(error){
     
      return alert.error('error');
    }
    dispatch(getProducts());
    

  },[dispatch,alert,error])
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
    </Fragment>
    
    
  )
}
</Fragment>
)}
export default Home