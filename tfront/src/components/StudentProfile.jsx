import React, {Component} from "react";
import {Form, Row} from "react-bootstrap";
import NavStudent from './NavStudent';
import axios from "axios";
import NavCompany from "./NavCompany";


class StudentProfile extends Component {
    // refer to https://medium.com/@emeruchecole9/uploading-images-to-rest-api-backend-in-react-js-b931376b5833
    constructor(props) {
        super(props);
        this.state = {formSubmitted: false, isEditing: false, student: {}, user: {}}
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.studentId = this.props.match.params.student_id;
    }

    componentDidMount() {
        console.log(this.state);
        axios.get("https://campusworks.pythonanywhere.com/profile/student", {
            params: {
                "student_id": this.studentId,
            },
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token " + localStorage.getItem("token"),
            }
        }).then((res) => {
            console.log(this.state);
            if (res.data.success === true) {
                this.setState({student: res.data.student.fields});
                this.setState({user: res.data.user.fields});
                console.log(this.state);
            }
        });
    }

    handleFile(event) {
        event.preventDefault();
        this.setState({resume: event.target.files[0]}, () => console.log(this.state.resume));
    }

    handleChange(event) {
        event.preventDefault();
        const newState = Object.assign({}, this.state);
        newState[event.target.dataset.fieldof][event.target.id] = event.target.value;
        this.setState(newState);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({formSubmitted: true, isEditing: false});

        let formData = {...this.state, student_id: this.studentId};
        delete formData["formSubmitted"];
        delete formData["isEditing"];
        console.log(formData);
        formData["token"] = localStorage.getItem("token");

        axios.put("https://campusworks.pythonanywhere.com/profile/student",
            formData,
            {
                headers: {
                    // 'Content-Type': 'multipart/form-data'
                }
            }
        ).then((res) => {
            alert(res.data);
            this.setState({formSubmitted: false});
            window.location.reload(false);
        }).catch(err => {
            alert("An error occured: " + err);
            this.setState({formSubmitted: false});
        });
    }

    render() {
        if (this.state.student) {
            return (
                <div>
                    {localStorage.getItem('type') === 1 && <NavStudent></NavStudent>}
                    {localStorage.getItem('type') === 2 && <NavCompany></NavCompany>}
                    <div className="container-flex justify-content-center align-items-center">
                        <div className="my-auto">
                            <Form onSubmit={this.handleSubmit} className="container p-5" enctype="multipart/form-data">
                                <div className="row">
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" id="first_name" disabled={!this.state.isEditing} onChange={this.handleChange} placeholder="Name" value={this.state.user.first_name} data-fieldof="user" />
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" id="email" disabled placeholder="Email" value={this.state.user.email} />
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="number" id="phone_number" disabled={!this.state.isEditing} onChange={this.handleChange} placeholder="Phone Number" value={this.state.student.phone_number} data-fieldof="student" />
                                    </Form.Group>
                                </div>
                                <Row>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Roll Number</Form.Label>
                                        <Form.Control type="number" id="student_id" disabled placeholder="Roll Number" value={this.state.student.student_id} />
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Year of Study</Form.Label>
                                        <Form.Control as="select" id="year_of_study" disabled={!this.state.isEditing} onChange={this.handleChange} value={this.state.student.year_of_study} data-fieldof="student">
                                            <option value="1">First Year Undergrad</option>
                                            <option value="2">Second Year Undergrad</option>
                                            <option value="3">Third Year Undergrad</option>
                                            <option value="4">Fourth Year Undergrad</option>
                                            <option value="5">Postgrads (5th year DD, PG+)</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" id="gender" disabled={!this.state.isEditing} onChange={this.handleChange} value={this.state.student.gender} data-fieldof="student">
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                            <option value="O">Other</option>
                                            <option value="N">Prefer not to say</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Row>
                                <a href={"https://campusworks.pythonanywhere.com/resume?id=" + this.props.match.params.student_id} target="_blank">Resume Link</a>
                                {this.state.isEditing && (
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Upload new resume</Form.Label>
                                        <Form.Control type="file" accept=".pdf" required id="resume" onChange={this.handleFile} />
                                    </Form.Group>
                                )}
                                {!this.state.isEditing && <button className="btn btn-dark w-100" onClick={() => this.setState({isEditing: true})}>Edit</button>}

                                {!this.state.formSubmitted && this.state.isEditing && <button type="submit" className="btn btn-dark w-100" onClick={this.handleSubmit}>Submit</button>}
                            </Form>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <p>Student Doesn't Exist.</p>
        }
    }
}

export default StudentProfile;
