import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "./changePassword.scss";

const ChangePasswordModal = ({ onClose, maskClosable, visible, className }) => {
    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    };

    const close = (e) => {
        if (onClose) {
            onClose(e);
        }
    };

    ChangePasswordModal.propTypes = {
        visible: PropTypes.bool,
    };

    ChangePasswordModal.defaultProps = {
        closable: true,
        maskClosable: true,
        visible: false,
    };

    return (
        <div className="ModalOverlay" onClick={onMaskClick}>
            <div className="passwordModal-container">
                <h2>비밀번호 변경</h2>
                <p>현재 비밀번호</p>
                <input type="password" placeholder="현재 비밀번호"></input>
                <p>비밀번호 변경하기</p>
                <input type="password" placeholder="변경할 비밀번호"></input>
                <input
                    type="password"
                    placeholder="변경할 비밀번호 재확인"
                ></input>
                <button className="change-btn">변경</button>
                <button className="cancle-btn" onClick={close}>
                    취소
                </button>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
