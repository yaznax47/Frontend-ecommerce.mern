import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const TopHeaderComponent = () => {
    const sidebarToggle = (e) => {
        e.preventDefault();
        document.body.classList.toggle("sb-sidenav-toggled");
    }
    return (<>
    <Navbar className="sb-topnav" expand={"lg"} variant="dark" bg="dark">
        <NavLink className={"navbar-brand ps-3"} to="/admin">
            Admin Panel
        </NavLink>
        <Button variant="link" size="sm" className="order-1 order-lg-0 me-4 me-lg-0"
            onClick={sidebarToggle}
        >
            <i className="fas fa-bars text-white"></i>
        </Button>
        <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></div>
    
        <Dropdown className="ms-auto ms-md-0 me-3 me-lg-4" align={"end"}>
            <Dropdown.Toggle variant="link" className=" text-white" id="dropdown-basic">
                <i className="fas fa-user fa-fw text-white"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <NavLink className={"dropdown-item"} to={'/me'}>Update Profile</NavLink>
                <NavLink className={"dropdown-item"} to={'/reset-password'}>Change Password</NavLink>
                <NavLink className={"dropdown-item"} to={'/logout'}>Logout</NavLink>
            </Dropdown.Menu>
        </Dropdown>
    
    </Navbar>
    </>)
}

export default TopHeaderComponent