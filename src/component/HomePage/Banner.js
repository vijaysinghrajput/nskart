import React, { useContext, useEffect, useState } from 'react';
import contextData from '../../context/MainContext';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import URL from '../../URL';
import { PromoLoading } from '../Loaders/SkeletonLoader';

const Banner = (props) => {

    const data = useContext(contextData);

    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        setBannerData(data.banners);
    }, [data.banners]);

    const options = {
        autoplay: true,
        autoplayHoverPause: true,
        loop: true,
        margin: 10,
        stagePadding: 40,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            }
        }
    };

    return (
        <>
            <div class="pb-3 osahan-promos">

                {data.isLoading ? <>
                    <PromoLoading />
                </> :
                    <div class="promo-sliders pb-0 mb-0">
                        {bannerData.length ? (
                            <OwlCarousel className='owl-theme' {...options}>
                                {bannerData.map((item, i) => {
                                    return (
                                        <div className="item">
                                            <div class="osahan-slider-item mx-2">
                                                <a href="#"><img src={URL + '/images/offer-image/' + item.image}
                                                    class="img-fluid mx-auto rounded" alt="Responsive image" /></a>
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

export default Banner;