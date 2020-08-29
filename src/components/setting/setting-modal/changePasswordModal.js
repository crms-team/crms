import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./changePasswordModal.scss";

function ChangePasswordModal(props) {
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
                        <h2 className="password-title">비밀번호 변경</h2>
                        <p className="text">현재 비밀번호</p>
                        <input
                            className="password-input"
                            type="password"
                            placeholder="현재 비밀번호"
                        />
                        <p className="text">비밀번호 변경하기</p>
                        <input
                            className="password-input"
                            type="password"
                            placeholder="변경할 비밀번호"
                        />
                        <input
                            className="password-input"
                            type="password"
                            placeholder="변경할 비밀번호 재확인"
                        />
                    </div>
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

export default ChangePasswordModal;
