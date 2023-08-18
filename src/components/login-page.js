import React from "react";
import "../style/global.css";
import Logo from "../img/logo.svg";
import {Outlet} from "react-router-dom"

export default function LoginPage() {


      function GetCheck(event){
        event.preventDefault();
        console.log(event);
        const username = document.getElementById('name').value;
        const password = document.getElementById('password').value;
      
        const data = {
          username,
          password
        };

        fetch('http://192.168.159.27:8084/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
              .then(response => response.json())
              .then(data => {
                console.log('data = ' ,data);
                // Handle the response from the backend if needed
                if (data.token) {
                  // Store the token in local storage
                  localStorage.setItem('jwtToken', data.token);
                  // Redirect the user to the main.html page after successful login
                    console.log(data.token);
        
                  window.location.href = '/';
                } else {
                  alert('Неверный пароль или логин ');
                  // Handle login error if necessary
                }
              })
              .catch(error => {
                // Handle error if necessary
                alert('Неверный пароль или логин');
                document.getElementById('name').value ='';
                document.getElementById('password').value = '';
              });
        }
      
  return (
    <div className="header">

    <div className="container">

        <div className="header_top">
            <a href="index.html" className="header_logo">
                <img src={Logo} alt="" />
            </a>
        </div>

        <div className="header-content">
            <div className="header-content-body">
                <h1>Войти</h1>

                <form >

                    <input type="text" id="name" className="searchInput padding20" placeholder="Name" required />

                    <input type="password" id="password" className="searchInput padding20" placeholder="Password" required />

                    <button className="btn-header fullBtn wightBtn" type="submit" onClick={(e)=>GetCheck(e)}>Вход</button>
                </form>

            </div>
        </div>

    </div>
    <Outlet />

</div>
  );
}
