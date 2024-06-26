import { Navbar, Container, Form, Nav, NavDropdown } from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {FaMicrochip, FaMobile} from "react-icons/fa"
import { useTheme } from "../../../config/theme.context";
import { useSelector } from "react-redux";
import { useCallback, useState, useEffect } from "react";
import { toast } from "react-toastify";
import categorySvc from "../../../pages/cms/category/category.service";

const HomeHeader = () => {
    const {theme, toggleTheme} = useTheme()
    const [cats, setCats] = useState()
    const getCatList = useCallback(async() => {
      try {
        let result = await categorySvc.getCategoryForMenu()
        setCats(result.result)
      } catch(exception) {
        toast.error("Error fetching category list")
      }
    },[])
    const switchTheme = (e) => {
      e.preventDefault()
      toggleTheme(theme)
    }
    const loggedInUser = useSelector((root) => {
      return root.User.loggedInUser;
    })

    useEffect(() => {
      getCatList()
    },[])
    return (<>
        <Navbar 
        expand="lg" 
        className="bg-body-tertiary" 
        bg={theme} data-bs-theme={theme}
    >
      <Container>
        <Navbar.Brand href="#home">
            Logo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className={"nav-link"} to="/">Home</NavLink>
            
            <Nav.Link href="#link">Shop</Nav.Link>
            
            <NavDropdown title="Category" id="basic-nav-dropdown">
              {/* <NavLink to="/category/electronics" className={"dropdown-item"}>
                <FaMicrochip />  Electronics
              </NavLink> */}
              {
                cats && cats.map((cat, ind)=> (
                  <NavLink key={ind} to={"/category/"+cat.slug} className={"dropdown-item"}>
                    {cat.title}
                  </NavLink>
                ))
              }
            </NavDropdown>
          </Nav>
          <Nav>
            <Form>
                <Form.Control
                    type="search"
                    size="sm"
                    placeholder="Enter your search keyword"
                />
            </Form>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link href="#">Cart(0)</Nav.Link>

            <Nav.Link href="/" onClick={switchTheme}>
              {theme}
            </Nav.Link>
            
            {
              loggedInUser ? <>
                <NavLink className={"nav-link"} to={'/'+loggedInUser.role}>{loggedInUser.name}</NavLink>
                <NavLink className={"nav-link"} to='/login'>Logout</NavLink>
              </> : <>
              <NavLink className="nav-link" to="/register">SignUp</NavLink>
            <NavLink to="/login" className={"nav-link"}>Login</NavLink>

              </>
            }
            {/*  */}

            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>)
}

export default HomeHeader;