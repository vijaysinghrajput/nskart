import React, { useContext, useEffect } from 'react';
import { Button, useMediaQuery } from '@chakra-ui/react';
import Address from './Address';
import CartItems from './CartItems';
import DeliveryTiming from './DeliveryTiming';
import PaymentDetails from './PaymentDetails';
import PaymentOption from './PaymentOption';
import MainContext from '../../context/MainContext';
import { useState } from 'react';
import Checkout from '../Checkout/Checkout';
import Cookies from 'universal-cookie';
import Base64 from '../../helper/EncodeDecode';
// import { OrderSuccessFull } from './OrderSuccessfull';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();


const Cart = (props) => {

    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");

    const { auth, cartItems, genRanHex, totalAmount, cartDetails, setCartDetails, removeCart } = useContext(MainContext);

    const [selectedAddress, setAddress] = useState();
    const [selectedDeliveryTiming, setDeliveryTiming] = useState();
    const [selectedPaymentOption, setPayment] = useState("COD");
    const [orderSuccessFull, setOrderSuccessFull] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const UserIDs = cookies.get("userID");
    const UserID = UserIDs === undefined ? "" : Base64.atob(UserIDs);
    const navigator = useNavigate();

    const getDate = (date) => {
        let dateObj = new Date(date);
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        return day + "/" + month + "/" + year;
    }

    useEffect(() => {
        console.log(selectedAddress);
    }, [selectedAddress])

    const checkOutData = {
        selectedAddress,
        selectedDeliveryTiming,
        selectedPaymentOption,
        cartItems
    };

    const placeOrder = () => {
        const orderID = `${+ new Date()}${genRanHex(16)}`;
        setOrderSuccessFull(true);
        const couponId = cartDetails.couponDetails !== undefined ? cartDetails.couponDetails[0]?.coupon_id : "";
        fetch(URL + "/APP-API/App/finalPlaceOrder", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                orderID,
                AddressId: cartDetails.selectedAddress.address_id,
                UserID,
                FinalTotalAmount: totalAmount,
                iscouponApplied: cartDetails.couponApplied,
                PaymentMode: cartDetails.selectedPaymentOption,
                couponId,
                isDevApplied: cartDetails.isDeliveryChargeApplied,
                delcharge: cartDetails.deliveryCharge,
                order_time: + new Date() / 1000,
                delivery_date: getDate(cartDetails.selectedDeliveryTiming.day),
                delivery_slot: cartDetails.selectedDeliveryTiming.timingSlot,
                cartItems
            })

        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("responce from server", responseJson);
                // setOrderSuccessFull(true);
                setCartDetails([]);
                removeCart();
                responseJson.status && navigator("/orderSuccess", { state: { order: true } });
            })
            .catch((error) => {
                //  console.error(error);
            });
    }

    return (
        <>
            <section className="pb-4 osahan-main-body">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 pb-3">
                            {navigate ? <Checkout setNavigate={setNavigate} checkOutData={checkOutData} /> : (
                                <div className="accordion" id="accordionExample">
                                    <CartItems />
                                    {auth.isUserLogin && <>
                                        <Address setAddress={setAddress} />
                                        <DeliveryTiming setDeliveryTiming={setDeliveryTiming} />
                                        <PaymentOption selectedAddress={selectedAddress} setNavigate={setNavigate} setPayment={setPayment} />
                                    </>}
                                </div>
                            )}
                        </div>
                        {isNotSmallerScreen ?
                            <div className="col-lg-4">
                                <div className="sticky_sidebar">
                                    <PaymentDetails />
                                    {navigate && <Button isLoading={orderSuccessFull} onClick={() => placeOrder()} class="btn bg-theme-primary btn-lg btn-block mt-3 mb-3">Place Order</Button>}
                                </div>
                            </div>
                            :
                            navigate && <div className="col-lg-4 mb-5">
                                <div className="sticky_sidebar">
                                    <PaymentDetails />
                                    {navigate && <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%", background: "#fff", padding: 10 }}>
                                        <Button isLoading={orderSuccessFull} onClick={() => placeOrder()} class="btn bg-theme-primary btn-lg btn-block">Place Order</Button>
                                    </div>}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>

        </>
    )

}

export default Cart;