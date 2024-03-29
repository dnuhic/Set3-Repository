import React from "react"
import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.css";
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';

const AddProduct = () => {

    const navigate = useNavigate()
    const [categories, setCategories] = useState(null)
    const [stocks, setStocks] = useState(null)
    const [measuringUnits, setMeasuringUnits] = useState(null)
    const [newProduct, setNewProduct] = useState(null)


    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

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

    const getCategoryId = () => {
        if (stocks != null) {
            for (let category of categories) {
                if (category.Name === document.getElementById("categories").value) {
                    return category.Id;
                }
            }
        }
        return -1;
    }

    const createProduct = () => {
        console.log("klik zasad")
        if (stocks != null) {
            if (document.getElementById("name").value == "" ||
                document.getElementById("categories").value == "" ||
                document.getElementById("stock").value == "") {
                alert("All fields must not be empty!");
                return;
            }
            // if(document.getElementById("typePrice").value < 0) {
            //    alert("Price cannot be negative!");
            //    return;
            // }
        }

       
        let product = {
            "StockId": getStockId(),
            "Name": document.getElementById("name").value,
            "CategoryName": document.getElementById("categories").value,
            "Deleted": false,
            "Barcode": "",
            "BarcodeText": "",
            "Quantity": 0,
            "Price": 2.0,
            "MeasuringUnit": document.getElementById("measuringUnits").value
        };

        setNewProduct(product);
        //
        //
        console.log(product);
        alert('Action completed!');
    }


    useEffect(async () => {

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

        const responseMeasuringUnits = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/MeasuringUnits`)
        ResponseCheckModule.unauthorizedResponseCheck(responseMeasuringUnits, navigate)
        const jedinice = await responseMeasuringUnits.json();
        setMeasuringUnits(jedinice);
        console.log(jedinice);
        //const nizString = skladista.map((s) => s.name);
        //console.log(nizString);
        //setStocks(nizString);

    }, []);

    useEffect(async () => {
        if (document.getElementById("name").value != "" && document.getElementById("categories").value != "" &&
            document.getElementById("stock").value != "") {

            const postRequest = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
                credentials: 'same-origin',
                body: JSON.stringify(newProduct)
            };

            fetch(`${process.env.REACT_APP_BACKEND_URL}api/ProductModels`, postRequest)
                .then(response => { ResponseCheckModule.unauthorizedResponseCheck(response, navigate); response.json(); console.log(response); })
                .then(data => {
                    console.log(data)
                });

        }
    }, [newProduct]);

    const createCategory = () => {
        navigate('/addnewcategory');
    }

    return (
        <Box sx={{
            width: '40%',
            padding: '20px',
            height: '40%',
            bgcolor: '#a8c0c0',
            boxShadow: 16,
            borderRadius: '0 0 20px 20px',
            position: 'relative',
            overflow: 'auto',
            margin: 'auto'
        }}>
        <div className="container">
            <form className="unos">
                <div className="col">
                    <h1>Add product</h1>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label className="form-label" for="name">Product name</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            placeholder="Product name"
                        />
                    </div>
                </div>
                <div className="col">
                    <label className="form-label" for="category">Category</label>
                    <select className="form-select" name="categories" id="categories">
                        {categories && categories.length &&
                            categories.map(q => <option>{q.name}</option>)}
                    </select>
                 </div>
                    <div>Don't see the category you need?</div>
                <button
                        type="button"
                        onClick={createCategory}>
                        Create new category
                </button>
                <div className="col">
                        <label className="form-label" for="measuringUnits">Choose a measuring unit for product</label>
                        <select className="form-select" name="measuringUnits" id="measuringUnits">
                            {measuringUnits && measuringUnits.length &&
                                measuringUnits.map(q => <option>{q.measuringUnitName}</option>)}
                        </select>
                </div>
                <div className="col">
                    <label className="form-label" for="stock">Stock</label>
                    <select className="form-select" name="stock" id="stock">
                        {stocks && stocks.length &&
                            stocks.map(q => <option>{q.name}</option>)
                        }
                    </select>
                </div>
                <button
                    type="button"
                    onClick={createProduct}
                >
                    Add product
                </button>
            </form>
            </div>
        </Box>
    )
}

export default AddProduct