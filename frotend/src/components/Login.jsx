import React, { useState} from 'react'
import {  useNavigate } from 'react-router-dom'


import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import './Login.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios"
import toast from "react-hot-toast"


function Login() {

  
  


  const navigate = useNavigate();

  const handleLogin  = async (e) => {
    e.preventDefault();
   

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim(); 
    const adminUsername = "krishnadas";


    if (username === "" || password === ""){
      return toast.error("Enter All Inputs")
    }

    const endpoint = username === adminUsername ? "http://localhost:3003/api/admin/AdminLogin" : "http://localhost:3003/api/users/login"
  

    
    try {
      const loginData = {username,password}
      const response = await axios.post(endpoint, loginData);
      console.log(response)
      if (response.status === 200) {
         username !== adminUsername && localStorage.setItem("userID", response.data.id);
         console.log( response.data.id)
         username === adminUsername && localStorage.setItem("role", "admin");
         localStorage.setItem("jwt_token", response.data.data);
         localStorage.setItem("name", response.data.username);
         
         toast.success(response.data.message);
         navigate(username === adminUsername ? "/adminhome" : "/");

      }
   } catch (error) {
      toast.error(error.response.data.message);
   }
};



  

    
   
      return (
    <MDBContainer className="my-5 gradient-form">

      <MDBRow>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="https://www.babees.pl/wp-content/uploads/2018/10/babes.png"
                style={{width: '185px'}} alt="logo" />
             
            </div>
<form onSubmit={handleLogin}>
            <p>Please login to your account</p>

              <MDBInput wrapperClass='mb-4' label='User Name' id='form1' type='text' name='username'   required/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name= "password" required/>

              <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" >Sign in</MDBBtn>
              <a className="text-muted" href="#!">Forgot password?</a>
            </div>

            </form>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn outline className='mx-2' color='danger' onClick={()=>navigate('/reg')}>
                Register Now
              </MDBBtn>
            </div>
           

          </div>

        </MDBCol>

        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
              <h4 class="mb-4">We are more than a company</h4>
              <p class="small mb-0">"We've Got Your Baby Needs Covered - Shop Now!
              </p>
            </div>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}
  

export default Login;

