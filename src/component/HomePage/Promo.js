import React, { useContext, useEffect, useState } from 'react';
import contextData from '../../context/MainContext';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import URL from '../../URL';
import { PromoLoading } from '../Loaders/SkeletonLoader';

import { ProductLoading } from '../Loaders/SkeletonLoader';
import { SliderProducts } from '../ProductsCards/SliderProducts';

const Promo = (props) => {

    const data = useContext(contextData);

    const [bannerData, setBannerData] = useState([]);


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



    useEffect(() => {
        setBannerData(data.banners);
    }, [data.banners]);

    const options = {
        autoplay: true,
        autoplayHoverPause: true,
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 4
            },
            1000: {
                items: 6
            }
        }
    };

    return (
        <>
            <div class="py-3 osahan-promos">
                <div class="d-flex align-items-center mb-3">
                    <h5 class="mb-3" style={{ fontSize: 24 }}>Promos for you</h5>
                </div>
                {data.isLoading ? <>
                    <PromoLoading />
                </> :
                    <div class="promo-sliders pb-0 mb-0">
                        {products.length ? (
                            <OwlCarousel className='owl-theme' {...options}>
                                {products.slice(0, 12).map((item, i) => {
                                    return (
                                        <div class="">

                                            <div class="">

                                                <SliderProducts data={item} />



                                            </div>

                                            {/* <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center mt-4">
                        <a href="javascript:void(0)" onClick={() => setLimit(limit + 8)} class="mx-auto btn btn-outline-success btn-sm">See more</a>
                    </div>
                </div> */}
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

export default Promo;