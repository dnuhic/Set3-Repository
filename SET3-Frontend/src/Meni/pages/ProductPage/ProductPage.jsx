import React from "react";
import ProductList from "../../components/ProductComponents/ProductList";
import "./ProductPage.css";

function ProductPage() {
  return (
    <div>
      <h1 className="product-page header">Lista produkata</h1>
      <ProductList /*listOfProducts={api call}*/ />
    </div>
  );
}

export default ProductPage;
