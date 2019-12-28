import React, { Component} from 'react';
import './Landing.css'
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Router, Link} from 'react-router-dom';
class Landing extends Component {
    render() {
        console.log(this.props);
        return(
            <div id="intro" className="vh-100">
                <div className="mask d-flex justify-content-center align-items-center">
                    <div className="container d-flex text-center">
                        <div className="row bg-white p-5 rounded">
                            <div className="col-md-6 my-auto">
                                <h2 className="display-4 font-weight-bold">Campus Works</h2>
                                <h5>Connecting Students with Startups. Internships have never been easier</h5>
                                <Link to={"/register/company" }><Button variant="btn btn-dark" size="lg">Register as Company</Button></Link>
                                <br className="my-4"/>
                            </div>
                            <div className="order-lg-first w-50 mx-auto">
                                <img className="img-fluid" src={process.env.PUBLIC_URL + '/assets/hero.png'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Landing;
