import { useEffect, useRef, useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import {
    fetchProductsByFilters,
    setFilters,
} from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const searchBarRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickOutside = (e) => {
        const container = searchBarRef.current;
        // Close sidebar if clicked outside
        if (container && !container.contains(e.target)) {
            setIsOpen(false);
        }
    };

    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            dispatch(setFilters({ search: searchTerm }));
            dispatch(fetchProductsByFilters({ search: searchTerm }));
            navigate(`/collections/all?search=${searchTerm}`);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        // Add event listener to the document
        document.addEventListener("mousedown", handleClickOutside);
        // Remove event listener on cleanup
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div
            ref={searchBarRef}
            className={`flex items-center justify-center w-full transition-transform duration-300 ${isOpen
                ? "absolute top-0 left-0 bg-white h-12 z-50 translate-y-0 rounded-xl"
                : "w-auto h-0 -translate-y-full"
                }`}
        >
            {isOpen ? (
                <form
                    onSubmit={handleSearch}
                    className="relative flex items-center justify-between w-full  "
                >
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent text-black px-4 py-1 focus:outline-none w-full placeholder:text-gray-700"
                    />
                    {/* Search Icon */}
                    <button
                        type="submit"
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                    >
                        <svg fill="#D5BD95" viewBox="-3.56 -3.56 96.25 96.23" id="zoom" width="26" height="26" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 40.092l3.935-.227c-.797-14.123 9.985-26.225 24.104-27.057l-.227-3.936C19.019 9.83 6.576 23.797 7.5 40.092zm57.8 22.402c13.359-14.807 12.762-37.487-1.359-51.569-14.635-14.595-38.33-14.562-52.924.073C-3.129 25.084-3.728 47.795 9.658 62.607c13.857 15.334 37.523 16.531 52.857 2.674l2.857 2.857 20.959 20.96 2.785-2.788L65.3 62.494zm-4.113-1.324c-13.084 13.085-34.3 13.085-47.385.001-13.063-13.095-13.063-34.292 0-47.387C26.887.7 48.101.7 61.187 13.785s13.086 34.3 0 47.385z"></path></svg>
                    </button>
                </form>
            ) : (
                <button onClick={handleSearchToggle}>
                    <svg fill="#D5BD95" viewBox="-3.56 -3.56 96.25 96.23" id="zoom" width="26" height="26" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 40.092l3.935-.227c-.797-14.123 9.985-26.225 24.104-27.057l-.227-3.936C19.019 9.83 6.576 23.797 7.5 40.092zm57.8 22.402c13.359-14.807 12.762-37.487-1.359-51.569-14.635-14.595-38.33-14.562-52.924.073C-3.129 25.084-3.728 47.795 9.658 62.607c13.857 15.334 37.523 16.531 52.857 2.674l2.857 2.857 20.959 20.96 2.785-2.788L65.3 62.494zm-4.113-1.324c-13.084 13.085-34.3 13.085-47.385.001-13.063-13.095-13.063-34.292 0-47.387C26.887.7 48.101.7 61.187 13.785s13.086 34.3 0 47.385z"></path></svg>
                </button>
            )}
        </div>
    );
};

export default SearchBar;
