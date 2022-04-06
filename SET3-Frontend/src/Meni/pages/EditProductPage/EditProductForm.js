import React, { Component, useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

function EditProductForm() {

    // podaci iz baze:
    const [product, setProduct] = useState(null);

    const [updatedProduct, setUpdatedProduct] = useState(null);

    const [name, setName] = useState("");
    const [stock, setStock] = useState(null);
    const [category, setCategory] = useState(null);    

    const [stocks, setStocks] = useState(null);
    const [categories, setCategories] = useState(null);   

    const { id } = useParams();

    // EDIT PRODUCT
    const editProduct = () => {
        const newProduct = {
            Id: product.id,
            StockId: stock,
            Name: document.getElementById("name").value,
            CategoryName: category,
            Price: product.price,
            Deleted: product.deleted
        };

        console.log("NEW PRODUCT: ");
        console.log(newProduct);

        setUpdatedProduct(newProduct);
    }

    const getData = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };

        // Check if these are the correct URLs
        const responseProduct = await fetch(`${process.env.REACT_APP_BACKEND_URL}productmodels/${id}`, requestOptions);
        const dataProduct = await responseProduct.json();
        
        const responseCategory = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/Categories`)
        const dataCategories = await responseCategory.json();

        const responseStocks = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/Stocks`)
        const dataStocks = await responseStocks.json();

        setProduct(dataProduct);
        setName(dataProduct.name);
        setStock(dataProduct.stockId);
        setCategory(dataProduct.categoryName);
        setCategories(dataCategories);
        setStocks(dataStocks);
        console.log(dataProduct);
    };

    useEffect(getData, []);

    useEffect(async () => {
        if (product != null && updatedProduct != null) {
            console.log(updatedProduct);
            const requestOptions = {
                method: "POST",
                headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true, "Content-Type": "application/json" },
                body: JSON.stringify(updatedProduct),
                credentials: 'same-origin'
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}usermodels/${product.id}`, requestOptions);


            console.log("OVO ERROR BACA ");
            console.log(response);


            alert("Changes have been saved succesfully!")
        }

    }, [updatedProduct]);

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }
    const handleStockChange = (e) => {
        setStock(e.target.value)
    }

    return (
        <>
             <form className="unos">
                <div className="col">
                    <h1>Edit product</h1>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <input value={name}
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Product name"
                                onChange={handleNameChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                        <div className="form-click">
                            <div className="form-box">
                                <select name="role" id="role" className="category" value={category} onChange={handleCategoryChange}>
                                    {categories && categories.length &&
                                        categories.map(q => <option value={q.categoryName}>{q.categoryName}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">

                        <div className="form-click">
                            <div className="form-box">
                                <select name="role" id="role" className="stock" value={stock} onChange={handleStockChange}>
                                    {stocks && stocks.length &&
                                        stocks.map(q => <option value={q.stock}>{q.categoryName}</option>)
                                    }
                                </select>
                             </div>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={editProduct}
                >
                    Edit product
                </button>
                
            </form>
           
        </>

    );
}

export default EditProductForm;