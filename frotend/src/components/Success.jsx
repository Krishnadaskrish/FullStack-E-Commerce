import React  from 'react'
import { useState,useEffect } from "react"
import { useNavigate } from 'react-router'
import { Axios } from '../App'


function Success() {

    const [payment,setpayment] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        let isSuccess = true
          const fetchData = async () => {
             try {
                const response = await Axios.get(`/api/users/payment/success`);
                if(response.status === 200 && isSuccess)
                alert("Payment successful");
            navigate("/");
            
             } catch (error) {
                
                navigate("/");
             }
          };
          const timeoutId = setTimeout(fetchData, 3000);
    
          return () => {
            isSuccess = false
            clearTimeout(timeoutId)
          }
    
         
       }, []);


  return (
    <div className="payment-success d-flex justify-content-md-center">
         <img
            src="https://cdn.dribbble.com/users/253392/screenshots/6906291/check.gif"
            alt="Success"
         />
      </div>
  )
}

export default Success
