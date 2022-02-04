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
import { CategoryLoading } from '../Loaders/SkeletonLoader';

const Promo = (props) => {

    const data = useContext(contextData);



    const location = useLocation();

    const { categories } = data;

    const { products } = data;
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
        if (products.length !== 0 && products.length <= limit) {
            setHasMore(false)
            console.log(products.length, limit)
        }
    }, [limit])




    const options = {
        autoplay: true,
        autoplayHoverPause: true,
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
            0: {
                items: 3
            },
            600: {
                items: 7
            },
            1000: {
                items: 10
            }
        }
    };

    return (
        <>

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
                            <div class="py-3 osahan-promos">
                                <div class="d-flex align-items-center mb-3">
                                    <h5 class="m-0">{item.name} {item.id}</h5>
                                </div>
                                {data.isLoading ? <>
                                    <PromoLoading />
                                </> :
                                    <div class="promo-sliders pb-0 mb-0">
                                        {products.length ? (
                                            <OwlCarousel className='owl-theme' {...options}>
                                                {products.map((itemss, i) => {
                                                    return (

                                                        < >
                                                            {item.id === itemss.parent_id ? (
                                                                <div class="">

                                                                    <SliderProducts data={itemss} />

                                                                </div>
                                                            ) : null}



                                                        </>
                                                    )
                                                })}
                                            </OwlCarousel>
                                        ) : null}
                                    </div>
                                }
                            </div>
                        )
                    })}
                </>
            ) : null}






        </>
    )

}

export default Promo;