import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import MainData from '../context/MainContext';
import { useMediaQuery } from '@chakra-ui/react';
import { constants } from '../URL';


const Footer = () => {

    const data = useContext(MainData);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const { categories } = data;

    const navigate = useNavigate();


    return (
        <>
            {isNotSmallerScreen &&
                <footer class="footer">
                    <div class="footer-first-row">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-6 col-sm-6">
                                    <ul class="call-email-alt">
                                        <li><a href="#" class="callemail"><i class="uil uil-dialpad-alt"></i>{constants.phone}</a></li>
                                        <li>
                                            <a class="callemail" href={`mailto:${constants.email}`}><i class="uil uil-envelope-alt"></i> {constants.email}</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <div class="social-links-footer">
                                        <ul>
                                            <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                            <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
                                            <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                            <li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer-second-row">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-3 col-md-6 col-sm-6">
                                    <div class="second-row-item">
                                        <h4>Categories</h4>
                                        <ul>

                                            {categories.length ? (
                                                < >
                                                    {categories.map((item, i) => {
                                                        return (

                                                            <Link to={"/categories/" + item.id + "/" + item.name}>
                                                                <li>
                                                                    <a href="#" >{item.name}</a>
                                                                </li>
                                                            </Link>

                                                        )
                                                    })}
                                                </>
                                            ) : null}


                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6">
                                    <div class="second-row-item">
                                        <h4>Useful Links</h4>
                                        <ul>
                                            <li> <a href="#" onClick={() => navigate("/about")} class="text-dark"> About   </a></li>
                                            <li> <a href="#" onClick={() => navigate("/offers")} class="text-dark">Offers</a></li>
                                            <li> <a href="#" onClick={() => navigate("/treding")} class="text-dark">Treding</a></li>
                                            <li> <a href="#" onClick={() => navigate("/contact")} class="text-dark">Contact Us</a></li>

                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6">
                                    <div class="second-row-item">
                                        <h4>Corporate</h4>
                                        <ul>
                                            <li>
                                                <a href="#" onClick={() => navigate("/term-and-condition")} class="text-dark">  Term & Condition   </a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => navigate("/privacy-and-policy")} class="text-dark">  Privacy & Policy   </a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => navigate("/shipping-policy")} class="text-dark">   Shipping Policy   </a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => navigate("/return-and-refund-policy")} class="text-dark">  Return &  Refund Policy   </a>
                                            </li>
                                            <li>
                                                <a href="#" onClick={() => navigate("/faq")} class="text-dark"> FAQ   </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6">
                                    <div class="second-row-item-app">
                                        <h4>Download App</h4>
                                        <ul>
                                            <li><a href="#"><img class="download-btn" src="/images/download-1.svg" alt="" /></a></li>
                                            {/* <li><a href="#"><img class="download-btn" src="/images/download-2.svg" alt="" /></a></li> */}
                                        </ul>
                                    </div>
                                    <div class="second-row-item-payment">
                                        <h4>Payment Method</h4>
                                        <div class="footer-payments">
                                            <ul id="paypal-gateway" class="financial-institutes">
                                                <li class="financial-institutes__logo">
                                                    <img alt="Visa" title="Visa" src="/images/footer-icons/pyicon-6.svg" />
                                                </li>
                                                <li class="financial-institutes__logo">
                                                    <img alt="Visa" title="Visa" src="/images/footer-icons/pyicon-1.svg" />
                                                </li>
                                                <li class="financial-institutes__logo">
                                                    <img alt="MasterCard" title="MasterCard" src="/images/footer-icons/pyicon-2.svg" />
                                                </li>
                                                <li class="financial-institutes__logo">
                                                    <img alt="American Express" title="American Express" src="/images/footer-icons/pyicon-3.svg" />
                                                </li>
                                                <li class="financial-institutes__logo">
                                                    <img alt="Discover" title="Discover" src="/images/footer-icons/pyicon-4.svg" />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer-last-row">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="footer-bottom-links">

                                    </div>
                                    <div class="copyright-text">
                                        <i class="uil uil-copyright"></i>Copyright 2022 <b>NSKART</b> . All rights reserved
                                    </div>
                                    <div class="copyright-text">
                                        <i class="uil uil-company"></i>Design & Developed By  <a>Skyably IT Solution</a> .
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            }
        </>
    );
}

export default Footer;
