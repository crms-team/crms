import React, { useState, Component } from "react";
import { IconContext } from "react-icons";
import { FiKey, FiUnlock, FiFileText } from "react-icons/fi";
import classNames from "classnames";
import "./setting.scss";
import SettingModal from "./settingModal/settingModal";
import ChangePasswordModal from "./changePassword/changePassword";

function Setting({ children, ...rest }) {
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    // changePass 코드 중복 ㅜㅜ
    const [passwordModal, setPasswordModal] = useState(false);

    const openPasswordModal = () => {
        setPasswordModal(true);
    };
    const closePasswordModal = () => {
        setPasswordModal(false);
    };

    return (
        <>
            {modalVisible && (
                <SettingModal
                    visible={modalVisible}
                    closable={true}
                    maskClosable={true}
                    onClose={closeModal}
                ></SettingModal>
            )}

            {passwordModal && (
                <ChangePasswordModal
                    visible={passwordModal}
                    closable={true}
                    maskClosable={true}
                    onClose={closePasswordModal}
                ></ChangePasswordModal>
            )}

            <div isOpen={false} className={classNames("setting-container")}>
                <h1 className={classNames("setting-title")}>Setting Page</h1>
                <div>
                    <div
                        className={classNames("setting-box")}
                        onClick={openModal}
                    >
                        <IconContext.Provider value={{ className: "icon" }}>
                            <FiKey />
                        </IconContext.Provider>
                        <h1 className={classNames("setting-subtitle", "ko")}>
                            클라우드 키 등록
                        </h1>
                        <h2 className={classNames("setting-subtitle", "en")}>
                            Register cloud key
                        </h2>
                        <div className={classNames("setting-box-deco")}></div>
                    </div>

                    <div className={classNames("setting-box")}>
                        <IconContext.Provider value={{ className: "icon" }}>
                            <FiFileText />
                        </IconContext.Provider>
                        <h1 className={classNames("setting-subtitle", "ko")}>
                            등록한 클라우드 리스트
                        </h1>
                        <h2 className={classNames("setting-subtitle", "en")}>
                            Registered Cloud List
                        </h2>
                        <div className={classNames("setting-box-deco")}></div>
                    </div>

                    <div
                        className={classNames("setting-box")}
                        onClick={openPasswordModal}
                    >
                        <IconContext.Provider value={{ className: "icon" }}>
                            <FiUnlock />
                        </IconContext.Provider>
                        <h1 className={classNames("setting-subtitle", "ko")}>
                            비밀번호 변경
                        </h1>
                        <h2 className={classNames("setting-subtitle", "en")}>
                            Change password
                        </h2>
                        <div className={classNames("setting-box-deco")}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Setting;
