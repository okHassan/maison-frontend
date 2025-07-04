import { Link } from "react-router-dom";
import heroImg from "../../assets/HeroImage.webp";
import { motion } from "framer-motion";
const Hero = () => {
    return (
        <section className="relative mt-10">
            <img
                src={'https://img.fantaskycdn.com/01ce927f9b5bc0e4d5ba741674ff6aa3_2560x.jpg'}
                alt="Hero Image"
                className="w-full h-[500px] md:h-[700px] lg:h-[800px] object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-start">
                <div className="text-start text-white p-6">
                    <div className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4 !leading-[70px] ml-16">
                        <motion.h1
                            initial={{ opacity: 0, x: 80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            NEW
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, x: -80 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            COLLECTION
                        </motion.h1>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-sm tracking-wide md:text-lg mb-6 ml-16"
                    >
                        Welcome the season in a unique style! <br />A combination of elegance, comfort and the latest <br /> trends that will  emphasize your self-confidence!
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link
                            to="#"
                            className="bg-[#EA3F36] text-gray-900 px-6 py-3 rounded-sm text-lg font-medium ml-16"
                        >
                            Shop Now
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
