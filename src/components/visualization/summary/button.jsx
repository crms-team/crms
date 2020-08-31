import React, { Component } from 'react';
import { Button, Modal, ListGroup, Tab, Row, Col, Form, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { resourceState } from "../resource-params";
import { managerType, awsManager, summaryType } from "../../../manager";

class Instancebutton extends React.Component {
    constructor(props) {
        super(props)
        let type = props.data.type
        let status;
        try{
            status=resourceState[type](props.data.data)
        }
        catch(e){
            status=5
        }
        this.state = {
            type: type,
            status: status
        }
    }

    render() {
        let statusButton = undefined

        if (this.state.status < 1) {
            statusButton = <Button variant="warning" onClick={async ()=>{
                let id = this.props.data.id.split(":")[2]
                let key_id = this.props.data.id.split(":")[0]
                let rst = await summaryType[this.state.type]["manage"].stop(key_id,id)
                console.log(rst)
            }}>Off</Button>

        } else if (this.state.status < 5) {
            statusButton = <Button variant="warning" onClick={async ()=>{
                  let id = this.props.data.id.split(":")[2]
                  let key_id = this.props.data.id.split(":")[0]
                  let rst = await summaryType[this.state.type]["manage"].start(key_id,id)
                  console.log(rst)
              }}>On</Button>
        }

        return (
            <table>
                <tr>
                    <td>{statusButton && statusButton}</td>
                    <td><Button onClick={() => {
                        console.log("!")
                        }} variant="warning">Delete</Button></td>
                    <td>
                        <Button variant="warning" onClick={()=>window.location.href=`/detail/${this.props.data.id.split(':')[0]}/${this.state.type}/${this.props.data.id.split(":")[2]}`} >
                            Detail
                        </Button>
                    </td>
                </tr>
            </table>
        )
    }
}

export default Instancebutton;