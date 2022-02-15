import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import $ from 'jquery';



import Base64 from "../../helper/EncodeDecode";
import Cookies from 'universal-cookie';




import URL from '../../URL'






// import LoactionPicker from '../map/LoactionPicker'




const cookies = new Cookies()






class Address extends Component {

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
            mapLoaded: false,
            selectedDeliveryAddress: null
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
        const UserID = UserIDs && Base64.atob(UserIDs)
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
                this.setState({ isDataLoading: false, UserAddressData: responseJson.address, selectedDeliveryAddress: responseJson.address[0].address_id });
                this.props.setAddress(responseJson.address[0])
                // console.log('address', responseJson.address)
            })
            .catch((error) => { });
    }

    render() {

        return (
            <>
                <div className="card border-0 osahan-accor rounded shadow-sm overflow-hidden mt-3">
                    <div className="card-header bg-white border-0 p-0" id="headingtwo">
                        <h2 className="mb-0">
                            <button onClick={() => this.refreshSate()} className="btn d-flex align-items-center bg-white btn-block text-left btn-lg h5 px-3 py-4 m-0" type="button" data-toggle="collapse" data-target="#collapsetwo" aria-expanded="true" aria-controls="collapsetwo">
                                <span className="c-number">2</span> Order Address <a href="#" data-toggle="modal" data-target="#addAddressModal" className="text-decoration-none color-theme-primary ml-auto"> <i className="icofont-plus-circle mr-1" />Add New  Address</a>
                            </button>
                        </h2>
                    </div>
                    <div id="collapsetwo" className="collapse" aria-labelledby="headingtwo" data-parent="#accordionExample">
                        <div className="card-body p-0 border-top">
                            <div className="osahan-order_addres px-4">
                                <div className="p-3 row">
                                    <>
                                        {this.state.UserAddressData.length ? (
                                            <>
                                                {this.state.UserAddressData.map((item, i) => {
                                                    return (
                                                        <div class="custom-control col-lg-6 custom-radio mb-3 position-relative border-custom-radio defaultChecked">
                                                            {/* <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" /> */}
                                                            <label class="custom-control-label w-100" for="customRadioInline1">
                                                                <div>
                                                                    <div class="p-3 bg-white rounded shadow-sm w-100">
                                                                        <p class="small text-muted m-0">{item.name} , {item.phone}</p>
                                                                        <p class="small text-muted m-0">{item.user_house_no} , {item.address}</p>
                                                                        <p class="small text-muted m-0">{item.base_address} , {item.city}</p>
                                                                        <p class="pt-2 m-0 text-right">
                                                                            <span class="small">
                                                                                <a href="#" onClick={() => this.EditCalled(item.address_id)} data-toggle="modal" data-target={"#EditAddressModal" + i} class="text-decoration-none text-success">
                                                                                    <i class="icofont-edit"></i> Edit</a>
                                                                            </span>
                                                                        </p>
                                                                    </div>

                                                                    <span style={{ cursor: "pointer" }} data-toggle="collapse" data-target="#collapsethree" aria-expanded="true" aria-controls="collapsethree" onClick={() => { this.setState({ selectedDeliveryAddress: item.address_id }); this.props.setAddress(item) }} className={this.state.selectedDeliveryAddress == item.address_id ? 'btn bg-theme-primary border-top btn-lg btn-block' : 'btn btn-light border-top btn-lg btn-block'} >
                                                                        Deliver Here
                                                                    </span>

                                                                </div>
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <div className="card-header bg-white border-0 p-0" id="headingtwo">
                                                <a href="#" data-toggle="modal" data-target="#addAddressModal" className="text-decoration-none color-theme-primary ml-auto"> <i className="icofont-plus-circle mr-1" />Add New Delivery Address</a>
                                            </div>
                                        )}
                                    </>
                                    {this.state.selectedDeliveryAddress == null ? (
                                        <a href="#" className="btn btn-danger btn-lg btn-block mt-3" type="button" >Please Add Delivery Address</a>
                                    ) : (
                                        <a href="#" className="btn bg-theme-primary btn-lg btn-block mt-3" type="button" data-toggle="collapse" data-target="#collapsethree" aria-expanded="true" aria-controls="collapsethree">Continue</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="addAddressModal" tabindex="-1" role="dialog" aria-labelledby="addAddressModalLabel" aria-hidden="true">
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
                                    <button type="button" class="btn border-top btn-lg btn-block" data-dismiss="modal">Close</button>
                                </div>
                                <div class="col-6 m-0 p-0">
                                    <button onClick={() => this.SaveAddress('insert', null)} type="button" class="btn bg-theme-primary btn-lg btn-block">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.UserAddressData.length ? (
                    <>
                        {this.state.UserAddressData.map((item, i) => {
                            return (
                                <div key={i + 12} class="modal fade EditAddressModal" tabindex="-1" id={"EditAddressModal" + i} role="dialog" aria-labelledby="EditAddressModalLabel" aria-hidden="true">
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
                                                    <button type="button" class="btn border-top btn-lg btn-block" data-dismiss="modal">Close</button>
                                                </div>
                                                <div class="col-6 m-0 p-0">
                                                    <button onClick={() => this.SaveAddress('update', item.address_id)} type="button" class="btn bg-theme-primary btn-lg btn-block">Update changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            )
                        })}
                    </>


                ) : null}


                <ToastContainer />

            </>
        )

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
            user_full_address: '',
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

export default Address;