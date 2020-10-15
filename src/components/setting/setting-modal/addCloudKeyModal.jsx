import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { TableHeaderColumn, BootstrapTable } from "react-bootstrap-table";
import "./addCloudKeyModal.scss";

const awsRegions = [
    { value: "us-east-1", name: "미국 동부 (버지니아 북부) us-east-1" },
    { value: "us-east-2", name: "미국 동부 (오하이오) us-east-2" },
    { value: "us-west-1", name: "미국 서부 (캘리포니아) us-west-1" },
    { value: "us-west-2", name: "미국 서부 (오레곤) us-west-2" },
    { value: "af-south-1", name: "아프리카 (케이프 타운) af-south-1" },
    { value: "ap-east-1", name: "아시아 태평양 (홍콩) ap-east-1" },
    { value: "ap-south-1", name: "아시아 태평양 (뭄바이) ap-south-1" },
    {
        value: "ap-southeast-1",
        name: "아시아 태평양 (싱가포르) ap-southeast-1",
    },
    { value: "ap-southeast-2", name: "아시아 태평양 (시드니) ap-southeast-2" },
    { value: "ap-northeast-1", name: "아시아 태평양 (도쿄) ap-northeast-1" },
    { value: "ap-northeast-2", name: "아시아 태평양 (서울) ap-northeast-2" },
    { value: "ap-northeast-3", name: "아시아 태평양 (오사카) ap-northeast-3" },
    { value: "cn-north-1", name: "중국 (베이징) cn-north-1" },
    { value: "cn-northwest-1", name: "중국 (닝샤) cn-northwest-1" },
    { value: "ca-central-1", name: "캐나다 (중부) ca-central-1" },
    { value: "eu-central-1", name: "유럽 (프랑크푸르트) eu-central-1" },
    { value: "eu-west-1", name: "유럽 (아일랜드) eu-west-1" },
    { value: "eu-west-2", name: "유럽 (런던) eu-west-2" },
    { value: "eu-west-3", name: "유럽 (파리) eu-west-3" },
    { value: "eu-south-1", name: "유럽 (밀란)) eu-south-1" },
    { value: "eu-north-1", name: "유럽 (스톡홀름) eu-north-1" },
    { value: "me-south-1", name: "중동 (바레인) me-south-1" },
    { value: "sa-east-1", name: "남아메리카 (상파울루) sa-east-1" },
    { value: "us-gov-east-1", name: "AWS GovCloud (미국 동부) us-gov-west-1" },
    { value: "us-gov-west-1", name: "AWS GovCloud (미국) us-gov-east-1" },
];

function AddCloudKeyModal(props) {
    let vendor = React.createRef();
    let cloudId = React.createRef();
    let accessKey = React.createRef();
    let secretKey = React.createRef();
    let region = React.createRef();

    let client_id = React.createRef();
    let tenant_id = React.createRef();
    let secret_key = React.createRef();
    let subscription = React.createRef();

    let [overlapCheck, setOverlapCheck] = React.useState(false);
    let [isAws, setIsAws] = React.useState(false);
    let [isAzure, setIsAzure] = React.useState(false);

    function showOptions() {
        if (vendor.current.value === "aws") {
            setIsAws(true);
            setIsAzure(false);
        } else if (vendor.current.value === "azure") {
            setIsAzure(true);
            setIsAws(false);
        } else {
            setIsAzure(false);
            setIsAws(false);
        }
    }

    async function handleCheckOverlap() {
        let response = await (
            await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/cloud/key?key_id=${cloudId.current.value}`
            )
        ).json();
        response.result ? alert("중복되었습니다") : alert("성공");
        setOverlapCheck(!response.result);
    }

    async function handleAddCloudKey() {
        let data = {
            key_id: cloudId.current.value,
            vendor: vendor.current.value,
            keys: {},
        };

        if (data.vendor == "aws") {
            data.keys = {
                accessKeyId: accessKey.current.value,
                secretAccessKey: secretKey.current.value,
                region: region.current.value,
            };
        } else if (data.vendor == "azure") {
            data.keys = {
                client_id: client_id.current.value,
                tenant_id: tenant_id.current.value,
                secret_key: secret_key.current.value,
                subscription: subscription.current.value,
            };
        }

        if (vendor.current.value == "" || cloudId.current.value == "") {
            alert("빈 값이 있습니다.");
            return;
        }

        if (!overlapCheck) {
            alert("중복 확인을 해주십시오");
            return;
        }

        let response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/api/cloud/key`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => res.json());
        alert(response.result);
        if (response.result) {
            window.location.reload();
        }
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
                        <h2 className="select-title">클라우드 계정 추가</h2>
                        <Form className="select__option">
                            <label>제공사를 선택해주세요.</label>
                            <select
                                className="select__option--options form-control"
                                ref={vendor}
                                onChange={showOptions}
                            >
                                <option value="" disabled selected>
                                    Resource
                                </option>
                                <option value="aws">AWS</option>
                                <option value="azure">Azure</option>
                            </select>
                        </Form>
                        <p className="cloud-id"></p>
                        <input
                            className="select-input"
                            placeholder="Cloud ID"
                            ref={cloudId}
                            onChange={() => setOverlapCheck(false)}
                        ></input>
                        <Button
                            variant="warning"
                            className="select-btn"
                            onClick={handleCheckOverlap}
                        >
                            중복 확인
                        </Button>

                        {/*  AWS  */}

                        <div className="select-Supplier">
                            {isAws && (
                                <>
                                    <input
                                        className="select-input"
                                        placeholder="Access Key"
                                        ref={accessKey}
                                    ></input>
                                    <input
                                        className="select-input"
                                        placeholder="Secret Key"
                                        type="password"
                                        ref={secretKey}
                                    ></input>
                                    <Form Form className="select__option">
                                        <select
                                            className="select__option--options region form-control"
                                            ref={region}
                                        >
                                            <option value="" disabled selected>
                                                Region
                                            </option>
                                            {awsRegions.map((v) => {
                                                return (
                                                    <option value={v.value}>
                                                        {v.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </Form>
                                </>
                            )}

                            {/* Azure */}
                            {isAzure && (
                                <>
                                    <div className="select-Supplier">
                                        <input
                                            className="select-input"
                                            placeholder="Subscription ID"
                                            ref={subscription}
                                        ></input>
                                        <input
                                            className="select-input"
                                            placeholder="Client ID"
                                            ref={client_id}
                                        ></input>
                                        <input
                                            className="select-input"
                                            placeholder="Secret Key"
                                            ref={secret_key}
                                            type="password"
                                        ></input>
                                        <input
                                            className="select-input"
                                            placeholder="Tenant ID"
                                            ref={tenant_id}
                                        ></input>
                                    </div>
                                </>
                            )}

                            <div className="select-bottom-text">
                                <span>클라우드 키 발급 방법</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="modal__footer-container">
                <Button
                    className="modal__footer--button"
                    variant="warning"
                    onClick={handleAddCloudKey}
                >
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
