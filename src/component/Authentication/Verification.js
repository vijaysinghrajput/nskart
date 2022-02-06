import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import ContextData from '../../context/MainContext';
import OtpInput from "react-otp-input";
import Cookies from 'universal-cookie';
import { Button, useMediaQuery } from '@chakra-ui/react';
import Header from "../Header";

const cookies = new Cookies();

const Verification = () => {

    const data = useContext(ContextData);
    const { state } = useLocation();
    const { OTP, userMobileNumber, lastPage } = state;
    const [inputOTP, setInputOTP] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [wrongOTP, setWrongOTP] = useState(false);
    const [isNotSmallerScreen] = useMediaQuery("(min-width:1024px)");
    const navigate = useNavigate();

    const wrngOTP = () => {
        setWrongOTP(true)
        setTimeout(() => { setWrongOTP(false); setInputOTP(""); setLoading(false); }, 1000)
    }

    useEffect(() => {
        inputOTP.length === 4 && validateOtp();
    }, [inputOTP])

    const validateOtp = () => {
        setLoading(true);
        console.log("inpit", Number(inputOTP), "OTP", OTP)
        Number(inputOTP) === OTP ? fetch(URL + "/APP-API/App/insetuserByPhone", {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                mobile: userMobileNumber,
                login_source: 'Website'

            })
        }).then((response) => response.json())
            .then((responseJson) => {
                cookies.set('isUserLogin', true, { maxAge: 9999999999 });
                cookies.set('userID', btoa(responseJson.data[0].id), { maxAge: 9999999999 });
                cookies.set('userProvider_id', btoa(responseJson.data[0].provider_id), { maxAge: 9999999999 });
                cookies.set('userName', btoa(responseJson.data[0].name), { maxAge: 9999999999 });
                cookies.set('userMobile', btoa(responseJson.data[0].mobile), { maxAge: 9999999999 });
                data.setUserLogin({ user_info: responseJson.data[0] });
                lastPage ? navigate(lastPage) : navigate("/")
            })
            .catch((error) => {
                //  console.error(error);
            })
            : wrngOTP()
    }

    if (data.auth.isUserLogin || cookies.get("isUserLogin")) {
        return <Navigate to="/" />
    } else {
        return (
            <>
                {!isNotSmallerScreen && <Header />}
                <section class="osahan-signin-main">
                    <div class="container containerLogin">
                        <div class="row d-flex align-items-center justify-content-center vh-100">
                            <div class="col-lg-6">
                                <div class="sign-logo mb-5" id="logo">
                                    <a href="index.html"><img src="/images/logo.svg" alt="" /></a>
                                    <a href="index.html"><img class="logo-inverse" src="/images/dark-logo.svg" alt="" /></a>
                                </div>
                                <div class="osahan-signin osahan-verification shadow bg-white p-4 rounded">
                                    <div class="osahan-form p-3 text-center mt-3">
                                        <h2>Verify your number</h2>
                                        <p>Enter the 4-digit code we sent to you</p>
                                        <p>{userMobileNumber.substring(0, 2) + "*** ***" + userMobileNumber.slice(-2)}</p>
                                        <OtpInput
                                            value={inputOTP}
                                            onChange={e => setInputOTP(e)}
                                            numInputs={4}
                                            shouldAutoFocus={true}
                                            inputStyle="form-control opt form-control-lg text-center"
                                            separator={<span className="mx-2">-</span>}
                                            containerStyle="justify-content-center"
                                            placeholder="0000"
                                            hasErrored={wrongOTP}
                                            errorStyle={{ border: "1px solid red", color: "red" }}

                                        />
                                        <div className="mt-4">
                                            {/* <p><a href="#" class="text-decoration-none text-success">Resend Code</a></p> */}
                                            {isLoading ? (
                                                <Button
                                                    isLoading
                                                    loadingText='Verifying'
                                                    class="btn btn-lg rounded d-flex align-items-center justify-content-center w-100"
                                                    style={{ background: "#f55d2a", color: "#fff" }}
                                                    variant='outline'
                                                />
                                            ) : (
                                                <button style={{ background: "#f55d2a", color: "#fff" }} disabled={inputOTP.length === 4 ? false : true} class="btn btn-block btn-lg" onClick={() => validateOtp()}>Continue</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

}

export default Verification;