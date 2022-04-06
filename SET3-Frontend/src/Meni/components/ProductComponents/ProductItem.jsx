import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./ProductItem.css";

function ProductItem({ props }) {
  const { id, name, category, stock, price } = props;

  const handleEdit = () => {
    //TODO: implement edit functiolality
    console.log("edit clicked");
  };

  const handleDelete = () => {
    //TODO: implement delete functionality
    console.log("delete clicked");
  };

  return (
      <tr className="product-item product-row">
        <td>{id}</td>
        <td>{name}</td>
        <td>{category}</td>
        <td>{stock}</td>
        <td>{price}</td>
        <td>
          <EditIcon onClick={handleEdit} />
        </td>
        <td>
          <DeleteForeverIcon onClick={handleDelete} />
        </td>
      </tr>
  );
}

export default ProductItem;
