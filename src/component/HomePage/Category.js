import React, { useContext, useEffect, useState } from 'react';
import contextData from '../../context/MainContext';
import URL from '../../URL';
import { useMediaQuery } from '@chakra-ui/react';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useLocation } from 'react-router-dom';
import { CategoryLoading } from '../Loaders/SkeletonLoader';


const Category = (props) => {

    const data = useContext(contextData);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const location = useLocation();
    const [categories, Setcategories] = useState([]);

    useEffect(() => {

        window.scrollTo({ top: 0, behavior: 'smooth' });

        Setcategories(data.categories);
    }, [data.categories]);


    return (
        <>
            <div class="osahan-categories">
                {console.log(location.pathname)}
                {location.pathname !== "/category" &&
                    <div class="d-flex align-items-center mb-2">
                        <h5 class="mb-3" style={{ fontSize: 24 }}>Shop By Category</h5>

                    </div>
                }
                <div class="row">
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
                                    <div class="col-4 col-lg-2 col-md-3 mb-3">
                                        <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                                            <div class="p-4">

                                                <Link state={location.pathname} to={"/categories/" + item.id + "/" + item.name}>
                                                    <img src={URL + "/images/category_images/" + item.image} class="img-fluid item-img w-100 mb-3"
                                                        alt={item.name + " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                                                        title={item.name + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}

                                                    />
                                                    <a class="small-reward-dt hover-btn p-2" style={{ color: "#fff", whiteSpace: "nowrap", textOverflow: 'ellipsis', overflow: 'hidden', textAlign: "center" }}>{item.name}</a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    ) : null}

                </div>
            </div>
        </>
    )

}

export default Category;


