import React, { useContext, useEffect, useState } from 'react';
import MainData from '../../context/MainContext';


import { useLocation } from 'react-router-dom'
import URL from '../../URL'


const Promos = ({ }) => {

    const data = useContext(MainData);
    const public_notification = data.public_notification;


    const location = useLocation();


    return (
        <>

            <div class="col-lg-8 p-4 bg-white rounded shadow-sm">
                <div class="osahan-promos">
                    <h4 class="mb-4 profile-title">Avaiable Offers</h4>

                    {public_notification.length ? (

                        <>
                            {public_notification.map((item, i = 1) => {
                                return (
                                    <div class="pb-3">
                                        <a href={item.notification_url} class="text-decoration-none text-white">
                                            <div className={i % 2 == 0 ? 'rounded  shadow-sm p-3 text-white bg-danger' : 'rounded  shadow-sm p-3 text-white bg-success'} >
                                                <div class="row align-items-center">
                                                    <div class="col-9">
                                                        <div class="d-flex align-items-center">
                                                            <img class="pp-osahan-logo" src="img/logo.svg" />
                                                            <div class="brand ml-2">
                                                                <h5 class="m-0">{item.title}</h5>
                                                            </div>
                                                        </div>
                                                        <div class="mt-2 mb-3">
                                                            <p class="text-white m-0">{item.details}</p>
                                                        </div>
                                                        <a href={item.notification_url} class="btn btn-light btn-sm"><i class="icofont-sale-discount"></i> CHECK NOW</a>
                                                    </div>
                                                    <div class="col-3 text-center">
                                                        <a href={item.notification_url}><img src={URL + '/' + item.notification_image} class="img-fluid" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                )
                            })}
                        </>


                    ) : null}





                </div>
            </div>

        </>
    )

}

export default Promos;