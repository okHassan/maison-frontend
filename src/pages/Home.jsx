import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import Hero from "../Components/Layout/Hero";
import Pics from "../Components/Layout/Pics";
import GenderCollectionSection from "../Components/Products/GenderCollectionSection";
import NewArrivals from "../Components/Products/NewArrivals";
import ProductGrid from "../Components/Products/ProductGrid";
import FeaturedCollection from "../Components/Products/FeaturedCollection";
import FeaturesSection from "../Components/Products/FeaturesSection";

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProductsByFilters({})); // you can customize filter options here
    }, [dispatch]);

    return (
        <main>
            <Hero />
            <Pics />
            <GenderCollectionSection />
            <NewArrivals />

            <div className="!bg-white !w-full container mx-auto p-2 ">
                <h2 className="text-3xl text-center font-bold py-4">Top Wears for Women</h2>
                <ProductGrid products={products} loading={loading} error={error} />
            </div>

            <FeaturedCollection />
            <FeaturesSection />
            <div
                className="container mx-auto p-2 flex justify-center items-center"
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
            >
                <button className="font-bold text-zinc-800 text-lg cursor-pointer">.</button>
            </div>
        </main>
    );
};

export default Home;
