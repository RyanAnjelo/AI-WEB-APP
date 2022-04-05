import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="sidebar-wrapper">
    <nav id="sidebar">
        <ul className="list-unstyled components">
            <li>
                <Link to="/dashboard"><i className="fa fa-tachometer mb-3"></i> Dashboard</Link>
            </li>

            <li>
                <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                    className="fa fa-product-hunt mb-3"></i> Products</a>
                <ul className="collapse list-unstyled" id="productSubmenu">
                    <li>
                        <Link to="/admin/products"><i className="fa fa-clipboard mb-3"></i> All</Link>
                    </li>

                    <li>
                        <Link to="/admin/product"><i className="fa fa-plus mb-3"></i> Create</Link>
                    </li>
                </ul>
            </li>

            <li>
                <Link to="/admin/orders"><i className="fa fa-shopping-basket mb-3"></i> Orders</Link>
            </li>

            <li>
                <Link to="/admin/users"><i className="fa fa-users mb-3"></i> Users</Link>
            </li>

            <li>
                <Link to="/admin/reviews"><i className="fa fa-star mb-3"></i> Reviews</Link>
            </li>

        </ul>
    </nav>
</div>
  )
}

export default SideBar