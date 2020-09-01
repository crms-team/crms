import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "./cloudListModal.scss";

function CloudListModal(props) {
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
                    <BootstrapTable className="dashboard__table">
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
                        <TableHeaderColumn dataField="title" dataAlign="center">
                            ID
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="time" dataAlign="center">
                            Vendor
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </Modal.Body>
            <Modal.Footer className="modal__footer-container password-change__footer">
                <Button className="modal__footer--button" variant="warning">
                    변경
                </Button>
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
