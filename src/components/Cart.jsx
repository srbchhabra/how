import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const Cart = ({ isOpen, onClose, product, id }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Product Description"
      className="modal absolute m-auto z-[55] rounded-lg top-[10vh] left-[10%] p-10 w-[80%] overflow-y-auto h-[80vh] bg-white"
      overlayClassName="overlay"
    >
      <div className="modal-content  ">
        <div>
          <button
            className="close-btn text-red-500 font-bold text-3xl gap "
            onClick={onClose}
          >
            X
          </button>
        </div>
        {product.map((product) => (
          <div className="flex justify-center items-center flex-col">
            <h2 className="text-black text-4xl">{product.title}</h2>
            <img
              width={300}
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <p className="product-description text-black font-thin text-2xl">
              {product.description}
            </p>
            <p className="product-price text-black ">${product.price}</p>
          </div>
        ))}
        <button
          onClick={() => handleAddToCart(product.id)}
          className="bg-orange-400 hover:bg-slate-800 z-50 p-2 rounded-[10px]"
        >
          Check Out
        </button>
      </div>
    </Modal>
  );
};

export default Cart;
