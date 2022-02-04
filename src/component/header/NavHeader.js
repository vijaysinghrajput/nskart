import React, { useContext, useEffect, useState } from 'react';
import contextData from '../../context/MainContext';
import URL from '../../URL';
import { useMediaQuery } from '@chakra-ui/react';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useLocation } from 'react-router-dom';
import { CategoryLoading } from '../Loaders/SkeletonLoader';


const NavHeader = (props) => {

    const data = useContext(contextData);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const location = useLocation();
    const [categories, Setcategories] = useState([]);

    useEffect(() => {
        Setcategories(data.categories);
    }, [data.categories]);


    return (
        <>





            <div class="sub-header-group">
                <div class="sub-header">
                    <div class="ui dropdown">
                        <a href="#" class="category_drop hover-btn" data-toggle="modal" data-target="#category_model" title="Categories"><i class="uil uil-apps"></i><span class="cate__icon">Select Category</span></a>
                    </div>
                    <nav class="navbar navbar-expand-lg navbar-light py-3">
                        <div class="container-fluid">
                            <button class="navbar-toggler menu_toggle_btn" type="button" data-target="#navbarSupportedContent"><i class="uil uil-bars"></i></button>
                            <div class="collapse navbar-collapse d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end bg-dark1 p-3 p-lg-0 mt1-5 mt-lg-0 mobileMenu" id="navbarSupportedContent">
                                <ul class="navbar-nav main_nav align-self-stretch">
                                    <li class="nav-item"><a href="index.html" class="nav-link active" title="Home">Home</a></li>
                                    <li class="nav-item"><a href="index.html" class="nav-link active" title="Home">About Us</a></li>
                                    <li class="nav-item"><a href="index.html" class="nav-link " title="Home">Offers</a></li>
                                    <li class="nav-item"><a href="index.html" class="nav-link " title="Home">Trending Products</a></li>
                                    <li class="nav-item"><a href="index.html" class="nav-link " title="Home">Contact Us</a></li>








                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div class="catey__icon">
                        <a href="#" class="cate__btn" data-toggle="modal" data-target="#category_model" title="Categories"><i class="uil uil-apps"></i></a>
                    </div>
                    <div class="header_cart order-1">
                        <a href="#" class="cart__btn hover-btn pull-bs-canvas-left" title="Cart"><i class="uil uil-shopping-cart-alt"></i><span>Cart</span><ins>2</ins><i class="uil uil-angle-down"></i></a>
                    </div>
                    <div class="search__icon order-1">
                        <a href="#" class="search__btn hover-btn" data-toggle="modal" data-target="#search_model" title="Search"><i class="uil uil-search"></i></a>
                    </div>
                </div>
            </div>


        </>
    )

}

export default NavHeader;


