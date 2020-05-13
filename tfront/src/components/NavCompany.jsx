import React,{Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class NavCompany extends Component{
    constructor(props){
        super(props);
        this.state = {company:{}};
    }
    componentWillMount(){
        axios.get("https://campusworks.pythonanywhere.com/company",{
            params:{
                "token":localStorage.getItem("token")
            },
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((res)=>{
            console.log(res.data.data);
            this.setState({"company":res.data.data});
        });
    }
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand className="nav-logo">
                <Link to={"/"}>
                <img
                    src={ process.env.PUBLIC_URL + "/logo.png" }
                    width="60"
                    className="d-inline-block align-top"
                    alt="Campus Works logo" />{' '}
                </Link>
                    <div class="nav-text">Campus <b><span className="nav-logo-gradient">Works</span></b></div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto text-white">
                        <Nav.Link><Link to={"/company/home"} className="text-white">Home</Link></Nav.Link>
                        <Nav.Link><Link to={"/login"} className="text-white">Logout</Link></Nav.Link>
                        <Nav.Link><Link to={"/company/profile/"+this.state.company.pk} className="text-white">Profile</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default NavCompany;