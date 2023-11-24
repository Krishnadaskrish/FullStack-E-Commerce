import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../context/Context';
import { Card } from 'react-bootstrap';
import Navbarfront from '../components/Navbar';
import { Axios } from '../App';
// 

const Food = () => {
  const [pro,setProduct] = useState([])
  console.log(pro)
  const navigate = useNavigate();
  const Category = 'feeding'
 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`/api/users/products/category/${Category}`);
        if (response.status === 200) {
          console.log("Updating products state...");
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };;
  
    fetchProduct();
  }, []); 

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
                onClick={() =>
                  navigate(`/displayProduct/${pro._id}`)
                }
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

export default Food;