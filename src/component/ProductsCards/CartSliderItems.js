import React, { useContext, useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import URL from '../../URL';
import ContextData from '../../context/MainContext';
import { MdDelete } from 'react-icons/md';
import { useDisclosure, useMediaQuery } from '@chakra-ui/react';

export const CartSliderItems = ({ data }) => {

    const mainData = useContext(ContextData);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");


    const [productData, setProductData] = useState({
        itemQuant: 0,
        productDetails: data,
        price: data.price
    });

    useEffect(() => {
        console.log(data)
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

            <div class="side-cart-items">


                <div class="cart-item">
                    <div class="cart-product-img">
                        <img src={URL + "/images/product-images/" + data.product_image} alt="" />
                        <div class="offer-badge">{data.discount} % OFF</div>
                    </div>
                    <div class="cart-text">
                        <h4>{data.product_name}</h4>
                        <div class="cart-radio">
                            <ul class="kggrm-now">
                                <li>
                                    <input type="radio" id="a1" name="cart1" />
                                    <label for="a1">{data.product_size + data.product_unit}</label>
                                </li>

                            </ul>
                        </div>
                        <div class="qty-group">

                            <div className="ml-auto" style={isNotSmallerScreen ? { width: "40%" } : { width: "50%" }}>
                                <div>
                                    {!productData.itemQuant ? (
                                        <div className="plusMinusFun d-flex justify-content-between px-3 align-items-center" style={{ width: 'fit-content', padding: 4, marginLeft: "auto" }}>
                                            <AiOutlinePlus style={{ color: "#454545", cursor: "pointer", fontSize: 18 }} onClick={() =>
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
                                                <MdDelete
                                                    style={{ fontSize: 18, cursor: "pointer", color: "#454545" }}
                                                    onClick={() =>
                                                        mainData.removeFromCart(data.id)}
                                                />
                                            ) : (
                                                <AiOutlineMinus
                                                    style={{ fontSize: 18, cursor: "pointer", color: "#454545" }}
                                                    onClick={() => mainData.addToCart({
                                                        ...data,
                                                        itemQuant: productData.itemQuant - 1,
                                                        price: productData.price - data.price,
                                                        cartId: data.id
                                                    })}
                                                />
                                            )}
                                            <h5 className="m-2">{productData.itemQuant}</h5>
                                            <AiOutlinePlus
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

                            <div class="cart-item-price">₹ {Math.round((data.price) - ((data.price) * (data.discount / 100)))}<span>₹ {data.price}</span></div>
                        </div>

                        <button onClick={() => mainData.removeFromCart(data.id)} type="button" class="cart-close-btn"><i class="uil uil-multiply"></i></button>
                    </div>
                </div>


            </div>

        </>
    )

}
