import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';
import URL from '../URL'
import * as NumericInput from "react-numeric-input";
import GetSubCategory from './GetSubCategory'
import Cookies from 'universal-cookie';
import Dropdown from 'react-multilevel-dropdown';
require('smartmenus');
const cookies = new Cookies()


class Header extends Component {
    constructor(props) {

        super(props);

        this.state = {
            user_name: null,
            UserID: null,
            isLogged: undefined,
            productId: null,
            UserHaveInCart: 0,
            afterDiscountTotal: 0,
            totalAmount: 0,
            SaverTodayDetails: null,
            cartValue: 0,
            GroceryCategory: [],
            FurnutureCategory: [],
            FoodCategory: [],
            allProducts: [],
            searchTerm: '',
            searchedProduct: [],
            isSearchProductLoading: [],
        }

        // this.onChange = this.onChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleNext2 = this.handleNext2.bind(this);


    }

    handleNext2(categoryname) {
        const Routation = "/Categories/" + categoryname;
        this.props.history.push(Routation);

    }

    componentWillReceiveProps(newProps) {
        this.setState({ cartValue: newProps.cartValue });
        this.fetchGroceryCategory();
    }

    handleNext(Routation) {
        this.props.history.push(Routation);
    }

    async componentDidMount() {
        this.fetchGroceryCategory()
        this.fetchFurnutureCategory()
        this.fetchFoodCategory();
    }

    componentDidUpdate(prevProps) {
        // geting all products from main App.js page;
        if (prevProps.allProducts.length != this.props.allProducts.length) {
            this.setState({ allProducts: this.props.allProducts })
        }
        // console.log("this --->", this.props.allProducts);
    }

    SearchProducts = (e) => {
        if (this.state.allProducts.length != 0) {
            this.setState({ searchTerm: e.target.value });
            const filteredClubs = this.state.allProducts.filter(Club => {
                let ClubLowercase = (
                    Club.product_name
                ).toLowerCase();
                let searchTermLowercase = e.target.value.toLowerCase();
                return ClubLowercase.indexOf(searchTermLowercase) > -1;
            });
            setTimeout(() => { this.setState({ isSearchProductLoading: false }) }, 500);
            this.setState({ searchedProduct: filteredClubs });
        }
    }

    fetchGroceryCategory() {
        fetch(URL + "/APP-API/Product/GetStoreSubCategoryByType", {
            method: 'post',
            header: { 'Accept': 'application/json', 'Content-type': 'application/json' },
            body: JSON.stringify({ cats_name: 'Grocery and Daily Needs' })
        })
            .then((response) => response.json())
            .then((responseJson) => { this.setState({ GroceryCategory: responseJson.data, inMemoryrestorentData: responseJson.data }); })
            .catch((error) => { });
    }

    fetchFurnutureCategory() {
        fetch(URL + "/APP-API/Product/GetStoreSubCategoryByType", {
            method: 'post',
            header: { 'Accept': 'application/json', 'Content-type': 'application/json' },
            body: JSON.stringify({ cats_name: 'Furniture' })
        })
            .then((response) => response.json())
            .then((responseJson) => { this.setState({ FurnutureCategory: responseJson.data, inMemoryrestorentData: responseJson.data }); })
            .catch((error) => { });
    }

    fetchFoodCategory() {
        fetch(URL + "/APP-API/Product/GetStoreSubCategoryByType", {
            method: 'post',
            header: { 'Accept': 'application/json', 'Content-type': 'application/json' },
            body: JSON.stringify({ cats_name: 'Food' })
        })
            .then((response) => response.json())
            .then((responseJson) => { this.setState({ FoodCategory: responseJson.data, inMemoryrestorentData: responseJson.data }); })
            .catch((error) => { });
    }

    render() {

        return (

            <React.Fragment>
                {console.log("seacrh --->", this.state.searchedProduct)}
                <div class="border-bottom p-3 d-none mobile-nav">
                    <div class="title d-flex align-items-center">
                        <a href="home.html" class="text-decoration-none text-dark d-flex align-items-center">
                            <img class="osahan-logo mr-2" src="img/logo.svg" />
                            <h4 class="font-weight-bold text-success m-0">Grocery</h4>
                        </a>
                        <p class="ml-auto m-0">
                            <a href="listing.html" class="text-decoration-none bg-white p-1 rounded shadow-sm d-flex align-items-center">
                                <i class="text-dark icofont-sale-discount"></i>
                                <span class="badge badge-danger p-1 ml-1 small">50%</span>
                            </a>
                        </p>

                        <a onClick={() => this.openNav()} href="#" role="button" aria-controls="hc-nav-1" class="toggle ml-3" href="#"><i class="icofont-navigation-menu"></i></a>

                    </div>
                    <a href="search.html" class="text-decoration-none">
                        <div class="input-group mt-3 rounded shadow-sm overflow-hidden bg-white">
                            <div class="input-group-prepend">
                                <button class="border-0 btn btn-outline-secondary text-success bg-white"><i class="icofont-search"></i></button>
                            </div>
                            <input type="text" onChange={this.SearchProducts} class="shadow-none border-0 form-control pl-0" placeholder="Search for Products.." aria-label="" aria-describedby="basic-addon1" />
                        </div>
                    </a>
                </div>

                <div onClick={() => this.DarkMode()} class="theme-switch-wrapper">
                    <label class="theme-switch" for="checkbox">
                        <input type="checkbox" id="checkbox" />
                        <div class="slider round"></div>
                        <i class="icofont-moon"></i>
                    </label>
                    <em>Enable Dark Mode!</em>
                </div>

                <div class="bg-white shadow-sm osahan-main-nav">
                    <nav class="navbar navbar-expand-lg navbar-light bg-white osahan-header py-0 container">
                        <a class="navbar-brand mr-0" href="home.html"><img class="img-fluid logo-img rounded-pill border shadow-sm" src="img/logo.svg" /></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="ml-3 d-flex align-items-center">
                            <div class="dropdown mr-3">
                                <a class="text-dark dropdown-toggle d-flex align-items-center osahan-location-drop" href="#">
                                    <div><i class="icofont-location-pin d-flex align-items-center bg-light rounded-pill p-2 icofont-size border shadow-sm mr-2"></i></div>
                                    <div>
                                        <p class="text-muted mb-0 small">Your Location</p>
                                        Gorakhpur, Uttar Pradesh...
                                    </div>
                                </a>
                            </div>

                            <div class="input-group mr-sm-2 col-lg-12">
                                <input type="text" onChange={this.SearchProducts} class="form-control" id="inlineFormInputGroupUsername2" placeholder="Search for Products.." />
                                <div class="input-group-prepend">
                                    <div class="btn bg-theme-primary rounded-right"><i class="icofont-search"></i></div>
                                </div>
                                {this.state.searchedProduct.length && this.state.searchTerm ? (
                                    <div class="search-items-layout" aria-labelledby="dropdownMenuButton">
                                        {this.state.searchedProduct.slice(0, 10).map((item, i) => {
                                            return (
                                                <a class="dropdown-item" href="javascript:void(0)">{item.product_name}</a>
                                            )
                                        })}
                                    </div>
                                ) : (null)}
                            </div>
                        </div>
                        <div class="ml-auto d-flex align-items-center">

                            <a href="#" data-toggle="modal" data-target="#login" class="mr-2 text-dark bg-light rounded-pill p-2 icofont-size border shadow-sm">
                                <i class="icofont-login"></i>
                            </a>

                            {this.props.isLogin ? (
                                <div class="dropdown mr-3">
                                    <a href="#" class="dropdown-toggle text-dark" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src="img/user.png" class="img-fluid rounded-circle header-user mr-2" /> Hi Osahan
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right top-profile-drop" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="my_account.html">My account</a>
                                        <a class="dropdown-item" href="promos.html">Promos</a>
                                        <a class="dropdown-item" href="my_address.html">My address</a>
                                        <a class="dropdown-item" href="terms_conditions.html">Terms & conditions</a>
                                        <a class="dropdown-item" href="help_support.html">Help & support</a>
                                        <a class="dropdown-item" href="help_ticket.html">Help ticket</a>
                                        <a class="dropdown-item" href="signin.html">Logout</a>
                                    </div>
                                </div>
                            ) : null}

                            <div class="dropdown">
                                <a href="#" class="text-dark dropdown-toggle not-drop" id="dropdownMenuNotification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="icofont-notification d-flex align-items-center bg-light rounded-pill p-2 icofont-size border shadow-sm">

                                    </i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right p-0 osahan-notifications-main" aria-labelledby="dropdownMenuNotification">

                                    <div class="osahan-notifications bg-white border-bottom p-2">
                                        <div class="position-absolute ml-n1 py-2"><i class="icofont-check-circled text-white bg-success rounded-pill p-1"></i></div>
                                        <a href="status_complete.html" class="text-decoration-none text-dark">
                                            <div class="notifiction small">
                                                <div class="ml-3">
                                                    <p class="font-weight-bold mb-1">Yay! Order Complete</p>
                                                    <p class="small m-0"><i class="icofont-ui-calendar"></i> Today, 05:14 AM</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div class="osahan-notifications bg-white border-bottom p-2">
                                        <a href="status_onprocess.html" class="text-decoration-none text-muted">
                                            <div class="notifiction small">
                                                <div class="ml-3">
                                                    <p class="font-weight-bold mb-1">Yipiee. order Success</p>
                                                    <p class="small m-0"><i class="icofont-ui-calendar"></i> Monday, 08:30 PM</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div class="osahan-notifications bg-white p-2">
                                        <a href="status_onprocess.html" class="text-decoration-none text-muted">
                                            <div class="notifiction small">
                                                <div class="ml-3">
                                                    <p class="font-weight-bold mb-1">New Promos Coming</p>
                                                    <p class="small m-0"><i class="icofont-ui-calendar"></i> Sunday, 10:30 AM</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <a href="cart.html" class="ml-2 text-dark bg-light rounded-pill p-2 icofont-size border shadow-sm">
                                <i class="icofont-shopping-cart"></i>
                            </a>
                        </div>
                    </nav>

                    <div class="bg-color-head">
                        <div class="container menu-bar d-flex align-items-center">
                            <ul class="list-unstyled form-inline mb-0">
                                <li class="nav-item active">
                                    <a class="nav-link text-white pl-0" href="home.html">Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Products
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="listing.html">Listing</a>
                                        <a class="dropdown-item" href="product_details.html">Detail</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="picks_today.html">Trending</a>
                                        <a class="dropdown-item" href="recommend.html">Recommended</a>
                                        <a class="dropdown-item" href="fresh_vegan.html">Most Popular</a>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Checkout Process
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="cart.html">Cart</a>
                                        <a class="dropdown-item" href="checkout.html">Checkout</a>
                                        <a class="dropdown-item" href="successful.html">Successful</a>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        My Order
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="my_order.html">My order</a>
                                        <a class="dropdown-item" href="status_complete.html">Status Complete</a>
                                        <a class="dropdown-item" href="status_onprocess.html">Status on Process</a>
                                        <a class="dropdown-item" href="status_canceled.html">Status Canceled</a>
                                        <a class="dropdown-item" href="review.html">Review</a>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link text-white dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Extra Pages
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <a class="dropdown-item" href="verification.html">Verification</a>
                                        <a class="dropdown-item" href="promos.html">Promos</a>
                                        <a class="dropdown-item" href="promo_details.html">Promo Details</a>
                                        <a class="dropdown-item" href="terms_conditions.html">Terms & Conditions</a>
                                        <a class="dropdown-item" href="privacy.html">Privacy</a>
                                        <a class="dropdown-item" href="terms%26conditions.html">Conditions</a>
                                        <a class="dropdown-item" href="help_support.html">Help Support</a>
                                        <a class="dropdown-item" href="help_ticket.html">Help Ticket</a>
                                        <a class="dropdown-item" href="refund_payment.html">Refund Payment</a>
                                        <a class="dropdown-item" href="faq.html">FAQ</a>
                                        <a class="dropdown-item" href="signin.html">Sign In</a>
                                        <a class="dropdown-item" href="signup.html">Sign Up</a>
                                        <a class="dropdown-item" href="search.html">Search</a>
                                    </div>
                                </li>
                            </ul>
                            <div class="list-unstyled form-inline mb-0 ml-auto">
                                <a href="picks_today.html" class="text-white px-3 py-2">Trending</a>
                                <a href="promos.html" class="text-white bg-offer px-3 py-2"><i class="icofont-sale-discount h6"></i>Promos</a>
                            </div>
                        </div>
                    </div>
                </div>





                <nav id="main-nav">
                    <ul class="second-nav">
                        <li><a href="home.html"><i class="icofont-smart-phone mr-2"></i> Home</a></li>
                        <li>
                            <a href="#"><i class="icofont-login mr-2"></i> Authentication</a>
                            <ul>
                                <li><a class="dropdown-item" href="signin.html">Sign In</a></li>
                                <li><a class="dropdown-item" href="signup.html">Sign Up</a></li>
                                <li><a href="verification.html">Verification</a></li>
                            </ul>
                        </li>
                        <li><a class="dropdown-item" href="listing.html">Listing</a></li>
                        <li><a class="dropdown-item" href="product_details.html">Detail</a></li>
                        <li><a class="dropdown-item" href="picks_today.html">Trending</a></li>
                        <li><a class="dropdown-item" href="recommend.html">Recommended</a></li>
                        <li><a class="dropdown-item" href="fresh_vegan.html">Most Popular</a></li>
                        <li><a class="dropdown-item" href="cart.html">Cart</a></li>
                        <li><a class="dropdown-item" href="checkout.html">Checkout</a></li>
                        <li><a class="dropdown-item" href="successful.html">Successful</a></li>
                        <li>
                            <a href="#"><i class="icofont-sub-listing mr-2"></i> My Order</a>
                            <ul>
                                <li><a class="dropdown-item" href="my_order.html">My order</a></li>
                                <li><a class="dropdown-item" href="status_complete.html">Status Complete</a></li>
                                <li><a class="dropdown-item" href="status_onprocess.html">Status on Process</a></li>
                                <li><a class="dropdown-item" href="status_canceled.html">Status Canceled</a></li>
                                <li><a class="dropdown-item" href="review.html">Review</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="icofont-ui-user mr-2"></i> My Account</a>
                            <ul>
                                <li><a class="dropdown-item" href="my_account.html">My account</a></li>
                                <li><a class="dropdown-item" href="promos.html">Promos</a></li>
                                <li><a class="dropdown-item" href="my_address.html">My address</a></li>
                                <li><a class="dropdown-item" href="terms_conditions.html">Terms & conditions</a></li>
                                <li><a class="dropdown-item" href="help_support.html">Help & support</a></li>
                                <li><a class="dropdown-item" href="help_ticket.html">Help ticket</a></li>
                                <li><a class="dropdown-item" href="signin.html">Logout</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="icofont-page mr-2"></i> Pages</a>
                            <ul>
                                <li><a class="dropdown-item" href="verification.html">Verification</a></li>
                                <li><a class="dropdown-item" href="promos.html">Promos</a></li>
                                <li><a class="dropdown-item" href="promo_details.html">Promo Details</a></li>
                                <li><a class="dropdown-item" href="terms_conditions.html">Terms & Conditions</a></li>
                                <li><a class="dropdown-item" href="privacy.html">Privacy</a></li>
                                <li><a class="dropdown-item" href="terms%26conditions.html">Conditions</a></li>
                                <li><a class="dropdown-item" href="help_support.html">Help Support</a></li>
                                <li><a class="dropdown-item" href="help_ticket.html">Help Ticket</a></li>
                                <li><a class="dropdown-item" href="refund_payment.html">Refund Payment</a></li>
                                <li><a class="dropdown-item" href="faq.html">FAQ</a></li>
                                <li><a class="dropdown-item" href="signin.html">Sign In</a></li>
                                <li><a class="dropdown-item" href="signup.html">Sign Up</a></li>
                                <li><a class="dropdown-item" href="search.html">Search</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="icofont-link mr-2"></i> Navigation Link Example</a>
                            <ul>
                                <li>
                                    <a href="#">Link Example 1</a>
                                    <ul>
                                        <li>
                                            <a href="#">Link Example 1.1</a>
                                            <ul>
                                                <li><a href="#">Link</a></li>
                                                <li><a href="#">Link</a></li>
                                                <li><a href="#">Link</a></li>
                                                <li><a href="#">Link</a></li>
                                                <li><a href="#">Link</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Link Example 1.2</a>
                                            <ul>
                                                <li><a href="#">Link</a></li>
                                                <li><a href="#">Link</a></li>
                                                <li><a href="#">Link</a></li>
                                                <li><a href="#">Link</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="#">Link Example 2</a></li>
                                <li><a href="#">Link Example 3</a></li>
                                <li><a href="#">Link Example 4</a></li>
                                <li data-nav-custom-content>
                                    <div class="custom-message">
                                        You can add any custom content to your navigation items. This text is just an example.
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="bottom-nav">
                        <li class="email">
                            <a class="text-success" href="home.html">
                                <p class="h5 m-0"><i class="icofont-home text-success"></i></p>
                                Home
                            </a>
                        </li>
                        <li class="github">
                            <a href="cart.html">
                                <p class="h5 m-0"><i class="icofont-cart"></i></p>
                                CART
                            </a>
                        </li>
                        <li class="ko-fi">
                            <a href="help_ticket.html">
                                <p class="h5 m-0"><i class="icofont-headphone"></i></p>
                                Help
                            </a>
                        </li>
                    </ul>
                </nav>



            </React.Fragment>
        );
    }

    async logOut() {


        cookies.remove("isLogged", null);
        cookies.remove("UserID", null);
        cookies.remove("user_mobile_number", null);
        cookies.remove("user_name", null);
        window.location.reload();


    }

    openNav() {

        var $main_nav = $('#main-nav');
        var $toggle = $('.toggle');

        var defaultOptions = {
            disableAt: false,
            customToggle: $toggle,
            levelSpacing: 40,
            navTitle: 'Askbootstrap',
            levelTitles: true,
            levelTitleAsBack: true,
            pushContent: '#container',
            insertClose: 2
        };

    }


    closeNav() { document.getElementById("mySidenav").classList.remove('open-side'); }

    mobileNav() {

        $('.toggle-nav').on('click', function () {
            $('.sm-horizontal').css("right", "0px");
        });
        $(".mobile-back").on('click', function () {
            $('.sm-horizontal').css("right", "-410px");
        });

    }

    DarkMode() {

        // const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
        const currentTheme = localStorage.getItem('theme');

        alert(currentTheme)
        if (currentTheme) {

            // document.documentElement.setAttribute('class', currentTheme);

            if (currentTheme === 'dark') {
                document.documentElement.setAttribute('class', 'light');
                localStorage.setItem('theme', 'light');

            }
            else {
                document.documentElement.setAttribute('class', 'dark');
                localStorage.setItem('theme', 'dark');
            }

        }

    }


    /*=====================
     24. add to cart sidebar js
     ==========================*/
    // openCart() {
    //   document.getElementById("cart_side").classList.add('open-side');
    // }

    // closeCart() {
    //   document.getElementById("cart_side").classList.remove('open-side');
    //   // window.location.reload(); 
    // }


}



export default withRouter(Header);