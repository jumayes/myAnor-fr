import React from "react";
import {Link} from "react-router-dom"
export default function History(){
    document.addEventListener("load", function () {
        fetchDataFromBackend();
    });

    function fetchDataFromBackend() {
        // Fetch data from your backend API
        fetch("http://localhost:8084/salary/history/list", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getAccessToken()}`, // Include the token in the Authorization header if needed
            },
            mode: "cors",
        })
            .then((response) => response.json())
            .then((data) => {
                // Populate the table with the fetched data
                populateTableWithData(data);
            })
            .catch((error) => {
                console.error("Error fetching data from backend:", error);
            });
    }

    function populateTableWithData(data) {
        const tableBody = document.querySelector("#example tbody");
        tableBody.innerHTML = ""; // Clear the existing rows

        data.forEach((item, index) => {
            // Create a new row for each item in the data array
            const row = document.createElement("tr");

            // Create and append cells with data for each row
            const columns = ["fullName", "management", "department","lavozim" ,"oldSalary", "newSalary",  "createdAt", "changedAt"];
            const numberCell = document.createElement("td");
            numberCell.textContent = index + 1; // Number the rows starting from 1
            row.appendChild(numberCell);

            columns.forEach((column) => {
                const cell = document.createElement("td");
                cell.textContent = item[column];
                row.appendChild(cell);
            });

            // Add the row to the table body
            tableBody.appendChild(row);
        });
    }

    function getAccessToken() {
        // Implement this function to retrieve the access token if needed
        // For example, you can store the token in localStorage when the user logs in
        // and retrieve it here
        return localStorage.getItem("jwtToken");
    }
    return(
        <div>
            <div className="main-content">
    <div className="container containerBlock">

        <div className="containerBlockSearch">

            <div>
                <label for="searchInput"></label>
                <input type="text" id="searchInput" className="searchInput" placeholder="Search..." />
            </div>

            <div className="dropdown">
                <Link to="/home">
                    <button className="nullBtn">
                        <i className="fas fa-home"></i> 
                    </button>
                </Link>
            </div>

        </div>

    </div>
            </div>

            <div class="container">
    <table id="example" class="table bg-red" style={{width:"100%"}}>
        <thead>
        <tr>
            <th>№</th>
            <th>ФИО</th>
            <th>Управление</th>
            <th>Отдел</th>
            <th>Должность</th>
            <th>Старая зарплата</th>
            <th>Новая зарплата</th>
            <th>Дата создания</th>
            <th>Дата изменения</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
            </div>
        </div>
    )
}