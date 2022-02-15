import React, { useContext, useEffect, useState } from 'react';
import contextData from '../../context/MainContext';
import URL from '../../URL';
import { useMediaQuery } from '@chakra-ui/react';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CategoryLoading } from '../Loaders/SkeletonLoader';


const SeachPopup = ({ setSearchTerm, searchedProduct }) => {

    const data = useContext(contextData);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const location = useLocation();
    const navigate = useNavigate();
    const [categories, Setcategories] = useState([]);

    useEffect(() => {
        Setcategories(data.categories);
    }, [data.categories]);

    const diploy = (name, id) => {
        const direct = "/" + (name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + id;
        document.getElementsByClassName("btn-close-mobile")[0].click();
        navigate(direct);
    }

    return (
        <>
            <div id="search_model" class="header-cate-model main-gambo-model modal fade" tabindex="-1" role="dialog" aria-modal="false">
                <div class="modal-dialog search-ground-area" role="document">
                    <div class="category-area-inner">
                        <div class="modal-header">
                            <button type="button" class="close btn-close btn-close-mobile" data-dismiss="modal" aria-label="Close">
                                <i class="uil uil-multiply"></i>
                            </button>
                        </div>
                        <div class="category-model-content modal-content">
                            <div class="search-header">
                                <form action="#">
                                    <input type="search" onChange={e => setSearchTerm(e.target.value)} placeholder="Search for products..." />
                                    <button type="submit"><i class="uil uil-search"></i></button>
                                </form>
                            </div>
                            <div class="search-by-cat">
                                <a href="#" class="single-cat px-0">
                                    {searchedProduct.slice(0, 10).map((item, i) => {
                                        return (
                                            <div class="text p-1" onClick={() => diploy(item.product_name, item.id)}>
                                                <div class="dropdown-item">{item.product_name}</div>
                                            </div>
                                        )
                                    })}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default SeachPopup;


