import React from "react"
import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.css";
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';


const AddCategory = () => {

    const navigate = useNavigate()
    const [categories, setCategories] = useState(null)
    const [newCategory, setNewCategory] = useState(null)



    function getCookie(key) {
        var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return b ? b.pop() : "";
    }

   

    const createCategory = () => {
        console.log("klik zasad")
        if (categories != null) {
            if (document.getElementById("name").value == "") {
                alert("All fields must not be empty!");
                return;
            }
                

            for (let i = 0; i < categories.length; i++) {
                if (categories[i].name == document.getElementById("name").value) {
                    alert('That category already exist!');
                    return;
                }
            }


            let category = {

                "Name": document.getElementById("name").value

            };

            setNewCategory(category);
            //
            //
            console.log(category);
        //alert('Action completed!');
            }
    }


    useEffect(async () => {

        const getRequest = {
            method: 'GET',
            headers: { "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
            credentials: 'same-origin'
        };

        const responseKategorije = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/CategoryModels`, getRequest);
        ResponseCheckModule.unauthorizedResponseCheck(responseKategorije, navigate)
        const kategorije = await responseKategorije.json();
        setCategories(kategorije);
        console.log(kategorije);

    }, []);

    useEffect(async () => {
        if (document.getElementById("name").value != "") {

            const postRequest = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Authorization": "bearer " + getCookie("jwt"), "Access-Control-Allow-Credentials": true },
                credentials: 'same-origin',
                body: JSON.stringify(newCategory)
            };

            fetch(`${process.env.REACT_APP_BACKEND_URL}api/CategoryModels`, postRequest)
                .then(response => { ResponseCheckModule.unauthorizedResponseCheck(response, navigate); response.json(); console.log(response); })
                .then(data => {
                    console.log(data)
                });
            document.getElementById("name").value = "";
            alert('Action completed!');
        }
    }, [newCategory]);

    return (
        <Box sx={{
            width: '30%',
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
                        <h1>Add new category</h1>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label className="form-label" for="name">Category name</label>
                            <input
                                id="name"
                                type="text"
                                className="form-control"
                                placeholder="Category name"
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={createCategory}
                    >
                        Add category
                    </button>
                </form>
            </div>
        </Box>
    )
}

export default AddCategory