import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import $ from 'jquery';

import Base64 from "../../helper/EncodeDecode";
import Cookies from 'universal-cookie';


import URL from '../../URL'
import { position } from '@chakra-ui/styled-system';
import { DualHelixLoader } from '../../component/Loaders/DualHelix';




const cookies = new Cookies()




class AddressComp extends Component {



    constructor(props) {

        super(props);

        this.state = {
            isDataLoading: true,
            UserID: '',
            address: '',
            position: {
                lat: 26.7606,
                lng: 83.3732
            },
            zoom: 14,
            user_name: '',
            user_mobile: '',
            user_house_no: '',
            user_street: '',
            user_full_address: '',
            user_city: '',
            user_addres_type: 'Home',
            UserAddressData: [],
            mapLoaded: false











        }


        this.onChange = this.onChange.bind(this);

    }
    handleMapIdle = () => {
        this.setState({
            mapLoaded: true
        });
    }







    onChange(e) {


        if (e.target.id === 'user_name') {
            this.setState({ user_name: e.target.value });
        } else if (e.target.id === 'user_mobile') {
            this.setState({ user_mobile: e.target.value });
        } else if (e.target.id === 'user_house_no') {
            this.setState({ user_house_no: e.target.value });
        }
        else if (e.target.id === 'user_street') {
            this.setState({ user_street: e.target.value });
        }
        else if (e.target.id === 'base_address') {
            this.setState({ base_address: e.target.value });
        }
        else if (e.target.id === 'user_city') {
            this.setState({ user_city: e.target.value });
        }


    }


    async componentDidMount() {


        const UserIDs = cookies.get("userID");
        const UserID = Base64.atob(UserIDs)
        await this.setState({ UserID })
        this.FetchAllAddress()

    }


    FetchAllAddress() {


        fetch(URL + "/APP-API/App/getAllAddress", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }, body: JSON.stringify({ UserID: this.state.UserID })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ isDataLoading: false, UserAddressData: responseJson.address, })
                // console.log('address', responseJson.address)
            })
            .catch((error) => { });
    }

    render() {



        return (
            <>
                <div class="row">
                    <div class="col-md-12">
                        <div class="main-title-tab">
                            <h4><i class="uil uil-location-point"></i>My Address</h4>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12">
                        <div class="pdpt-bg">
                            <div class="pdpt-title">
                                <h4>My Address</h4>
                            </div>
                            <div class="address-body">
                                <a href="#" onClick={() => this.refreshSate()} class="add-address hover-btn" data-toggle="modal" data-target="#addAddressModal">Add New Address</a>


                                <>
                                    {this.state.UserAddressData.length ? (

                                        <>
                                            {this.state.UserAddressData.map((item, i) => {
                                                return (
                                                    <div class="address-item">
                                                        <div class="address-icon1">
                                                            <i class="uil uil-home-alt"></i>
                                                        </div>
                                                        <div class="address-dt-all">

                                                            <p>{item.name} , {item.phone}  </p>
                                                            <p>{item.user_house_no} , {item.address} , {item.base_address} , {item.city}</p>
                                                            <ul class="action-btns">
                                                                <li><a href="#" onClick={() => this.EditCalled(item.address_id)}
                                                                    data-toggle="modal" data-target={"#EditAddressModal" + i} class="action-btn"><i class="uil uil-edit"></i></a></li>
                                                                <li><a href="#" data-toggle="modal" data-target={"#delete"
                                                                    + i} class="action-btn"><i class="uil uil-trash-alt"></i></a></li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                )
                                            })}
                                        </>


                                    ) : null}

                                </>








                            </div>
                        </div>
                    </div>
                </div>



                <div class="modal fade" id="addAddressModal" tabindex="-1" role="dialog" aria-labelledby="addAddressModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="addAddressModalLabel">Add Delivery Address</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form class="">
                                    <div class="form-row">

                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                            class="text-danger">*</label> Full Name</label>
                                            <input onChange={this.onChange} placeholder="First & Last Name" id="user_name"
                                                value={this.state.user_name} type="text" class="form-control" />
                                        </div>

                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                            class="text-danger">*</label> Mobile Number (10 Digit)</label>
                                            <input onChange={this.onChange} placeholder="10 Digit Mobile Number" id="user_mobile"
                                                value={this.state.user_mobile} type="tel" class="form-control" />
                                        </div>




                                        <React.Fragment>







                                        </React.Fragment>











                                        <div class="col-md-12 form-group">
                                        </div>


                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                            class="text-danger">*</label> Flat / House / Office No.</label>
                                            <input onChange={this.onChange} type="text" value={this.state.user_house_no}
                                                id="user_house_no" class="form-control" />
                                        </div>

                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                            class="text-danger">*</label> Street / Society / Office Name</label>
                                            <input type="text" onChange={this.onChange} value={this.state.user_street}
                                                id="user_street" class="form-control" />
                                        </div>


                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                            class="text-danger">*</label> Area</label>
                                            <input type="text" onChange={this.onChange} value={this.state.base_address}
                                                id="base_address" class="form-control" />
                                        </div>

                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                            class="text-danger">*</label> City</label>
                                            <input type="text" onChange={this.onChange} value={this.state.user_city}
                                                id="user_city" class="form-control" />
                                        </div>







                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer p-0 border-0">
                                <div class="col-6 m-0 p-0">
                                    <button type="button" class="btn border-top btn-lg btn-block"
                                        data-dismiss="modal">Close</button>
                                </div>
                                <div class="col-6 m-0 p-0">
                                    <button onClick={() => this.SaveAddress('insert', null)} type="button" class="btn btn-success
                            btn-lg btn-block">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>






                {this.state.UserAddressData.length ? (

                    <>
                        {this.state.UserAddressData.map((item, i) => {
                            return (
                                <div key={i + 12} class="modal fade EditAddressModal" tabindex="-1" id={"EditAddressModal" + i} role="dialog"
                                    aria-labelledby="EditAddressModalLabel" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="EditAddressModalLabel">Edit Delivery Address</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                                <form class="">
                                                    <div class="form-row">

                                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                                            class="text-danger">*</label> Full Name</label>
                                                            <input onChange={this.onChange} placeholder="First & Last Name" id="user_name"
                                                                value={this.state.user_name} type="text" class="form-control" />
                                                        </div>

                                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                                            class="text-danger">*</label> Mobile Number (10 Digit)</label>
                                                            <input onChange={this.onChange} placeholder="10 Digit Mobile Number"
                                                                id="user_mobile" value={this.state.user_mobile} type="tel"
                                                                class="form-control" />
                                                        </div>

















                                                        <div class="col-md-12 form-group">
                                                        </div>


                                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                                            class="text-danger">*</label> Flat / House / Office No.</label>
                                                            <input onChange={this.onChange} type="text" value={this.state.user_house_no}
                                                                id="user_house_no" class="form-control" />
                                                        </div>

                                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                                            class="text-danger">*</label> Street / Society / Office Name</label>
                                                            <input type="text" onChange={this.onChange} value={this.state.user_street}
                                                                id="user_street" class="form-control" />
                                                        </div>


                                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                                            class="text-danger">*</label> Area</label>
                                                            <input type="text" onChange={this.onChange} value={this.state.base_address}
                                                                id="base_address" class="form-control" />
                                                        </div>

                                                        <div class="col-md-12 form-group"><label class="form-label"> <label
                                                            class="text-danger">*</label> City</label>
                                                            <input type="text" onChange={this.onChange} value={this.state.user_city}
                                                                id="user_city" class="form-control" />
                                                        </div>




                                                    </div>
                                                </form>
                                            </div>
                                            <div class="modal-footer p-0 border-0">
                                                <div class="col-6 m-0 p-0">
                                                    <button type="button" class="btn border-top btn-lg btn-block"
                                                        data-dismiss="modal">Close</button>
                                                </div>
                                                <div class="col-6 m-0 p-0">
                                                    <button onClick={() => this.SaveAddress('update', item.address_id)} type="button" class="btn
                                btn-success btn-lg btn-block">Update changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            )
                        })}
                    </>


                ) : null}



                {this.state.UserAddressData.length ? (

                    <>
                        {this.state.UserAddressData.map((item, i) => {
                            return (


                                <div class="modal fade modal" id={"delete" + i} tabindex="-1" role="dialog" aria-labelledby="modalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog modal-sm modal-dialog-centered">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title modal" id="DeleteModalLabel">Delete</h5>
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body text-center d-flex align-items-center">
                                                <div class="w-100 px-3">
                                                    <i class="icofont-trash text-danger display-1 mb-5"></i>
                                                    <h6>Are you sure you want to delete this?</h6>
                                                    <p class="small text-muted m-0">{item.name} , {item.phone}</p>
                                                    <p class="small text-muted m-0">{item.user_house_no} , {item.address}</p>
                                                    <p class="small text-muted m-0">{item.base_address} , {item.city}</p>
                                                </div>
                                            </div>
                                            <div class="modal-footer p-0 border-0">
                                                <div class="col-6 m-0 p-0">
                                                    <button type="button" class="btn border-top btn-lg btn-block"
                                                        data-dismiss="modal">Close</button>
                                                </div>
                                                <div class="col-6 m-0 p-0">
                                                    <button onClick={() => this.deleteAddress(item.address_id, i)} type="button" class="btn
                                btn-danger btn-lg btn-block">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}
                    </>


                ) : null
                }


                <ToastContainer />
            </>
        );
    }

    refreshSate() {
        this.setState({
            address: '',
            position: {
                lat: 26.7606,
                lng: 83.3732
            },
            zoom: 14,
            user_name: '',
            user_mobile: '',
            user_house_no: '',
            user_street: '',
            base_address: '',
            user_city: '',
            user_addres_type: 'Home',
        })
    }
    EditCalled(address_id) {

        this.state.UserAddressData.filter(q => {
            if (q.address_id === address_id) {


                this.setState({
                    user_name: q.name,
                    user_mobile: q.phone,
                    user_house_no: q.user_house_no,
                    user_street: q.address,
                    address: q.base_address,
                    base_address: q.base_address,
                    user_city: q.city


                })

                this.setState(prevState => {
                    let position = Object.assign({}, prevState.position);  // creating copy of state variable position
                    position.lat = q.latitude;
                    position.lng = q.longitude          // update the name property, assign a new value
                    return { position };                                 // return new object position object
                })



            }
        })




    }

    deleteAddress(delete_id, i) {

        this.setState({ isClickedAdd: true })
        fetch(URL + "/APP-API/App/deleteUserAddress", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({

                delete_id: delete_id,
                UserID: this.state.UserId

            })


        }).then((response) => response.json())
            .then((responseJson) => {

                this.setState({ isClickedAdd: false })

                if (responseJson.status == 'done') {
                    var msg = 'Your address removed successfully'
                    toast.success(msg)
                    this.setState({ UserAddressData: responseJson.data });
                    this.componentDidMount()

                    $(".modal .close").click();
                    $(".modal-backdrop").remove();
                    $("body").removeClass("modal-open")
                }
            })
            .catch((error) => {
                //  console.error(error);

            });



    }
    async SaveAddress(type, address_id) {



        this.setState({ isClickedAdd: true, })



        const { user_name, user_mobile, user_house_no, user_street, user_city, base_address } = this.state;

        var phoneno = /^\d{10}$/;

        if (user_name === "") {

            this.setState({ isClickedAdd: false, })
            var msg = 'Full Name Requird';
            toast.error(msg)
        }

        else if (user_mobile === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Mobile Number Requird';
            toast.error(msg)

        }

        else if (user_city === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Please Choose Locality';
            toast.error(msg)

        }

        else if (base_address === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Please fill Locality';
            toast.error(msg)

        }


        else if (user_house_no === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Flat / House / Office No. Requird';
            toast.error(msg)

        }

        else if (user_street === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Street / Society / Office Name Requird';
            toast.error(msg)

        }




        else {



            this.setState({ isClickedAdd: true })
            fetch(URL + "/APP-API/App/insertUserAddress", {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    actiontype: type,
                    address_id: address_id,
                    UserId: this.state.UserID,
                    user_name: user_name,
                    user_mobile: user_mobile,
                    user_house_no: user_house_no,
                    user_street: user_street,
                    user_full_address: base_address,
                    user_city: user_city,
                    user_addres_type: 'Home',
                    user_lat: null,
                    user_lng: null,

                })


            }).then((response) => response.json())
                .then((responseJson) => {

                    this.setState({ isClickedAdd: false })


                    // console.log('insert address', responseJson)

                    if (responseJson.status == 'done') {

                        var msg = 'Your address ' + type + ' successfully'
                        toast.success(msg)

                        this.setState({
                            UserAddressData: responseJson.data
                        })
                        this.refreshSate()

                        $("#addAddressModal .close").click();
                        $(".EditAddressModal .close").click();



                    }



                })
                .catch((error) => {
                    //  console.error(error);

                });

        }




    }












}

export default AddressComp;