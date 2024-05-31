import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productActions";
import {Link } from "react-router-dom"
import './Product.css'

function Product() {
  const dispatch = useDispatch();
  const categories = [
    "Footwear",
    "Jackets",
    "Blazers",
    "Jumpsuits",
    "Sportswear",
    "Kurti",
    "Swimwear",
    "Jeans",
    "Shirts",
    "Laptop",
    "Smartphone",
    "Bedsheets",
    "Accerssories",
  ];
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {/* Breadcrumb Begin */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="./index.html">
                  <i className="fa fa-home" /> Home
                </Link>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Shop Section Begin */}
      <section className="shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="shop__sidebar">
                <div className="sidebar__categories">
                  <div className="section-title">
                    <h4>Categories</h4>
                  </div>
                  <div className="categories__accordion">
                    <div className="accordion" id="accordionExample">
                      <div className="card">
                        <div className="card-heading active">
                          <Link data-toggle="collapse" data-target="#collapseOne">
                            Women
                          </Link>
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse show"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <ul>
                              <li>
                                <Link to="#">Coats</Link>
                              </li>
                              <li>
                                <Link to="#">Jackets</Link>
                              </li>
                              <li>
                                <Link to="#">Dresses</Link>
                              </li>
                              <li>
                                <Link to="#">Shirts</Link>
                              </li>
                              <li>
                                <Link to="#">T-shirts</Link>
                              </li>
                              <li>
                                <Link to="#">Jeans</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading">
                          <Link data-toggle="collapse" data-target="#collapseTwo">
                            Men
                          </Link>
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <ul>
                              <li>
                                <Link to="#">Coats</Link>
                              </li>
                              <li>
                                <Link to="#">Jackets</Link>
                              </li>
                              <li>
                                <Link to="#">Dresses</Link>
                              </li>
                              <li>
                                <Link to="#">Shirts</Link>
                              </li>
                              <li>
                                <Link to="#">T-shirts</Link>
                              </li>
                              <li>
                                <Link to="#">Jeans</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading">
                          <Link
                            data-toggle="collapse"
                            data-target="#collapseThree"
                          >
                            Kids
                          </Link>
                        </div>
                        <div
                          id="collapseThree"
                          className="collapse"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <ul>
                              <li>
                                <Link to="#">Coats</Link>
                              </li>
                              <li>
                                <Link to="#">Jackets</Link>
                              </li>
                              <li>
                                <Link to="#">Dresses</Link>
                              </li>
                              <li>
                                <Link to="#">Shirts</Link>
                              </li>
                              <li>
                                <Link to="#">T-shirts</Link>
                              </li>
                              <li>
                                <Link to="#">Jeans</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading">
                          <Link data-toggle="collapse" data-target="#collapseFour">
                            Accessories
                          </Link>
                        </div>
                        <div
                          id="collapseFour"
                          className="collapse"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <ul>
                              <li>
                                <Link to="#">Coats</Link>
                              </li>
                              <li>
                                <Link to="#">Jackets</Link>
                              </li>
                              <li>
                                <Link to="#">Dresses</Link>
                              </li>
                              <li>
                                <Link to="#">Shirts</Link>
                              </li>
                              <li>
                                <Link to="#">T-shirts</Link>
                              </li>
                              <li>
                                <Link to="#">Jeans</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card">
                        <div className="card-heading">
                          <Link data-toggle="collapse" data-target="#collapseFive">
                            Cosmetic
                          </Link>
                        </div>
                        <div
                          id="collapseFive"
                          className="collapse"
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <ul>
                              <li>
                                <Link to="#">Coats</Link>
                              </li>
                              <li>
                                <Link to="#">Jackets</Link>
                              </li>
                              <li>
                                <Link to="#">Dresses</Link>
                              </li>
                              <li>
                                <Link to="#">Shirts</Link>
                              </li>
                              <li>
                                <Link to="#">T-shirts</Link>
                              </li>
                              <li>
                                <Link to="#">Jeans</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar__filter">
                  <div className="section-title">
                    <h4>Shop by price</h4>
                  </div>
                  <div className="filter-range-wrap">
                    <div
                      className="price-range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"
                      data-min={33}
                      data-max={99}
                    />
                    <div className="range-slider">
                      <div className="price-input">
                        <p>Price:</p>
                        <input type="text" id="minamount" />
                        <input type="text" id="maxamount" />
                      </div>
                    </div>
                  </div>
                  <Link to="#">Filter</Link>
                </div>
                <div className="sidebar__sizes">
                  <div className="section-title">
                    <h4>Shop by size</h4>
                  </div>
                  <div className="size__list">
                    <label htmlFor="xxs">
                      xxs
                      <input type="checkbox" id="xxs" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="xs">
                      xs
                      <input type="checkbox" id="xs" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="xss">
                      xs-s
                      <input type="checkbox" id="xss" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="s">
                      s
                      <input type="checkbox" id="s" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="m">
                      m
                      <input type="checkbox" id="m" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="ml">
                      m-l
                      <input type="checkbox" id="ml" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="l">
                      l
                      <input type="checkbox" id="l" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="xl">
                      xl
                      <input type="checkbox" id="xl" />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
                <div className="sidebar__color">
                  <div className="section-title">
                    <h4>Shop by size</h4>
                  </div>
                  <div className="size__list color__list">
                    <label htmlFor="black">
                      Blacks
                      <input type="checkbox" id="black" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="whites">
                      Whites
                      <input type="checkbox" id="whites" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="reds">
                      Reds
                      <input type="checkbox" id="reds" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="greys">
                      Greys
                      <input type="checkbox" id="greys" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="blues">
                      Blues
                      <input type="checkbox" id="blues" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="beige">
                      Beige Tones
                      <input type="checkbox" id="beige" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="greens">
                      Greens
                      <input type="checkbox" id="greens" />
                      <span className="checkmark" />
                    </label>
                    <label htmlFor="yellows">
                      Yellows
                      <input type="checkbox" id="yellows" />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9">
              <div className="row">
                {products &&
                  products.map((item) => (
                    <div className="col-lg-4 col-md-6" key={item.id}>
                      <div className="product__item mt-5">
                      <Link to={`/Product/${item.productsId}`}>
                      <div className="product__item__pic text-center">
                        {item.imgs && item.imgs.length > 0 && (
                          <img src={`https://localhost:7283/Files/${item.imgs[0].fileName}`} alt={item.name} />
                        )}
                      </div>
                    </Link>
                      </div>
                      <div className="product__item__text">
                        <h6>
                          <Link to="#">{item.name}</Link>
                        </h6>
                        <div className="product__price ">₹{item.price}</div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="col-lg-12 text-center">
                <div className="pagination__option">
                  <Link to="#">1</Link>
                  <Link to="#">2</Link>
                  <Link to="#">3</Link>
                  <Link to="#">
                    <i className="fa fa-angle-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Shop Section End */}
    </>
  );
}

export default Product;
