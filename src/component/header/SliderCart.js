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
        const price = (b.price) - ((b.price) * (b.discount / 100));
        return a + Number(price * b["itemQuant"]);
    }, 0);

    const GetTotalSaving = cartItems.reduce(function (a, b) {
        const discount = ((b.price) * (b.discount / 100));
        return a + Number(discount * b["itemQuant"]);
    }, 0);


    return (
        <>


            <div class="bs-canvas bs-canvas-left position-fixed bg-cart h-100">
                <div class="bs-canvas-header side-cart-header p-3 ">
                    <div class="d-inline-block  main-cart-title" >My Cart <span>({data.cartItems.length} items)</span></div>
                    <button type="button" class="bs-canvas-close close" aria-label="Close"><i class="uil uil-multiply"></i></button>
                </div>
                <div class="bs-canvas-body">

                    {cartItems.map((data, i) => {
                        return (
                            <CartSliderItems data={data} />
                        )
                    })}
                </div>
                {cartItems.length &&
                    <div class="bs-canvas-footer">
                        <div class="cart-total-dil saving-total ">
                            <h4>Total Saving</h4>
                            <span>$₹{Math.round(GetTotalSaving)}</span>
                        </div>
                        <div class="main-total-cart">
                            <h2>Total</h2>
                            <span> ₹{Math.round(GetTotal)}</span>
                        </div>
                        <div class="checkout-cart">
                            <a href="#" class="promo-code">Have a promocode?</a>
                            <Link to="/cart" class="cart-checkout-btn bs-canvas-close hover-btn">Proceed to Checkout</Link>
                        </div>
                    </div>
                }
            </div>

        </>
    )

}

export default SliderCart;


