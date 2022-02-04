import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../../context/MainContext';
import { RiCoupon3Fill } from 'react-icons/ri';

export const PaymentDetails = (props) => {

    const data = useContext(MainContext);
    const { cartItems, totalItems, condition, setCartDetails, cartDetails, setTotalPrice, genRanHex, totalAmount } = data;
    const [total, setTotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [isDeliveryChargeApplied, setIsDeliveryChargeApplied] = useState(false);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    const GetTotal = cartItems.reduce(function (a, b) {
        const price = (b.price) - ((b.price) * (b.discount / 100))
        return a + Number(price * b["itemQuant"]);
    }, 0);

    const GetDiscount = cartItems.reduce(function (a, b) {
        const price = ((b.price) * (b.discount / 100)) * b.itemQuant;
        return a + Number(price);
    }, 0);

    const getDate = (date) => {
        let dateObj = new Date(date);
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        return day + "/" + month + "/" + year;
    }

    useEffect(() => {
        setTotal(GetTotal);
        setTotalDiscount(GetDiscount);
        console.log(condition[0]?.shipping);
        if (GetTotal < parseInt(condition[0]?.shipping)) {
            console.log("charge", condition[0].charges);
            setDeliveryCharge(condition[0].charges);
            setIsDeliveryChargeApplied(true);
        } else {
            setDeliveryCharge(0);
            setIsDeliveryChargeApplied(false);
        }
    }, [condition, data]);

    useEffect(() => setTotalPrice(grandTotal), [grandTotal])

    useEffect(() => {
        setGrandTotal(Number(total) + Number(deliveryCharge));
        if (GetTotal < parseInt(condition[0]?.shipping)) {
            setCartDetails({
                deliveryCharge: Number(deliveryCharge),
                isDeliveryChargeApplied,
                total: GetTotal,
            })
        } else {
            setCartDetails({
                isDeliveryChargeApplied,
                deliveryCharge: 0,
            })
        }
    }, [deliveryCharge, total]);

    useEffect(() => {
        setGrandTotal(parseInt(total) + parseInt(deliveryCharge) - cartDetails?.discountPriceByCoupon);
    }, [cartDetails?.discountPriceByCoupon]);


    return (
        <>
            <div className="bg-white rounded overflow-hidden shadow-sm mb-3 checkout-sidebar">
                <div className="d-flex align-items-center osahan-cart-item-profile border-bottom bg-white p-3">
                    <img alt="osahan" src="./img/starter1.jpg" className="mr-3 rounded-circle img-fluid" />
                    <div className="d-flex flex-column">
                        <h6 className="mb-1 font-weight-bold">SuperG Fresh Store</h6>
                        <p className="mb-0 small text-muted"><i className="feather-map-pin" /> Bhardwadjpuram, Rustampur, 273004</p>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-3 clearfix">
                        <p className="font-weight-bold small mb-2">Bill Details</p>
                        <p className="mb-1">Item Total <span className="small text-muted">({Math.round(totalItems)} item)</span> <span className="float-right text-dark"><span style={{ fontWeight: "700", marginRight: 2 }}>₹</span>{Math.round(total)}</span></p>
                        {/* <p className="mb-1">Store Charges <span className="float-right text-dark">$62.8</span></p> */}
                        <p className="mb-3">Delivery Fee <span data-toggle="tooltip" data-placement="top" title={`Shop more than ₹${condition[0]?.shipping} to get free delivery.`} className="text-info ml-1"><i className="icofont-info-circle" /></span><span className="float-right text-dark">₹ {Math.round(deliveryCharge)}</span></p>
                        {/* <h6 className="mb-0 text-success">Total Discount<span className="float-right text-success">₹ {Math.round(totalDiscount)}</span></h6> */}
                        {cartDetails?.couponApplied && <h6 className="mb-0 mt-2 text-success" style={{ fontSize: 14 }}><RiCoupon3Fill style={{ marginBottom: 3, marginRight: 5 }} />Coupon Discount<span className="float-right text-success">₹ {Math.round(cartDetails.discountPriceByCoupon)}</span></h6>}
                    </div>
                    <div className="p-3 border-top">
                        <h5 className="mb-0">TO PAY <span className="float-right text-danger">₹ {Math.round(grandTotal)}</span></h5>
                    </div>
                </div>
            </div>
        </>
    )

}

export default PaymentDetails;