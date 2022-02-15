import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import URL from '../../URL';
import ContextData from '../../context/MainContext';
import { MdDelete } from 'react-icons/md';
import { BsPlusLg, BsFillCartPlusFill, BsFillCartXFill } from 'react-icons/bs';
import { useDisclosure, Modal, ModalBody, ModalContent, ModalOverlay, ModalCloseButton, ModalFooter, Button, ModalHeader } from '@chakra-ui/react';

export const BasicVegitableFruit = ({ data }) => {

    const mainData = useContext(ContextData);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation();

    const [productData, setProductData] = useState({
        itemQuant: 0,
        productDetails: data,
        price: data.price
    });

    useEffect(() => {
        const isAvilable = mainData.cartItems.find(o => o.id === data.id);
        isAvilable ? setProductData({
            ...productData,
            itemQuant: isAvilable.itemQuant,
            price: isAvilable.price
        }) : setProductData({
            ...productData,
            itemQuant: 0,
            price: data.price
        })
    }, [mainData, data]);


    return (
        <>

            <div className="col-6 col-md-3 mb-3">

                <div class="product-item mb-30">


                    <Link state={location.pathname} to={"/" + (data.product_name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + data.id}
                        class="product-img">
                        <img border="0" src={URL + "/images/product-images/" + data.product_image} alt="" />
                        <div class="product-absolute-options">

                            {data.discount !== "0" && <span class="offer-badge-1">{Math.round(data.discount)} %</span>}

                        </div>
                    </Link>
                    <div class="product-text-dt">
                        <Link state={location.pathname} to={"/" + (data.product_name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/" + data.id}
                        >

                            <h6 style={{ color: 'black' }}>{data.product_name.substring(0, 25)} {data.product_size + data.product_unit}</h6>
                            <div class="product-price">₹{Math.round((data.price) - ((data.price) * (data.discount / 100)))} <span>₹{Math.round(data.price)}</span></div>

                        </Link>
                        <div className="qty-cart">
                            {!productData.itemQuant ? (
                                <div className="plusMinusFun d-flex justify-content-between px-3 align-items-center" style={{ width: 'fit-content', padding: 4, marginLeft: "auto" }}>
                                    <BsFillCartPlusFill size="20" style={{ color: "#0a0a0a", cursor: "pointer", fontSize: 20 }} onClick={() =>
                                        mainData.addToCart({
                                            ...data,
                                            itemQuant: 1,
                                            cartId: data.id
                                        })
                                    } />
                                </div>
                            ) : (
                                <div class="plusMinusFun plusMinusFunButton d-flex justify-content-between px-3 align-items-center">
                                    {productData.itemQuant === 1 ? (
                                        <BsFillCartXFill
                                            size="24"
                                            style={{ marginLeft: 5, marginRight: 6, fontSize: 18, cursor: "pointer", color: "#0a0a0a" }}
                                            onClick={() =>
                                                mainData.removeFromCart(data.id)}
                                        />
                                    ) : (
                                        <AiOutlineMinus
                                            size="24"
                                            style={{ marginLeft: 5, marginRight: 6, fontSize: 18, cursor: "pointer", color: "#454545" }}
                                            onClick={() => mainData.addToCart({
                                                ...data,
                                                itemQuant: productData.itemQuant - 1,
                                                price: productData.price - data.price,
                                                cartId: data.id
                                            })}
                                        />
                                    )}
                                    <h5 className="m-0" style={{ fontSize: 20 }}>{productData.itemQuant}</h5>
                                    <AiOutlinePlus
                                        size="24"
                                        style={{ marginLeft: 5, marginRight: 6, fontSize: 18, cursor: "pointer", color: "#454545" }}
                                        onClick={() =>
                                            mainData.addToCart({
                                                ...data,
                                                itemQuant: productData.itemQuant + 1,
                                                price: parseInt(productData.price) + parseInt(data.price),
                                                cartId: data.id
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </div>






                    </div>
                </div>

            </div>

        </>
    )

}
