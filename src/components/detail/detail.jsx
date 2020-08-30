import React, { Component } from 'react';
import Sidebar from '../sidebar';
import { withRouter } from 'react-router-dom'

import './detail.scss';


const tabName = ['Information', 'Object View'];

const thStyle = { width: '46%', 'text-align': 'right', 'paddingRight': '4%' }
const tdStyle = { width: '46%', 'text-align': 'left', 'paddingRight': '4%'}


function listToString(data) {

    return <>
        {
            data.map(v=>{
                return <p>{JSON.stringify(v)}</p>
            })
        }
    </>
}

class ListTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let data = this.props.data
        let key = []
        if (data.length > 0){
            key = Object.keys(data[0])
            return <table>
            <tr>
                {
                    key.map(v=> {
                        return <th>{v}</th>
                    })
                }
            </tr>


            {data.map((v) => {
                return (
                    <tr>
                        {
                            key.map(kv=>{
                                return <td>{v[kv]}</td>
                            })
                        }
                    </tr>
                )
            })}
        </table>
    } else {
        return <div>There is no data to display</div>
    }

        }
}

class JsonTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let data = this.props.data

        return <table>
            {
                Object.keys(data).map(v=>{
                    return <tr>
                        <th>{v}</th>
                        <td>{typeof(data[v]) == "object" ? listToString(data[v]) : data[v]}</td>
                    </tr>
                })
            }

        </table>
    }
}


class ObjectView extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let key = this.props.objectKey

        if (key == ''){
            return (
                <></>
            )
        }
        let data = this.props.objectData
        let type = 'length' in data  

        return(
            <div style={{width:"48%",height:"98%",float:"left", padding: "1%"}}>
                { key }
                <hr/>
                { type && <ListTable data={data} />}
                { !type && <JsonTable data={data}/>}
            </div>
        )
    }
}

class ContentSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],

            objectKey: '',
            objectData: []
        }
        this.setState = this.setState.bind(this)
        this.clickEvent = this.clickEvent.bind(this)
    }

    async componentDidMount() {
        let response = await (await fetch(this.props.endpoint)).json()
        this.setState({ data: response.data })
    }

    clickEvent(key, data) {
        this.setState({
            objectKey: key,
            objectData: data
        })
    }

    render() {
        let data = this.state.data
        let keys = Object.keys(data)
        return (
            <>
            <div style={{width: "50%", float:"left"}}>
                <table style={{width: "100%", wordWrap: 'break-word', tableLayout: 'fixed'}}>
                    {
                        keys.map((val, idx) => {
                            let type = typeof(data[val])
                            
                            if (type == "object") {
                                let Testtype = 'length' in data[val] ? "list" : "json"
                                return (
                                    <tr>
                                        <th style={thStyle}>{val}</th> 
                                        <td style={tdStyle}>
                                            <div onClick={()=>{ this.clickEvent(val, data[val])}}>view Object {Testtype}</div>
                                        </td>
                                    </tr>
                                )
                            } else { 
                                return (
                                    <tr>
                                        <th style={thStyle}>{val}</th> <td style={tdStyle}>{data[val].toString()}</td>
                                    </tr>
                                )    
                            }
                        })

                    }
                </table>
            </div>
            <ObjectView objectKey={this.state.objectKey} objectData={this.state.objectData}/>
            </>
        )
    }
}

class ContentSubnet extends Component {
    render() {
        return (
            <div>
                <>2번째</>
            </div>
        )
    }
}

class ContentPort extends Component {
    render() {
        return (
            <div>
                <>3번째</>
            </div>
        )
    }
}

class Detail extends Component {
    constructor(props) {
        super(props);

        let key_id = this.props.match.params.key_id;
        let resource = this.props.match.params.type;
        let resource_id = this.props.match.params.id;
        let keys = JSON.parse(localStorage.getItem('key'));
        let vendor;
        for (let key of keys) {
            if (key.key == key_id) {
                vendor = key.vendor
                break
            }
        }

        this.state = {
            clickNum: 0,
            activeContent: 0,
            endpoint: `http://localhost:4000/api/cloud/data/${vendor}/${resource}?key_id=${key_id}&resource_id=${resource_id}&type=data`,
        }
    }


    tabClicked = (idx) => {
        this.setState({
            clickNum: idx
        });
    };

    showContent = (idx) => {
        this.setState({
            activeContent: idx
        });
    }

    render() {

        const { clickNum, activeContent } = this.state;

        return (
            <div className='detail-container'>
                <Sidebar />
                <div className='tab-container'>
                    <h2 className='tab-title'>Detail Page</h2>
                    <ul className='tabName'>
                        {
                            tabName.map((tabName, idx) => {
                                return (<li
                                    className={'tab ' + (clickNum === idx ?
                                        "clicked" : "noClicked")}
                                    onClick={() => {
                                        this.tabClicked(idx);
                                        this.showContent(idx);
                                    }}>
                                    {tabName}
                                </li>)
                            })
                        }
                    </ul>

                    <div className='tab-content-container' style={{'overflowY': 'scroll'}}>
                        <div className='tab-content'>
                             <ContentSummary endpoint={this.state.endpoint} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;