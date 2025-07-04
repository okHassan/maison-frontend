import { Link, useLocation } from "react-router-dom";
import {
    HiOutlineUser,
    HiOutlineShoppingBag,
    HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { useState } from "react";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

const NavBar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [navDrawer, setNavDrawer] = useState(false);
    const location = useLocation();
    // Check if the current path is "/"
    const isHomePage = location.pathname === "/";

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const toggleNavDrawer = () => {
        setNavDrawer(!navDrawer);
    };

    const { user } = useSelector((state) => state.auth);

    const { cart } = useSelector((state) => state.cart);
    const cartItemCount =
        cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
        0;

    return (
        <div
            className={`${isHomePage ? "fixed" : "absolute"
                } z-10 top-10 inset-x-4 mx-auto bg-[#0F1F2E] w-full -ml-[15px]`}
        >
            <nav className="flex items-center justify-around py-6 px-6 md:px-12">
                {/* Left Logo */}
                <div>
                    <Link to="/" className="text-2xl font-medium">
                        <img src="/logo.svg" alt="logo" className="h-16" />
                    </Link>
                </div>
                {/* Center - Navigation Links */}
                <div className="hidden md:flex space-x-12">
                    <Link
                        to="/collections/all?gender=Men"
                        className="text-[#D5BD95] font-medium uppercase text-[18px]"
                    >
                        Men
                    </Link>
                    <Link
                        to="/collections/all?gender=Women"
                        className="text-[#D5BD95] font-medium uppercase text-[18px]"
                    >
                        Women
                    </Link>
                    <Link
                        to="/collections/all?category=Top Wear"
                        className="text-[#D5BD95] font-medium uppercase text-[18px]"
                    >
                        Top Wear
                    </Link>
                </div>
                {/* Right - Icons */}
                <div className="flex items-center justify-between gap-3">
                    {user?.role === "admin" && (
                        <Link
                            to="/admin"
                            className="hidden md:block bg-rabbit-red text-white text-xs items-center rounded font-semibold hover:hover:bg-rabbit-red/90 px-2 py-1 transition-all duration-400"
                        >
                            ADMIN
                        </Link>
                    )}
                    <Link to="/profile" className="hover:text-black">
                        <svg fill="#D5BD95" viewBox="-3.77 -3.77 86.93 101.71" width="28" height="28" id="user" xmlns="http://www.w3.org/2000/svg"><path d="M57.4 45.658a6.118 6.118 0 00-1.249-.126c-2.789 0-5.523 1.747-8.42 3.597-2.715 1.732-5.521 3.525-8.031 3.525-2.346 0-4.886-1.791-7.342-3.523-2.67-1.881-5.19-3.659-7.905-3.659-.376 0-.75.036-1.112.107C9.856 48.232 0 64.912 0 72.583c0 9.779 17.71 21.589 39.7 21.589 21.991 0 39.701-11.81 39.701-21.589 0-6.826-8.311-24.075-22.001-26.925zM39.7 91.24c-21.328 0-36.767-11.145-36.767-18.656 0-5.966 8.857-21.742 20.974-24.127.176-.033.359-.051.546-.051 1.784 0 3.937 1.517 6.215 3.122 2.829 1.995 5.757 4.06 9.032 4.06 3.368 0 6.541-2.027 9.611-3.987 2.821-1.802 5.511-3.484 7.49-3.069 11.828 2.462 19.666 18.296 19.666 24.053.001 7.51-15.438 18.655-36.767 18.655zm0-43.242c11.949 0 21.571-14.457 21.571-26.426C61.271 9.677 51.595 0 39.7 0 27.807 0 18.129 9.677 18.129 21.572c0 11.97 9.622 26.426 21.571 26.426zm0-45.064c10.277 0 18.638 8.36 18.638 18.638 0 10.575-8.601 23.493-18.638 23.493S21.063 32.146 21.063 21.572c0-10.278 8.361-18.638 18.637-18.638z"></path></svg>
                    </Link>
                    <Link to='/cart' className="relative hover:text-black px-6">
                        <svg class="" fill="#D5BD95" width="28" height="28" xmlns="http://www.w3.org/2000/svg"><svg viewBox="-3.96 -3.96 90.92 106.95" id="basket" xmlns="http://www.w3.org/2000/svg"><path d="M81.749 20H68v-3.47C68 7.164 59.809 0 50.442 0h-6.021c-.75 0-1.483.065-2.208.16A16.908 16.908 0 0040.006 0h-6.021C24.618 0 17 7.164 17 16.53V20H.866C.038 20 0 21.071 0 21.9v75.81C0 98.538.038 99 .866 99h80.802c.208 0 .277.068.461-.01.58-.209.871-.63.871-1.28V21.9c0-.829-.423-1.9-1.251-1.9zM42.501 2.735C49.164 3.799 54 9.571 54 16.53V20H31v-3.47c0-6.959 4.837-12.731 11.501-13.795zM20 16.53C20 8.818 26.272 3 33.984 3h.82C30.358 6 28 10.733 28 16.53V20h-8v-3.47zm-1.454 15.233a.798.798 0 11-.006 1.596.798.798 0 01.006-1.596zM65 96H3V23h14v6.099c-1 .594-2.254 1.919-2.254 3.462a3.803 3.803 0 003.8 3.798 3.802 3.802 0 003.796-3.798c0-1.58-.342-2.935-2.342-3.507V23h34v6.042c-1 .562-2.389 1.925-2.389 3.52 0 2.094 1.699 3.798 3.793 3.798s3.8-1.704 3.8-3.798c0-1.525-.204-2.835-2.204-3.439V23h8v73zM54.605 32.562c0-.44.357-.799.796-.799a.799.799 0 010 1.597.799.799 0 01-.796-.798zM65 20h-8v-3.47C57 10.733 54.067 6 49.622 3h.82C58.154 3 65 8.818 65 16.53V20zm3 3h5v66.645c0 .041.283.064.226.117L68 94.828V23zm2.322 73l3.693-3.316L77.707 96h-7.385zM80 94.46l-4-3.632V23h4v71.46z"></path></svg></svg>
                        {cartItemCount > 0 && (
                            <span className="absolute bg-rabbit-red text-white text-[0.6rem] rounded-full px-1 md:px-1.5 md:py-0.5 -top-1">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    {/* Search */}
                    <SearchBar />
                    <button onClick={toggleNavDrawer} className="md:hidden">
                        <HiBars3BottomRight className="h-5 w-5 md:h-6 md:w-6 text-zinc-700" />
                    </button>
                </div>


                {/* Cart Drawer */}
                <CartDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />





                {/* Mobile Navigation */}
                <div
                    className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${navDrawer ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex justify-between p-4">
                        {user?.role === "admin" && (
                            <Link
                                to="/admin"
                                className="fixed flex bottom-5 left-5 right-5 md:hidden  bg-rabbit-red shadow-md shadow-black  text-white items-center justify-center rounded-lg font-semibold hover:bg-rabbit-red/90 tracking-tighter px-2 py-3 transition-all duration-400"
                            >
                                GO TO ADMIN DASHBOARD
                            </Link>
                        )}
                        <button
                            onClick={toggleNavDrawer}
                            className="text-gray-700 hover:text-black"
                        >
                            <IoMdClose className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">Menu</h2>
                        <nav className="flex flex-col space-y-4">
                            <Link
                                to="/collections/all?gender=Men"
                                onClick={toggleNavDrawer}
                                className="text-gray-700 block hover:text-black text-sm font-medium uppercase"
                            >
                                Men
                            </Link>
                            <Link
                                to="/collections/all?gender=Women"
                                onClick={toggleNavDrawer}
                                className="text-gray-700 block hover:text-black text-sm font-medium uppercase"
                            >
                                Women
                            </Link>
                            <Link
                                to="/collections/all?category=Top Wear"
                                onClick={toggleNavDrawer}
                                className="text-gray-700 block hover:text-black text-sm font-medium uppercase"
                            >
                                Top Wear
                            </Link>
                            <Link
                                to="/collections/all?category=Bottom Wear"
                                onClick={toggleNavDrawer}
                                className="text-gray-700 block hover:text-black text-sm font-medium uppercase"
                            >
                                Bottom Wear
                            </Link>
                        </nav>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
