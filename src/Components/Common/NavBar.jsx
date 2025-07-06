import { Link, useLocation } from "react-router-dom";
import {
    HiOutlineUser,
    HiOutlineShoppingBag,
    HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

const NavBar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [navDrawer, setNavDrawer] = useState(false);
    const location = useLocation();

    const isHomePage = location.pathname === "/";
    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
    const toggleNavDrawer = () => setNavDrawer(!navDrawer);

    const { user } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const cartItemCount =
        cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    // Prevent background scroll when mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = navDrawer ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [navDrawer]);

    return (
        <div
            className={`${isHomePage ? "fixed" : "absolute"
                } top-0 left-0 right-0 w-full z-10 bg-[#0F1F2E]`}
        >
            <nav className="flex items-center md:justify-between py-4 px-4 md:px-12">
                {/* Logo */}
                <Link to="/" className="text-2xl font-medium">
                    <img src="/logo.svg" alt="logo" className="h-14" />
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex space-x-12">
                    <Link to="/collections/all?gender=Men" className="text-[#D5BD95] font-medium uppercase text-[18px]">Men</Link>
                    <Link to="/collections/all?gender=Women" className="text-[#D5BD95] font-medium uppercase text-[18px]">Women</Link>
                    <Link to="/collections/all?category=Top Wear" className="text-[#D5BD95] font-medium uppercase text-[18px]">Top Wear</Link>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4">
                    {/* Admin link */}
                    {user?.role === "admin" && (
                        <Link
                            to="/admin"
                            className="hidden md:block bg-rabbit-red text-white text-xs rounded px-2 py-1 font-semibold hover:bg-rabbit-red/90 transition"
                        >
                            ADMIN
                        </Link>
                    )}

                    {/* Profile */}
                    <Link to="/profile">
                        <HiOutlineUser className="w-6 h-6 text-[#D5BD95]" />
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className="relative">
                        <HiOutlineShoppingBag className="w-6 h-6 text-[#D5BD95]" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-3 bg-rabbit-red text-white text-[10px] px-1.5 rounded-full">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>

                    {/* Search */}
                    <SearchBar />

                    {/* Mobile Nav Toggle */}
                    <button onClick={toggleNavDrawer} className="md:hidden">
                        <HiBars3BottomRight className="w-6 h-6 text-[#D5BD95]" />
                    </button>
                </div>

                {/* Cart Drawer */}
                <CartDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
            </nav>

            {/* Mobile Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white z-50 shadow-lg transform transition-transform duration-300 ${navDrawer ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={toggleNavDrawer}>
                        <IoMdClose className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                <nav className="flex flex-col p-4 space-y-4 text-sm font-medium uppercase text-gray-700">
                    <Link to="/collections/all?gender=Men" onClick={toggleNavDrawer}>Men</Link>
                    <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer}>Women</Link>
                    <Link to="/collections/all?category=Top Wear" onClick={toggleNavDrawer}>Top Wear</Link>
                    <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDrawer}>Bottom Wear</Link>
                </nav>

                {user?.role === "admin" && (
                    <Link
                        to="/admin"
                        onClick={toggleNavDrawer}
                        className="fixed bottom-4 left-4 right-4 md:hidden bg-rabbit-red text-white text-center py-3 rounded-lg font-semibold shadow-md"
                    >
                        GO TO ADMIN DASHBOARD
                    </Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
