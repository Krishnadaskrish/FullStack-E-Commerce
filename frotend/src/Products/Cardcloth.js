import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from 'react-bootstrap';
import Navbarfront from '../components/Navbar';
import { Axios } from '../App';





const Cloths = () => {
  const [pro,setProduct] = useState([])
  console.log(pro)
  const navigate = useNavigate();
 
  useEffect(()=>{
    const fetchproduct = async ()=>{
      try {

       const response = Axios.get(`/api/users/products/category`)
       if (response.status === 201) {
        console.log("Updating products state...");
        setProduct(response.data.data);

      }

      console.log(response.data.data)
        
      } catch (error) {
        console.log("error")
        
      }
    }
    fetchproduct()
  },[ setProduct])


  return (
    <>
    <Navbarfront/>
    <div>
      <header className='sticky-top'>
        
      </header>
      <br />
      <div className='container py-5'>
        <div className='row'>
          <div className='d-flex flex-wrap justify-content-center '>
            {pro.map((pro) => (
              <Card
                key={pro.id}
                style={{ width: '20%', marginBottom: '10px', marginRight: '10px' }}
                onClick={() => navigate(`/displayProduct/${pro.id}`)}
                className='card-container'
              >
                <Card.Img className='card-img-top' src={pro.image} />
                <Card.Body>
                  <Card.Title>{pro.title}</Card.Title>
                  <Card.Text>{pro.price}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default Cloths;