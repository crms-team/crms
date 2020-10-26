import { parse } from "@fortawesome/fontawesome-svg-core";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import TimePicker from "react-time-picker";

function ModalComponent() {
    const [pageNum, setPageNum] = useState(0);
    const [key, setKey] = useState(undefined);
    const [type, setType] = useState(undefined);
    const [instanceId, setInstanceId] = useState(undefined);
    const [instanceList, setInstanceList] = useState(undefined);
    const [scheduleType, setScheduleType] = useState(undefined);
    const [instanceHour, setHour] = useState(undefined);
    const [instanceMin, setMin] = useState(undefined);
    const [keyType, setKeyType] = useState(undefined);

    useEffect(() => {
        async function test() {
            let result = [];
            
            let response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/${type}?key_id=${key}`
            ).then((res) => res.json());

            let vendor = JSON.parse(localStorage.getItem("key"))
            
            for(let tmp of vendor){
                if(tmp.key==key){
                    vendor=tmp.vendor;
                    setKeyType(vendor)
                    break;
                }
            }

            if (response.data) {
                if(vendor=="aws"){
                    if (type == "server") {
                        for (let tmp of response.data) {
                            result.push(tmp.InstanceId);
                        }
                    } else {
                        for (let tmp of response.data) {
                            result.push(tmp.DBInstanceIdentifier);
                        }
                }}else{
                    if (type == "server") {
                        for (let tmp of response.data) {
                            result.push(tmp.id);
                        }
                    } 
                }
            }
            setInstanceList(result);
        }
        test();
    }, [type]);

    const page = [
        {
            component: (
                <>
                    <label for="recipient-name" class="col-form-label">
                        Select Key ID
                    </label>
                    <select
                        className="form-control"
                        name="instance"
                        onChange={(e) => {
                            setKey(e.target.value);
                        }}
                    >
                        <option value="" disabled selected>
                            Key Id
                        </option>
                        {JSON.parse(localStorage.getItem("key")).map((v) => {
                            return <option value={v.key}>{v.key}</option>;
                        })}
                    </select>
                    <label for="recipient-name" class="col-form-label">
                        Select Type of instance
                    </label>
                    <select
                        className="form-control"
                        name="instance"
                        onChange={(e) => {
                            setType(e.target.value);
                        }}
                    >
                        <option value="" disabled selected>
                            Instance Type
                        </option>
                        <option value="database">Database</option>
                        <option value="server">Server</option>
                    </select>
                </>
            ),
            button: (
                <Button
                    variant="warning"
                    onClick={() => {
                        if(type=="database" && keyType=="azure"){
                            alert("Did not support this resource")
                            window.location.reload();
                        }
                        else if(type==undefined || key==undefined){
                            alert("Must input value")
                        }
                        else{
                            setPageNum(pageNum + 1);
                        }
                    }}
                >
                    Next
                </Button>
            ),
        },
        {
            component: (
                <>
                    <Form>
                        <label for="recipient-name" class="col-form-label">
                            Select {type} ID
                        </label>
                        <select
                            className="form-control"
                            onChange={(e) => {
                                setInstanceId(e.target.value);
                            }}
                        >
                            <option value="" disabled selected>
                                {type} ID
                            </option>
                            {instanceList != undefined ? (
                                instanceList.map((v) => {
                                    return <option value={v}>{v}</option>;
                                })
                            ) : (
                                <></>
                            )}
                        </select>
                        <label for="recipient-name" class="col-form-label">
                            Select Schedule Type
                        </label>
                        <select
                            className="form-control"
                            onChange={(e) => {
                                setScheduleType(e.target.value);
                            }}
                        >
                            <option value="" disabled selected>
                                Schedule Type
                            </option>
                            <option value="true">On</option>
                            <option value="false">Off</option>
                        </select>
                        <label for="recipient-name" class="col-form-label">
                            Time
                        </label>
                        <div>
                            <div style={{ width: "50%", float: "left" }}>
                                <Form.Control
                                    placeholder="Hour"
                                    min="0"
                                    max="23"
                                    onChange={(e) => {
                                        setHour(e.target.value);
                                    }}
                                />
                            </div>
                            <div style={{ width: "50%", float: "left" }}>
                                <Form.Control
                                    placeholder="Min"
                                    min="0"
                                    max="59"
                                    onChange={(e) => {
                                        setMin(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </Form>
                </>
            ),
            button: (
                <Button
                    variant="warning"
                    onClick={async () => {
                        let url = `${process.env.REACT_APP_SERVER_URL}/api/scheduler`;
                        let keyList = JSON.parse(localStorage.getItem("key"));
                        let vendor = "";
                        let check=true;
                        let args = {};
                        if(instanceId==undefined){
                            check=false;   
                        }
                        if(scheduleType==undefined){
                            check=false;   
                        }
                        if(instanceHour==undefined){
                            check=false;   
                        }
                        if(instanceMin==undefined){
                            check=false;   
                        }
                        if(check==false){
                            alert("You Must check all value")
                        }
                        else {
                            for (let tmp of keyList) {
                            if (tmp.key == key) {
                                vendor = tmp.vendor;
                                break;
                            }
                            }

                            switch (vendor) {
                                case "aws":
                                    {
                                        switch (type) {
                                            case "server":
                                                {
                                                    args = {
                                                        InstanceIds: [instanceId],
                                                    };
                                                }
                                                break;
                                            case "database":
                                                {
                                                    args = {
                                                        DBInstanceIdentifier: instanceId,
                                                    };
                                                }
                                                break;
                                        }
                                    }
                                    break;
                                case "azure":
                                    {
                                        switch (type) {
                                            case "server":
                                                {
                                                    let tmp_arr = instanceId.split("/");
                                                    args = {
                                                        resourceGroupName : tmp_arr[4],
                                                        name: tmp_arr[8],
                                                    };
                                                }
                                                break;
                                        }
                                    }
                                    break;
                            }

                            let data = {
                                keyId: key,
                                time: {
                                    hour: parseInt(instanceHour),
                                    min: parseInt(instanceMin),
                                },
                                args: args,
                                session: type,
                                resourceId: instanceId,
                                type: scheduleType == "true" ? true : false,
                            };

                            let result = await fetch(url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(data),
                            }).then((res) => res.json());

                            alert(result.result ? "Success" : "Failed");
                            window.location.reload();
                        }
                    }}
                >
                    Submit
                </Button>
            ),
        },
    ];

    return (
        <>
            <Modal.Body>{page[pageNum].component}</Modal.Body>
            <Modal.Footer>{page[pageNum].button}</Modal.Footer>
        </>
    );
}

export default ModalComponent;
