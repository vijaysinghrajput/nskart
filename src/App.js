import React, { Component } from 'react';
import ContextProvider from './context/contextProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import AccountPage from './page/AccountPage';
import ConditionPage from './page/ConditionPage';
import { ChakraProvider } from '@chakra-ui/react'
import Verification from './component/Authentication/Verification';
import ProductsBySubcategoryPage from './page/ProductsBySubcategoryPage';
import CartPage from './page/CartPage';
import ProductDetailsPage from './page/ProductDetailsPage';
import CategoryPage from './page/CategoryPage';
import SubCategoryPage from './page/SubCategoryPage';
import AccountPageApp from './page/AccountPageApp';
import NotFoundPage from './page/NotFoundPage';
import 'antd/dist/antd.css';
import URL from './URL'
import SearchPage from './page/SearchPage';
import { OrderSuccessFull } from './component/Cart/OrderSuccessfull';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      subcategories: [],
      products: [],
    }
  }

  componentDidMount() {
    this.fetchReloder();
  }

  fetchReloder() {
    fetch(URL + "/APP-API/App/reloadData", {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseJson) => {

        // console.log('appp res', responseJson)

        this.setState({ subcategories: responseJson.subcategories, products: responseJson.products, })
        // fetchAllData(responseJson);
      })
      .catch((error) => {
        //  console.error(error);
      });
  }
  render() {

    return (
      <ContextProvider>
        {/* <ChakraProvider> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/categories/:subcatID/:subcatName" element={<SubCategoryPage />} />

            <Route path="/search" element={<SearchPage />} />
            {this.state.subcategories.map((item, i) => {
              return (
                <Route path={"/" + (item.name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/:subcatID/:subcatName"} element={<ProductsBySubcategoryPage />} />
              )
            })}
            {this.state.products.map((item, i) => {
              return (
                <Route path={"/" + (item.product_name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/:prodID"} element={<ProductDetailsPage />} />
              )
            })}
            {/* USER ACCOUNT START */}
            <Route path="/orderSuccess" element={<OrderSuccessFull />} />
            <Route path="/accountApp" element={<AccountPageApp />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/notification" element={<AccountPage />} />
            <Route path="/offers" element={<AccountPage />} />
            <Route path="/orders" element={<AccountPage />} />
            <Route path="/address" element={<AccountPage />} />
            <Route path="/condition" element={<AccountPage />} />
            <Route path="/contact" element={<AccountPage />} />
            <Route path="/about" element={<ConditionPage />} />
            <Route path="/term-and-condition" element={<ConditionPage />} />
            <Route path="/privacy-and-policy" element={<ConditionPage />} />
            <Route path="/shipping-policy" element={<ConditionPage />} />
            <Route path="/return-and-refund-policy" element={<ConditionPage />} />
            <Route path="/faq" element={<ConditionPage />} />
            {/* <Route path='*' exact={true} element={<NotFoundPage />} /> */}

            {/* USER ACCOUNT END */}
          </Routes>
        </BrowserRouter>
        {/* </ChakraProvider> */}
      </ContextProvider>
    );
  }
}

export default App;