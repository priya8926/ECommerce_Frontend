import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
    {/* Offcanvas Menu Begin */}
    <div className="offcanvas-menu-overlay" />
    <div className="offcanvas-menu-wrapper">
      <div className="offcanvas__close">+</div>
      <ul className="offcanvas__widget">
        <li>
          <span className="icon_search search-switch" />
        </li>
        <li>
          <Link to="#">
            <span className="icon_heart_alt" />
            <div className="tip">2</div>
          </Link>
        </li>
        <li>
          <Link to="#">
            <span className="icon_bag_alt" />
            <div className="tip">2</div>
          </Link>
        </li>
      </ul>
      <div className="offcanvas__logo">
        <Link to="./index.html">
          {/* <img src="img/logo.png" alt="" /> */}
        </Link>
      </div>
      <div id="mobile-menu-wrap" />
      <div className="offcanvas__auth">
        <Link to="#">Login</Link>
        <Link to="#">Register</Link>
      </div>
    </div>
    {/* Offcanvas Menu End */}
    {/* Header Section Begin */}
    <header className="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-2">
            <div className="header__logo">
              <Link to="./index.html">
                {/* <img src="img/logo.png" alt="" /> */}
              </Link>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7">
            <nav className="header__menu">
              <ul>
                <li className="active">
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/product">Shop</Link>
                </li>
                <li>
                  <Link to="#">Pages</Link>
                  <ul className="dropdown">
                    <li>
                      <Link to="./product-details.html">Product Details</Link>
                    </li>
                    <li>
                      <Link to="./shop-cart.html">Shop Cart</Link>
                    </li>
                    <li>
                      <Link to="./checkout.html">Checkout</Link>
                    </li>
                    <li>
                      <Link to="./blog-details.html">Blog Details</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="./blog.html">Blog</Link>
                </li>
                <li>
                  <Link to="./contact.html">Contact</Link>
                </li>
                <li>
                  <Link to="/admin">Admin </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="header__right">
              <div className="header__right__auth">
                <Link to="#">Login</Link>
                <Link to="#">Register</Link>
              </div>
              <ul className="header__right__widget">
                <li>
                  <span className="icon_search search-switch" />
                </li>
                <li>
                  <Link to="#">
                    <span className="icon_heart_alt" />
                    <div className="tip">2</div>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <span className="icon_bag_alt" />
                    <div className="tip">2</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="canvas__open">
          <i className="fa fa-bars" />
        </div>
      </div>
    </header>
    {/* Header Section End */}
  {/* Search Begin */}
  <div className="search-model">
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="search-close-switch">+</div>
      <form className="search-model-form">
        <input type="text" id="search-input" placeholder="Search here....." />
      </form>
    </div>
  </div>
  {/* Search End */}
  </>
  
  );
}

export default Navbar;
