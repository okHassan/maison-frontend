import { IoMdClose } from "react-icons/io";
import CartContents from "../Components/Cart/CartContents";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = () => {

    const navigate = useNavigate();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    const userId = user ? user._id : null;

    const handleCheckout = () => {
        if (!user) {
            navigate("/login?redirect=checkout");
        } else {
            navigate("/checkout");
        }
    }

    return (
        <div className="w-full flex min-h-[650px] !bg-white mb-5 mt-20">
            <div className='mt-16 container mx-auto flex'>
                {/* Cart contents with scrollable area */}
                <div className="flex-grow p-4">
                    <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                    {/* Components for the Cart */}
                    {cart && cart?.products?.length > 0 ? (
                        <CartContents cart={cart} userId={userId} guestId={guestId} />
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
                {/* Checkout button fixed at the bottom */}
                <div className="p-2 pb-1 sticky bottom-0 bg-white mt-20">
                    {cart && cart?.products?.length > 0 && (
                        <>
                            <button
                                onClick={handleCheckout}
                                className="w-full py-2 bg-[#EA3F36] text-white font-semibold hover:bg-gray-800 transition"
                            >
                                Checkout
                            </button>
                            <p className="text-xs text-center tracking-tighter mt-2 text-gray-500 font-semibold ">
                                Shipping, taxes and discount codes calculated at checkout.
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Cart