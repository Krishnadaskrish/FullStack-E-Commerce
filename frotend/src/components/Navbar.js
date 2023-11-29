import React,{useState,useEffect,useContext} from 'react';
import { MyContext } from '../context/Context';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Search from './Search';
import './Navbar.css'
import { MDBBtn} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useNavigate} from 'react-router-dom';



function Navbarfront() {
  const navigate = useNavigate();
  const [searchTerm, setsearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const userId = localStorage.getItem('userID')


  
  
  const {cart,isLog, setIsLog} = useContext(MyContext);


  useEffect(()=>{

  },[cart])

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("loggedIn"));
   
    setIsLog(!!user?.username);
    if (user) {
      setUserName(user?.username);
    } else {
      setUserName("");
    }
  });

 

  const handleLogout = () => {
    
    localStorage.removeItem("loggedIn");
    alert('Logout successful!');
    setIsLog(false);
  };

  const handleLogIn = () => {
    navigate("/log");
  };

 const onSearch =(e)=>{
    e.preventDefault();
    navigate=('/search');
  }
  

  return (
    <>
    <Navbar expand="lg" className="navbarbg" style={{ backgroundColor: "  #003153" ,color:'#ffff' }}>
      <Container fluid>
        <Navbar.Brand href="#" style={{ backgroundColor: "  #003153" ,color:'#ffff' }}>Babees</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           <Nav.Link onClick={() => navigate('/')} style={{ backgroundColor: "  #003153" ,color:'#ffff' }}>Home</Nav.Link>
           <Nav.Link  onClick={() => navigate('/product')} style={{ backgroundColor: "  #003153" ,color:'#ffff' }}>Category</Nav.Link>
           <Nav.Link  onClick={() => navigate('/All')} style={{ backgroundColor: "  #003153" ,color:'#ffff' }}>All Product</Nav.Link>
     
          </Nav>
          
          {isLog ? (
       <MDBBtn onClick={handleLogout}
          
      
       style={{background:'#6CA0DC',color:'#003153'}}
       
       type="button">LOgout</MDBBtn>): ( 
  
      <img src={require("../images/enter.png")} alt="" className="navIcons me-5" onClick={handleLogIn } style={{height:"35px",width:"40px"}} />)}
{/* <img src={require("../images/user(4).png")} alt="" className="navIcons" />
              <li class="nav-item">
                
              {isLog ? (
                
                  <Link to="/" class="nav-link navBTNLINK">
                  {userName}
                </Link>
                ) : (
                  ""
                )}
              </li> */}
             
              
              <img src={require("../images/grocery-store.png")} alt="" className="navIcons me-5" onClick={() => navigate('/Cart/:id')}  />
              <img src={require("../images/shopping-bag.png")} alt="" className="navIcons me-5"  onClick={()=>navigate(`/order/${userId}`)} />
              <img src={require("../images/add-to-favorites (1).png")} alt="" className="navIcons me-5" onClick={()=>navigate(`/wishlist/${userId}`) } />
        </Navbar.Collapse>
      </Container>
   
    <Form className="d-flex">
    <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setsearchTerm(e.target.value)}
              
            />    
            </Form>
            </Navbar>
            <Search searchTerm={searchTerm} />
</>

)}

export default Navbarfront;

