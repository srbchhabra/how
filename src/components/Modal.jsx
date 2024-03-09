import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const ProductDescription = ({ isOpen, onClose, product, id }) => {
  const selectedProduct = product.find(
    (item) => item.id === id
  );
  
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
        <div className="flex justify-center items-center flex-col" >
        <h2 className="text-black text-4xl" >{selectedProduct.title}</h2>
        <img
        width={300}
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="product-image"
        />
        <p className="product-description text-black font-thin text-2xl">{selectedProduct.description}</p>
        <p className="product-price text-black ">${selectedProduct.price}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDescription;
