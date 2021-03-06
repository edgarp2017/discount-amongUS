import React, { Component } from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import './Home.css';


export class Home extends Component {
    render() {
        return (
            <div className="view">
                <h1 className="au-header">Welcome to Discount AmongUS</h1>
                <h5>Choose your option:</h5>
                <div>
                    <Row className="au-row">
                        <Link to="/discount-check">
                            <Button className="au-btn" variant="dark" size="lg">
                                Check For Discount
                        </Button>
                        </Link>
                    </Row>
                    <Row className="au-row">
                        <Link to="/owner-login">
                            <Button className="au-btn" variant="dark" size="lg">
                                Owner Login
                        </Button>
                        </Link>
                    </Row>
                    <Row className="au-row">
                        <Link to="/register-owner">
                            <Button className="au-btn" variant="dark" size="lg">
                                Owner Register
                        </Button>
                        </Link>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Home
