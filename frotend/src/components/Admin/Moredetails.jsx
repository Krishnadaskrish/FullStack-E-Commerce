
import React, { useState,useEffect } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { useContext } from 'react';
import { MyContext } from '../../context/Context';
import { useParams } from 'react-router';
import axios from 'axios';
import { Axios } from '../../App';

export default function Moredetails() {
   
    const { id } = useParams();
    const [users,setUsers] = useState(null);
    const [loading , setLoading] = useState(true);


    useEffect(()=>{
      const fetchUsers = async ()=>{
        try {
          const response = await Axios.get(`/api/admin/users/${id}`)
          if (response.status == 200){
            setUsers(response.data.data)
          }
          
        } catch (error) {
          console.error("error fetching users")
          
        }finally{
          setLoading(false)
        }
      };
      fetchUsers();

    },[id])
    if (loading) {
      return <p>Loading...</p>; // You can replace this with a loading spinner or animation
    }
  
    if (!users) {
      return <h1 style={{ textAlign: 'center', marginTop: 70 }}>User not found</h1>;
    }


  return (
    <>
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
       

        <MDBRow>
          {/* <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={us.product.image}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">{us.product.name}</p>
                <p className="text-muted mb-4">{us.product.description}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn>${us.product.price}</MDBBtn>
                  <MDBBtn outline className="ms-1">{us.id}</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

     
          </MDBCol> */}
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>{users.username}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted"></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText> {users.email}</MDBCardText>
                  </MDBCol>
                  
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    {/* <MDBCardText>Phone number:  {us.phone}</MDBCardText> */}
                  </MDBCol>
                  
                </MDBRow>
                <hr />
                
                
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText></MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {/* <MDBCardText className="text-muted">Address:   {us.address.street},{us.address.city},{us.address.postalCode},{us.address.state},{us.address.country}</MDBCardText> */}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>

           
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}

