import React, { useContext } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Button,
} from '@chakra-ui/react';
import MainContext from '../../context/MainContext';
import { GoLocation } from 'react-icons/go';
import { useNavigate } from 'react-router';
import { BiUserCircle } from 'react-icons/bi';
import { MdLocalOffer } from 'react-icons/md';
import { FcContacts } from 'react-icons/fc';
import { BsViewStacked, BsBell, BsPhoneFill, BsFillGeoAltFill } from 'react-icons/bs';
import { AiOutlineLogin, AiOutlineQuestionCircle, AiOutlineShareAlt, AiOutlinePoweroff } from 'react-icons/ai';

const MainDrawer = ({ isOpen, onClose }) => {

    const { user, logOut, auth } = useContext(MainContext);
    const navigateTo = useNavigate();

    const navigate = (path) => {
        onClose();
        navigateTo(path);
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                size={"xs"}
            >
                <DrawerOverlay />
                {console.log("user info --->", user)}
                <DrawerContent style={{ width: "68%" }}>
                    <DrawerHeader background={"#efefef"}>
                        <div class="bs-canvas-header side-cart-header">
                            <p className="mb-1">Hello,</p>
                            <h6 style={{ color: "#000", fontWeight: "700" }}> {user?.user_info?.name === "" || user?.user_info?.name === null ? "Unknown" : user?.user_info?.name}</h6>
                            {auth.isUserLogin && <p style={{ textTransform: "uppercase", fontSize: 10 }}><BsPhoneFill />  {user?.user_info?.mobile}</p>}
                        </div>
                    </DrawerHeader>
                    <DrawerBody>
                        <div className="cart_options">
                            {auth.isUserLogin ?
                                <>
                                    <div onClick={() => navigate("/account")} className="d-flex align-items-center py-3 close_me_please"><BiUserCircle size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> My Account</p></div>
                                    <div onClick={() => navigate("/offers")} className="d-flex align-items-center py-3 close_me_please"><MdLocalOffer size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Offers</p></div>
                                    <div onClick={() => navigate("/category")} className="d-flex align-items-center py-3 close_me_please"><BsViewStacked size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Shop By Main Category</p></div>
                                    <div onClick={() => navigate("/orders")} className="d-flex align-items-center py-3 close_me_please"><BsViewStacked size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> My Orders</p></div>
                                    <div onClick={() => navigate("/notification")} className="d-flex align-items-center py-3 close_me_please"><BsBell size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Notifications</p></div>
                                    <div onClick={() => navigate("/address")} className="d-flex align-items-center py-3 close_me_please"><BsFillGeoAltFill size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> My Address</p></div>
                                    <div onClick={() => navigate("/condition")} className="d-flex align-items-center py-3 close_me_please"><AiOutlineQuestionCircle size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Terms and Condition</p></div>
                                    <div onClick={() => navigate("/contact")} className="d-flex align-items-center py-3 close_me_please"><FcContacts size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Contact Us</p></div>
                                    <div onClick={() => logOut()} className="d-flex align-items-center py-3 close_me_please"><AiOutlinePoweroff size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Logout</p></div>
                                </>
                                :
                                <>
                                    <div onClick={() => navigate("/category")} className="d-flex align-items-center py-3 close_me_please"><BsViewStacked size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Shop By Main Category</p></div>
                                    <div onClick={() => navigate("/condition")} className="d-flex align-items-center py-3 close_me_please"><AiOutlineQuestionCircle size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Terms and Condition</p></div>
                                    <div onClick={() => navigate("/contact")} className="d-flex align-items-center py-3 close_me_please"><FcContacts size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Contact Us</p></div>
                                    <div onClick={() => navigate("/login")} className="d-flex justify-content-center pt-5 align-items-center py-3 close_me_please"><AiOutlineLogin size={22} /> <p className="ml-2 mb-0" style={{ fontWeight: "700" }}> Login</p></div>
                                </>
                            }
                        </div>
                    </DrawerBody>

                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MainDrawer;