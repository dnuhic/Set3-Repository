import { Alert } from 'bootstrap';
import React, { Component, useState, useEffect, useCallback } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import ResponseCheckModule from "../ErrorPage/ResponseCheckModule"
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton, Table, Container } from 'react-bootstrap';
import '../styleForm.css';

const ProductToShop = () => {

    return (
        <>
          
            <form>
                <h3>Add Products to Shop</h3>
                <select id="choosenShop">
                    <option disabled selected value> Select Shop </option>
                    <option value="Shop1">Shop1</option>
                    <option value="Shop2">Shop2</option>
                    <option value="Shop3">Shop3</option>
                    <option value="Shop4">Shop4</option>
                </select>

                <div className="form-group">

                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                
                                <th>Product</th>
                                <th>Available Quantities</th>
                                <th>Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Cokolada</td>
                                <td>5</td>
                                <td><input type="number" name="transport quantity" defaultValue="0"/></td>
                            </tr>
                            <tr>
                                <td>Sok</td>
                                <td>3</td>
                                <td><input type="number" name="transport quantity" defaultValue="0" /></td>
                            </tr>
                            <tr>
                                <td>Mlijeko</td>
                                <td>10</td>
                                <td><input type="number" name="transport quantity" defaultValue="0"/></td>
                            </tr>
                        </tbody>
                    </Table>

                </div>
               
                <button type="submit" className="btn btn-primary btn-block"> Add </button>
               
            </form>
       
    
}
            </>
       
    );

};

export default ProductToShop;