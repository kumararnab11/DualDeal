import React from "react";

const ProductCard = ({ product ,company}) => {
  return (
    <div className="border p-4 rounded-md shadow">
      <img
        src={product.product_photo}
        alt={product.product_title || 'No title available'}
        className="h-48 w-auto mb-2 flex justify-self-center"
      />
      <p className="font-semibold">{product.product_title || 'No title available'}</p>
      <p className="text-gray-700">Price: {product.product_price || 'N/A'}</p>
      <p>
        More Info:{" "}
        <a
          href={product.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          <span className="text-black">View on</span> <span className="hover:underline">{company}</span>
        </a>
      </p>
    </div>
  );
};

export default ProductCard;
