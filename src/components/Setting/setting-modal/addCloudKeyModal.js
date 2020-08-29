import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./cloudkey-modal.scss";

function AddCloudKeyModal(props) {
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
                        <h2 className="select-title">클라우드 계정 추가</h2>
                        <Form className="select__option">
                            <label>제공사를 선택해주세요.</label>
                            <select className="select__option--options form-control">
                                <option value="" disabled selected>
                                    Resource
                                </option>
                                <option>AWS</option>
                            </select>
                        </Form>
                        <p className="cloud-id"></p>
                        <input
                            className="select-input"
                            placeholder="Cloud ID"
                        ></input>
                        <Button variant="warning" className="select-btn">
                            중복 확인
                        </Button>

                        <div className="select-Supplier">
                            <input
                                className="select-input"
                                placeholder="Access Key"
                            ></input>
                            <input
                                className="select-input"
                                placeholder="Secret Key"
                            ></input>

                            <Form Form className="select__option">
                                <select className="select__option--options region form-control">
                                    <option value="" disabled selected>
                                        Region
                                    </option>
                                </select>
                            </Form>
                            <div className="select-bottom-text">
                                <span>클라우드 키 발급 방법</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="modal__footer-container">
                <Button className="modal__footer--button" variant="warning">
                    추가
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

export default AddCloudKeyModal;
