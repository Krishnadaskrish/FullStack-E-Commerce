import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarfront from "../components/Navbar";
import Footer from '../components/Footer';
const Card = ({ imageSrc, title }) => {
  
  return (
   
    <div className="card"  >
      <img src={imageSrc} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Some text describing the category...</p>
      </div>
    </div>
  );
};

const Productcart = () => {
  const ab=useNavigate()
  return (
    <>
    
   
    <div style={{ backgroundColor: "#C6E6FB" }}>
    <div className="container" id='cat'  >
      <br/>
      <br/>
    <h2>PRODUCT CATEGORY</h2>
    <br></br>
      <div className="row" >
        <div className="col-md-3">
          <div className="card-container" onClick={()=>ab('/cloth')}>
            <Card 
              imageSrc= "https://thetrendytoddlers.com/cdn/shop/products/Mama_sCoffeCupBoys.jpg?v=1682526194"
              title="Clothing"
              
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-container" onClick={()=>ab('/toy')} >
            <Card 
              imageSrc="https://5.imimg.com/data5/ANDROID/Default/2021/4/FU/CO/OA/111795961/product-jpeg-500x500.jpg"
              title="Toys"
              
            />
          </div>
        </div>




        <div className="col-md-3">
          <div className="card-container"  onClick={()=>ab('/card')}>
            <Card
              imageSrc="https://staranddaisy.in/wp-content/uploads/2022/09/spoonultrasoft_19.png"
              title="Feeding"
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-container"  onClick={()=>ab('/others')}>
            <Card
              imageSrc="https://img.freepik.com/free-photo/beauty-concept-with-basket_23-2147817623.jpg"
              title="Daily Care"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  
    </>
  );
};

export default Productcart;