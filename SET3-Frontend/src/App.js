import React from 'react';
import './AccessRights/AccessRights.css';


function App() {
    return (
        <div className="App">
            <div className="Naslov">
                <h1>Promjena prava pristupa za sve korisnike</h1>
            </div>
            <table>
                <tr>
                    <th>Tip</th>
                    <th>Read</th>
                    <th>Write</th>
                    <th>Delete</th>
                </tr>
            </table>
        </div>
    );
}

let btn = document.createElement("button");
btn.innerHTML = "Save";
btn.type = "submit";
btn.name = "formBtn";
btn.id = "spremi";
document.body.appendChild(btn);



export default App;
