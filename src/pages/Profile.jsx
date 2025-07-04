import { useDispatch, useSelector } from "react-redux";
import MyOrderPage from "./MyOrderPage";
import { logout } from "../redux/slices/authSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearCart } from "../redux/slices/cartSlice";
import { ListOrdered, LogOut, User, UserCheck2Icon, UserCircle2, Wallet } from 'lucide-react'

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/login");
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <div className="h-screen pt-24 bg-white">
            <div className="flex-grow p-4 md:p-5 mt-20 container mx-auto">
                <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 gap-10">
                    {/* Left Section */}
                    <div className='w-[25%]'>
                        <h1 className='text-3xl font-bold pb-4 border-b'>My Profile</h1>
                        <div className='pt-4 pb-4 border-b'>
                            <div className='flex gap-4 items-center'>
                                <UserCircle2 className='w-8 h-8' />
                                <div>
                                    <h1 className='font-bold text-lg'>{user?.name}</h1>
                                    <p>{user?.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-10 space-y-8 border-b pb-8'>
                            <Link to='' className='flex items-center gap-4'>
                                <User className='w-6 h-6' />
                                <p>Personal Information</p>
                            </Link>
                            <Link to='order' className='flex items-center gap-4'>
                                <ListOrdered className='w-6 h-6' />
                                <p>Order</p>
                            </Link>
                            <button onClick={handleLogout} className='flex items-center gap-4'>
                                <LogOut className='w-6 h-6' />
                                <p>Logout</p>
                            </button>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="w-full md:w-2/3 lg:w-3/4">
                        {/* <MyOrderPage /> */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
