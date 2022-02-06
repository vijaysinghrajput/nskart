import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContextData from '../../context/MainContext';
import { Filter } from '../comman/Fillter';
import OshanContainer from '../comman/OshanContainer';
import { BasicVegitableFruit } from '../ProductsCards/BasicVegitableFruit';
import Seo from "../Seo";



const ProductsBySubcategory = (props) => {

    const { subcatID, subcatName } = useParams();
    const data = useContext(ContextData);
    const { products } = data;
    const [isLoading, setIsLoading] = useState(true);
    const [productsBySub, setProductsBySub] = useState([]);
    const [shorting, setShorting] = useState({});

    useEffect(() => {
        // window.scrollTo(0, 0)

        setProductsBySub(products.filter(p => p.category_id == subcatID));
        setIsLoading(false);
    }, [products, subcatID]);

    const setShortingByClick = (shorting) => {
        const myProd = products.filter(p => p.category_id == subcatID);
        const { priceLTH, priceHTL, discount } = shorting;
        priceLTH ? setProductsBySub(myProd.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)))
            : priceHTL ? setProductsBySub(myProd.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)))
                : discount ? setProductsBySub(myProd.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount)))
                    : setProductsBySub(products.filter(p => p.category_id == subcatID))
    }

    return (
        <>
            <Seo
                title={subcatName + " delivery in Gorakhpur | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                descreption={subcatName + " in Gorakhpur | SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                image={null}
            />

            <OshanContainer>

                <div class="gambo-Breadcrumb my-3">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page"> {subcatName} </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <div class="d-flex align-items-center my-3">
                    <h4>{subcatName}</h4>
                    <div class="m-0 text-center ml-auto">
                        <a href="#" data-toggle="modal" data-target="#exampleModal"
                            class="btn text-muted bg-white mr-2"><i class="icofont-filter mr-1"></i> Filter</a>
                    </div>
                </div> */}

                <div className="all-product-grid">

                    <div className="container">


                        <div class="row">
                            <div class="col-lg-12">
                                <div class="product-top-dt">
                                    <div class="product-left-title">
                                        <h2>{subcatName}</h2>
                                    </div>
                                    <div class="product-sort">
                                        <div class="ui selection dropdown vchrt-dropdown">
                                            <input name="gender" type="hidden" value="default" />
                                            <i class="dropdown icon d-icon"></i>
                                            <div class="text">Popularity</div>
                                            <div class="menu">
                                                <div class="item" data-value="0">Popularity</div>
                                                <div class="item" data-value="1">Price - Low to High</div>
                                                <div class="item" data-value="2">Price - High to Low</div>
                                                <div class="item" data-value="3">Alphabetical</div>
                                                <div class="item" data-value="4">Saving - High to Low</div>
                                                <div class="item" data-value="5">Saving - Low to High</div>
                                                <div class="item" data-value="6">% Off - High to Low</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product-list-view">


                            <div class="row">
                                {
                                    productsBySub.map((data, i) => {
                                        return (
                                            <BasicVegitableFruit data={data} />
                                        )
                                    })
                                }
                            </div>


                        </div>



                    </div>


                </div>



                <Filter setShortingMain={setShortingByClick} />
            </OshanContainer>
        </>
    )


}

export default ProductsBySubcategory;