import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import URL from '../../URL';
import ContextData from '../../context/MainContext';
import { MdDelete } from 'react-icons/md';
import { BsPlusLg, BsFillCartPlusFill, BsFillCartXFill } from 'react-icons/bs';
import { useDisclosure, Modal, ModalBody, ModalContent, ModalOverlay, ModalCloseButton, ModalFooter, Button, ModalHeader } from '@chakra-ui/react';

export const SliderProducts = ({ data }) => {

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
            <div class="product-item ">
                <a href="single_product_view.html" class="product-img">
                    <img src={URL + "/images/product-images/" + data.product_image} alt="" />
                    <div class="product-absolute-options">

                        {data.discount !== "0" && <span class="offer-badge-1">{Math.round(data.discount)} %</span>}

                    </div>
                </a>
                <div class="product-text-dt">

                    <h4>{data.product_name.substring(0, 20)} {data.product_size + data.product_unit}</h4>
                    <div class="product-price">₹{Math.round((data.price) - ((data.price) * (data.discount / 100)))} <span>₹{Math.round(data.price)}</span></div>
                    <div className="qty-cart">
                        {!productData.itemQuant ? (
                            <div className="plusMinusFun d-flex justify-content-between px-3 align-items-center" style={{ width: 'fit-content', padding: 8, marginLeft: "auto" }}>
                                <BsFillCartPlusFill size="35" style={{ color: "#006200", cursor: "pointer", fontSize: 20 }} onClick={() =>
                                    mainData.addToCart({
                                        ...data,
                                        itemQuant: 1,
                                        cartId: data.id
                                    })
                                } />
                            </div>
                        ) : (
                            <div class="plusMinusFun d-flex justify-content-between px-3 align-items-center">
                                {productData.itemQuant === 1 ? (
                                    <BsFillCartXFill
                                        size="30"
                                        style={{ fontSize: 18, cursor: "pointer", color: "#f55d2c" }}
                                        onClick={() =>
                                            mainData.removeFromCart(data.id)}
                                    />
                                ) : (
                                    <AiOutlineMinus
                                        size="30"
                                        style={{ fontSize: 18, cursor: "pointer", color: "#454545" }}
                                        onClick={() => mainData.addToCart({
                                            ...data,
                                            itemQuant: productData.itemQuant - 1,
                                            price: productData.price - data.price,
                                            cartId: data.id
                                        })}
                                    />
                                )}
                                <h5 className="mb-0">{productData.itemQuant}</h5>
                                <AiOutlinePlus
                                    size="30"
                                    style={{ fontSize: 18, cursor: "pointer", color: "#454545" }}
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
        </>
    )

}
