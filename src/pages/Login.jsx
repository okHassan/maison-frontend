import { useEffect, useState } from "react";
import LoginImage from "../assets/login.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { loginUser } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, mergeCart } from "../redux/slices/cartSlice";

const Login = () => {
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
                dispatch(fetchCart({ userId: user }));
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };
    return (
        <section className=" flex justify-center h-[650px] !bg-white my-5">
            {/* Left Section */}
            <motion.div
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="p-8 md:p-12 w-full md:w-1/2 flex items-center justify-center mt-12"
            >
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col items-center justify-center px-8 py-3"
                >
                    <h1 className="text-3xl font-bold tracking-wider mb-6">Login</h1>
                    <p className="text-center mb-4 text-base font-light">
                        Enter your username and password to login
                    </p>
                    <div className="mb-8 mt-10">
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
                        {loading ? "Loading..." : "Login"}
                    </button>
                    <p className="mt-4 text-sm text-center">
                        Don&apos;t have an account?
                        <Link
                            to={`/register?redirect=${encodeURIComponent(redirect)}`}
                            className="text-blue-500 hover:underline"
                        >
                            {" "}
                            Register
                        </Link>
                    </p>
                </form>
            </motion.div>
        </section>
    );
};

export default Login;
