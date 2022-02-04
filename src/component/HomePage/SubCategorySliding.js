import React, { useContext, useEffect, useState } from 'react';
import contextData from '../../context/MainContext';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import URL from '../../URL';
import { PromoLoading } from '../Loaders/SkeletonLoader';
import { Link, useLocation } from 'react-router-dom';

import { ProductLoading } from '../Loaders/SkeletonLoader';
import { SliderProducts } from '../ProductsCards/SliderProducts';

const SubCategorySliding = (props) => {

    const data = useContext(contextData);

    const [subcategories, setsubcategories] = useState([]);

    const location = useLocation();

    // const { subcategories } = data;
    const [limit, setLimit] = useState(8);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreData = () => {
        // a fake async api call like which sends...
        // few more records in .5 secs ayse hi bnaye hain...
        setTimeout(() => {
            setLimit(limit + 4);
        }, 700);
    };


    useEffect(() => {
        setsubcategories(data.subcategories);
    }, [data.subcategories]);

    const options = {
        autoplay: true,
        autoplayHoverPause: true,
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        animateIn: true,
        animateOut: true,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 6
            },
            1000: {
                items: 10
            }
        }
    };

    return (
        <>
            <div class="pt-3 osahan-promos">

                {data.isLoading ? <>
                    <PromoLoading />
                </> :
                    <div class="promo-sliders pb-0 mb-0">
                        {subcategories.length ? (
                            <OwlCarousel className='owl-theme' {...options}>
                                {subcategories.map((item, i) => {
                                    return (
                                        <div >
                                            <div class="list-card bg-white  rounded overflow-hidden position-relative shadow-sm">
                                                <div class="p-4">

                                                    <Link state={location.pathname} to={"/" + (item.name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + item.id + "/" + item.name}>
                                                        <img src={URL + "/images/category_images/" + item.image} class="img-fluid item-img w-100 mb-3"


                                                        />

                                                        <p class="m-0  text-center" style={{ color: "#505050", fontSize: 8, fontWeight: 'bold' }}>{item.name}</p>

                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </OwlCarousel>
                        ) : null}
                    </div>
                }
            </div>
        </>
    )

}

export default SubCategorySliding;