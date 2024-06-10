import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductDetails } from "../actions/productActions";

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert(error);
    }
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [id, dispatch, error, alert]);

  return (
    <>
    {console.log(product , "nbfh")}
      {/* Breadcrumb Begin */}
      <div className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__links">
                <Link to="./index.html">
                  <i className="fa fa-home" /> Home
                </Link>
                <Link to="/product">Product</Link>
                <span>Product Details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb End */}
      {/* Product Details Section Begin */}
      <section className="product-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product__details__pic">
                <div className="product__details__pic__left product__thumb nice-scroll">
                  {product.imgs &&
                    product.imgs.map((image, index) => (
                      <Link
                        key={index}
                        className="pt"
                        to={`#product-${index + 1}`}
                      >
                        <img
                          src={`https://localhost:7283/Files/${image.fileName}`}
                          alt={image.fileName}
                        />
                      </Link>
                    ))}
                </div>
                <div className="product__details__slider__content">
                  <div className="product__details__pic__slider owl-carousel">
                  {product.imgs &&
                      product.imgs.map((image, index) => (
                        <img
                          key={index}
                          data-hash={`product-${index + 1}`}
                          className="product__big__img"
                          src={`https://localhost:7283/Files/${image.fileName}`}
                          alt={image.fileName}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product__details__text">
                <h3>
                  {product.name}{" "}
                  <span>Brand: SKMEIMore Men Watches from SKMEI</span>
                </h3>
                <div className="rating">
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <span>( 138 reviews )</span>
                </div>
                <div className="product__details__price">
                  $ 75.0 <span>$ 83.0</span>
                </div>
                <p>
                  Nemo enim ipsam voluptatem quia aspernatur aut odit aut loret
                  fugit, sed quia consequuntur magni lores eos qui ratione
                  voluptatem sequi nesciunt.
                </p>
                <div className="product__details__button">
                  <div className="quantity">
                    <span>Quantity:</span>
                    <div className="pro-qty">
                      <input type="text" defaultValue={1} />
                    </div>
                  </div>
                  <Link to="#" className="cart-btn">
                    <span className="icon_bag_alt" /> Add to cart
                  </Link>
                  <ul>
                    <li>
                      <Link to="#">
                        <span className="icon_heart_alt" />
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <span className="icon_adjust-horiz" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="product__details__widget">
                  <ul>
                    <li>
                      <span>Availability:</span>
                      <div className="stock__checkbox">
                        <label htmlFor="stockin">
                          In Stock
                          <input type="checkbox" id="stockin" />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </li>
                    <li>
                      <span>Available color:</span>
                      <div className="color__checkbox">
                        <label htmlFor="red">
                          <input
                            type="radio"
                            name="color__radio"
                            id="red"
                            defaultChecked=""
                          />
                          <span className="checkmark" />
                        </label>
                        <label htmlFor="black">
                          <input type="radio" name="color__radio" id="black" />
                          <span className="checkmark black-bg" />
                        </label>
                        <label htmlFor="grey">
                          <input type="radio" name="color__radio" id="grey" />
                          <span className="checkmark grey-bg" />
                        </label>
                      </div>
                    </li>
                    <li>
                      <span>Available size:</span>
                      <div className="size__btn">
                        <label htmlFor="xs-btn" className="active">
                          <input type="radio" id="xs-btn" />
                          xs
                        </label>
                        <label htmlFor="s-btn">
                          <input type="radio" id="s-btn" />s
                        </label>
                        <label htmlFor="m-btn">
                          <input type="radio" id="m-btn" />m
                        </label>
                        <label htmlFor="l-btn">
                          <input type="radio" id="l-btn" />l
                        </label>
                      </div>
                    </li>
                    <li>
                      <span>Promotions:</span>
                      <p>Free shipping</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Details Section End */}
    </>
  );
}

export default ProductDetails;
