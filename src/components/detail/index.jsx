import React, { Component } from "react";
import Sidebar from "../sidebar";
import {
    Button,
    Form,
} from "react-bootstrap";
import "./detail.scss";
import { summaryType } from "../../manager"
import EditCellClassNameTable from "./edit-table";

const tabName = ["Information", "Modify"];

const thStyle = { width: "46%", textAlign: "right", paddingRight: "4%" };
const tdStyle = { width: "46%", textAlign: "left", paddingRight: "4%" };

function modifyd(rst) {
    alert(rst.data ? "success" : "failed")
    window.location.reload()
}

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
                <div>
                    <span className="right--table-title">{key}</span>
                    <hr />
                    {type && <ListTable data={data} />}
                </div>
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

        if (resource == "server") data = data["Instances"][0];

        this.setState({
            data: data,
            rootData: data,
            keyList: [resource]
        });
    }

    getViewData(keyList) {
        let data = this.state.rootData

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
                data: this.getViewData(keyList)
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
        let data = this.state.data != undefined ? this.state.data : {
            state: 'Creating....'
        };
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
                        <div className="detail__left--table">
                            <table>
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
                        </div>
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

class ContentUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            etcData1: [],
            etcData2: [],
            vendor: ""
        }
        this.modifyInstance = this.modifyInstance.bind(this);
        this.handler = this.handler.bind(this)
    }

    async componentDidMount() {
        let response = await (await fetch(this.props.endpoint)).json();
        let resource = this.props.resource
        let data = response.data
        let ec2list;
        let ec2item = [];
        let etcData1 = []
        let etcData2 = []
        let vendor = ""

        let keylist = JSON.parse(localStorage.getItem("key"))
        for (let tmp_key of keylist) {
            if (tmp_key.key == this.props.modkey) {
                this.state.vendor = tmp_key.vendor
            }
        }

        if (this.state.vendor == "aws") {
            if (resource == 'server') data = data['Instances'][0]
            else if (resource == "volume") {
                ec2list = await this.getEC2List()
                for (let i = 0; i < ec2list.Instances.length; i++) {
                    ec2item.push(<option>{ec2list.Instances[i].InstanceId}</option>)
                }
            }
            else if (resource == "ip") {
                ec2list = await this.getEC2List()
                for (let i = 0; i < ec2list.Instances.length; i++) {
                    ec2item.push(<option>{ec2list.Instances[i].InstanceId}</option>)
                }
            }
            else if (resource == "database") {
                await this.getEngineVersion(response.data.Engine)
            }
            else if (resource == 'securitygroup') {
                for (let rule of data.IpPermissions) {
                    for (let range of rule.IpRanges) {
                        if (rule.IpProtocol == "-1") {
                            etcData1.push({
                                protocol: rule.IpProtocol,
                                port: `1-65535`,
                                cidr: range.CidrIp,
                                description: range.Description ? range.Description : ''
                            })

                        } else {
                            etcData1.push({
                                protocol: rule.IpProtocol,
                                port: `${rule.FromPort}-${rule.ToPort}`,
                                cidr: range.CidrIp,
                                description: range.Description ? range.Description : ''
                            })
                        }
                    }
                }

                for (let rule of data.IpPermissionsEgress) {
                    for (let range of rule.IpRanges) {
                        if (rule.IpProtocol == "-1") {
                            etcData2.push({
                                protocol: rule.IpProtocol,
                                port: `1-65535`,
                                cidr: range.CidrIp,
                                description: range.Description ? range.Description : ''
                            })

                        } else {
                            etcData2.push({
                                protocol: rule.IpProtocol,
                                port: `${rule.FromPort}-${rule.ToPort}`,
                                cidr: range.CidrIp,
                                description: range.Description ? range.Description : ''
                            })
                        }
                    }
                }

            }
        }
        else if (vendor == "azure") {
            console.log("azure")
        }

        this.setState({
            data: data,
            resource: resource,
            ec2list: ec2list,
            ec2item: ec2item,
            etcData1: etcData1,
            etcData2: etcData2
        });
    }

    async getEC2List() {
        let url = `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/server?key_id=${this.props.modkey}`
        let tmp_ec2 = await fetch(url).then(res => res.json());
        return tmp_ec2.data[0]
    }

    async getEngineVersion(engine) {
        let items = []
        let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/cloud/data/database/etc/versions`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key_id: this.props.modkey,
                args: {
                    Engine: engine
                }
            }
            )
        }).then(res => res.json())

        for (let i = 0; i < response.data.length; i++) {
            items.push(<option value={response.data[i].EngineVersion}>{response.data[i].EngineVersion}</option>)
        }

        this.setState({
            tmp_version: items
        })
    }

    handler(key, value) {
        let d = this.state
        console.log(key, value, 3)
        d[key] = value
        this.setState(d)
        console.log(this.state)
    }

    modifyInstance(resource, data) {
        let tmp_data = {};
        let tmp_attach = {};
        function func(key, val) {
            tmp_data[key] = val
        }

        if (this.state.vendor == "aws") {
            if (resource == "server") {
                return (
                    <>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Ebs DeviceName</Form.Label>
                                <Form.Control
                                    placeholder="Enter Ebs DeviceName"
                                    onChange={(e) => {
                                        let tmp = [
                                            {
                                                DeviceName: e.target.value,
                                                Ebs: {
                                                    DeleteOnTermination: this.state.data.BlockDeviceMappings[0].DeleteOnTermination,
                                                    VolumeId: this.state.data.BlockDeviceMappings[0].Ebs.VolumeId
                                                },
                                            },
                                        ]
                                        func("BlockDeviceMappings", tmp)
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Ebs DeleteOnTermination</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let tmp = [
                                            {
                                                DeviceName: this.state.data.BlockDeviceMappings[0].DeviceName,
                                                Ebs: {
                                                    DeleteOnTermination: ("true" == e.target.value),
                                                    VolumeId: this.state.data.BlockDeviceMappings[0].Ebs.VolumeId
                                                },
                                            },
                                        ]
                                        func("BlockDeviceMappings", tmp);
                                    }}
                                >
                                    <option value="" disabled selected>
                                        BlockDeviceMappings
                            </option>
                                    <option>true</option>
                                    <option>false</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>EbsOptimized</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let tmp = {
                                            Value: ("true" == e.target.value)
                                        }
                                        func("EbsOptimized", tmp);
                                    }}
                                >
                                    <option value="" disabled selected>
                                        EbsOptimized
                            </option>
                                    <option>true</option>
                                    <option>false</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>EnaSupport</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let tmp = {
                                            Value: ("true" == e.target.value)
                                        }
                                        func("EnaSupport", tmp);
                                    }}
                                >
                                    <option value="" disabled selected>
                                        EnaSupport
                            </option>
                                    <option>true</option>
                                    <option>false</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>SourceDestCheck</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let tmp = {
                                            Value: ("true" == e.target.value)
                                        }
                                        func("SourceDestCheck", tmp);
                                    }}
                                >
                                    <option value="" disabled selected>
                                        SourceDestCheck
                            </option>
                                    <option>true</option>
                                    <option>false</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <Button variant="warning" onClick={async () => {
                            tmp_data.InstanceId = this.state.data.InstanceId
                            modifyd(await summaryType[this.state.resource]["manage"].update(this.props.modkey, tmp_data))
                        }}>
                            Modify
                </Button>
                    </>
                )
            }
            else if (resource == "volume") {
                return (
                    <>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Size</Form.Label>
                                <Form.Control
                                    placeholder="Enter Size"
                                    onChange={(e) => {
                                        let tmp = parseInt(e.target.value)
                                        func("Size", tmp)
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Iops</Form.Label>
                                <Form.Control
                                    placeholder="Enter Iops"
                                    onChange={(e) => {
                                        let tmp = parseInt(e.target.value)
                                        func("Iops", tmp)
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>VolumeType</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        func("VolumeType", e.target.value)
                                    }}
                                >
                                    <option value="" disabled selected>
                                        VolumeType
                            </option>
                                    <option>standard</option>
                                    <option>io1</option>
                                    <option>io2</option>
                                    <option>gp2</option>
                                    <option>sc1</option>
                                    <option>st1</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Attach or Detach</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        if (e.target.value != "") {
                                            for (let i = 0; i < this.state.ec2list.Instances.length; i++) {
                                                if (this.state.ec2list.Instances[i].InstanceId == e.target.value) {
                                                    tmp_attach.Device = this.state.ec2list.Instances[i].RootDeviceName
                                                    tmp_attach.InstanceId = e.target.value
                                                    tmp_attach.VolumeId = this.state.data.VolumeId
                                                }
                                            }
                                        }
                                        else {
                                            tmp_attach = {}
                                            tmp_attach.VolumeId = this.state.data.VolumeId
                                        }
                                    }}
                                >
                                    <option value="" disabled selected>
                                        Attach or Detach
                            </option>
                                    <option value="">detach</option>
                                    {
                                        this.state.ec2item
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <Button variant="warning" onClick={async () => {
                            tmp_data.VolumeId = this.state.data.VolumeId
                            await summaryType[this.state.resource]["manage"].update(this.props.modkey, tmp_data)
                            if (JSON.stringify(tmp_attach) != "{}") {
                                if (Object.keys(tmp_attach).length > 1) {
                                    await summaryType[this.state.resource]["manage"].attach(this.props.modkey, tmp_attach)
                                }
                                else {
                                    await summaryType[this.state.resource]["manage"].detach(this.props.modkey, tmp_attach)
                                }
                            }
                            window.location.reload()
                        }}>
                            Modify
                </Button>
                    </>
                )
            }
            else if (resource == "vpc") {
                return (
                    <>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>EnableDnsHostnames</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let tmp = {
                                            Value: ("true" == e.target.value)
                                        }
                                        func("EnableDnsHostnames", tmp)
                                    }}
                                >
                                    <option value="" disabled selected>
                                        EnableDnsHostnames
                            </option>
                                    <option>true</option>
                                    <option>false</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>EnableDnsSupport</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let tmp = {
                                            Value: ("true" == e.target.value)
                                        }
                                        func("EnableDnsSupport", tmp)
                                    }}
                                >
                                    <option value="" disabled selected>
                                        EnableDnsSupport
                            </option>
                                    <option>true</option>
                                    <option>false</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <Button variant="warning" onClick={async () => {
                            tmp_data.VpcId = this.state.data.VpcId
                            modifyd(await summaryType[this.state.resource]["manage"].update(this.props.modkey, tmp_data))
                        }}>
                            Modify
                </Button>
                    </>
                )
            }
            else if (resource == "subnet") {
                return (
                    <>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>AssignIpv6AddressOnCreation</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let tmp = {
                                            Value: ("true" == e.target.value)
                                        }
                                        func("AssignIpv6AddressOnCreation", tmp)
                                    }}
                                >
                                    <option value="" disabled selected>
                                        AssignIpv6AddressOnCreation
                            </option>
                                    <option>true</option>
                                    <option>false</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="CustomerOwnedIpv4Pool">
                                <Form.Label>CustomerOwnedIpv4Pool</Form.Label>
                                <Form.Control
                                    placeholder="Enter Size"
                                    onChange={(e) => {
                                        let tmp = e.target.value
                                        func("CustomerOwnedIpv4Pool", tmp)
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>MapCustomerOwnedIpOnLaunch</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let tmp = {
                                            Value: ("true" == e.target.value)
                                        }
                                        func("CustomerOwnedIpv4Pool", this.state.data.CustomerOwnedIpv4Pool)
                                        func("MapCustomerOwnedIpOnLaunch", tmp)
                                    }}
                                >
                                    <option value="" disabled selected>
                                        MapCustomerOwnedIpOnLaunch
                            </option>
                                    <option>true</option>
                                    <option>false</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>MapPublicIpOnLaunch</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let tmp = {
                                            Value: ("true" == e.target.value)
                                        }
                                        func("MapPublicIpOnLaunch", tmp)
                                    }}
                                >
                                    <option value="" disabled selected>
                                        MapPublicIpOnLaunch
                            </option>
                                    <option>true</option>
                                    <option>false</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <Button variant="warning" onClick={async () => {
                            tmp_data.SubnetId = this.state.data.SubnetId
                            let rst = await summaryType[this.state.resource]["manage"].update(this.props.modkey, tmp_data)
                            modifyd(rst)
                        }}>
                            Modify
                </Button>
                    </>
                )
            }
            else if (resource == "ip") {
                if (this.state.data.AssociationId == undefined) {
                    return (
                        <>
                            <Form>
                                <Form.Label>EC2 - VPC Attach</Form.Label>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>InstanceId</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={(e) => {
                                            func("InstanceId", e.target.value)
                                            func("AllocationId", this.state.data.AllocationId)
                                        }}
                                    >
                                        <option value="" disabled selected>
                                            InstanceId
                                    </option>
                                        {
                                            this.state.ec2item
                                        }
                                    </Form.Control>
                                    <Form.Label>EC2 Classic Attach</Form.Label>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>InstanceId</Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={(e) => {
                                                func("InstanceId", e.target.value)
                                                func("PublicIp", this.state.data.PublicIp)
                                            }}
                                        >
                                            <option value="" disabled selected>
                                                InstanceId
                                    </option>
                                            {
                                                this.state.ec2item
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Group>
                            </Form>
                            <Button variant="warning" onClick={async () => {
                                modifyd(await summaryType[this.state.resource]["manage"].update(this.props.modkey, tmp_data))
                            }}>
                                Modify
                        </Button>
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>VPC Detach</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={(e) => {
                                            func("AssociationId", e.target.value)
                                        }}
                                    >
                                        <option value="" disabled selected>
                                            Detach
                                    </option>
                                        <option>{this.state.data.AssociationId}</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>EC2 Detach</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={(e) => {
                                            func("PublicIp", e.target.value)
                                        }}
                                    >
                                        <option value="" disabled selected>
                                            Detach
                                    </option>
                                        <option>{this.state.data.PublicIp}</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            <Button variant="warning" onClick={async () => {
                                modifyd(await summaryType[this.state.resource]["manage"].update(this.props.modkey, tmp_data))
                            }}>
                                Modify
                        </Button>
                        </>
                    )
                }
            }
            else if (resource == "securitygroup") {
                return (
                    <>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Ingress Role</Form.Label>
                        </Form.Group>
                        <EditCellClassNameTable rowData={this.state.etcData1} keyId="etcData1" handler={this.handler} />
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Egress Role</Form.Label>
                        </Form.Group>
                        <EditCellClassNameTable rowData={this.state.etcData2} keyId="etcData2" handler={this.handler} />
                        <Button
                            variant="warning"
                            onClick={async () => {
                                function getRuleSet(ruleData) {
                                    let rules = [];
                                    for (let rule of ruleData) {
                                        let port = null
                                        try {
                                            port = rule.port.trim().split('-')
                                            port.push(port[0])
                                        } catch (e) {
                                            port = [-1, -1]
                                        }

                                        port.sort()

                                        rules.push({
                                            ToPort: parseInt(port[1]),
                                            FromPort: parseInt(port[0]),
                                            IpProtocol: rule.protocol.trim(),
                                            IpRanges: [{
                                                CidrIp: rule.cidr.trim(),
                                                Description: rule.description.trim()
                                            }]
                                        })
                                    }

                                    return rules
                                }


                                let preIngressRule = []
                                let preEgressRule = []

                                for (let rule of this.state.data.IpPermissions) {
                                    preIngressRule.push({
                                        FromPort: rule.FromPort,
                                        IpProtocol: rule.IpProtocol,
                                        IpRanges: rule.IpRanges,
                                        ToPort: rule.ToPort,
                                    })
                                }

                                for (let rule of this.state.data.IpPermissionsEgress) {
                                    preEgressRule.push({
                                        FromPort: rule.FromPort,
                                        IpProtocol: rule.IpProtocol,
                                        IpRanges: rule.IpRanges,
                                        ToPort: rule.ToPort,
                                    })
                                }

                                await summaryType[this.state.resource][
                                    "manage"
                                ].update(this.props.modkey, {
                                    type: 'ingress',
                                    method: false,
                                    args: {
                                        GroupId: this.state.data.GroupId,
                                        IpPermissions: preIngressRule,
                                    }
                                })

                                await summaryType[this.state.resource][
                                    "manage"
                                ].update(this.props.modkey, {
                                    type: 'egress',
                                    method: false,
                                    args: {
                                        GroupId: this.state.data.GroupId,
                                        IpPermissions: preEgressRule,
                                    }
                                })

                                let addIngressSet = {
                                    type: 'ingress',
                                    method: true,
                                    args: {
                                        GroupId: this.state.data.GroupId,
                                        IpPermissions: getRuleSet(this.state.etcData1)
                                    }
                                }

                                let addEgressSet = {
                                    type: 'egress',
                                    method: true,
                                    args: {
                                        GroupId: this.state.data.GroupId,
                                        IpPermissions: getRuleSet(this.state.etcData2)
                                    }
                                }


                                console.log(
                                    await summaryType[this.state.resource][
                                        "manage"
                                    ].update(this.props.modkey, addEgressSet)
                                )

                                console.log(
                                    await summaryType[this.state.resource][
                                        "manage"
                                    ].update(this.props.modkey, addIngressSet)
                                )
                                window.location.reload()

                            }}
                        >
                            Modify
                    </Button>
                    </>
                );
            }
            else if (resource == "database") {
                tmp_data.DBInstanceIdentifier = this.state.data.DBInstanceIdentifier
                return (
                    <>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>EngineVersion</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        func("EngineVersion", val);
                                    }}
                                >
                                    <option value="" disabled selected>
                                        EngineVersion
                            </option>
                                    {this.state.tmp_version}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>MasterUserPassword</Form.Label>
                                <Form.Control
                                    placeholder="Enter MasterUserPassword"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        func("MasterUserPassword", val);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>DBInstanceClass</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        func("DBInstanceClass", val);
                                    }}
                                >
                                    <option value="" disabled selected>
                                        DBInstanceClass
                            </option>
                                    <option>db.t2.small</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>AllocatedStorage</Form.Label>
                                <Form.Control
                                    placeholder="Enter AllocatedStorage"
                                    onChange={(e) => {
                                        let val = parseInt(e.target.value);
                                        func("AllocatedStorage", val);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>StorageType</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        func("StorageType", val);
                                    }}
                                >
                                    <option value="" disabled selected>
                                        StorageType
                            </option>
                                    <option>standard</option>
                                    <option>gp2</option>
                                    <option>io1</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>MaxAllocatedStorage</Form.Label>
                                <Form.Control
                                    placeholder="Enter MaxAllocatedStorage"
                                    onChange={(e) => {
                                        let val = parseInt(e.target.value);
                                        func("MaxAllocatedStorage", val);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>MultiAZ</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        func("MultiAZ", ("true" == val));
                                    }}
                                >
                                    <option value="" disabled selected>
                                        MultiAZ
                            </option>
                                    <option>True</option>
                                    <option>False</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>BackupRetentionPeriod</Form.Label>
                                <Form.Control
                                    placeholder="Enter BackupRetentionPeriod"
                                    onChange={(e) => {
                                        let val = parseInt(e.target.value);
                                        func("BackupRetentionPeriod", val);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>CopyTagsToSnapshot</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        func("CopyTagsToSnapshot", ("true" == val));
                                    }}
                                >
                                    <option value="" disabled selected>
                                        CopyTagsToSnapshot
                            </option>
                                    <option>True</option>
                                    <option>False</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>AutoMinorVersionUpgrade</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        func("AutoMinorVersionUpgrade", ("true" == val));
                                    }}
                                >
                                    <option value="" disabled selected>
                                        AutoMinorVersionUpgrade
                            </option>
                                    <option>True</option>
                                    <option>False</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>DeletionProtection</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => {
                                        let val = e.target.value;
                                        func("DeletionProtection", ("true" == val));
                                    }}
                                >
                                    <option value="" disabled selected>
                                        DeletionProtection
                            </option>
                                    <option>True</option>
                                    <option>False</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>

                        <Button variant="warning" onClick={async () => {
                            console.log(await summaryType[this.state.resource]["manage"].update(this.props.modkey, tmp_data))
                        }}>
                            Modify
                </Button>
                    </>
                )
            }
        }

    }

    render() {
        return (
            <>
                {this.modifyInstance(this.state.resource, this.state.data)}
            </>
        )
    }
}

class Detail extends Component {
    constructor(props) {
        super(props);

        let key_id = this.props.match.params.key_id;
        let resource = this.props.match.params.type;
        let resource_id = this.props.match.params.id;

        this.state = {
            key_name: key_id,
            clickNum: 0,
            activeContent: 0,
            resource: resource,
            endpoint: `${process.env.REACT_APP_SERVER_URL}/api/cloud/data/${resource}?key_id=${key_id}&resource_id=${resource_id}`,
        };

    }

    async componentDidMount() {
        let response = await (await fetch(this.state.endpoint)).json();
        let resource = this.state.resource
        let data = response.data

        if (resource == 'server') data = data['Instances'][0]

        this.setState({
            data: data,
            rootData: data,
            keyList: [resource]
        });
    }

    tabcontent(index, url, resource_data) {
        let tmp = this.state.key_name
        let content = {
            0: <ContentSummary endpoint={url} resource={resource_data} />,
            1: <ContentUpdate endpoint={url} resource={resource_data} modkey={tmp} />
        }
        return content[index]
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
                            {this.tabcontent(activeContent, this.state.endpoint, this.state.resource)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;