import React, { Component } from 'react';
import { Button, Modal, ListGroup, Tab, Row, Col, Form, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { resourceState } from "../resource-params";
import { managerType, awsManager, summaryType } from "../../../manager";
import { Tune } from '@material-ui/icons';

class Instancebutton extends React.Component {
    constructor(props) {
        super(props)
        let type = props.data.type
        let status;
        try {
            status = resourceState[type](props.data.data)
        }
        catch (e) {
            status = 5
        }
        this.state = {
            type: type,
            status: status
        }
    }

    render() {
        let statusButton = undefined
        let vendorButton = {
            aws: true,
            azure: true,
            CRMS: true,
            nouse: true,
            securitygroups: true,
            subnets : true,
            database_groups : true,
            interenetgroups : true,
            storagegroups : true,
            databasegroups : true,
            s3_group : true,
            servergroups: true,
            volumegroups : true,
            vpcgroups : true,
            subnetgroups : true
        }

        if (this.state.status < 1 && (this.state.type == "server" || this.state.type == "database")) {
            statusButton = <Button variant="warning" onClick={async () => {
                let id = this.props.data.id.split(":")[2]
                let key_id = this.props.data.id.split(":")[0]
                let rst = await summaryType[this.state.type]["manage"].stop(key_id, id)
            }}>Off</Button>

        } else if (this.state.status < 5 && (this.state.type == "server" || this.state.type == "database")) {
            statusButton = <Button variant="warning" onClick={async () => {
                let id = this.props.data.id.split(":")[2]
                let key_id = this.props.data.id.split(":")[0]
                let rst = await summaryType[this.state.type]["manage"].start(key_id, id)
            }}>On</Button>
        }

        return (
            <table>
                <tr>
                    <td>{statusButton && statusButton}</td>
                    <td>{ vendorButton[this.state.type]==true ? <></>:<Button onClick={async () => {
                        let id = this.props.data.id.split(":")[2]
                        let key_id = this.props.data.id.split(":")[0]
                        let rst = await summaryType[this.state.type]["manage"].delete(key_id, id)
                        alert(rst.result == true ? "Success" : "Failed" )
                        window.location.reload();
                    }} variant="warning">Delete</Button>}</td>
                    <td>
                        {vendorButton[this.state.type]==true ? <></>:<Button variant="warning" onClick={() => window.location.href = `/detail/${this.props.data.id.split(':')[0]}/${this.state.type}/${btoa(this.props.data.id.split(":")[2])}`} >
                            Detail
                        </Button>}
                    </td>
                </tr>
            </table>
        )
    }
}

export default Instancebutton;