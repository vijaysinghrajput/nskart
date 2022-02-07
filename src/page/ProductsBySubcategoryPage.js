import React, { useContext, useState, useEffect } from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import ProductsBySubcategory from '../component/ProductsBy/ProductsBySubcategory';

const ProductsBySubcategoryPage = (props) => {



    useEffect(() => {
        // window.scrollTo(0, 0);
        // window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    return (
        <>
            <Header />
            <ProductsBySubcategory />
            <Footer />
        </>
    )

}

export default ProductsBySubcategoryPage;