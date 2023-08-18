import React, { useRef } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Home(){

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const modalOpenRef = useRef()

    let userModal = document.getElementById("userModal");
    let addUserForm = document.getElementById("addUserForm");
    let editModal = document.getElementById("editModal");
    let salaryMadal = document.getElementById("UserSalaryEdit")
    let deleteModal = document.getElementById("deleteModal");
    let confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    let cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
    let editUserForm = document.getElementById("editUserForm");
    let editUserExpired = document.getElementById("editSalaryForm");
    let excelFileInput = document.getElementById("excelFileInput");

    function Success(name, choose) {

        switch (choose) {
            case 1:
                AlerS('./img/access.png', name, 'flex', 'Успешно')
                break;
            case 2:
                AlerS('./img/error.png', name, 'flex', 'Oops')
                break;
            default:
                console.log("Looking forward to the Weekend");
        }

    }


    function AlerS(url, text, display, title) {
        const Alert = document.getElementById('alert');
        const Block = document.createElement('div');
        const BlockBody = document.createElement('div');
        const Img = document.createElement('img');
        const Title = document.createElement('p');
        const Text = document.createElement('p');
        const Button = document.createElement('button');

        Img.src = url;
        Img.style.width = '55px';
        Img.style.height = '55px';

        Img.className = 'successClassImg';
        Title.className = 'successClassTitle';
        Text.className = 'successClassText';
        Button.className = 'successClassBtn';
        BlockBody.className = 'SuccessClassBlockBody';
        Block.className = ' SuccessClassBlock';

        Block.style.display = display;
        sleep(2000).then(() => {
            Block.style.display = 'none';
        });
        Title.innerHTML = title;
        Text.innerHTML = text;
        Button.innerHTML = 'Ok'

        Button.addEventListener('click', () => {
            Block.style.display = 'none';
        })

        BlockBody.appendChild(Img);
        BlockBody.appendChild(Title);
        BlockBody.appendChild(Text);
        BlockBody.appendChild(Button);
        Block.appendChild(BlockBody);
        Alert.appendChild(Block);
    }

    // Function to handle file upload
    function uploadExcel(file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch(`http://localhost:8084/salary/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Response from backend:', data.message);
                // Handle the response from the backend if needed
                fetchDataFromBackend(); // Fetch data after successful upload to update the table
                Success('Успешно', 1);
            })
            .catch((error) => {
                Success('Ошибка', 2);
                console.error('Error uploading file:', error);
            });
    }

    function myFunctionBtn() {
        const file = document.getElementById('excelFileInput').files[0];

        if (file) {
            uploadExcel(file);
        } else {
            document.getElementById('excelFileInput').click();
        }
    }

    // excelFileInput.addEventListener('change', function () {
    //     if (excelFileInput.files[0] !== undefined && excelFileInput.files[0] !== null) {
    //         myFunctionBtn();
    //     }
    // });

    const excelFileChange = () => {
        if (excelFileInput.files[0] !== undefined && excelFileInput.files[0] !== null) {
            myFunctionBtn();
        }
    }

    // openModalBtn.addEventListener("click", function () {
    //     userModal.style.display = "block";
    // });
    const openModalClick = () => {
        modalOpenRef.current.style.display = "block";
    }

    // closeModal.addEventListener("click", function () {
    //     userModal.style.display = "none";
    // });
    const closeModalClick = () => {
        modalOpenRef.current.style.display = "none";
    }

    function getAccessToken() {
        return localStorage.getItem("jwtToken");
    }

    // addUserForm.addEventListener("submit", function (event) {
    //     event.preventDefault();
    //     // Get the form input values here and handle the addition of a new user
    //     const fullName = document.getElementById("fullName").value;
    //     const management = document.getElementById("management").value;
    //     const department = document.getElementById("department").value;
    //     const createdAt = document.getElementById("createdAt").value;
    //     const salary = document.getElementById("salary").value;
    //     const changeDate = document.getElementById("changeDate").value;
    //     const lavozim = document.getElementById("lavozim").value;

    //     // Create an object to hold the user data
    //     const newUser = {
    //         fullName: fullName,
    //         management: management,
    //         department: department,
    //         createdAt: createdAt,
    //         salary: parseFloat(salary),
    //         changeDate: changeDate,
    //         lavozim: lavozim,
    //     };

    //     // Send the user data to the backend using Fetch API
    //     fetch("http://localhost:8084/salary/add", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${getAccessToken()}`, // Include the token in the Authorization header
    //         },
    //         body: JSON.stringify(newUser),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {

    //             // Refresh the table after successful addition
    //             fetchDataFromBackend();

    //             // Reset the form and close the modal after submission
    //             addUserForm.reset();
    //             userModal.style.display = "none";
    //             Success('Успешно', 1);
    //         })
    //         .catch((error) => {
    //             Success('Ошибка', 2);
    //             console.error("Error sending data to backend:", error);
    //         });
    // });

  const addUserSubmit = (event) => {
        event.preventDefault();
        // Get the form input values here and handle the addition of a new user
        const fullName = document.getElementById("fullName").value;
        const management = document.getElementById("management").value;
        const department = document.getElementById("department").value;
        const createdAt = document.getElementById("createdAt").value;
        const salary = document.getElementById("salary").value;
        const changeDate = document.getElementById("changeDate").value;
        const lavozim = document.getElementById("lavozim").value;

        // Create an object to hold the user data
        const newUser = {
            fullName: fullName,
            management: management,
            department: department,
            createdAt: createdAt,
            salary: parseFloat(salary),
            changeDate: changeDate,
            lavozim: lavozim,
        };

        // Send the user data to the backend using Fetch API
        fetch("http://localhost:8084/salary/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAccessToken()}`, // Include the token in the Authorization header
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((data) => {

                // Refresh the table after successful addition
                fetchDataFromBackend();

                // Reset the form and close the modal after submission
                addUserForm.reset();
                userModal.style.display = "none";
                Success('Успешно', 1);
            })
            .catch((error) => {
                Success('Ошибка', 2);
                console.error("Error sending data to backend:", error);
            });
    };

    function populateTableWithData(data) {
        const tableBody = document.querySelector("#example tbody");
        tableBody.innerHTML = ""; // Clear the existing rows

        data.forEach((item, index) => {
            // Create a new row for each item in the data array
            const row = document.createElement("tr");

            row.setAttribute("data-id", item.id);

            // Create and append cells with data for each row
            const columns = ["fullName", "management", "department", "lavozim", "salary", "createdAt", "changeDate", "status"];
            const numberCell = document.createElement("td");
            numberCell.textContent = index + 1; // Number the rows starting from 1
            row.appendChild(numberCell);

            columns.forEach((column) => {
                const cell = document.createElement("td");
                cell.textContent = item[column];
                row.appendChild(cell);
            });

            const actionsCell = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.className = "btn btn-primary edit-btn";
            editButton.innerHTML = '<i class="fa-solid fa-pen-to-square edit-btn "></i>';
            editButton.dataset.bsToggle = "modal";
            editButton.dataset.bsTarget = "#editModal";
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-danger confirmDeleteBtn delete-btn example";
            deleteButton.innerHTML = '<i class="fa-solid delete-btn fa-trash icon-size"></i>';
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);

            if (item.changeDate === undefined || item.changeDate === null) {
                row.style.backgroundColor = '#fffaca';
                row.style.color = 'black';
            }

            // Add the row to the table body
            tableBody.appendChild(row);
        });
    }

    function getExpired(data) {
        const tableBody = document.querySelector("#example tbody");
        tableBody.innerHTML = ""; // Clear the existing rows

        data.forEach((item, index) => {
            // Create a new row for each item in the data array
            const row = document.createElement("tr");

            row.setAttribute("data-id", item.id);
            // Create and append cells with data for each row
            const columns = ["fullName", "management", "department", "lavozim", "salary", "createdAt", "changeDate", "status"];
            const numberCell = document.createElement("td");
            numberCell.textContent = index + 1; // Number the rows starting from 1
            row.appendChild(numberCell);

            columns.forEach((column) => {
                const cell = document.createElement("td");
                cell.textContent = item[column];
                row.appendChild(cell);
            });

            // Add the "done" symbol cell
            const doneCell = document.createElement("td");

            // Use the checkmark symbol (✓) as the "done" symbol
            const editButton = document.createElement("button");
            editButton.className = "btn btn-primary edit-expired";
            editButton.innerHTML = '<i class="fa-solid fa-pen-to-square edit-expired"></i>';
            editButton.dataset.bsToggle = "modalExpired";
            editButton.dataset.bsTarget = "#editModalExpired";
            doneCell.appendChild(editButton);
            row.appendChild(doneCell);

            // Add the row to the table body
            tableBody.appendChild(row);
        });
    }


    function fetchDataFromBackend() {
        // Fetch data from your backend API
        fetch("http://localhost:8084/salary/list", {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${getAccessToken()}`, // Include the token in the Authorization header
            }
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

    function fetchDataFromBackendExpired() {
        // Fetch data from your backend API
       fetch("http://localhost:8084/salary/expired", {
           method: "GET",
           headers: {
               "Authorization": `Bearer ${getAccessToken()}`, // Include the token in the Authorization header
                  }
              })
                  .then((response) => response.json())
                  .then((data) => {
                      // Populate the table with the fetched data
               getExpired(data);
           })
           .catch((error) => {
               console.error("Error fetching data from backend:", error);
           });
    }

    function fetchDepartmentsAndPopulateDropdown() {
        // Fetch departments from your backend API
        fetch("http://localhost:8084/salary/departments", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${getAccessToken()}`, // Include the token in the Authorization header
            }
        })
            .then((response) => response.json())
            .then((departments) => {
                // Populate the filter dropdown with the fetched departments
                const departmentFilterDropdown = document.getElementById("departmentFilter");

                departments.forEach((department) => {
                    const option = document.createElement("a");
                    option.textContent = department; // Assuming department names are strings
                    option.classList.add("dropdown-item");
                    option.href = "#"; // You can add a link to each option if needed
                    departmentFilterDropdown.appendChild(option);
                });

                // Add click event listeners to each department filter option
                const filterOptions = document.querySelectorAll("#departmentFilter .dropdown-item");
                filterOptions.forEach((option) => {
                    option.addEventListener("click", function () {
                        const selectedDepartment = option.textContent;
                        filterTableByDepartment(selectedDepartment);
                    });
                });
            })
            .catch((error) => {
                console.error("Error fetching departments from backend:", error);
            });
    }

    function filterTableByDepartment(selectedDepartment) {
        const tableRows = document.querySelectorAll("#example tbody tr");

        tableRows.forEach((row) => {
            const department = row.cells[3].textContent; // "Отдел" value in the row
            if (selectedDepartment === "Все") {
                // If "Все" is selected in the filter, show all rows
                row.style.display = "table-row";
            } else if (department === selectedDepartment) {
                // Show the row if it belongs to the selected department
                row.style.display = "table-row";
            } else {
                // Hide the row if it does not belong to the selected department
                row.style.display = "none";
            }
        });
    }

    // Call the function to fetch data and populate the table when the page loads
    document.addEventListener("load", function () {
        fetchDataFromBackend();
        fetchDepartmentsAndPopulateDropdown();
    });

    function editUser(userId) {
        // Get the user data from the table row using the userId
        const userData = getUserDataById(userId);

        // Populate the edit modal with the user data
        document.getElementById("editUserId").value = userId;
        document.getElementById("editFio").value = userData.fullName;
        document.getElementById("editManagement").value = userData.management;
        document.getElementById("editDepartment").value = userData.department;
        document.getElementById("editCreatedAt").value = userData.createdAt;
        document.getElementById("editSalary").value = userData.salary;
        document.getElementById("editChangeDate").value = userData.changeDate;
        document.getElementById("editLavozim").value = userData.lavozim;

        // Show the edit modal
        editModal.style.display = "block";
    }

    function expiredUser(userId){
        const userData = getUserDataById(userId);
        document.getElementById("editUserIdExpired").value = userId;
        document.getElementById("editFio").value = userData.fullName;
        document.getElementById("editManagement").value = userData.management;
        document.getElementById("editDepartment").value = userData.department;
        document.getElementById("editCreatedAt").value = userData.createdAt;
        document.getElementById("editSalaryExpired").value = userData.salary;
        document.getElementById("editChangeDate").value = userData.changeDate;
        document.getElementById("editLavozim").value = userData.lavozim;



        // Show the edit modal
        salaryMadal.style.display = "block";
    }

    // editUserExpired.addEventListener("submit", function (event) {
    //     event.preventDefault();
    //     // Get the form input values here and handle the editing of the user
    //     const userId = document.getElementById("editUserIdExpired").value;
    //     const fullName = document.getElementById("editFio").value;
    //     const management = document.getElementById("editManagement").value;
    //     const department = document.getElementById("editDepartment").value;
    //     const createdAt = document.getElementById("editCreatedAt").value;
    //     const salary = document.getElementById("editSalaryExpired").value;
    //     const changeDate = document.getElementById("editChangeDate").value;
    //     const lavozim = document.getElementById("editLavozim").value;

    //     // Create an object to hold the updated user data
    //     const updatedUser = {
    //         id: userId,
    //         fullName: fullName,
    //         management: management,
    //         department: department,
    //         createdAt: createdAt,
    //         salary: parseFloat(salary),
    //         changeDate: changeDate,
    //         lavozim: lavozim,
    //     };


    //     // Send the updated user data to the backend using Fetch API
    //     fetch("http://localhost:8084/salary/update", {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${getAccessToken()}`, // Include the token in the Authorization header
    //         },
    //         body: JSON.stringify(updatedUser),
    //     })
    //         .then((response) => response.json())
    //         .then(() => {

    //             // Refresh the table after successful update
    //             fetchDataFromBackend();
    //             editUserExpired.reset();
    //             Success('Успешно', 1);
    //             salaryMadal.style.display = "none"; // Hide the edit modal
    //         })
    //         .catch((error) => {
    //             Success('Ошибка', 2);
    //             console.error("Error updating user:", error);
    //         });
    // });

    const editUserSubmit = (event) => {
        event.preventDefault();
        // Get the form input values here and handle the editing of the user
        const userId = document.getElementById("editUserIdExpired").value;
        const fullName = document.getElementById("editFio").value;
        const management = document.getElementById("editManagement").value;
        const department = document.getElementById("editDepartment").value;
        const createdAt = document.getElementById("editCreatedAt").value;
        const salary = document.getElementById("editSalaryExpired").value;
        const changeDate = document.getElementById("editChangeDate").value;
        const lavozim = document.getElementById("editLavozim").value;

        // Create an object to hold the updated user data
        const updatedUser = {
            id: userId,
            fullName: fullName,
            management: management,
            department: department,
            createdAt: createdAt,
            salary: parseFloat(salary),
            changeDate: changeDate,
            lavozim: lavozim,
        };


        // Send the updated user data to the backend using Fetch API
        fetch("http://localhost:8084/salary/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAccessToken()}`, // Include the token in the Authorization header
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then(() => {

                // Refresh the table after successful update
                fetchDataFromBackend();
                editUserExpired.reset();
                Success('Успешно', 1);
                salaryMadal.style.display = "none"; // Hide the edit modal
            })
            .catch((error) => {
                Success('Ошибка', 2);
                console.error("Error updating user:", error);
            });
    };

    // editUserForm.addEventListener("submit", function (event) {
    //     event.preventDefault();
    //     // Get the form input values here and handle the editing of the user
    //     const userId = document.getElementById("editUserId").value;
    //     const fullName = document.getElementById("editFio").value;
    //     const management = document.getElementById("editManagement").value;
    //     const department = document.getElementById("editDepartment").value;
    //     const createdAt = document.getElementById("editCreatedAt").value;
    //     const salary = document.getElementById("editSalary").value;
    //     const changeDate = document.getElementById("editChangeDate").value;
    //     const lavozim = document.getElementById("editLavozim").value;

    //     // Create an object to hold the updated user data
    //     const updatedUser = {
    //         id: userId,
    //         fullName: fullName,
    //         management: management,
    //         department: department,
    //         createdAt: createdAt,
    //         salary: parseFloat(salary),
    //         changeDate: changeDate,
    //         lavozim: lavozim,
    //     };


    //     // Send the updated user data to the backend using Fetch API
    //     fetch("http://localhost:8084/salary/update", {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${getAccessToken()}`, // Include the token in the Authorization header
    //         },
    //         body: JSON.stringify(updatedUser),
    //     })
    //         .then((response) => response.json())
    //         .then(() => {

    //             // Refresh the table after successful update
    //             fetchDataFromBackend();
    //             editUserForm.reset();
    //             editModal.style.display = "none"; // Hide the edit modal
    //             Success('Успешно',1);
    //         })
    //         .catch((error) => {
    //             Success('Ошибка', 2);
    //             console.error("Error updating user:", error);
    //         });
    // });

    // Function to handle deleting a user
   
    const editUserFormSubmit = (event) => {
        event.preventDefault();
        // Get the form input values here and handle the editing of the user
        const userId = document.getElementById("editUserId").value;
        const fullName = document.getElementById("editFio").value;
        const management = document.getElementById("editManagement").value;
        const department = document.getElementById("editDepartment").value;
        const createdAt = document.getElementById("editCreatedAt").value;
        const salary = document.getElementById("editSalary").value;
        const changeDate = document.getElementById("editChangeDate").value;
        const lavozim = document.getElementById("editLavozim").value;

        // Create an object to hold the updated user data
        const updatedUser = {
            id: userId,
            fullName: fullName,
            management: management,
            department: department,
            createdAt: createdAt,
            salary: parseFloat(salary),
            changeDate: changeDate,
            lavozim: lavozim,
        };


        // Send the updated user data to the backend using Fetch API
        fetch("http://localhost:8084/salary/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getAccessToken()}`, // Include the token in the Authorization header
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then(() => {

                // Refresh the table after successful update
                fetchDataFromBackend();
                editUserForm.reset();
                editModal.style.display = "none"; // Hide the edit modal
                Success('Успешно',1);
            })
            .catch((error) => {
                Success('Ошибка', 2);
                console.error("Error updating user:", error);
            });
    };

    function deleteUser(userId) {
        // Show the delete modal
        deleteModal.style.display = "block";

        // Add event listener to confirm delete button
        confirmDeleteBtn.addEventListener("click", function () {
            // Convert userId to an integer using parseInt
            const idToDelete = parseInt(userId, 10);

            // Call the API to delete the user using the integer idToDelete
            fetch(`http://localhost:8084/salary/delete/${idToDelete}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getAccessToken()}`,
                }
            })
                .then((response) => response.json())
                .then(() => {

                    // Refresh the table after successful deletion
                    fetchDataFromBackend();
                    deleteModal.style.display = "none";// Hide the delete modal
                    Success('Удалено',1)
                })
                .catch((error) => {
                    Success('Ошибка', 2);
                    console.error("Error deleting user:", error);
                });
        });

        // Add event listener to cancel delete button
        cancelDeleteBtn.addEventListener("click", function () {
            // Hide the delete modal if user cancels
            deleteModal.style.display = "none";
        });
    }

    function filterTableRows(searchValue) {
        const tableRows = document.querySelectorAll("#example tbody tr");

        tableRows.forEach((row) => {
            const fio = row.cells[1].textContent.toLowerCase(); // "ФИО" value in lowercase
            if (fio.includes(searchValue.toLowerCase())) {
                // Show the row if it contains the search value
                row.style.display = "table-row";
            } else {
                // Hide the row if it does not contain the search value
                row.style.display = "none";
            }
        });
    }

    // Add event listener for search input
    // document.getElementById("searchInput").addEventListener("input", (event)=> {
    //     const searchValue = event.target.value;
    //     filterTableRows(searchValue);
    // });

        const handleInputChange = (event) => {
            const newSearchValue = event.target.value;
            filterTableRows(newSearchValue); // Call your filtering function here
        };

    // Function to get user data from the table row by ID
    function getUserDataById(userId) {
        const tableRows = document.querySelectorAll("#example tbody tr");

        for (let row of tableRows) {
            if (row.dataset.id === userId) {
                return {
                    fullName: row.cells[1].textContent, // Use column index 1 for "ФИО"
                    management: row.cells[2].textContent, // Use column index 2 for "Управление"
                    department: row.cells[3].textContent, // Use column index 3 for "Отдел"
                    lavozim: row.cells[4].textContent, // Use column index 4 for "Должность"
                    salary: parseFloat(row.cells[5].textContent), // Use column index 5 for "Зарплата"
                    createdAt: row.cells[6].textContent, // Use column index 6 for "Дата создания"
                    changeDate: row.cells[7].textContent, // Use column index 7 for "Дата изменения"
                    status: row.cells[8].textContent, // Use column index 8 for "Статус"
                };
            }
        }

        return null;
    }

    // Add event listeners for edit and delete buttons on table rows
    // document.getElementById("example").addEventListener("click", function (event) {

    //     const target = event.target;
    //     if (target.classList.contains("edit-btn")) {
    //         // Get the userId from the row data-id attribute
    //         const userId = event.target.closest("tr").dataset.id;
    //         editUser(userId);
    //     } else if (target.classList.contains("delete-btn")) {
    //         // Get the userId from the row data-id attribute
    //         const userId = event.target.closest("tr").dataset.id;
    //         deleteUser(userId);
    //     } else if (target.classList.contains("edit-expired")) {
    //         const userId = event.target.closest("tr").dataset.id;
    //         expiredUser(userId);
    //     }
    // });

    const getExampleClick = (event) => {

        const target = event.target;
        if (target.classList.contains("edit-btn")) {
            // Get the userId from the row data-id attribute
            const userId = event.target.closest("tr").dataset.id;
            editUser(userId);
        } else if (target.classList.contains("delete-btn")) {
            // Get the userId from the row data-id attribute
            const userId = event.target.closest("tr").dataset.id;
            deleteUser(userId);
        } else if (target.classList.contains("edit-expired")) {
            const userId = event.target.closest("tr").dataset.id;
            expiredUser(userId);
        }
    };

    // document.getElementById("closeEditModal").addEventListener("click", function () {
    //     // Hide the edit modal when the close button is clicked
    //     editModal.style.display = "none";
    // });
    // document.getElementById("closeEditExpired").addEventListener("click", function () {
    //     // Hide the edit modal when the close button is clicked
    //     salaryMadal.style.display = "none";
    //     // Success('You are having an error !',2)
    //     // Success('You have it all done !', 1)

    // });
    const closeEditBtnClick = () =>{
        // Hide the edit modal when the close button is clicked
        editModal.style.display = "none";
    };
    const closeExpiredClick = () => {
        // Hide the edit modal when the close button is clicked
        salaryMadal.style.display = "none";
        // Success('You are having an error !',2)
        // Success('You have it all done !', 1)

    };

    return(
        <div id="alert">

        <div className="main-content">
    
            <div className="container containerBlock">
    
                <div className="containerBlockSearch">
    
                    <div>
                        <label htmlFor="searchInput"></label>
                        <input type="text" id="searchInput" className="searchInput" placeholder="Поиск..." onChange={(e) => handleInputChange(e)}/>
                    </div>
    
                    <div className="dropdown">
                        <button className="dropbtn nullBtn"><i className="fas fa-filter"></i></button>
                        <div className="dropdown-content" id="departmentFilter"></div>
                    </div>
    
                </div>
    
                <div className="containerBlockBtn">
    
                    <button id="openModalBtn" className="nullBtn" onClick={() => openModalClick()}><i className="fas fa-user-plus"></i></button>
    
                    <div id="userModal" ref={modalOpenRef} className="modal">
                        <div className="modal-content">
                            <span className="close razmerx" onClick={closeModalClick}>&times;</span>
                            <h2>Добавить пользователя</h2>
    
                            <form id="addUserForm" onSubmit={(e)=>addUserSubmit(e)}>
                                <label htmlFor="fullName">ФИО:</label>
                                <input type="text" id="fullName" className="addUserInput" required />
    
                                <label htmlFor="management">Управление:</label>
                                <input type="text" id="management" className="addUserInput" required />
    
                                <label htmlFor="department">Отдел:</label>
                                <input type="text" id="department" className="addUserInput" required />
    
                                <label htmlFor="createdAt">Дата создания:</label>
                                <input type="date" id="createdAt" className="addUserInput" required />
    
                                <label htmlFor="salary">Зарплата:</label>
                                <input type="number" step="0.01" id="salary" className="addUserInput" required />
    
                                <label htmlFor="changeDate">Дата изменения:</label>
                                <input type="date" id="changeDate" className="addUserInput" required />
    
    
                                <label htmlFor="lavozim">Лавозим:</label>
                                <input type="text" id="lavozim" className="addUserInput" required />
    
                                <button className="main-btn fullBtn padding20" type="submit">Добавить пользователя</button>
                            </form>
    
                        </div>
                    </div>
    
                    <Link to={'/history'}>
                        <button className="history nullBtn"><i className="fas fa-history"></i></button>
                    </Link>
    
                    <button id="getExpired" className="expired nullBtn" onClick={fetchDataFromBackendExpired}><i
                            className="fas fa-hourglass-end"></i></button>

                    <div>
                        <input type="file"  id="excelFileInput" name="excelFile" accept=".xls,.xlsx" style={{display: "none"}} onChange={() => excelFileChange}/>
                        <button onClick={myFunctionBtn} className="nullBtn"><i className="fas fa-file-excel"></i></button>
                    </div>
                    <Link to={'/home'}>
                        <button className="nullBtn"><i className="fas fa-home"></i>
                        </button>
                    </Link>
                    <Link to={'/'}>
                        <button className="nullBtn"><i className="fas fa-sign-out-alt"></i></button>
                    </Link>
    
                </div>
    
    
            </div>
    
        </div>

        <div className="container">
    
            <table id="example" className="table" style={{width:"100%"}} onClick={(e)=>getExampleClick(e)}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Управление</th>
                    <th>Отдел</th>
                    <th>Должность</th>
                    <th>Зарплата</th>
                    <th>Дата создания</th>
                    <th>Дата изменения</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
    
            <div id="editModal" className="modal">
                <div className="modal-content">
                    <span className="close-edit" id="closeEditModal" onClick={closeEditBtnClick}>&times;</span>
                    <h2>Редактировать пользователя</h2>
                    <form id="editUserForm" onSubmit={(e)=>editUserFormSubmit(e)}>
                        <input type="hidden" id="editUserId" />
    
                        <label htmlFor="editFio">ФИО:</label>
                        <input type="text" id="editFio" className="addUserInput" required />
    
                        <label htmlFor="editManagement">Управление:</label>
                        <input type="text" id="editManagement" className="addUserInput" required />
    
                        <label htmlFor="editDepartment">Отдел:</label>
                        <input type="text" id="editDepartment" className="addUserInput" required />
    
                        <label htmlFor="editCreatedAt">Дата создания:</label>
                        <input type="date" id="editCreatedAt" className="addUserInput" required />
    
                        <label htmlFor="editSalary">Зарплата:</label>
                        <input type="number" step="0.01" id="editSalary" className="addUserInput grayBtn" readOnly />
    
                        <label htmlFor="editChangeDate">Дата изменения:</label>
                        <input type="date" id="editChangeDate" className="addUserInput grayBtn" readOnly />
    
                        <label htmlFor="editLavozim">Лавозим:</label>
                        <input type="text" id="editLavozim" className="addUserInput" required />
    
                        <button className="main-btn fullBtn padding20" type="submit">Сохранить изменения</button>
                    </form>
                </div>
            </div>
    
            <div id="UserSalaryEdit" className="modalExpired">
                <div className="modal-content">
                    <span className="close-edit" id="closeEditExpired" onClick={closeExpiredClick}>&times;</span>
                    <h2>Редактировать просрочено</h2>
                    <form id="editSalaryForm" onSubmit={(e)=>editUserSubmit(e)}>
                        <input type="hidden" id="editUserIdExpired" />
    
                        <label htmlFor="editSalaryExpired">Зарплата:</label>
                        <input type="number"  step="0.01" id="editSalaryExpired" className="addUserInput" required />
    
                        <button className="main-btn fullBtn padding20" type="submit">Сохранить изменения</button>
                    </form>
                </div>
            </div>
    
            <div id="deleteModal" className="modal">
                <div className="modal-content">
                    <h2>Подтвердите удаление</h2>
                    <p className="padding20">Вы уверены, что хотите удалить этого пользователя?</p>
                    <button id="confirmDeleteBtn" className="ysBtn">Да</button>
                    <button id="cancelDeleteBtn" className="ysBtn padding20">Нет</button>
                </div>
    
            </div>
    
        </div>

        <Outlet />
    </div>
    )
}