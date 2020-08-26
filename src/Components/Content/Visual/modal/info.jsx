import React, { Component } from 'react';
import {Button,Modal,ListGroup,Tab,Row,Col,Form,Pagination} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class InstanceInfo extends React.Component{
    render(){
        return(
            <table>
                {        
                    Object.keys(this.props.data.data).filter(dt=>{
                        return typeof(this.props.data.data[dt]) != "object" 
                    }).map(v=>{
                        let d = this.props.data.data[v]
                        return <tr> <th>{v}</th><td>{d}</td> </tr>
                    })
                }
            </table>            
        )
    }
}

export default InstanceInfo;
