import React from 'react';

const AccountContainer = (props) => {

    return (
        <>
            <div class="wrapper">
                <div class="dashboard-group">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="user-dt">
                                    <div class="user-img">
                                        <img src="images/avatar/img-5.jpg" alt="" />

                                    </div>
                                    <h4>NS KART</h4>
                                    <p>+91999999999<a href="#"></a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <div class="container">
                        <div class="row">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AccountContainer;