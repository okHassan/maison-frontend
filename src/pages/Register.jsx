import { useEffect, useState } from "react";
import RegisterImage from "../assets/register.webp";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiUserHeartFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/authSlice";
import { mergeCart } from "../redux/slices/cartSlice";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();

    const { user, guestId, loading } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    // Get redirect parameter and check if it's checkout or something else
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ name, email, password }));
    };

    return (
        <section className=" flex justify-center h-[650px] !bg-white my-5">
            {/* Left Section */}
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="p-8 md:p-12 w-full md:w-1/2 flex items-center justify-center mt-20"
            >
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col items-center justify-center px-8 py-3"
                >
                    <h1 className="text-3xl font-bold tracking-wider mb-6 mt-10">Create Account</h1>
                    <p className="text-center mb-4 text-base font-light">
                        Create your account to enjoy personalized shopping experience
                    </p>
                    <div className="mb-6 mt-10">
                        <input
                            type="text"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            className="w-[400px] px-3 py-3.5 border border-gray-300 outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[400px] px-3 py-3.5 border border-gray-300 outline-none"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-[400px] px-3 py-3.5 border border-gray-300 outline-none"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-[400px] bg-black text-white py-3.5 px-4 transition font-semibold mt-5"
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>
                    <p className="mt-4 text-sm text-center">
                        Already have an account?
                        <Link
                            to={`/login`}
                            className="text-blue-500 hover:underline"
                        >
                            {" "}
                            Log In
                        </Link>
                    </p>
                </form>
            </motion.div>
        </section>
    );
};

export default Register;
