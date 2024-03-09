import { motion } from "framer-motion";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import ProductDescription from "../components/Modal";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";
export default function Home({ products }) {
  const [productsData, setProductsData] = useState([]);
  const [desc, setDesc] = useState(false);
  const [selectedid, setSelectedID] = useState();
  const [cartProducts, setCartProducts] = useState([]);
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const products = response.data;
        setProductsData(products);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchData();
  }, []);
  const handleclose = () => {
    setDesc(false);
    setOpenCart(false)
  };
  console.log(cartProducts, "data");
  const handleAddToCart = (productId) => {
    const productToAdd = productsData.find(
      (product) => product.id === productId
    );
    setCartProducts((prevSettings) => [...prevSettings, productToAdd]);
  };
  return (
    <>
      {!desc && !openCart && (
        <div className="container mx-auto py-12 px-4">
          <Head>
            <title>Product Listing</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <div className="flex justify-between w-full">
            <h1 className="text-3xl font-semibold mb-8">Product Listing</h1>
            <div className="flex justify-center items-center" >
              <FaShoppingCart className="text-4xl" onClick={()=>setOpenCart(true)} />
              <span className="text-white">{cartProducts.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productsData.length > 0 ? (
              productsData.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-lg z-40 overflow-hidden shadow-md"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    onClick={() => {
                      setDesc(true), setSelectedID(product.id);
                    }}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48  cursor-pointer object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl text-black font-semibold mb-2">
                      {product.title}
                    </h2>
                    <div className="flex justify-between">
                      <p className="text-black"> PRICE - ${product.price}</p>
                      <button
                        onClick={() => handleAddToCart(product.id)}
                        className="bg-orange-400 hover:bg-slate-800 z-50 p-2 rounded-[10px]"
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}
      {desc && (
        <div className="absolute top-0 z-50 w-full h-[100vh]  bg-transparent bg-white">
          <ProductDescription
            product={productsData}
            isOpen={true}
            onClose={handleclose}
            id={selectedid}
          />
        </div>
      )}
       {openCart && (
        <div className="absolute top-0 z-50 w-full h-[100vh]  bg-transparent bg-white">
          <Cart
            product={cartProducts}
            isOpen={true}
            onClose={handleclose}
            id={selectedid}
          />
        </div>
      )}
    </>
  );
}
