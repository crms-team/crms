import React, { Component } from "react";
import Sidebar from "../sidebar";
import {
    Button,
    Form,
} from "react-bootstrap";
import "./detail.scss";
import {summaryType} from "../../manager"

const tabName = ["Information", "Modify"];

const thStyle = { width: "46%", "text-align": "right", paddingRight: "4%" };
const tdStyle = { width: "46%", "text-align": "left", paddingRight: "4%" };

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
                <table style={{
                    width: "100%",
                    wordWrap: "break-word",
                    tableLayout: "fixed",
                }}>
                    <tr>
                        {key.map((v) => {
                            return <th>{v}</th>;
                        })}
                    </tr>

                    {data.map((v) => {
                        return (
                            <tr>
                                {key.map((kv) => {
                                    let type = typeof(v[kv])
                                    if (type == "object"){
                                        return <td>{JSON.stringify(v[kv])}</td>
                                    }
                                    return <td>{v[kv]}</td>;
                                })}
                            </tr>
                        );
                    })}
                </table>
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
            <div
                style={{
                    width: "39%",
                    height: "98%",
                    padding: "1%",
                    position: 'fixed',
                    right: 0,
                    marginRight: '4%'
                }}
            >
                {key}
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

            resource: '',
            keyList: [],

            objectKey: "",
            objectData: [],
        };
        this.setState = this.setState.bind(this);
        this.clickEvent = this.clickEvent.bind(this);
    }

    async componentDidMount() {
        let response = await (await fetch(this.props.endpoint)).json();
        let resource = this.props.resource
        let data = response.data

        if (resource == 'ec2') data = data['Instances'][0]

        this.setState({ 
            data: data,
            rootData: data, 
            keyList: [resource]
        });
    }

    getViewData(keyList){
        let data = this.state.rootData

        for (let i = 1; i < keyList.length; i++) {
            data = data[keyList[i]]
        }

        return data
    }

    clickEvent(key, data, type) {
        if (type == 'list') {
            this.setState({
                objectKey: key,
                objectData: data,
            });    
        } else {
            let keyList = this.state.keyList
            keyList.push(key)
            this.setState({
                objectKey: '',
                objectData: [],
                keyList: keyList,
                data: this.getViewData(keyList)
            });    
    
        }
    }

    linkClickEvent(idx) {
        let keyList = this.state.keyList
        keyList = keyList.slice(0, idx)
        this.setState({
            keyList: keyList,
            data: this.getViewData(keyList)
        })
    }

    render() {
        let data = this.state.data != undefined ? this.state.data : {
            state: 'Creating....'
        };
        let keys = Object.keys(data);
        let keyList = this.state.keyList

        return (
            <>
                <div style={{width: "100%", height: "5%"}}>
                     {
                        keyList.map((v, idx) => {
                            return <span onClick={()=>this.linkClickEvent(idx + 1)}> / <span style={{color: '#ffc14d'}}>{v}</span></span>
                        })
                    }
                </div>
                <div style={{ width: "100%", float: "left", marginBottom: "20px" }}>
                    {   
                        keys.length != 0 && 
                        <table
                        style={{
                            width: "48%",
                            wordWrap: "break-word",
                            tableLayout: "fixed",
                            float: 'left',
                            margin: '1%'
                        }}
                    >
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
                                                 color: '#ffc14d'
                                             }}
                                                onClick={() => {
                                                    this.clickEvent(
                                                        val,
                                                        data[val],
                                                        Testtype
                                                    );
                                                }}
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
                                            { data[val] != null ?data[val].toString() : "null"}
                                        </td>
                                    </tr>
                                );
                            }
                        })}
                    </table>
                    }
                    { keys.length == 0 && <div>There is no data to display</div> }
                <ObjectView
                    objectKey={this.state.objectKey}
                    objectData={this.state.objectData}
                />
                </div>
            </>
        );
    }
}

class ContentUpdate extends Component{
    constructor(props){
        super(props)
        this.state={}
        this.modifyInstance=this.modifyInstance.bind(this);
    }

    async componentDidMount() {
        let response = await (await fetch(this.props.endpoint)).json();
        let resource = this.props.resource
        let data = response.data
        let ec2list;
        let ec2item=[];

        if (resource == 'ec2') data = data['Instances'][0]
        else if(resource =="ebs"){
            ec2list = await this.getEC2List()
            for(let i=0;i<ec2list.Instances.length;i++){
                ec2item.push(<option>{ec2list.Instances[i].InstanceId}</option>)
            }
        }

        this.setState({ 
            data: data,
            resource: resource,
            ec2list: ec2list,
            ec2item: ec2item
        });
    }

    async getEC2List(){
        let url=`${process.env.REACT_APP_SERVER_URL}/api/cloud/data/ec2?key_id=${this.props.modkey}`
        let tmp_ec2 = await fetch(url).then(res=>res.json());
        return tmp_ec2.data[0]
    }

    modifyInstance(resource,data){
        let tmp_data={};
        let tmp_attach={};
        function func(key,val){
            tmp_data[key]=val
        }

        if(resource=="ec2"){
            return (
            <>
                <Form>
                <Form.Group controlId="formBasicEmail">
                        <Form.Label>Ebs DeviceName</Form.Label>
                        <Form.Control
                            placeholder="Enter Ebs DeviceName"
                            onChange={(e) => {
                                let tmp=[
                                    {
                                        DeviceName: e.target.value,
                                        Ebs: {
                                            DeleteOnTermination: this.state.data.BlockDeviceMappings[0].DeleteOnTermination,
                                            VolumeId: this.state.data.BlockDeviceMappings[0].Ebs.VolumeId
                                          },
                                    },
                                ]
                                func("BlockDeviceMappings",tmp)
                            }}
                        />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Ebs DeleteOnTermination</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp=[
                                    {
                                        DeviceName: this.state.data.BlockDeviceMappings[0].DeviceName,
                                        Ebs: {
                                          DeleteOnTermination: ("true"==e.target.value),
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
                                let tmp={
                                    Value: ("true"==e.target.value)
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
                                let tmp={
                                    Value: ("true"==e.target.value)
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
                                let tmp={
                                    Value: ("true"==e.target.value)
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
                <Button variant="warning" onClick={()=>{
                    tmp_data.InstanceId = this.state.data.InstanceId
                    summaryType[this.state.resource]["manage"].update(this.props.modkey,tmp_data)
                }}>
                    Modify
                </Button>     
            </>   
        )}
        else if(resource=="ebs"){
            return (
            <>
                <Form>
                <Form.Group controlId="formBasicEmail">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                            placeholder="Enter Size"
                            onChange={(e) => {
                                let tmp=parseInt(e.target.value)
                                func("Size",tmp)
                            }}
                        />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                        <Form.Label>Iops</Form.Label>
                        <Form.Control
                            placeholder="Enter Iops"
                            onChange={(e) => {
                                let tmp=parseInt(e.target.value)
                                func("Iops",tmp)
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
                                if(e.target.value!=""){
                                    for(let i=0;i<this.state.ec2list.Instances.length;i++){
                                        if(this.state.ec2list.Instances[i].InstanceId==e.target.value){
                                            tmp_attach.Device=this.state.ec2list.Instances[i].RootDeviceName
                                            tmp_attach.InstanceId=e.target.value
                                            tmp_attach.VolumeId = this.state.data.VolumeId   
                                        }
                                    }
                                }
                                else{
                                    tmp_attach={}
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
                <Button variant="warning" onClick={()=>{
                    tmp_data.VolumeId = this.state.data.VolumeId
                    summaryType[this.state.resource]["manage"].update(this.props.modkey,tmp_data)
                    if(tmp_attach!={}){
                        if(Object.keys(tmp_attach).length>1){
                            summaryType[this.state.resource]["manage"].attach(this.props.modkey,tmp_attach)
                        }
                        else{
                            summaryType[this.state.resource]["manage"].detach(this.props.modkey,tmp_attach)
                        }
                    }
                }}>
                    Modify
                </Button>
            </>   
        )}
        else if(resource=="vpc"){
            return (
            <>
                <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>EnableDnsHostnames</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp={
                                    Value : ("true"==e.target.value)
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
                                let tmp={
                                    Value : ("true"==e.target.value)
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
                <Button variant="warning" onClick={()=>{
                    console.log(this.state.data)
                    tmp_data.VpcId = this.state.data.VpcId
                    summaryType[this.state.resource]["manage"].update(this.props.modkey,tmp_data)
                }}>
                    Modify
                </Button>
            </>   
        )}
        else if(resource=="subnet"){
            return (
            <>
                <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>AssignIpv6AddressOnCreation</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp={
                                    Value : ("true"==e.target.value)
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
                                let tmp=e.target.value
                                func("CustomerOwnedIpv4Pool",tmp)
                            }}
                        />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>MapCustomerOwnedIpOnLaunch</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={(e) => {
                                let tmp={
                                    Value : ("true"==e.target.value)
                                }
                                func("CustomerOwnedIpv4Pool",this.state.data.CustomerOwnedIpv4Pool)
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
                                let tmp={
                                    Value : ("true"==e.target.value)
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
                <Button variant="warning" onClick={async ()=>{
                    tmp_data.SubnetId = this.state.data.SubnetId
                    console.log(await summaryType[this.state.resource]["manage"].update(this.props.modkey,tmp_data))
                }}>
                    Modify
                </Button>
            </>   
        )}
    }

    render(){
        return(
         <>
            {this.modifyInstance(this.state.resource,this.state.data)}
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
            key_name:key_id,
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

        if (resource == 'ec2') data = data['Instances'][0]

        this.setState({ 
            data: data,
            rootData: data, 
            keyList: [resource]
        });
    }

    tabcontent(index,url,resource_data){
        let tmp=this.state.key_name
        let content={
            0 : <ContentSummary endpoint={url} resource={resource_data}/>,
            1 : <ContentUpdate endpoint={url} resource={resource_data} modkey={tmp}/>
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
                            {this.tabcontent(activeContent,this.state.endpoint,this.state.resource)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;