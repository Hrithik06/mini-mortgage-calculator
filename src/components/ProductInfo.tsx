"use client";

import { useEffect, useState } from "react";

function ProductInfo() {
  const [product, setProduct] = useState<any>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  const getProduct = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/1");
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProduct(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loadingProduct) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-3 py-6 sm:py-10">
      {/* <div className="w-full min-h-screen flex flex-col items-center justify-start sm:justify-center px-3 py-6 sm:py-0"> */}
      <div className="w-full max-w-sm mx-auto">
        <div className="card w-full shadow-2xl rounded-md bg-transparent border border-neutral-700">
          {product?.thumbnail && (
            <figure>
              <img src={product.thumbnail} alt={product.title} />
            </figure>
          )}
          <div className="card-body ">
            <h2 className="card-title text-lg font-semibold">
              {product.title}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              {product.description}
            </p>
            <div className="card-actions flex-col items-end  ">
              <button className="btn btn-primary">${product.price}</button>
              <span className="text-xs px-2">
                {product?.availabilityStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
