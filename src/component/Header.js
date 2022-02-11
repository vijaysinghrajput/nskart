import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MainData from '../context/MainContext';
import { useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { MdOutlineShoppingCart, MdArrowForwardIos } from 'react-icons/md';
import { BiCategory, BiSearchAlt2 } from 'react-icons/bi';
import { GiPartyPopper } from 'react-icons/gi';
import { AiOutlineLogin } from 'react-icons/ai';
import { BsWhatsapp, BsFillTelephoneFill } from 'react-icons/bs';
import { constants } from '../URL';
import Drawer from './comman/Drawer';

import CategoryPopup from './header/CategoryPopup'
import SeachPopup from './header/SeachPopup'
import SliderCart from './header/SliderCart'
import TopHead from './header/TopHead'
import NavHeader from './header/NavHeader'
import MainDrawer from './comman/Drawer';




const Header = () => {

  const data = useContext(MainData);

  console.log('all data', data)
  localStorage.setItem("cartItems", JSON.stringify(data.cartItems));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
  const { products, logOut, totalItems, subcategories, cartItems, auth } = data;
  const { pathname } = useLocation();
  const [searchedProduct, setSearchedProduct] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = React.useState(false)
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const useOutsideAlerter = (ref) => {
    console.log("hey outside", ref)
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        console.log("inside", event)
        if (ref.current && !ref.current.contains(event.target)) {
          onBlur();
        }
      }

      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  useEffect(() => {
    if (products.length != 0) {
      const filteredClubs = products.filter(Club => {
        let ClubLowercase = (
          Club.product_name
        ).toLowerCase();
        let searchTermLowercase = searchTerm.toLowerCase();
        return ClubLowercase.indexOf(searchTermLowercase) > -1;
      });
      setSearchedProduct(filteredClubs);
    }
  }, [searchTerm]);

  useEffect(() => {
    setSearchedProduct(products)
  }, [products]);

  const GetTotal = cartItems.reduce(function (a, b) {
    const price = (b.price) - ((b.price) * (b.discount / 100))
    return a + Number(price * b["itemQuant"]);
  }, 0);

  return (
    <>

      <CategoryPopup />
      <MainDrawer isOpen={isOpen} onClose={onClose} />
      <SeachPopup setSearchTerm={setSearchTerm} searchedProduct={searchedProduct} />
      <SliderCart />

      <header class="header clearfix">

        <TopHead setSearchTerm={setSearchTerm} onFocus={onFocus} onBlur={onBlur} focused={focused} searchedProduct={searchedProduct} wrapperRef={wrapperRef} />

        <NavHeader onOpen={onOpen} onClose={onClose} />



      </header>


    </>
  );

}

export default Header;