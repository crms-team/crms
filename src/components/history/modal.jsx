import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

function changeDataSet(data) {
    try {
        let jsonData = undefined;
        if (typeof data == "object") jsonData = data;
        else jsonData = JSON.parse(data);
        if (typeof jsonData == "object") {
            let d = JSON.stringify(jsonData, null, 4);
            return <pre>{d}</pre>;
        } else {
            return <span>{data}</span>;
        }
    } catch {
        console.log(data);
        return <span>{data}</span>;
    }
}
function ModalComponent(props) {
    return (
        <>
            <Modal.Body>
                <Table
                    striped
                    bordered
                    hover
                    variant="dark"
                    style={{ overflow: "auto", display: "block" }}
                >
                    <thead>
                        <tr>
                            <th style={{ width: "10%", textAlign: "left" }}>
                                {" "}
                            </th>
                            <th style={{ width: "45%", textAlign: "left" }}>
                                Before
                            </th>
                            <th style={{ width: "45%", textAlign: "left" }}>
                                After
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(props.data.detail).map((v) => {
                            let data = props.data.detail[v];
                            return (
                                <tr>
                                    <td
                                        style={{
                                            flexWrap: "wrap",
                                            textAlign: "left",
                                        }}
                                    >
                                        {v}
                                    </td>
                                    <td
                                        style={{
                                            flexWrap: "wrap",
                                            textAlign: "left",
                                        }}
                                    >
                                        {changeDataSet(data.before)}
                                    </td>
                                    <td
                                        style={{
                                            flexWrap: "wrap",
                                            textAlign: "left",
                                        }}
                                    >
                                        {changeDataSet(data.after)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="warning"
                    onClick={() => {
                        let url = `/detail/${props.dataKey}/${
                            props.data.resource
                        }/${btoa(props.data.id)}`;
                        window.location.href = url;
                    }}
                >
                    Detail
                </Button>
            </Modal.Footer>
        </>
    );
}

export default ModalComponent;
