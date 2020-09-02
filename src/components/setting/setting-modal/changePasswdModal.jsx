import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./changePasswdModal.scss";

function ChangePasswordModal(props) {
    let original = React.createRef();
    let new_passwd = React.createRef();
    let new_check = React.createRef();

    async function handleChangePW() {
        if (original.current.value == new_passwd.current.value) {
            alert("변경하려는 비밀번호가 기존 비밀번호와 같습니다.");
            return;
        }

        if (new_passwd.current.value != new_check.current.value) {
            alert("변경하려는 비밀번호가 다릅니다.");
            return;
        }

        let response = await (
            await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/passwd?passwd=${btoa(
                    original.current.value
                )}`
            )
        ).json();

        if (!response.result) {
            alert("현재 비밀번호와 다릅니다.");
            return;
        }

        let data = {
            passwd: btoa(original.current.value),
            new_passwd: btoa(new_passwd.current.value),
        };

        await fetch(`${process.env.REACT_APP_SERVER_URL}/api/passwd`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        alert("변경완료");
        props.onHide();
    }

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
                            ref={original}
                        />
                        <p className="text">비밀번호 변경하기</p>
                        <input
                            className="password-input"
                            type="password"
                            placeholder="변경할 비밀번호"
                            ref={new_passwd}
                        />
                        <input
                            className="password-input"
                            type="password"
                            placeholder="변경할 비밀번호 재확인"
                            ref={new_check}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="modal__footer-container password-change__footer">
                <Button
                    className="modal__footer--button"
                    variant="warning"
                    onClick={handleChangePW}
                >
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
