import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import $ from 'jquery';

import Geocode from "react-geocode";

import Base64 from "../../helper/EncodeDecode";
import Cookies from 'universal-cookie';
import { DualHelixLoader } from '../../component/Loaders/DualHelix';


import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


import URL from '../../URL'
import { position } from '@chakra-ui/styled-system';

const searchOptions = {
    // input: 'Gorakhpur Uttar Pardesh',
    location: window.google?.maps?.LatLng(26.7606, 83.3732),
    types: ['address'],
    componentRestrictions: { country: "in" },
}






// import LoactionPicker from '../map/LoactionPicker'




const cookies = new Cookies()



Geocode.setApiKey("AIzaSyDDirDSiLgvG8Gl8crjbvrGRXlCPOTYRzE");
Geocode.setLanguage("en");
Geocode.setRegion("in");
// Geocode.setLocationType("ROOFTOP");
// Geocode.enableDebug();




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
                                <a href="#" class="add-address hover-btn" data-toggle="modal" data-target="#address_model">Add New Address</a>
                                <div class="address-item">
                                    <div class="address-icon1">
                                        <i class="uil uil-home-alt"></i>
                                    </div>
                                    <div class="address-dt-all">
                                        <h4>Home</h4>
                                        <p>#0000, St No. 8, Shahid Karnail Singh Nagar, MBD Mall, Frozpur road, Ludhiana, 141001</p>
                                        <ul class="action-btns">
                                            <li><a href="#" class="action-btn"><i class="uil uil-edit"></i></a></li>
                                            <li><a href="#" class="action-btn"><i class="uil uil-trash-alt"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="address-item">
                                    <div class="address-icon1">
                                        <i class="uil uil-home-alt"></i>
                                    </div>
                                    <div class="address-dt-all">
                                        <h4>Office</h4>
                                        <p>#0000, St No. 8, Shahid Karnail Singh Nagar, MBD Mall, Frozpur road, Ludhiana, 141001</p>
                                        <ul class="action-btns">
                                            <li><a href="#" class="action-btn"><i class="uil uil-edit"></i></a></li>
                                            <li><a href="#" class="action-btn"><i class="uil uil-trash-alt"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="address-item">
                                    <div class="address-icon1">
                                        <i class="uil uil-home-alt"></i>
                                    </div>
                                    <div class="address-dt-all">
                                        <h4>Other</h4>
                                        <p>#0000, St No. 8, Shahid Karnail Singh Nagar, MBD Mall, Frozpur road, Ludhiana, 141001</p>
                                        <ul class="action-btns">
                                            <li><a href="#" class="action-btn"><i class="uil uil-edit"></i></a></li>
                                            <li><a href="#" class="action-btn"><i class="uil uil-trash-alt"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    user_full_address: q.base_address,
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



        const { user_name, user_mobile, user_house_no, user_street, user_addres_type, user_city, user_full_address } = this.state;

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

        else if (user_full_address === '') {
            this.setState({ isClickedAdd: false, })

            var msg = 'Please Choose Locality';
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
                    user_full_address: user_full_address,
                    user_city: user_city,
                    user_addres_type: user_addres_type,
                    user_lat: this.state.position.lat,
                    user_lng: this.state.position.lng,

                })


            }).then((response) => response.json())
                .then((responseJson) => {

                    this.setState({ isClickedAdd: false })


                    //  console.log(responseJson)

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






    handleChange = address => {
        this.setState({ address: address });
    };

    handleSelect = async (address) => {

        await geocodeByAddress(address)
            .then(
                (results) => {



                    this.gettingCoords(results[0])
                    this.gettingAddressFormating(results[0])



                }
            )
            .catch(error => console.error(error));



    };


    async gettingCoords(Googleresult) {
        await getLatLng(Googleresult)
            .then(
                (latLng) => {
                    this.setState({ position: latLng })

                    // console.log('place holer coord', position)

                }
            ).catch(error => console.error(error));

    }



    getAddressFromLatAndLng(lat, lng) {
        Geocode.fromLatLng(lat, lng).then(
            (response) => {

                this.gettingAddressFormating(response.results[0])
            },
            (error) => {
                console.error(error);
            }
        );



    }

    gettingAddressFormating(response) {
        let address_line_1, address_line_2, address_line_3, address_line_4, city;
        for (let i = 0; i < response.address_components.length; i++) {
            for (let j = 0; j < response.address_components[i].types.length; j++) {
                switch (response.address_components[i].types[j]) {

                    case "route":
                        address_line_1 = response.address_components[i].long_name;
                        break;

                    case "sublocality_level_2":
                        address_line_2 = response.address_components[i].long_name;
                        break;

                    case "neighborhood":
                        address_line_3 = response.address_components[i].long_name;
                        break;


                    case "sublocality_level_1":
                        address_line_4 = response.address_components[i].long_name;
                        break;



                    case "administrative_area_level_2":
                        city = response.address_components[i].long_name;
                        break;


                }
            }
        }

        var Addressdata = [address_line_1, address_line_2, address_line_3, address_line_4];

        Addressdata = Addressdata.filter(function (element) {
            return element !== undefined;
        });

        // console.log('addrees', Addressdata[0])

        this.setState({ user_full_address: Addressdata[0] })
        this.setState({ user_city: city })

        if (city !== 'Gorakhpur') {
            toast.error('Sorry! We only deliver in Gorakhpur UP')

        }
    }



    onMarkerDragEnd = async (coord, index) => {

        const { latLng } = await coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        // console.log('marker postion lat', lat)
        // console.log('marker postion lng', lng)

        this.getAddressFromLatAndLng(lat, lng)


        // this.setState({ zoom: 6 })
        this.setState({ zoom: 16 })

        this.setState(prevState => {
            let position = Object.assign({}, prevState.position);  // creating copy of state variable position
            position.lat = lat;
            position.lng = lng          // update the name property, assign a new value
            return { position };                                 // return new object position object
        })



    };


}

export default AddressComp;