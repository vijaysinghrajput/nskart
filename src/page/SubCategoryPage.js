import React from 'react';
import OshanContainer from '../component/comman/OshanContainer';
import { useMediaQuery } from '@chakra-ui/react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import SubCategory from '../component/HomePage/SubCategory';


const SubCategoryPage = (props) => {
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    return (
        <>
            <Header />
            <OshanContainer>

                <SubCategory />
            </OshanContainer>
            <Footer />
        </>
    )

}

export default SubCategoryPage;