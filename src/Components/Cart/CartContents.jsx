import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCartItem } from "../../redux/slices/cartSlice";
const CartContents = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta;

        if (newQuantity >= 1) {
            dispatch(
                updateCartItem({
                    productId,
                    quantity: newQuantity,
                    size,
                    color,
                    guestId,
                    userId,
                })
            );
        }
    };

    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(
            removeFromCart({
                guestId,
                userId,
                productId,
                size,
                color,
            })
        );
    };
    return (
        <div className="w-full h-full p-2">
            {cart?.products.map((product, index) => (
                <div
                    key={index}
                    className="flex items-start justify-between py-4 border-b"
                >
                    <div className="flex">
                        <img
                            className="w-38 h-56 object-cover mr-4 rounded-sm"
                            src={product.image}
                            alt={product.name}
                        />

                        <div>
                            <h3 className="text-sm font-medium tracking-widest">{product.name}</h3>
                            <p className="text-sm text-gray-500 my-4">
                                Size: {product.size} | Color: {product.color}
                            </p>
                            <div className="flex items-center mt-2 ">
                                <button
                                    onClick={() =>
                                        handleAddToCart(
                                            product.productId,
                                            -1,
                                            product.quantity,
                                            product.size,
                                            product.color
                                        )
                                    }
                                    className="border px-2 py-2 text-xs font-medium"
                                >
                                    <svg class="" width="13" height="13" xmlns="http://www.w3.org/2000/svg" role="decrease"><path d="M1 6h11v1H1z" fill-rule="evenodd" fill="currentColor"></path></svg>
                                </button>
                                <span className="mx-4">{product.quantity}</span>
                                <button
                                    onClick={() =>
                                        handleAddToCart(
                                            product.productId,
                                            1,
                                            product.quantity,
                                            product.size,
                                            product.color
                                        )
                                    }
                                    className="border px-2 py-2 text-xs font-medium"
                                >
                                    <svg class="" width="13" height="13" xmlns="http://www.w3.org/2000/svg" role="increase"><path d="M7 1v5h5v1H7v5H6V7H1V6h5V1h1z" fill="currentColor"></path></svg>
                                </button>
                                <button
                                    onClick={() =>
                                        handleRemoveFromCart(
                                            product.productId,
                                            product.size,
                                            product.color
                                        )
                                    }
                                    className="ml-5"
                                >
                                    <svg class="icon-delete " xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none"> <path d="M6.375 2.65625C6.375 2.4822 6.44414 2.31528 6.56721 2.19221C6.69028 2.06914 6.8572 2 7.03125 2H9.21875C9.3928 2 9.55972 2.06914 9.68279 2.19221C9.80586 2.31528 9.875 2.4822 9.875 2.65625C9.875 2.8303 9.80586 2.99722 9.68279 3.12029C9.55972 3.24336 9.3928 3.3125 9.21875 3.3125H7.03125C6.8572 3.3125 6.69028 3.24336 6.56721 3.12029C6.44414 2.99722 6.375 2.8303 6.375 2.65625ZM2 5.28125C2 5.1072 2.06914 4.94028 2.19221 4.81721C2.31528 4.69414 2.4822 4.625 2.65625 4.625H13.5938C13.7678 4.625 13.9347 4.69414 14.0578 4.81721C14.1809 4.94028 14.25 5.1072 14.25 5.28125C14.25 5.4553 14.1809 5.62222 14.0578 5.74529C13.9347 5.86836 13.7678 5.9375 13.5938 5.9375H2.65625C2.4822 5.9375 2.31528 5.86836 2.19221 5.74529C2.06914 5.62222 2 5.4553 2 5.28125ZM7.03125 8.125C6.8572 8.125 6.69028 8.19414 6.56721 8.31721C6.44414 8.44028 6.375 8.6072 6.375 8.78125V10.9688C6.375 11.1428 6.44414 11.3097 6.56721 11.4328C6.69028 11.5559 6.8572 11.625 7.03125 11.625C7.2053 11.625 7.37222 11.5559 7.49529 11.4328C7.61836 11.3097 7.6875 11.1428 7.6875 10.9688V8.78125C7.6875 8.6072 7.61836 8.44028 7.49529 8.31721C7.37222 8.19414 7.2053 8.125 7.03125 8.125ZM8.5625 8.78125C8.5625 8.6072 8.63164 8.44028 8.75471 8.31721C8.87778 8.19414 9.0447 8.125 9.21875 8.125C9.3928 8.125 9.55972 8.19414 9.68279 8.31721C9.80586 8.44028 9.875 8.6072 9.875 8.78125V10.9688C9.875 11.1428 9.80586 11.3097 9.68279 11.4328C9.55972 11.5559 9.3928 11.625 9.21875 11.625C9.0447 11.625 8.87778 11.5559 8.75471 11.4328C8.63164 11.3097 8.5625 11.1428 8.5625 10.9688V8.78125ZM4.1875 7.03125C4.1875 6.8572 4.11836 6.69028 3.99529 6.56721C3.87222 6.44414 3.7053 6.375 3.53125 6.375C3.3572 6.375 3.19028 6.44414 3.06721 6.56721C2.94414 6.69028 2.875 6.8572 2.875 7.03125V13.5938C2.875 14.2319 3.12852 14.844 3.57977 15.2952C4.03103 15.7465 4.64307 16 5.28125 16H10.9688C11.2847 16 11.5976 15.9378 11.8896 15.8168C12.1815 15.6959 12.4468 15.5187 12.6702 15.2952C12.8937 15.0718 13.0709 14.8065 13.1918 14.5146C13.3128 14.2226 13.375 13.9097 13.375 13.5938V7.03125C13.375 6.8572 13.3059 6.69028 13.1828 6.56721C13.0597 6.44414 12.8928 6.375 12.7188 6.375C12.5447 6.375 12.3778 6.44414 12.2547 6.56721C12.1316 6.69028 12.0625 6.8572 12.0625 7.03125V13.5938C12.0625 14.1975 11.5725 14.6875 10.9688 14.6875H5.28125C4.6775 14.6875 4.1875 14.1975 4.1875 13.5938V7.03125Z" fill="currentColor" fill-opacity="0.6"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-base font-semibold">
                            ₹{' '}{(product.price * Number(product.quantity)).toLocaleString()}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CartContents;
