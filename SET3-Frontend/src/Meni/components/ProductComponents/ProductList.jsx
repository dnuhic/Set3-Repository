import React from "react";
import ProductItem from "./ProductItem";
import "./ProductList.css";

function ProductList({ listOfProducts }) {
  return (
    <div className="product-list container">
      <table className="product-list table-of-products">
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Kategorija</th>
            <th>Skladište</th>
            <th>Cijena</th>
            <th>Edit</th>
            <th>Delete</th>
            <button className="product-list add-btn">Add</button>
          </tr>
        </thead>
        <tbody>
          {listOfProducts.map((item) => (
            <ProductItem key={item.id} props={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

ProductList.defaultProps = {
  listOfProducts: [
    {
      id: 1,
      name: "jabuka",
      category: "voce",
      stock: "otoka",
      price: 2.5,
    },
    {
      id: 2,
      name: "banana",
      category: "voce",
      stock: "vijecnica",
      price: 555555,
    },
    {
      id: 3,
      name: "kruuska",
      category: "pice",
      stock: "pofalici",
      price: 225,
    },
    {
      id: 4,
      name: "zeko",
      category: "igracka",
      stock: "grbavica",
      price: 22.5,
    }
  ],
};

export default ProductList;
