import React, { useContext, useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import URL from '../../URL';
import ContextData from '../../context/MainContext';
import { MdDelete } from 'react-icons/md';
import { useDisclosure, useMediaQuery } from '@chakra-ui/react';

export const CartItemsCard = ({ data }) => {

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
            <div className="cart-items bg-white position-relative border-bottom">
                <div className="position-absolute" style={{ left: "7%" }}>
                    {data.discount && <span className="badge badge-danger m-3">{data.discount} %</span>}
                </div>
                <div className="d-flex  align-items-center p-3">
                    <div><img src={URL + "/images/product-images/" + data.product_image} className="img-fluid" /></div>
                    <div className="ml-3 text-dark text-decoration-none w-100">
                        <h5 className="mb-1">{data.product_name}</h5>
                        <p className="text-muted mb-2"><del className="text-success mr-1">₹{data.price}/{data.product_size + data.product_unit}</del> ₹{Math.round((data.price) - ((data.price) * (data.discount / 100)))}/{data.product_size + data.product_unit}</p>
                        <div className="d-flex align-items-center">
                            <p className="total_price font-weight-bold m-0">₹{Math.round(((data.price) - ((data.price) * (data.discount / 100))) * data.itemQuant)}</p>
                            {/* <form id="myform" className="cart-items-number d-flex ml-auto" method="POST" action="#"> */}
                            <div className="ml-auto" style={isNotSmallerScreen ? { width: "20%" } : { width: "50%" }}>
                                <div>
                                    {!productData.itemQuant ? (
                                        <div className="plusMinusFun d-flex justify-content-between px-3 align-items-center" style={{ width: 'fit-content', padding: 8, marginLeft: "auto" }}>
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
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
