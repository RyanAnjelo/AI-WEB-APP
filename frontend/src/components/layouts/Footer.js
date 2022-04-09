import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook ,faTwitter,faGoogle,faGit, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <Fragment>
           

  <footer className="text-center text-white" style={{backgroundColor:'#232F3E'}}>

    <div className="container">

      <section className="mt-5">
     
        <div className="row text-center d-flex justify-content-center pt-5">
          
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <Link to="#!" className="text-white">About us</Link>
            </h6>
          </div>
        
       
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <Link to="#!" className="text-white">Products</Link>
            </h6>
          </div>
    
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <Link to="#!" className="text-white">Awards</Link>
            </h6>
          </div>
        
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <Link to="#!" className="text-white">Help</Link>
            </h6>
          </div>
          
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <Link to="#!" className="text-white">Contact</Link>
            </h6>
          </div>
          
        </div>
    
      </section>
      

      <hr className="my-5" />

      <section className="mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8">
            <p>
              
            </p>
          </div>
        </div>
      </section>
     
      <section className="text-center mb-5">
        <Link to="/" className="text-white m-4">
         <FontAwesomeIcon icon={faFacebook} />
        </Link>
        <Link to="/" className="text-white m-4">
          <FontAwesomeIcon icon={faGit} />
        </Link>
        <Link to="/" className="text-white m-4">
         <FontAwesomeIcon icon={faGoogle} />
        </Link>
        <Link to="/" className="text-white m-4">
         <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link to="/" className="text-white m-4">
          <FontAwesomeIcon icon={faLinkedin} />
        </Link>
        
      </section>
     
    </div>
    <div
            className="text-center p-3"
            style={{backgroundColor:'rgba(0, 0, 0, 0.2)'}}
         
         >
      © 2022 Copyright :
      <Link className="text-white" to=""
         > Ambay</Link
        >
    </div>
    
  </footer>

        </Fragment>
    )
}

export default Footer
