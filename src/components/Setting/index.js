import React, { useState, Component } from "react";
import { IconContext } from "react-icons";
import { FiKey, FiUnlock, FiFileText } from "react-icons/fi";
import "./Setting.scss";
import AddCloudKeyModal from "./setting-modal/addCloudKeyModal";
import ChangePasswordModal from "./setting-modal/changePasswordModal";

function Setting({ children }) {
    const [addCloudModalShow, setAddCloudModalShow] = useState(false);
    const [changePasswordModalShow, setChangePasswordModalShow] = useState(
        false
    );

    return (
        <>
            {addCloudModalShow && (
                <AddCloudKeyModal
                    show={addCloudModalShow}
                    onHide={() => setAddCloudModalShow(false)}
                    title=""
                />
            )}

            {changePasswordModalShow && (
                <ChangePasswordModal
                    show={changePasswordModalShow}
                    onHide={() => setChangePasswordModalShow(false)}
                    title=""
                />
            )}

            <div className="setting-container">
                <h1 className="setting-title">Setting Page</h1>
                <div>
                    <div
                        className="setting-box"
                        onClick={() => {
                            setAddCloudModalShow(true);
                        }}
                    >
                        <IconContext.Provider value={{ className: "icon" }}>
                            <FiKey />
                        </IconContext.Provider>
                        <h1 className="setting-subtitle ko">
                            클라우드 키 등록
                        </h1>
                        <h2 className="setting-subtitle en">
                            Register cloud key
                        </h2>
                        <div className="setting-box-deco"></div>
                    </div>

                    <div className="setting-box">
                        <IconContext.Provider value={{ className: "icon" }}>
                            <FiFileText />
                        </IconContext.Provider>
                        <h1 className="setting-subtitle ko">
                            등록한 클라우드 리스트
                        </h1>
                        <h2 className="setting-subtitle en">
                            Registered Cloud List
                        </h2>
                        <div className="setting-box-deco"></div>
                    </div>

                    <div
                        className="setting-box"
                        onClick={() => {
                            setChangePasswordModalShow(true);
                        }}
                    >
                        <IconContext.Provider value={{ className: "icon" }}>
                            <FiUnlock />
                        </IconContext.Provider>
                        <h1 className="setting-subtitle ko">비밀번호 변경</h1>
                        <h2 className="setting-subtitle en">Change password</h2>
                        <div className="setting-box-deco"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Setting;
