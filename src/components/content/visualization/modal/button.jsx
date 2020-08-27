import React, { Component } from 'react';
import { Button, Modal, ListGroup, Tab, Row, Col, Form, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { resourceState } from "../resource-params";

class Instancebutton extends React.Component {
    constructor(props) {
        super(props)
        let type = props.data.type
        let status = resourceState[type](props.data.data)
        this.state = {
            type: type,
            status: status
        }
    }

    render() {
        let statusButton = undefined

        if (this.state.status < 1) {
            if (this.state.type == "ec2") {
                statusButton = <Button variant="warning" onClick={() => {
                    if (this.state.type == "ec2") {/*
                        fetch("http://localhost:4000/api/cloud/data/ec2", {
                            method: "start",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                key_id: this.props.data.id.split(':')[0],
                                parms: {
                                    InstanceIds: [
                                        this.props.data.data.InstanceId
                                    ]
                                }
                            })
                        }).then(res => res.json()).then(res => {
                            console.log(res)
                        })*/
                        console.log(this.props.data.id.split(':')[0])
                    }
                }}>off</Button>
            }
            else {
                statusButton = <Button variant="warning">Off</Button>
            }

        } else if (this.state.status < 5) {
            statusButton = <Button variant="warning" onClick={() => {
                if (this.state.type == "ec2") {
                    console.log(this.props.data.id)
                    /*
                                        fetch("http://localhost:4000/api/cloud/data/ec2", {
                        method: "stop",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            key_id: this.props.data.key_id,
                            parms: {
                                InstanceIds: [
                                    this.props.data.data.InstanceId
                                ]
                            }
                        })
                    }).then(res => res.json()).then(res => {
                        console.log(res)
                    })

                    */
                }
            }}>On</Button>
        }

        return (
            <table>
                <tr>
                    <td>{statusButton && statusButton}</td>
                    <td><Button onClick={() => {
                        if (this.state.type == "ec2") {
                            fetch("http://localhost:4000/api/cloud/data/ec2", {
                                method: "DELETE",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    key_id: 'tatum' | 'test',
                                    parms: {
                                        InstanceIds: [
                                            this.props.data.data.InstanceId
                                        ]
                                    }
                                })
                            }).then(res => res.json()).then(res => {
                                console.log(res)
                            })
                        }
                    }} variant="warning">Delete</Button></td>
                    <td><Button variant="warning">Detail</Button></td>
                </tr>
            </table>
        )
    }
}

export default Instancebutton;