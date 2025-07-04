import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    deleteProduct,
    fetchAdminProducts,
} from "../../redux/slices/adminProductSlice";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const ProductManagement = () => {
    const { products, loading, error } = useSelector(
        (state) => state.adminProducts
    );

    const [productsArray, setProductsArray] = useState([]);

function reverseArray(arr) {
  let reversedArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversedArr.push(arr[i]);
  }
  return reversedArr;
}


    useEffect(() => {
        let newArray = reverseArray(products);
        setProductsArray(newArray);
    }, [products]);


    console.log("Products:", productsArray);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId));
        toast.success("Product deleted successfully");
    };

    useEffect(() => {
        dispatch(fetchAdminProducts());
    }, [dispatch]);

    if (loading) return <p className="animate-pulse">Loading...</p>;
    if (error) return <p>Error : {error}</p>;
    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex justify-between">
                <h1 className="text-2xl mb-6 font-bold">Product Management</h1>
                <Link to="/admin/products/create">
                    <Plus className="w-8 h-8 hover:scale-110 transition-all duration-500 border-4 border-zinc-800 rounded-lg mr-8" />
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-zinc-500">
                    <thead className="bg-zinc-300 text-xs uppercase text-zinc-700">
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">SKU</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            productsArray?.map((product) => (
                                <tr
                                    key={product._id}
                                    onDoubleClick={() =>
                                        navigate(`/admin/products/${product._id}/edit`)
                                    }
                                    className="border-b border-zinc-200 cursor-pointer select-none"
                                >
                                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-2">{product.price}</td>
                                    <td className="px-4 py-2 whitespace-nowrap">{product.sku}</td>
                                    <td className="py-3 px-4 text-nowrap flex items-center">
                                        <Link
                                            to={`/admin/products/${product._id}/edit`}
                                            className="bg-yellow-400 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-2 transition-all"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteProduct(product._id)}
                                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
                                        >
                                            <FaTrashAlt size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className=" p-4 text-center text-zinc-500">
                                    No Products Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;
