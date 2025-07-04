import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import StripeIntegration from "./StripeIntegration";

const Checkout = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
     const { cart, loading, error } = useSelector((state) => state.cart);

     const { user } = useSelector((state) => state.auth);

     const [checkoutId, setcheckoutId] = useState(false);

     const [shippingAddress, setShippingAddress] = useState({
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          postalCode: "",
          country: "",
          phone: "",
     });

     const handleCreateCheckout = async (e) => {
          e.preventDefault();
          if (cart && cart.products.length > 0) {
               const res = await dispatch(
                    createCheckout({
                         checkoutItems: cart.products,
                         shippingAddress,
                         paymentMethod: "Stripe",
                         totalPrice: cart.totalPrice.toFixed(2),
                    })
               );
               if (res.payload && res.payload._id) {
                    setcheckoutId(res.payload._id || localStorage.getItem("checkoutId")); // Set checkout ID if checkout was successful
               }
               localStorage.setItem("checkoutId", res.payload._id);
          }
     };

     useEffect(() => {
          if (!cart || !cart.products || cart.products.length === 0) {
               navigate("/");
          }
     }, [cart, navigate]);

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error: {error}</p>;
     if (!cart || !cart.products || cart.products.length === 0)
          return <p>Your Cart is empty</p>;
     return (
          <div className="!bg-white pt-[150px] pb-16">
               <div className="grid grid-col-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-5 px-6 tracking-tighter">
                    {/* Left Section */}
                    <div className="bg-white rounded-lg p-4">
                         <form onSubmit={handleCreateCheckout} className="text-sm">
                              <h3 className="font-semibold mb-3 text-2xl tracking-wide">Contact Information</h3>
                              {/* Email */}
                              <div className="mb-4">
                                   <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={user ? user.email : ""}
                                        disabled
                                        className="w-full pr-2 pl-3 py-3 border bg-white outline-none"
                                   />
                              </div>
                              <h3 className=" font-semibold mb-3">shipping address</h3>

                              <div className="mb-3 grid grid-cols-2 gap-4">
                                   {/* First Name */}
                                   <div>
                                        <input
                                             type="text"
                                             id="firstName"
                                             name="firstName"
                                             placeholder="First Name"
                                             required
                                             value={shippingAddress.firstName}
                                             onChange={(e) =>
                                                  setShippingAddress({
                                                       ...shippingAddress,
                                                       firstName: e.target.value,
                                                  })
                                             }
                                             className="w-full pr-2 pl-3 py-3 border bg-white outline-none"
                                        />
                                   </div>
                                   {/* Last Name */}
                                   <div>
                                        <input
                                             type="text"
                                             id="lastName"
                                             name="lastName"
                                             placeholder="Last Name"
                                             value={shippingAddress.lastName}
                                             onChange={(e) =>
                                                  setShippingAddress({
                                                       ...shippingAddress,
                                                       lastName: e.target.value,
                                                  })
                                             }
                                             className="w-full pr-2 pl-3 py-3 border bg-white outline-none"
                                        />
                                   </div>
                              </div>
                              {/* Address */}
                              <div className="mb-3">
                                   <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="Address"
                                        required
                                        value={shippingAddress.address}
                                        onChange={(e) =>
                                             setShippingAddress({
                                                  ...shippingAddress,
                                                  address: e.target.value,
                                             })
                                        }
                                        className="w-full pr-2 pl-3 py-3 border bg-white outline-none"
                                   />
                              </div>

                              <div className="mb-3 grid grid-cols-2 gap-4">
                                   {/* City */}
                                   <div>
                                        <input
                                             type="text"
                                             id="city"
                                             name="city"
                                             required
                                             placeholder="City"
                                             value={shippingAddress.city}
                                             onChange={(e) =>
                                                  setShippingAddress({
                                                       ...shippingAddress,
                                                       city: e.target.value,
                                                  })
                                             }
                                             className="w-full pr-2 pl-3 py-3 border bg-white outline-none"
                                        />
                                   </div>
                                   {/* Postal Code */}
                                   <div>
                                        <input
                                             type="text"
                                             id="postalCode"
                                             name="postalCode"
                                             required
                                             placeholder="Postal Code"
                                             value={shippingAddress.postalCode}
                                             onChange={(e) =>
                                                  setShippingAddress({
                                                       ...shippingAddress,
                                                       postalCode: e.target.value,
                                                  })
                                             }
                                             className="w-full pr-2 pl-3 py-3 border bg-white outline-none"
                                        />
                                   </div>
                              </div>
                              {/* Country */}
                              <div className="mb-3">
                                   <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        required
                                        placeholder="Country"
                                        value={shippingAddress.country}
                                        onChange={(e) =>
                                             setShippingAddress({
                                                  ...shippingAddress,
                                                  country: e.target.value,
                                             })
                                        }
                                        className="w-full pr-2 pl-3 py-3 border bg-white outline-none"
                                   />
                              </div>
                              {/* Phone */}
                              <div className="mb-3">
                                   <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        placeholder="Phone"
                                        required
                                        value={shippingAddress.phone}
                                        onChange={(e) =>
                                             setShippingAddress({
                                                  ...shippingAddress,
                                                  phone: e.target.value,
                                             })
                                        }
                                        className="w-full pr-2 pl-3 py-3 border bg-white outline-none"
                                   />
                              </div>
                              <div className="mt-6">
                                   {!checkoutId ? (
                                        <button
                                             type="submit"
                                             className="w-full bg-[#EA3F36] text-white py-3 px-4 font-semibold"
                                        >
                                             Continue To Payment
                                        </button>
                                   ) : (
                                        <div className="flex flex-col">
                                             <StripeIntegration />
                                        </div>
                                   )}
                              </div>
                         </form>
                    </div>
                    {/* Right Section  */}
                    <div className=" p-6 border-l">
                         <h3 className="text-lg mb-4 font-semibold tracking-wider">Order Summary</h3>
                         <div className="border-y py-4 mb-4 overflow-y-scroll max-h-80">
                              {cart.products.map((product, index) => (
                                   <div
                                        key={index}
                                        className="flex items-center justify-between py-2 bprder-b"
                                   >
                                        <div className="flex items-start">
                                             <img
                                                  src={product.image}
                                                  alt={product.name}
                                                  className="w-20 h-20 object-cover mr-4 rounded-sm"
                                             />
                                             <div>
                                                  <h3 className="font-medium text-md tracking-wide">{product.name}</h3>
                                                  <p className="text-gray-600 text-xs mb-2">Size : {product.size}</p>
                                                  <p className="text-gray-600 text-xs mb-2">
                                                       Color : {product.color}
                                                  </p>
                                                  <p className="text-gray-600 text-xs">
                                                       $ {product.price?.toLocaleString()} {product.quantity > 1 ? `x ${product.quantity}` : ""}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                         <div className="flex justify-between items-center text-lg mb-4">
                              <p>Subtotal</p>
                              <p>$ {cart.totalPrice.toFixed(2)}</p>
                         </div>
                         <div className="flex justify-between items-center text-lg mb-4">
                              <p>Shipping</p>
                              <p>
                                   {" "}
                                   <span className="line-through text-gray-600">$10</span> Free
                              </p>
                         </div>
                         <div className="flex justify-between items-center text-lg mb-4 border-t pt-4 border-gray-600">
                              <p>Total</p>
                              <p>$ {cart.totalPrice.toFixed(2)}</p>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Checkout;
