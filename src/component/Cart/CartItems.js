import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MainContext from '../../context/MainContext';
import { CartItemsCard } from '../ProductsCards/CartItems';

const CartItems = (props) => {

    const data = useContext(MainContext);
    const { cartItems, auth } = data;
    const navigation = useNavigate();
    const location = useLocation();
    const GetTotal = cartItems.reduce(function (a, b) {
        return a + Number(b["price"] * b["itemQuant"]);
    }, 0);

    useEffect(() => {
        data.cartItems.length === 0 && navigation("/")
    }, [data]);

    return (
        <>
            <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden">
                <div className="card-header bg-white border-0 p-0" id="headingOne">
                    <h2 className="mb-0">
                        <button className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <span className="c-number">1</span> Cart ({data.cartItems.length} items)
                        </button>
                    </h2>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div className="card-body p-0 border-top">
                        <div className="osahan-cart">
                            {cartItems.map((data, i) => {
                                return (
                                    <CartItemsCard data={data} />
                                )
                            })}
                            <div>
                                {auth.isUserLogin ?
                                    <a href="#" className="text-decoration-none btn btn-block p-3" type="button" data-toggle="collapse" data-target="#collapsetwo" aria-expanded="true" aria-controls="collapsetwo">
                                        <div className="rounded shadow bg-theme-primary d-flex align-items-center p-3 text-white">
                                            <div className="more">
                                                <h6 className="m-0" style={{ fontWeight: "700", color: "#fff" }}>Subtotal ₹{Math.round(GetTotal)}</h6>
                                                <p className="small m-0 ml-3" style={{ color: "#fff" }}>Proceed to checkout</p>
                                            </div>
                                            <div className="ml-auto"><i className="icofont-simple-right" /></div>
                                        </div>
                                    </a> : <Link to="/login" state={location.pathname} className="text-decoration-none btn btn-block p-3">
                                        <div className="rounded shadow bg-danger d-flex align-items-center p-4 text-white">
                                            <div className="more">
                                                <h6 className="m-0" style={{ fontWeight: "700", color: "#fff" }}>Please Login First</h6>
                                            </div>
                                            <div className="ml-auto"><i className="icofont-simple-right" /></div>
                                        </div>
                                    </Link>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default CartItems;