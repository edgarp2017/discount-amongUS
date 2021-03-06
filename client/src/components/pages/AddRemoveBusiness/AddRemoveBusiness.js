import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import {useHistory} from 'react-router-dom';

import "./AddRemoveBusiness.css";
import * as API from '../../../util/api';
import { AuthContext } from "../../../context/authContext";


export class AddRemoveBusiness extends Component {
    static contextType = AuthContext;

    constructor() {
        super();
        this.state = {
            userID: null,
            name: "",
            address: "",
            city: "",
            state: "",
            zipcode: "",
            businessID: "",
            apiError: "",
            errors: [],
        };
    }

    componentDidMount() {
        setTimeout(() =>{
            const { userID } = this.context;
            this.setState({
                userID: userID
            });
            console.log(userID);
        }, 10)
    }

    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };

    handleAdd = (e) => {
        e.preventDefault();

        const { userID, name, address, city, state, zipcode, businessID } = this.state;
        var newState = Object.assign({}, this.state);
        newState.errors = [];
        if (name === "") {
            newState.errors.push("Please Enter Business Name");
        }
        if (address === "") {
            newState.errors.push("Please Enter Business Address");
        }
        if (city === "") {
            newState.errors.push("Please Enter city");
        }
        if (state === "") {
            newState.errors.push("Please Enter State");
        }
        if (zipcode === "") {
            newState.errors.push("Please Enter Zipcode");
        }
        if (businessID === "") {
            newState.errors.push("Please Enter Business BLN");
        }
        if (newState.errors.length === 0) {
            //Backend starts here
            console.log(newState);
            API.registerBusiness(newState).then((result) => {
                if (result.status === 200) {
                    if (result.data.success === true) {
                        this.props.history.push("/confirmed-business");
                    }
                    else {
                        this.setState({
                            apiError: result.data.msg
                        })
                        let dangerAlert = document.getElementById("registerBusiness");
                        dangerAlert.style.display = "block";
                    }
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            let dangerAlert = document.getElementById("registerBusiness");
            dangerAlert.style.display = "block";
        }
        this.setState(newState);
    };

    render() {
        const { errors, apiError } = this.state;
        return (
            <div className="view">
                <div className="owner-login">
                    <Alert variant='danger' className="registerBusiness-alert" id="registerBusiness">
                        { errors.length === 0? apiError: errors }
                    </Alert>
                    <h1 className="au-header">Add/Remove Business</h1>
                    <form>
                        <div className="form-group">
                            <label>Business Name:</label>
                            <input type="text" className="form-control" placeholder="Enter Business Name" onChange={this.handleChange("name")} />
                        </div>

                        <div className="form-group">
                            <label>Business Address:</label>
                            <input type="text" className="form-control" placeholder="Enter Businesss Address" onChange={this.handleChange("address")} />
                        </div>

                        <div className="form-group">
                            <label>City:</label>
                            <input type="text" className="form-control" placeholder="Business City" onChange={this.handleChange("city")} />
                        </div>

                        <div className="form-group">
                            <label>State</label>
                            <input type="text" className="form-control" placeholder="Business State" onChange={this.handleChange("state")} />
                        </div>

                        <div className="form-group">
                            <label>Zipcode</label>
                            <input type="number" className="form-control" placeholder="Business Zipcode" onChange={this.handleChange("zipcode")} />
                        </div>

                        <div className="form-group">
                            <label>Business License No.</label>
                            <input type="text" className="form-control" placeholder="BLN" onChange={this.handleChange("businessID")} />
                        </div>


                        <Row className="au-row au-row-addremove">
                            <Button variant="dark" size="lg" onClick={this.handleAdd}>
                                Add
                            </Button>
                        </Row>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddRemoveBusiness
