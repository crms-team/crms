import React, { Component } from "react";
import Sidebar from "../sidebar";
import { withRouter } from "react-router-dom";

import "./detail.scss";

const tabName = ["Information", "Object View"];

const thStyle = { width: "46%", "text-align": "right", paddingRight: "4%" };
const tdStyle = {
    width: "46%",
    "text-align": "left",
    paddingRight: "4%",
};

class ListTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        let key = [];

        if (data.length > 0) {
            key = Object.keys(data[0]);
            return (
                <div className="left--table-container">
                    <table className="detail__right--table">
                        <tr>
                            {key.map((v) => {
                                return <th>{v}</th>;
                            })}
                        </tr>

                        {data.map((v) => {
                            return (
                                <tr>
                                    {key.map((kv) => {
                                        let type = typeof v[kv];
                                        if (type == "object") {
                                            return (
                                                <td>{JSON.stringify(v[kv])}</td>
                                            );
                                        }
                                        return <td>{v[kv]}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </table>
                </div>
            );
        } else {
            return <div>There is no data to display</div>;
        }
    }
}

class ObjectView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let key = this.props.objectKey;

        if (key == "") {
            return <></>;
        }
        let data = this.props.objectData;
        let type = "length" in data;

        return (
            <div className="right--table-container">
                <span className="right--table-title">{key}</span>
                <hr />
                {type && <ListTable data={data} />}
            </div>
        );
    }
}

class ContentSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            rootData: [],

            resource: "",
            keyList: [],

            objectKey: "",
            objectData: [],
        };
        this.setState = this.setState.bind(this);
        this.clickEvent = this.clickEvent.bind(this);
    }

    async componentDidMount() {
        let response = await (await fetch(this.props.endpoint)).json();
        let resource = this.props.resource;
        let data = response.data;

        if (resource == "ec2") data = data["Instances"][0];

        this.setState({
            data: data,
            rootData: data,
            keyList: [resource],
        });
    }

    getViewData(keyList) {
        let data = this.state.rootData;

        for (let i = 1; i < keyList.length; i++) {
            data = data[keyList[i]];
        }

        return data;
    }

    clickEvent(key, data, type) {
        if (type == "list") {
            this.setState({
                objectKey: key,
                objectData: data,
            });
        } else {
            let keyList = this.state.keyList;
            keyList.push(key);
            this.setState({
                objectKey: "",
                objectData: [],
                keyList: keyList,
                data: this.getViewData(keyList),
            });
        }
    }

    linkClickEvent(idx) {
        let keyList = this.state.keyList;
        keyList = keyList.slice(0, idx);
        this.setState({
            keyList: keyList,
            data: this.getViewData(keyList),
        });
    }

    render() {
        let data = this.state.data;
        let keys = Object.keys(data);
        let keyList = this.state.keyList;

        return (
            <>
                <div>
                    {keyList.map((v, idx) => {
                        return (
                            <span onClick={() => this.linkClickEvent(idx + 1)}>
                                {" "}
                                /{" "}
                                <span
                                    className="top-title"
                                    style={{
                                        color: "#ffc14d",
                                        cursor: "pointer",
                                    }}
                                >
                                    {v}
                                </span>
                            </span>
                        );
                    })}
                </div>
                <hr className="hr" />
                <div className="contents-container">
                    {keys.length != 0 && (
                        <table className="detail__left--table">
                            {keys.map((val, idx) => {
                                let type = typeof data[val];

                                if (data[val] != null && type == "object") {
                                    let Testtype =
                                        "length" in data[val] ? "list" : "json";
                                    return (
                                        <tr>
                                            <th style={thStyle}>{val}</th>
                                            <td style={tdStyle}>
                                                <div
                                                    style={{
                                                        color: "#ffc14d",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        this.clickEvent(
                                                            val,
                                                            data[val],
                                                            Testtype
                                                        );
                                                    }}
                                                    className="view-object"
                                                >
                                                    view Object
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return (
                                        <tr>
                                            <th style={thStyle}>{val}</th>{" "}
                                            <td style={tdStyle}>
                                                {data[val] != null
                                                    ? data[val].toString()
                                                    : "null"}
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </table>
                    )}
                    {keys.length == 0 && <div>There is no data to display</div>}
                    <ObjectView
                        objectKey={this.state.objectKey}
                        objectData={this.state.objectData}
                    />
                </div>
            </>
        );
    }
}

class Detail extends Component {
    constructor(props) {
        super(props);

        let key_id = this.props.match.params.key_id;
        let resource = this.props.match.params.type;
        let resource_id = this.props.match.params.id;

        this.state = {
            clickNum: 0,
            activeContent: 0,
            resource: resource,
            endpoint: `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/${resource}?key_id=${key_id}&resource_id=${resource_id}&type=data`,
        };
    }

    tabClicked = (idx) => {
        this.setState({
            clickNum: idx,
        });
    };

    showContent = (idx) => {
        this.setState({
            activeContent: idx,
        });
    };

    render() {
        const { clickNum, activeContent } = this.state;

        return (
            <div className="detail-container">
                <Sidebar />
                <div className="tab-container">
                    <h2 className="tab-title">Detail Page</h2>
                    <ul className="tabName">
                        {tabName.map((tabName, idx) => {
                            return (
                                <li
                                    className={
                                        "tab " +
                                        (clickNum === idx
                                            ? "clicked"
                                            : "noClicked")
                                    }
                                    onClick={() => {
                                        this.tabClicked(idx);
                                        this.showContent(idx);
                                    }}
                                >
                                    {tabName}
                                </li>
                            );
                        })}
                    </ul>

                    <div
                        className="tab-content-container"
                        style={{ overflowY: "scroll" }}
                    >
                        <div className="tab-content">
                            <ContentSummary
                                endpoint={this.state.endpoint}
                                resource={this.state.resource}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;
