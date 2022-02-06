import React, { useContext, useEffect, useState } from 'react';
import contextData from '../../context/MainContext';
import URL from '../../URL';
import { useMediaQuery } from '@chakra-ui/react';
// import OwlCarousel from 'react-owl-carousel';
import { useParams } from 'react-router-dom';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useLocation } from 'react-router-dom';
import { CategoryLoading } from '../Loaders/SkeletonLoader';


const SubCategory = (props) => {

    const { subcatID, subcatName } = useParams();

    const data = useContext(contextData);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const location = useLocation();
    const [subcategories, Setsubcategories] = useState([]);

    useEffect(() => {
        Setsubcategories(data.subcategories);
    }, [data.subcategories]);


    return (
        <>
            <div class="osahan-subcategories my-4">
                {console.log(location.pathname)}
                {location.pathname !== "/subcategories" &&
                    <div class="d-flex align-items-center mb-2">
                        <h5 class="mb-3" style={{ fontSize: 24 }}>{subcatName}</h5>

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
                    ) : subcategories.length ? (
                        < >
                            {subcategories.map((item, i) => {
                                return (

                                    <>
                                        {item.parent_id == subcatID ? (
                                            <div class="col-4 col-lg-2 col-md-3 mb-3">
                                                <div class="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm">
                                                    <div class="p-4">

                                                        <Link state={location.pathname} to={"/" + (item.name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + item.id + "/" + item.name}>
                                                            <img src={URL + "/images/category_images/" + item.image} class="img-fluid item-img w-100 mb-3"


                                                            />
                                                            <a class="small-reward-dt hover-btn p-2" style={{ color: "#fff", whiteSpace: "nowrap", textOverflow: 'ellipsis', overflow: 'hidden', textAlign: "center" }}>{item.name}</a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ) :
                                            null}
                                    </>

                                )
                            })}
                        </>
                    ) : null}

                </div>
            </div>
        </>
    )

}

export default SubCategory;


