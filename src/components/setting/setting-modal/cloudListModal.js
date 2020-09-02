import React, { Component, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./cloudListModal.scss";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
 

function CloudListModal(props) {
    const [keyDataset, setKeyDataset] = React.useState([])

    const option = {
        onRowClick: row => {
            confirmAlert({
                title: `Confirm to delete key.`,
                message: `Are you sure to delete ${row.keyId}?`,
                buttons: [{
                    label: 'Yes',
                    onClick: () => fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/key?key_id=${row.keyId}`, {
                        method: 'delete',
                    })
                }],
                closeOnEscape: true,
                closeOnClickOutside: true
              });
        }
    } 

    const getKeyList = async () => {
        let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/key/list`).then(res=>res.json())
        let key_id = Object.keys(response.keys);
        for (let i = 0; i < key_id.length; i++) {
            key_id[i] = {
                key: key_id[i],
                vendor: response.keys[key_id[i]].vendor,
            };
        }
        localStorage.setItem("key", JSON.stringify(key_id));
    
        let tmp = []
        for (let key of key_id) {
            tmp.push({
                index: 1,
                keyId: key.key,
                vendor: key.vendor,    
            })
        }
        setKeyDataset(tmp)
    }

    useEffect(() => {
        getKeyList()
    })


    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="select-container">
                        <h2 className="select-title">등록한 클라우드 리스트</h2>
                    </div>
                    <BootstrapTable className="dashboard__table" options={option} data={keyDataset}>
                        <TableHeaderColumn
                            isKey
                            dataField="index"
                            dataAlign="center"
                        >
                            Index
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="keyId" dataAlign="center">
                            Key
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="vendor" dataAlign="center">
                            Vendor
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </Modal.Body>
            <Modal.Footer className="modal__footer-container password-change__footer">                
                <Button
                    className="modal__footer--button"
                    variant="warning"
                    onClick={props.onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CloudListModal;
