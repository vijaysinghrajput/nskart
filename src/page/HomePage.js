import React, { useContext, useEffect } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import contextData from '../context/MainContext';
import HomeComponent from '../component/HomePage/HomeComponent';

import { Helmet } from "react-helmet";


const HomePage = () => {

  const data = useContext(contextData);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SuperG.in | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery
          in Gorakhpur</title>

        <meta name="description"
          content="SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices." />
        <meta name="keywords" content="vegetables in gorakhpur,online vegetables in gorakhpur,fresh vegetables in gorakhpur,
online vegetable delivery in gorakhpur,online fruits in gorakhpur,online fruits delivery in gorakhpur,
online vegetables delivery in gorakhpur,vegetable home delivery gorakhpur,vegetable delivery in gorakhpur,fruits in gorakhpur,
online fruits in gorakhpur,fresh fruits in gorakhpur,chicken in gorakhpur,online chicken in gorakhpur,fresh chicken in gorakhpur,
fish in gorakhpur,online fish in gorakhpur,fresh fish in gorakhpur,grocery store in gorakhpur,grocery wholesalers in gorakhpur,
grocery home delivery in gorakhpur,buy online grocery in gorakhpur,grocery app in gorakhpur,grocery delivery app in gorakhpur,grocery delivery gorakhpur,
grocery wholesale market in gorakhpur,home delivery grocery in gorakhpur,grocery store gorakhpur,online grocery store in gorakhpur,online grocery shop in gorakhpur
" />
        <meta name="author" content="SuperG.in" />


      </Helmet>

      <Header />

      <HomeComponent />

      <Footer />

    </>
  );
}

export default (HomePage);
