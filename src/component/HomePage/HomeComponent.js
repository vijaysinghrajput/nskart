import React from 'react';
import Category from './Category';
import OshanContainer from '../comman/OshanContainer';
import Promo from './Promo';
import TodayPicks from './TodayPicks';
import Banner from './Banner';
import SubCategorySliding from './SubCategorySliding';


import Seo from '../Seo'

const HomeComponent = (props) => {

    return (
        <>

            <Seo
                title={"Home| SuperG.in | Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                descreption={" SuperG.in is an online vegetable, fruit, cake ,chicken, and grocery delivery website and app in Gorakhpur , Which deliver you home at very low prices. Vegetables & Fruits delivery in Gorakhpur, Grocery delivery in Gorakhpur, Chicken & Fish delivery in Gorakhpur"}
                image={null}

            />




            <OshanContainer >



                <SubCategorySliding />

                <Banner />

                <Category />



                <Promo />

                {/* <TodayPicks /> */}

            </OshanContainer>
        </>
    )

}

export default HomeComponent;