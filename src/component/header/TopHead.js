import React, { useContext, useEffect, useState, useRef } from 'react';
import contextData from '../../context/MainContext';
import { URL, constants } from '../../URL';
import { useMediaQuery } from '@chakra-ui/react';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Menu, Dropdown } from 'antd';
import { CategoryLoading } from '../Loaders/SkeletonLoader';


const TopHead = ({ setSearchTerm, onFocus, onBlur, focused, searchedProduct, wrapperRef }) => {

    const data = useContext(contextData);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const location = useLocation();
    const navigate = useNavigate();
    const [categories, Setcategories] = useState([]);

    useEffect(() => {
        Setcategories(data.categories);
    }, [data.categories]);


    return (
        <>


            <div class="top-header-group">
                <div class="top-header">
                    <div class="res_main_logo">
                        <Link to="/"><img src="/images/dark-logo-1.svg" alt="" /></Link>
                    </div>
                    <div class="main_logo" id="logo">
                        <Link to="/"><img src="/images/logo.svg" alt="" /></Link>
                        <Link to="/"><img class="logo-inverse" src="/images/dark-logo.svg" alt="" /></Link>
                    </div>


                    <div class="search120">
                        <div class="ui search">
                            <div class="ui left icon input swdh10" ref={wrapperRef}>
                                <input class="prompt srch10" onFocus={onFocus} onChange={e => setSearchTerm(e.target.value)} type="text" placeholder="Search for products.." />
                                <i class='uil uil-search-alt icon icon1'></i>
                                {focused ? (
                                    <div class="search-items-layout" aria-labelledby="dropdownMenuButton">
                                        {searchedProduct.slice(0, 10).map((item, i) => {
                                            return (
                                                <Link onClick={onBlur} class="dropdown-item" to={"/" + (item.product_name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + item.id}>{item.product_name}</Link>
                                            )
                                        })}
                                    </div>
                                ) : (null)}
                            </div>
                        </div>
                    </div>
                    <div class="header_right">
                        <ul>
                            <li>
                                <a class="offer-link"><i class="uil uil-phone-alt"></i>{constants.phone}</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => navigate("/offers")} class="offer-link"><i class="uil uil-gift"></i>Offers</a>
                            </li>
                            <li>
                                <a onClick={() => navigate("/faq")} href="#" class="offer-link"><i class="uil uil-question-circle"></i>Help</a>
                            </li>

                            <li class="ui dropdown" tabIndex="0">
                                <a href="#" class="opts_account">
                                    <img src="/images/avatar/img-5.jpg" alt="" />
                                    <span class="user__name">{data.auth.isUserLogin ? data.user?.user_info?.name?.replace(/ .*/, '') : "Guest"}</span>
                                    <i class="uil uil-angle-down"></i>
                                </a>
                                <div class="menu dropdown_account">
                                    <div class="night_mode_switch__btn">
                                        <a href="#" id="night-mode" class="btn-night-mode">
                                            <i class="uil uil-moon"></i> Night mode
                                            <span class="btn-night-mode-switch">
                                                <span class="uk-switch-button"></span>
                                            </span>
                                        </a>
                                    </div>
                                    {data.auth.isUserLogin ?
                                        <>
                                            {/* <a class="dropdown-item" href="#" onClick={() => navigate("/account")}>My account</a>
                                            <a class="dropdown-item" href="#" onClick={() => navigate("/notification")}>Notification</a>
                                            <a class="dropdown-item" href="#" onClick={() => navigate("/offers")}>Offers</a>
                                            <a class="dropdown-item" href="#" onClick={() => navigate("/orders")}>My Orders</a>
                                            <a class="dropdown-item" href="#" onClick={() => navigate("/address")}>My address</a>
                                            <a class="dropdown-item" href="#" onClick={() => navigate("/condition")}>Conditions</a>
                                            <a class="dropdown-item" href="#" onClick={() => navigate("/contact")}>Contact Us</a>
                                            <a class="dropdown-item" href="#" onClick={() => logOut()}>Logout</a> */}
                                            <a href="javascript:void(0)" onClick={() => navigate("/account")} class="item channel_item"><i class="uil uil-apps icon__1"></i>Dashbaord</a>
                                            <a href="javascript:void(0)" class="item channel_item"><i class="uil uil-box icon__1"></i>My Orders</a>
                                            <a href="javascript:void(0)" class="item channel_item"><i class="uil uil-heart icon__1"></i>My Wishlist</a>
                                            <a href="javascript:void(0)" class="item channel_item"><i class="uil uil-usd-circle icon__1"></i>My Wallet</a>
                                            <a href="javascript:void(0)" class="item channel_item"><i class="uil uil-location-point icon__1"></i>My Address</a>
                                            <a href="javascript:void(0)" class="item channel_item"><i class="uil uil-gift icon__1"></i>Offers</a>
                                            <a href="javascript:void(0)" class="item channel_item"><i class="uil uil-info-circle icon__1"></i>Faq</a>
                                            <a href="javascript:void(0)" onClick={() => data.logOut()} class="item channel_item"><i class="uil uil-lock-alt icon__1"></i>Logout</a>
                                        </>
                                        : <Link to="/login" class="item channel_item"><i class="uil uil-lock-alt icon__1"></i>Login</Link>}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )

}

export default TopHead;


