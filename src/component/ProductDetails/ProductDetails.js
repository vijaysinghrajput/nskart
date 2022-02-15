import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainContext from '../../context/MainContext';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { BasicVegitableFruit } from '../ProductsCards/BasicVegitableFruit';
import Seo from "../Seo";


const ProductDetails = () => {

    const { prodID } = useParams();
    const data = useContext(MainContext);
    const { products, addToCart, removeFromCart, cartItems } = data;
    const [moreLikeThis, setMoreLikeThis] = useState([]);
    const [product, setProduct] = useState();

    useEffect(() => {
        // window.scrollTo(0, 0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [prodID]);

    useEffect(() => {
        const more = products.filter(e => e?.category_id === product?.category_id)
        setMoreLikeThis(more);
    }, [product])

    useEffect(() => {
        const getData = products.find(e => e.id === prodID);
        const isAvilable = cartItems.find(o => o.id === prodID);
        isAvilable ? setProduct({
            ...getData,
            itemQuant: isAvilable.itemQuant
        }) : setProduct({
            ...getData,
            itemQuant: 0
        })
    }, [products, cartItems, data, prodID]);

    return (
        <>

            <Seo
                title={product?.product_name + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                descreption={product?.product_name + " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                image={URL + "/images/product-images/" + product?.product_image}
            />


            {/* <section className="pb-4 osahan-main-body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="d-flex mb-3">
                                <img src={URL + "/images/product-images/" + product?.product_image} className="img-fluid mx-auto shadow-sm rounded"
                                    alt={product?.product_name + " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                                    title={product?.product_name + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"} />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-4 bg-white rounded shadow-sm">
                                <div className="pt-0">
                                    <h2 className="font-weight-bold">{product?.product_name}</h2>
                                    <p className="font-weight-light text-dark m-0 d-flex align-items-center">
                                        Product MRP : <b className="h6 text-dark m-0">₹{product?.price}</b>
                                        {product?.discount !== "" && <span className="badge badge-danger ml-2">{product?.discount}%</span>}
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="font-weight-bold m-0">Available in:</p>
                                            <p className="text-muted m-0">{product?.product_size + product?.product_unit}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="details">
                                    <div className="pt-3 bg-white">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                {!product?.itemQuant ? (
                                                    <div>
                                                        <a href="javascript:void(0)" onClick={() =>
                                                            addToCart({
                                                                ...product,
                                                                itemQuant: 1,
                                                                cartId: product?.id
                                                            })
                                                        } className="btn btn-warning p-3 rounded btn-block d-flex align-items-center justify-content-center mr-3 btn-lg"><i className="icofont-plus m-0 mr-2" /> ADD TO CART</a>

                                                    </div>
                                                ) : (
                                                    <div class="plusMinusFun d-flex justify-content-between px-3 align-items-center" style={{ width: 120, padding: 16 }}>
                                                        {product?.itemQuant === 1 ? (
                                                            <MdDelete
                                                                style={{ fontSize: 20, cursor: "pointer", color: "#c23838" }}
                                                                onClick={() =>
                                                                    removeFromCart(product?.id)}
                                                            />
                                                        ) : (
                                                            <AiOutlineMinus
                                                                style={{ fontSize: 20, cursor: "pointer", color: "#454545" }}
                                                                onClick={() => addToCart({
                                                                    ...product,
                                                                    itemQuant: product?.itemQuant - 1,
                                                                    price: product?.price - product?.price,
                                                                    cartId: product?.id
                                                                })}
                                                            />
                                                        )}
                                                        <h5 className="mb-0" style={{ fontSize: 20 }}>{product?.itemQuant}</h5>
                                                        <AiOutlinePlus
                                                            style={{ fontSize: 20, cursor: "pointer", color: "#454545" }}
                                                            onClick={() =>
                                                                addToCart({
                                                                    ...product,
                                                                    itemQuant: product?.itemQuant + 1,
                                                                    price: parseInt(product?.price) + parseInt(product?.price),
                                                                    cartId: product?.id
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-3">
                                        <p className="font-weight-bold my-2">Product Details</p>
                                        <p className="text-muted small mb-0">High quality Fresh Orange fruit exporters from South
                                            Korea for sale. All citrus trees belong to the single genus Citrus and remain almost
                                            entirely interfertile. This includes grapefruits, lemons, limes, oranges, and
                                            various other types and hybrids. The fruit of any citrus tree is considered a
                                            hesperidium, a kind of modified berry; it is covered by a rind wall.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h5 className="mt-3 mb-3">Maybe You Like this.</h5>
                    <div className="row">
                        {moreLikeThis.slice(0, 8).map((data) => {
                            return data.id !== prodID && <BasicVegitableFruit data={data} />
                        })}
                    </div>
                </div>
            </section> */}
            <div class="pb-4 osahan-main-body">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="product-dt-view">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4">
                                        <img src={URL + "/images/product-images/" + product?.product_image} className="img-fluid mx-auto rounded d-block" style={{ minHeight: 390 }}
                                            alt={product?.product_name + " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                                            title={product?.product_name + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"} />
                                    </div>
                                    <div class="col-lg-8 col-md-8">
                                        <div class="product-dt-right">
                                            <h2>{product?.product_name}</h2>
                                            <div class="no-stock">
                                                <p class="pd-no">Product No.<span>{product?.product_name}</span></p>
                                                <p class="stock-qty">Available<span className='text-success'>(In Stock)</span></p>
                                            </div>
                                            <div class="product-radio">
                                                <ul class="product-now">
                                                    <li>
                                                        <input type="radio" id="p1" name="product1" />
                                                        <label for="p1">{product?.product_size + product?.product_unit}</label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <p class="pp-descp">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate, purus at tempor blandit, nulla felis dictum eros, sed volutpat odio sapien id lectus. Cras mollis massa ac congue posuere. Fusce viverra mauris vel magna pretium aliquet. Nunc tincidunt, velit id tempus tristique, velit dolor hendrerit nibh, at scelerisque neque mauris sed ex.</p>
                                            <div class="product-group-dt">
                                                <ul>
                                                    <li><div class="main-price color-discount">Discount Price<span>₹{(product?.price) - (product?.price * product?.discount / 100)}</span></div></li>
                                                    <li><div class="main-price mrp-price">MRP Price<span>₹{product?.price}</span></div></li>
                                                </ul>
                                                <div class="gty-wish-share">
                                                    <div>
                                                        {!product?.itemQuant ? (
                                                            <div>
                                                                <a href="javascript:void(0)" onClick={() =>
                                                                    addToCart({
                                                                        ...product,
                                                                        itemQuant: 1,
                                                                        cartId: product?.id
                                                                    })
                                                                } className="btn btn-warning p-3 rounded btn-block d-flex align-items-center justify-content-center mr-3 btn-lg text-light"><i className="icofont-plus m-0 mr-2" /> ADD TO CART</a>

                                                            </div>
                                                        ) : (
                                                            <div class="plusMinusFun d-flex justify-content-between px-3 align-items-center" style={{ width: 120, padding: 16, borderRadius: 8 }}>
                                                                {product?.itemQuant === 1 ? (
                                                                    <MdDelete
                                                                        style={{ fontSize: 20, cursor: "pointer", color: "#c23838" }}
                                                                        onClick={() =>
                                                                            removeFromCart(product?.id)}
                                                                    />
                                                                ) : (
                                                                    <AiOutlineMinus
                                                                        style={{ fontSize: 20, cursor: "pointer", color: "#454545" }}
                                                                        onClick={() => addToCart({
                                                                            ...product,
                                                                            itemQuant: product?.itemQuant - 1,
                                                                            price: product?.price - product?.price,
                                                                            cartId: product?.id
                                                                        })}
                                                                    />
                                                                )}
                                                                <h5 className="m-0" style={{ fontSize: 20 }}>{product?.itemQuant}</h5>
                                                                <AiOutlinePlus
                                                                    style={{ fontSize: 20, cursor: "pointer", color: "#454545" }}
                                                                    onClick={() =>
                                                                        addToCart({
                                                                            ...product,
                                                                            itemQuant: product?.itemQuant + 1,
                                                                            price: parseInt(product?.price) + parseInt(product?.price),
                                                                            cartId: product?.id
                                                                        })
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pdp-details">
                                                <ul>
                                                    <li>
                                                        <div class="pdp-group-dt">
                                                            <div class="pdp-icon"><i class="uil uil-usd-circle"></i></div>
                                                            <div class="pdp-text-dt">
                                                                <span>Lowest Price Guaranteed</span>
                                                                <p>Get difference refunded if you find it cheaper anywhere else.</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div class="pdp-group-dt">
                                                            <div class="pdp-icon"><i class="uil uil-cloud-redo"></i></div>
                                                            <div class="pdp-text-dt">
                                                                <span>Easy Returns & Refunds</span>
                                                                <p>Return products at doorstep and get refund in seconds.</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4 col-md-12">
                            <div class="pdpt-bg">
                                <div class="pdpt-title">
                                    <h4>More Like This</h4>
                                </div>
                                <div class="pdpt-body scrollstyle_4">
                                    {moreLikeThis.slice(0, 8).map((data) => {
                                        return data.id !== prodID &&
                                            <div class="cart-item border_radius">
                                                <a href="single_product_view.html" class="cart-product-img">
                                                    <img src={URL + "/images/product-images/" + data?.product_image} alt="" />
                                                    <div class="offer-badge">4% OFF</div>
                                                </a>
                                                <div class="cart-text">
                                                    <h4>{data.product_name}</h4>
                                                    <div class="cart-radio">
                                                        <ul class="kggrm-now">
                                                            <li>
                                                                <input type="radio" id="k1" name="cart1" />
                                                                <label for="k1">{data?.product_size + data?.product_unit}</label>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div class="qty-group">
                                                        <div class="cart-item-price ml-0">₹{Math.round((data?.price) - (data?.price * data?.discount / 100))}</div>
                                                    </div>
                                                </div>
                                            </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-12">
                            <div class="pdpt-bg">
                                <div class="pdpt-title">
                                    <h4>Product Details</h4>
                                </div>
                                <div class="pdpt-body scrollstyle_4">
                                    <div class="pdct-dts-1">
                                        <div class="pdct-dt-step">
                                            <h4>Description</h4>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere nunc in condimentum maximus. Integer interdum sem sollicitudin, porttitor felis in, mollis quam. Nunc gravida erat eu arcu interdum eleifend. Cras tortor velit, dignissim sit amet hendrerit sed, ultricies eget est. Donec eget urna sed metus dignissim cursus.</p>
                                        </div>
                                        <div class="pdct-dt-step">
                                            <h4>Benefits</h4>
                                            <div class="product_attr">
                                                Aliquam nec nulla accumsan, accumsan nisl in, rhoncus sapien.<br />
                                                In mollis lorem a porta congue.<br />
                                                Sed quis neque sit amet nulla maximus dignissim id mollis urna.<br />
                                                Cras non libero at lorem laoreet finibus vel et turpis.<br />
                                                Mauris maximus ligula at sem lobortis congue.<br />
                                            </div>
                                        </div>
                                        <div class="pdct-dt-step">
                                            <h4>How to Use</h4>
                                            <div class="product_attr">
                                                The peeled, orange segments can be added to the daily fruit bowl, and its juice is a refreshing drink.
                                            </div>
                                        </div>
                                        <div class="pdct-dt-step">
                                            <h4>Seller</h4>
                                            <div class="product_attr">
                                                Gambolthemes Pvt Ltd, Sks Nagar, Near Mbd Mall, Ludhana, 141001
                                            </div>
                                        </div>
                                        <div class="pdct-dt-step">
                                            <h4>Disclaimer</h4>
                                            <p>Phasellus efficitur eu ligula consequat ornare. Nam et nisl eget magna aliquam consectetur. Aliquam quis tristique lacus. Donec eget nibh et quam maximus rutrum eget ut ipsum. Nam fringilla metus id dui sollicitudin, sit amet maximus sapien malesuada.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ProductDetails;