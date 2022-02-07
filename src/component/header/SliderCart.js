import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MainContext from '../../context/MainContext';
import { CartSliderItems } from '../ProductsCards/CartSliderItems';


const SliderCart = (props) => {

    const data = useContext(MainContext);
    const { cartItems, auth } = data;
    const navigation = useNavigate();
    const location = useLocation();
    const GetTotal = cartItems.reduce(function (a, b) {
        return a + Number(b["price"] * b["itemQuant"]);
    }, 0);

    const GetTotalSaving = cartItems.reduce(function (a, b) {
        return a + Number(b["price"] * b["itemQuant"]);
    }, 0);


    useEffect(() => {
        data.cartItems.length === 0 && navigation("/")
    }, [data]);


    return (
        <>


            <div class="bs-canvas bs-canvas-left position-fixed bg-cart h-100">
                <div class="bs-canvas-header side-cart-header p-3 ">
                    <div class="d-inline-block  main-cart-title">My Cart <span>({data.cartItems.length} items)</span></div>
                    <button type="button" class="bs-canvas-close close" aria-label="Close"><i class="uil uil-multiply"></i></button>
                </div>
                <div class="bs-canvas-body">

                    {cartItems.map((data, i) => {
                        return (
                            <CartSliderItems data={data} />
                        )
                    })}




                </div>
                <div class="bs-canvas-footer">
                    <div class="cart-total-dil saving-total ">
                        <h4>Total Saving</h4>
                        <span>$11</span>
                    </div>
                    <div class="main-total-cart">
                        <h2>Total</h2>
                        <span> ₹{Math.round(GetTotal)}</span>
                    </div>
                    <div class="checkout-cart">
                        <a href="#" class="promo-code">Have a promocode?</a>
                        <a href="#" class="cart-checkout-btn hover-btn">Proceed to Checkout</a>
                    </div>
                </div>
            </div>

        </>
    )

}

export default SliderCart;


