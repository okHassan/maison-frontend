import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

const MyOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, loading, error } = useSelector((state) => state.orders);

    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);

    if (loading) return <h2 className="animate-pulse text-center">Loading...</h2>;
    if (error) return <h2 className="text-center">Error : {error}</h2>;
    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
            <h2 className="text-2xl font-bold mb-4 tracking-wide">My Orders</h2>
            <div className="relative overflow-auto">
                <table className="min-w-full text-left text-gray-500">
                    <thead className=" text-xs uppercase text-gray-700 bg-gray-300">
                        <tr>
                            <th className="py-2 px-4 sm:py-3">Image</th>
                            <th className="py-2 px-4 sm:py-3">Order ID</th>
                            <th className="py-2 px-4 sm:py-3">Created</th>
                            <th className="py-2 px-4 sm:py-3">Shipping Address</th>
                            <th className="py-2 px-4 sm:py-3">Items</th>
                            <th className="py-2 px-4 sm:py-3">Price</th>
                            <th className="py-2 px-4 sm:py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {orders?.length > 0 ? (
                            orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-b hover:border-r-gray-300 cursor-pointer"
                                    onClick={() => navigate(`/orders/${order._id}`)}
                                >
                                    <td className="py-2 px-4 sm:py-3 sm:px-4">
                                        <img
                                            src={order.orderItems[0].image}
                                            alt={order.orderItems[0].name}
                                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                                        />
                                    </td>
                                    <td className="py-2 px-2 sm:py-3 sm:px-3 font-medium text-gray-900 whitespace-nowrap ">
                                        #{order._id}
                                    </td>
                                    <td className="py-2 px-2 sm:py-3 sm:px-3">
                                        {new Date(order.createdAt).toLocaleDateString()}{" "}
                                        {new Date(order.createdAt).toLocaleTimeString()}
                                    </td>
                                    <td className="py-2 px-2 sm:py-3 sm:px-3">
                                        {order.shippingAddress
                                            ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                                            : "N/A"}
                                    </td>
                                    <td className="py-2 px-2 sm:py-3 sm:px-3">
                                        {order.orderItems.length}
                                    </td>
                                    <td className="py-2 px-2 sm:py-3 sm:px-3">
                                        ${order.totalPrice}
                                    </td>
                                    <td className="py-2 px-2 sm:py-3 sm:px-3">
                                        <span
                                            className={`${order.isPaid
                                                    ? "bg-green-200 text-green-700"
                                                    : "bg-red-200 text-red-700"
                                                } px-3 py-1 rounded-lg font-semibold`}
                                        >
                                            {order.isPaid ? "Paid" : "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-2 px-4 text-gray-600 text-center">
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrderPage;
