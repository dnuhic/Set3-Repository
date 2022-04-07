import React from "react"
import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.css";
import { useParams } from "react-router-dom";
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"

const EditProduct = () => {

    const navigate = useNavigate()
    const [categories, setCategories] = useState(null)
    const [stocks, setStocks] = useState(null)
    const [newProduct, setNewProduct] = useState(null)

    const [name, setName] = useState("");

    const { id } = useParams();
    console.log(id);

    const getStockId = () => {
        if (stocks != null) {
            for (let stock of stocks) {
                if (stock.name === document.getElementById("stock").value) {
                    return stock.id;
                }
            }
        }
        return -1;
    }

    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

    const editProduct = () => {
        console.log("klik");
        if (stocks != null && categories != null) {
            if (document.getElementById("name").value == "" ||
                document.getElementById("categories").value == "" ||
                document.getElementById("stock").value == "") {
                alert("All fields must not be empty!");
                return;
            }
            let product = {
                "id": id,
                "StockId": getStockId(),
                "Name": document.getElementById("name").value,
                "CategoryName": document.getElementById("categories").value,
                "Deleted": false
            };

            setNewProduct(product);
            console.log(product);
            alert('Action completed!');
        }

    }

    useEffect(async () => {
        console.log(id);
        const getRequest = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };

        const responseSkaldista = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/StockModels`, getRequest);
        ResponseCheckModule.unauthorizedResponseCheck(responseSkaldista, navigate)
        const skladista = await responseSkaldista.json();
        setStocks(skladista);
        console.log(skladista);

        const responseKategorije = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/CategoryModels`, getRequest);
        ResponseCheckModule.unauthorizedResponseCheck(responseKategorije, navigate)
        const kategorije = await responseKategorije.json();
        setCategories(kategorije);
        console.log(kategorije);

        const responseOld = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/ProductModels/${id}`, getRequest);
        ResponseCheckModule.unauthorizedResponseCheck(responseOld, navigate)
        const old = await responseOld.json();
        console.log(old);

        document.getElementById("name").value = old.name;
    }, []);

    useEffect(async () => {
        if (document.getElementById("name").value != "" && document.getElementById("categories").value != "" &&
            document.getElementById("stock").value != "") {

            const putRequest = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
                credentials: 'same-origin',
                body: JSON.stringify(newProduct)
            };

            fetch(`${process.env.REACT_APP_BACKEND_URL}api/ProductModels/${id}`, putRequest)
                .then(response => { ResponseCheckModule.unauthorizedResponseCheck(response, navigate); response.json(); console.log(response); })
                .then(data => {
                    console.log(data)
                });

        }
    }, [newProduct]);

    return (
        <div className="container">
            <form className="unos">
                <h1>Edit product</h1>
                <div className="col">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Product name</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Product name"
                        />
                    </div>
                </div>
                <div className="col">
                    <label className="form-label" htmlFor="category">Category</label>
                    <select className="form-select" name="categories" id="categories">
                        {categories && categories.length &&
                            categories.map(q => <option>{q.name}</option>)}
                    </select>
                </div>
                <div className="col">
                    <label className="form-label" htmlFor="stock">Stock</label>
                    <select className="form-select" name="stock" id="stock">
                        {stocks && stocks.length &&
                            stocks.map(q => <option>{q.name}</option>)}
                    </select>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={editProduct}
                >
                    Edit product
                </button>
            </form>
        </div>
    )
}

export default EditProduct