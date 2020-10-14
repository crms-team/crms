import { parse } from "@fortawesome/fontawesome-svg-core";
import React, { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap";
import TimePicker from 'react-time-picker'

function ModalComponent() {
    const [pageNum, setPageNum] = useState(0)
    const [key, setKey] = useState(undefined)
    const [type, setType] = useState(undefined)
    const [instanceId, setInstanceId] = useState(undefined)
    const [instanceList, setInstanceList] = useState(undefined)
    const [scheduleType, setScheduleType] = useState(undefined)
    const [instanceHour, setHour] = useState(undefined)
    const [instanceMin, setMin] = useState(undefined)

    useEffect(() => {
        async function test() {
            let result = []
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/data/${type}?key_id=${key}`).then(res => res.json())
            if (response.data) {
                if (type == "server") {
                    for (let tmp of response.data) {
                        result.push(tmp.InstanceId)
                    }
                }
                else {
                    for (let tmp of response.data) {
                        result.push(tmp.DBInstanceIdentifier)
                    }
                }
            }
            setInstanceList(result)
        }
        test();
    }, [type])

    const page = [{
        component:
            <>
                <label for="recipient-name" class="col-form-label">
                    Select Key ID
                </label>
                <select
                    className="form-control"
                    name="instance"
                    onChange={(e) => {
                        setKey(e.target.value)
                    }}
                >
                    <option value="" disabled selected>
                        Key Id
                    </option>
                    {JSON.parse(localStorage.getItem("key")).map(v => {
                        return <option value={v.key}>{v.key}</option>
                    })}
                </select>
                <label for="recipient-name" class="col-form-label">
                    Select Type of instance
                </label>
                <select
                    className="form-control"
                    name="instance"
                    onChange={(e) => {
                        setType(e.target.value)
                    }}
                >
                    <option value="" disabled selected>
                        Instance Type
                    </option>
                    <option value="database" >
                        Database
                    </option>
                    <option value="server" >
                        Server
                    </option>
                </select>
            </>,
        button:
            <Button variant="warning" onClick={() => {
                setPageNum(pageNum + 1)
            }}>
                Next
            </Button>
    }, {
        component:
            <>
                <Form>
                    <label for="recipient-name" class="col-form-label">
                        Select Instance ID
                </label>
                    <select
                        className="form-control"
                        onChange={(e) => {
                            setInstanceId(e.target.value)
                        }}
                    >
                        <option value="" disabled selected>
                            Instance ID
                    </option>
                        {instanceList != undefined ? instanceList.map(v => {
                            return <option value={v}>{v}</option>
                        }) : <></>}
                    </select>
                    <label for="recipient-name" class="col-form-label">
                        Select Schedule Type
                </label>
                    <select
                        className="form-control"
                        onChange={(e) => {
                            setScheduleType(e.target.value)
                        }}
                    >
                        <option value="" disabled selected>
                            Schedule Type
                    </option>
                        <option value="true">
                            On
                    </option>
                        <option value="false">
                            Off
                    </option>
                    </select>
                    <label for="recipient-name" class="col-form-label">
                        Time
                </label>
                    <div>
                        <div style={{ width: "50%", float: 'left' }}>
                            <Form.Control
                                placeholder="Hour"
                                min="0"
                                max="23"
                                onChange={(e) => { setHour(e.target.value) }}
                            />
                        </div>
                        <div style={{ width: "50%", float: 'left' }}>
                            <Form.Control
                                placeholder="Min"
                                min="0"
                                max="59"
                                onChange={(e) => { setMin(e.target.value) }}
                            />
                        </div>
                    </div>
                </Form>
            </>,
        button:
            <Button variant="warning" onClick={() => {
                let url = `${process.env.REACT_APP_SERVER_URL}/api/scheduler`
                let keyList = JSON.parse(localStorage.getItem("key"))
                let vendor = "";

                for (let tmp of keyList) {
                    if (tmp.key == key) {
                        vendor = tmp.vendor
                    }
                }

                let data = {
                    "keyId": key,
                    "time": {
                        "hour": parseInt(instanceHour),
                        "min": parseInt(instanceMin)
                    },
                    "args": {
                        "vendor": vendor
                    },
                    "session": type,
                    "resourceId": instanceId,
                    "type": scheduleType == "true" ? true : false
                }

                console.log(data)
                console.log(url)

                async function scheduler() {
                    return await fetch(url, data).then(res => res.json())
                }

                alert(scheduler().result ? "Success" : "Failed")

            }}>
                Submit
            </Button>
    }]

    return (
        <>
            <Modal.Body >
                {page[pageNum].component}
            </Modal.Body>
            <Modal.Footer>
                {page[pageNum].button}
            </Modal.Footer>
        </>
    )
}

export default ModalComponent