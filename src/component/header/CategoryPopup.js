import React, { useContext, useEffect, useState } from 'react';
import contextData from '../../context/MainContext';
import URL from '../../URL';
import { useMediaQuery } from '@chakra-ui/react';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CategoryLoading } from '../Loaders/SkeletonLoader';
import $ from 'jquery';


const CategoryPopup = (props) => {

    const data = useContext(contextData);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const location = useLocation();
    const navigate = useNavigate();
    const [categories, Setcategories] = useState([]);

    useEffect(() => {
        Setcategories(data.categories);
    }, [data.categories]);

    const diploy = (id, name) => {
        const direct = "/categories/" + id + "/" + name;
        document.getElementsByClassName("close")[0].click();
        navigate(direct);
    }


    return (
        <>


            <div id="category_model" class="header-cate-model main-gambo-model modal fade" data-dismiss="modal" tabindex="-1" role="dialog" aria-modal="false">
                <div class="modal-dialog category-area" role="document">
                    <div class="category-area-inner">
                        <div class="modal-header">
                            <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                                <i class="uil uil-multiply"></i>
                            </button>
                        </div>
                        <div class="category-model-content modal-content">
                            <div class="cate-header">
                                <h4 className='text-light' style={{ fontWeight: "700" }}>Select Category</h4>
                            </div>
                            <ul class="category-by-cat">
                                {data.isLoading ? (
                                    <>
                                        <CategoryLoading />
                                        <CategoryLoading />
                                        <CategoryLoading />
                                        <CategoryLoading />
                                    </>
                                ) : categories.length ? (
                                    < >
                                        {categories.map((item, i) => {
                                            return (
                                                <li >
                                                    <div
                                                        class="single-cat-item"
                                                        style={{ cursor: "pointer", }}
                                                        onClick={() => diploy(item.id, item.name)}
                                                    // to={"/categories/" + item.id + "/" + item.name}
                                                    >
                                                        <div class="icon">
                                                            <img src={URL + "/images/category_images/" + item.image}
                                                                alt={item.name + " in Gorakhpur | NsKart is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                                                                title={item.name + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                                                            />
                                                        </div>
                                                        <div class="text" style={{ color: "#000", whiteSpace: "nowrap", textOverflow: 'ellipsis', overflow: 'hidden', textAlign: "center" }}>{item.name} </div>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </>
                                ) : null}

                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )

}

export default CategoryPopup;


