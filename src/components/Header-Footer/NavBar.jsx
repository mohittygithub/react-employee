import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavBar extends React.Component{
    render(){
        return(
            <div>
                <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img width="25" height="25" alt="brand" src="https://www.pinclipart.com/picdir/middle/14-148399_employee-self-serve-portal-transparent-team-icon-png.png"></img>
                </Link>
                
                <Nav className="mr-auto">
                    <Link to={"add"} className="nav-link">Add Employee</Link>
                    <Link to={"list"} className="nav-link">List Employees</Link>
                </Nav>
                </Navbar>
            </div>
            
            );
    }
}

export default NavBar;