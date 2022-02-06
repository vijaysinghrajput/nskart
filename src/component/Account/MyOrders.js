import React from 'react';
import Base64 from "../../helper/EncodeDecode";
import Cookies from 'universal-cookie';
import URL from "../../URL";
import { useEffect } from 'react';
import { useState } from 'react';
import { ModalDeliverd } from './OrderHistory/ModalDeliverd';
import { ModalProgress } from './OrderHistory/ModalInProgress';
import { ModalCanceled } from './OrderHistory/ModalCanceled';

const cookies = new Cookies();

export const MyOrder = (props) => {

    const [ordersHistory, setOrdersHistory] = useState([]);


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        const userID = cookies.get("userID");
        const UserID = Base64.atob(userID)
        fetch(URL + "/APP-API/App/FetchOrders", {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                UserID
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                // functionality.fetchAllData(responseJson);
                setOrdersHistory(responseJson);
                console.log("orders", responseJson)
            })
            .catch((error) => {
                //  console.error(error);
            });
    };
    return (
        <>
            <div class="col-md-12">
                <div class="main-title-tab">
                    <h4><i class="uil uil-box"></i>My Orders</h4>
                </div>
            </div>
            <div class="col-lg-12 col-md-12">
                <div class="pdpt-bg">
                    <div class="pdpt-title">
                        <h6>Delivery Timing 10 May, 3.00PM - 6.00PM</h6>
                    </div>
                    <div class="order-body10">
                        <ul class="order-dtsll">
                            <li>
                                <div class="order-dt-img">
                                    <img src="images/groceries.svg" alt="" />
                                </div>
                            </li>
                            <li>
                                <div class="order-dt47">
                                    <h4>Gambo - Ludhiana</h4>
                                    <p>Delivered - Gambo</p>
                                    <div class="order-title">2 Items <span data-inverted="" data-tooltip="2kg broccoli, 1kg Apple" data-position="top center">?</span></div>
                                </div>
                            </li>
                        </ul>
                        <div class="total-dt">
                            <div class="total-checkout-group">
                                <div class="cart-total-dil">
                                    <h4>Sub Total</h4>
                                    <span>$25</span>
                                </div>
                                <div class="cart-total-dil pt-3">
                                    <h4>Delivery Charges</h4>
                                    <span>Free</span>
                                </div>
                            </div>
                            <div class="main-total-cart">
                                <h2>Total</h2>
                                <span>$25</span>
                            </div>
                        </div>
                        <div class="track-order">
                            <h4>Track Order</h4>
                            <div class="bs-wizard" style={{ borderBottom: 0 }}>
                                <div class="bs-wizard-step complete">
                                    <div class="text-center bs-wizard-stepnum">Placed</div>
                                    <div class="progress"><div class="progress-bar"></div></div>
                                    <a href="#" class="bs-wizard-dot"></a>
                                </div>
                                <div class="bs-wizard-step complete">
                                    <div class="text-center bs-wizard-stepnum">Packed</div>
                                    <div class="progress"><div class="progress-bar"></div></div>
                                    <a href="#" class="bs-wizard-dot"></a>
                                </div>
                                <div class="bs-wizard-step active">
                                    <div class="text-center bs-wizard-stepnum">On the way</div>
                                    <div class="progress"><div class="progress-bar"></div></div>
                                    <a href="#" class="bs-wizard-dot"></a>
                                </div>
                                <div class="bs-wizard-step disabled">
                                    <div class="text-center bs-wizard-stepnum">Delivered</div>
                                    <div class="progress"><div class="progress-bar"></div></div>
                                    <a href="#" class="bs-wizard-dot"></a>
                                </div>
                            </div>
                        </div>
                        <div class="alert-offer">
                            <img src="images/ribbon.svg" alt="" />
                            Cashback of $2 will be credit to Gambo Super Market wallet 6-12 hours of delivery.
                        </div>
                        <div class="call-bill">
                            <div class="delivery-man">
                                Delivery Boy - <a href="#"><i class="uil uil-phone"></i> Call Us</a>
                            </div>
                            <div class="order-bill-slip">
                                <a href="#" class="bill-btn5 hover-btn">View Bill</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pdpt-bg">
                    <div class="pdpt-title">
                        <h6>Delivery Timing 10 May, 3.00PM - 6.00PM</h6>
                    </div>
                    <div class="order-body10">
                        <ul class="order-dtsll">
                            <li>
                                <div class="order-dt-img">
                                    <img src="images/groceries.svg" alt="" />
                                </div>
                            </li>
                            <li>
                                <div class="order-dt47">
                                    <h4>Gambo - Ludhiana</h4>
                                    <p>Delivered - Gambo</p>
                                    <div class="order-title">2 Items <span data-inverted="" data-tooltip="2kg broccoli, 1kg Apple" data-position="top center">?</span></div>
                                </div>
                            </li>
                        </ul>
                        <div class="total-dt">
                            <div class="total-checkout-group">
                                <div class="cart-total-dil">
                                    <h4>Sub Total</h4>
                                    <span>$25</span>
                                </div>
                                <div class="cart-total-dil pt-3">
                                    <h4>Delivery Charges</h4>
                                    <span>Free</span>
                                </div>
                            </div>
                            <div class="main-total-cart">
                                <h2>Total</h2>
                                <span>$25</span>
                            </div>
                        </div>
                        <div class="track-order">
                            <h4>Track Order</h4>
                            <div class="bs-wizard" style={{ borderBottom: 0 }}>
                                <div class="bs-wizard-step complete">
                                    <div class="text-center bs-wizard-stepnum">Placed</div>
                                    <div class="progress"><div class="progress-bar"></div></div>
                                    <a href="#" class="bs-wizard-dot"></a>
                                </div>
                                <div class="bs-wizard-step complete">
                                    <div class="text-center bs-wizard-stepnum">Packed</div>
                                    <div class="progress"><div class="progress-bar"></div></div>
                                    <a href="#" class="bs-wizard-dot"></a>
                                </div>
                                <div class="bs-wizard-step active">
                                    <div class="text-center bs-wizard-stepnum">On the way</div>
                                    <div class="progress"><div class="progress-bar"></div></div>
                                    <a href="#" class="bs-wizard-dot"></a>
                                </div>
                                <div class="bs-wizard-step disabled">
                                    <div class="text-center bs-wizard-stepnum">Delivered</div>
                                    <div class="progress"><div class="progress-bar"></div></div>
                                    <a href="#" class="bs-wizard-dot"></a>
                                </div>
                            </div>
                        </div>
                        <div class="call-bill">
                            <div class="delivery-man">
                                <a href="#"><i class="uil uil-rss"></i>Feedback</a>
                            </div>
                            <div class="order-bill-slip">
                                <a href="#" class="bill-btn5 hover-btn">View Bill</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}