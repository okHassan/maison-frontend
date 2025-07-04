import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { useLocation } from "react-router-dom";
const TopBar = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    return (
        <div className={`bg-[#819271] text-white ${isHomePage ? "fixed" : "absolute"
            } z-10 w-full`}>
            <div className="container mx-auto flex items-center justify-between py-2.5 px-4 gap-4">
                <div className="text-sm text-center flex-grow">
                    <span className="font-bold">We ship Worldwide - Fast and Reliable Shipping!</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
