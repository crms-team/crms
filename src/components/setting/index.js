import React, { useState, Component } from "react";
import { IconContext } from "react-icons";
import { FiKey, FiUnlock, FiFileText } from "react-icons/fi";
import { GrFormPrevious } from "react-icons/gr";
import "./setting.scss";
import AddCloudKeyModal from "./setting-modal/addCloudKeyModal";
import ChangePasswordModal from "./setting-modal/changePasswdModal";
import CloudListModal from "./setting-modal/cloudListModal";

function Setting({ children }) {
    const [addCloudModalShow, setAddCloudModalShow] = useState(false);
    const [changePasswordModalShow, setChangePasswordModalShow] = useState(
        false
    );
    const [cloudListModalShow, setcloudListModalShow] = useState(false);

    return (
        <>
            {/* Open and close the setting page modal */}
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

            {cloudListModalShow && (
                <CloudListModal
                    show={cloudListModalShow}
                    onHide={() => setcloudListModalShow(false)}
                    title=""
                />
            )}

            <div className="previous-btn-container">
                <a href="#" className="previous-btn">
                    <IconContext.Provider value={{ className: "previous" }}>
                        <div>
                            <GrFormPrevious />
                        </div>
                    </IconContext.Provider>
                </a>
            </div>

            {/* setting page */}

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

                    <div
                        className="setting-box"
                        onClick={() => {
                            setcloudListModalShow(true);
                        }}
                    >
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
