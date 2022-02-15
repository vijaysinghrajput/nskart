import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ContextData from '../../context/MainContext';
import { Filter } from '../comman/Fillter';
import OshanContainer from '../comman/OshanContainer';
import { BasicVegitableFruit } from '../ProductsCards/BasicVegitableFruit';
import Seo from "../Seo";
import { Menu, Dropdown, Select } from 'antd';


const ProductsBySubcategory = (props) => {

    const { subcatID, subcatName } = useParams();
    const data = useContext(ContextData);
    const { products } = data;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [productsBySub, setProductsBySub] = useState([]);
    const [shorting, setShorting] = useState({});
    const { Option } = Select;

    useEffect(() => {
        // window.scrollTo(0, 0)

        setProductsBySub(products.filter(p => p.category_id == subcatID));
        setIsLoading(false);
    }, [products, subcatID]);

    const handleChange = (change) => {
        const cont = change == "relevence" ? { relevence: true } : change == "priceLTH" ? { priceLTH: true } : change == "priceHTL" ? { priceHTL: true } : { discount: true };
        console.log("love", cont);
        setShortingByClick(cont);
    }

    const setShortingByClick = (shorting) => {
        console.log("ok byee", shorting)
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
                                        <Select defaultValue="Relevence" style={{ width: 120 }} onChange={handleChange}>
                                            <Option value="relevence">Relevence</Option>
                                            <Option value="priceLTH">Price (Low to High)</Option>
                                            <Option value="priceHTL">Price (High to Low)</Option>
                                            <Option value="discount">Discount (High to Low)</Option>
                                        </Select>
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