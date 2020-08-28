import React, { Component } from "react";
import {
    Button,
    Modal,
    ListGroup,
    Tab,
    Row,
    Col,
    Form,
    Pagination,
} from "react-bootstrap";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Index extends React.Component {
    render() {
        return (
            <>
                <label for="recipient-name" class="col-form-label">
                    Select Resource{" "}
                </label>
                <select
                    className="form-control"
                    name="instance"
                    onChange={this.props.click}
                >
                    <option value="" disabled selected>
                        Resource
                    </option>
                    <option value="EC2">EC2</option>
                    <option value="VPC">VPC</option>
                    <option value="Subnet">Subnet</option>
                    <option value="SecuriyGroup">Security Group</option>
                    <option value="RDS">RDS</option>
                    <option value="S3">S3</option>
                </select>
            </>
        );
    }
}

class SelVendor extends React.Component {
    constructor() {
        super();
        this.state = {
            key: JSON.parse(localStorage.getItem("key")),
        };
    }

    dynamicoption() {
        let items = [];
        var keys = this.state.key;
        for (let i = 0; i < keys.length; i++) {
            items.push(<option value={keys[i].vendor}>{keys[i].key}</option>);
        }
        return items;
    }

    render() {
        return (
            <>
                <label for="recipient-name" class="col-form-label">
                    Select Vendor{" "}
                </label>
                <select
                    className="form-control"
                    name="instance"
                    onChange={this.props.choose}
                >
                    <option value="" disabled selected>
                        {" "}
                        Vendor{" "}
                    </option>
                    {this.dynamicoption()}
                </select>
            </>
        );
    }
}

class Nextbut extends React.Component {
    render() {
        return (
            <>
                <Button variant="warning" onClick={this.props.click_but}>
                    Next
                </Button>
            </>
        );
    }
}

class Submitbut extends React.Component {
    render() {
        return (
            <>
                <Button variant="warning" onClick={this.props.submit_but}>
                    Submit
                </Button>
            </>
        );
    }
}

class EC2 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            key_name:this.props.key_name
        }

        this.func = this.props.func.bind(this);
    }

    render() {
        let func = this.func;
        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Resource Name</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            onChange={(e) => {
                                let tmp = [
                                    {
                                        ResourceType: "instance",
                                        Tags: [
                                            {
                                                Key: "Name",
                                                Value: "",
                                            },
                                        ],
                                    },
                                ];
                                tmp[0].Tags[0].Value = e.target.value;
                                this.func("TagSpecifications", tmp);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>AMI</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                console.log(this.props.dataset)
                                this.func("ImageId", val);
                            }}
                        >
                            <option value="" disabled selected>
                                Ami
                            </option>
                            <option>ami-05a4cce8936a89f06</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("InstanceType", val);
                            }}
                        >
                            <option value="" disabled selected>
                                InstanceType
                            </option>
                            <option>m5d.large</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>EBS size</Form.Label>
                        <Form.Control
                            placeholder="Enter Size"
                            onChange={(e) => {
                                let tmp = [
                                    {
                                        DeviceName: "/dev/sdh",
                                        Ebs: {
                                            VolumeSize: 0,
                                        },
                                    },
                                ];
                                tmp[0].Ebs.VolumeSize = e.target.value;
                                this.func("BlockDeviceMappings", tmp);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>EBS Type</Form.Label>
                        <Form.Control as="select">
                            <option value="" disabled selected>
                                EBS Type
                            </option>
                            <option>범용 SSD(gp2)</option>
                            <option>프로비저닝된 IOPS SSD(io1)</option>
                            <option>마그네틱(standard)</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>VPC</Form.Label>
                        <Form.Control as="select">
                            <option value="" disabled selected>
                                VPC
                            </option>
                            <option>test_vpc</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Subnet</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("SubnetId", val);
                            }}
                        >
                            <option value="" disabled selected>
                                Subnet
                            </option>
                            <option>test_sub</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>SecurityGroup</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp = [];
                                tmp.push(e.target.value);
                                this.func("SecurityGroupIds", tmp);
                            }}
                        >
                            <option value="" disabled selected>
                                SecurityGroup
                            </option>
                            <option>test_sg</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>KeyName</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("KeyName", val);
                            }}
                        >
                            <option value="" disabled selected>
                                KeyName
                            </option>
                            <option>test_sg</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class RDS extends React.Component {
    constructor(props) {
        super(props);
        this.func = this.props.func.bind(this);
    }

    render() {
        let func = this.func;
        return (
            <>
                <Tab.Container
                    id="list-group-tabs-example"
                    defaultActiveKey="#tag"
                >
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Engine</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("Engine", val);
                            }}
                        >
                            <option value="" disabled selected>
                                Engine
                            </option>
                            <option>Amazon Aurora</option>
                            <option>MySQL</option>
                            <option>MariaDB</option>
                            <option>PostgreSQL</option>
                            <option>Oracle</option>
                            <option>Microsoft SQL Server</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>EngineVersion</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("EngineVersion", val);
                            }}
                        >
                            <option value="" disabled selected>
                                EngineVersion
                            </option>
                            <option></option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>DBInstanceIdentifier</Form.Label>
                        <Form.Control
                            placeholder="Enter DBInstanceIdentifier"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("DBInstanceIdentifier", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>MasterUsername</Form.Label>
                        <Form.Control
                            placeholder="Enter MasterUsername"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("MasterUsername", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>MasterUserPassword</Form.Label>
                        <Form.Control
                            placeholder="Enter MasterUserPassword"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("MasterUserPassword", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>DBInstanceClass</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("DBInstanceClass", val);
                            }}
                        >
                            <option value="" disabled selected>
                                DBInstanceClass
                            </option>
                            <option></option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>AllocatedStorage</Form.Label>
                        <Form.Control
                            placeholder="Enter AllocatedStorage"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("AllocatedStorage", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>StorageEncrypted</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("StorageEncrypted", val);
                            }}
                        >
                            <option value="" disabled selected>
                                StorageEncrypted
                            </option>
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>StorageType</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("StorageType", val);
                            }}
                        >
                            <option value="" disabled selected>
                                StorageType
                            </option>
                            <option>범용 (SSD)</option>
                            <option>프로비저닝된 IOPS (SSD)</option>
                            <option>마그네틱</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Iops</Form.Label>
                        <Form.Control
                            placeholder="Enter Iops"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("Iops", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Iops</Form.Label>
                        <Form.Control
                            placeholder="Enter MaxAllocatedStorage"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("MaxAllocatedStorage", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>MultiAZ</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("MultiAZ", val);
                            }}
                        >
                            <option value="" disabled selected>
                                MultiAZ
                            </option>
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>SecurityGroup</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp = [];
                                tmp.push(e.target.value);
                                this.func("DBSecurityGroups", tmp);
                            }}
                        >
                            <option value="" disabled selected>
                                SecurityGroups
                            </option>
                            <option>test_sg</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>VpcSecurityGroupIds</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp = [];
                                tmp.push(e.target.value);
                                this.func("VpcSecurityGroupIds", tmp);
                            }}
                        >
                            <option value="" disabled selected>
                                VpcSecurityGroupIds
                            </option>
                            <option>test_sg</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>DBName</Form.Label>
                        <Form.Control
                            placeholder="Enter DBName"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("DBName", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>DBParameterGroupName</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp = [];
                                tmp.push(e.target.value);
                                this.func("DBParameterGroupName", tmp);
                            }}
                        >
                            <option value="" disabled selected>
                                DBParameterGroupName
                            </option>
                            <option>test_sg</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>OptionGroupName</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp = [];
                                tmp.push(e.target.value);
                                this.func("OptionGroupName", tmp);
                            }}
                        >
                            <option value="" disabled selected>
                                OptionGroupName
                            </option>
                            <option>test_sg</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>BackupRetentionPeriod</Form.Label>
                        <Form.Control
                            placeholder="Enter BackupRetentionPeriod"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("BackupRetentionPeriod", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>CopyTagsToSnapshot</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("CopyTagsToSnapshot", val);
                            }}
                        >
                            <option value="" disabled selected>
                                CopyTagsToSnapshot
                            </option>
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Port</Form.Label>
                        <Form.Control
                            placeholder="Enter Port"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("Port", val);
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>AutoMinorVersionUpgrade</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("AutoMinorVersionUpgrade", val);
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
                        <Form.Label>DBSubnetGroupName</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp = e.target.value;
                                this.func("DBSubnetGroupName", tmp);
                            }}
                        >
                            <option value="" disabled selected>
                                DBSubnetGroupName
                            </option>
                            <option>basic</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>DeletionProtection</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let val = e.target.value;
                                this.func("DeletionProtection", val);
                            }}
                        >
                            <option value="" disabled selected>
                                DeletionProtection
                            </option>
                            <option>True</option>
                            <option>False</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tags</Form.Label>
                        <Form.Control
                            placeholder="Enter name"
                            onChange={(e) => {
                                let tmp = [
                                    {
                                        Key: "Name",
                                        Value: "",
                                    },
                                ];
                                tmp[0].Value = e.target.value;
                                this.func("Tags", tmp);
                            }}
                        />
                    </Form.Group>
                </Tab.Container>
            </>
        );
    }
}

class CreateModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHide: false,
            vendor: "",
            key_name:"",
            type: "",
            data: {},
            component: <SelVendor choose={this.select_vendor.bind(this)} />,
            but_type: <Nextbut click_but={this.clickNextModal.bind(this)} />,
        };

        this.select_vendor = this.select_vendor.bind(this);
        this.clickNextModal = this.clickNextModal.bind(this);
        this.clickSubmitbut = this.clickSubmitbut.bind(this);
        this.handleModalShowHide = this.handleModalShowHide.bind(this);
    }

    handleModalShowHide() {
        if (this.state.type != "") {
            this.setState({
                type: "",
                vendor: "",
                component: <SelVendor choose={this.select_vendor.bind(this)} />
            });
        }
        this.setState({
            showHide: !this.state.showHide,
            but_type: <Nextbut click_but={this.clickNextModal.bind(this)} />
        });
    }

    select_vendor(e) {
        var index = e.nativeEvent.target.selectedIndex;
        this.setState({ 
            vendor: e.target.value,
            key_name:e.nativeEvent.target[index].text
         });
    }

    select_type(e) {
        this.setState({ type: e.target.value });
    }

    func(key, value) {
        this.state.data[key] = value;
        this.setState({ data: this.state.data });
    }

    clickNextModal() {
        if (this.state.vendor == "aws") {
            this.setState({
                component: <Index click={this.select_type.bind(this)} />,
            });
        }
        if (this.state.type == "EC2") {
            this.setState({
                component: <EC2 func={this.func.bind(this)} dataset={this.props.dataset} key_name={this.state.key_name}/>,
                but_type: (
                    <Submitbut submit_but={this.clickSubmitbut.bind(this)} />
                ),
            });
        } else if (this.state.type == "RDS") {
            this.setState({
                component: <RDS func={this.func.bind(this)} />,
                but_type: (
                    <Submitbut submit_but={this.clickSubmitbut.bind(this)} />
                ),
            });
        }
    }

    clickSubmitbut() {
        console.log(this.state.data);
        this.setState({ showHide: !this.state.showHide, data: {} });
    }

    render() {
        return (
            <div>
                <Button
                    className="Modal"
                    variant="warning"
                    onClick={() => this.handleModalShowHide()}
                >
                    Create
                </Button>

                <Modal
                    show={this.state.showHide}
                    size="lg"
                    dialogClassName="width :50%"
                    dialogClassName="height:50%"
                    centered
                >
                    <Modal.Header
                        closeButton
                        onClick={() => this.handleModalShowHide()}
                    >
                        <Modal.Title>Create {this.state.type}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.component}</Modal.Body>
                    <Modal.Footer>{this.state.but_type}</Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CreateModal;
