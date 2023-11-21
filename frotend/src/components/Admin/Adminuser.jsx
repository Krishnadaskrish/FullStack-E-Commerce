import React, {  useEffect } from 'react';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody, MDBContainer } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import Adminav from './AdminNav';
import axios from "axios"
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Axios } from '../../App';



export default function ViewUsers() {

  const navigate = useNavigate(); 
  const [users,setUsers] = useState([])

   useEffect(() => {
      const fetchData = async () => {
         try {
          const response = await Axios.get("/api/admin/users")
            if (response.status === 200) setUsers(response.data.data);
         } catch (error) {
            toast.error(error.response.data.message);
         }
      };

      fetchData();
   }, []);

   const handleClick = (userId) => {
    navigate(`/More/${userId}`);
  };
  
   
    
  return (
    <>
    <Adminav/>
    <MDBContainer>
    <MDBTable align='middle' className='mt-5'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Id</th>
          
          
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {users.map((user) => (

            <tr key={user.id} onClick={()=>handleClick(user._id)}>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{user.username} </p>
                <p className='text-muted mb-0'> </p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{user.email} </p>
            
          </td>
          <td>
            <MDBBadge color='success' pill>
              {user._id}
            </MDBBadge>
          </td>
         
         
        </tr>
        
            ))}
      </MDBTableBody>
    </MDBTable>
    </MDBContainer>
    </>
  );
}