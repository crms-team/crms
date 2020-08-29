import React, { Component } from 'react';
import Sidebar from '../sidebar';
import {withRouter} from 'react-router-dom'

import './detail.scss';


const tabName = ['개요','서브넷','포트'];

class ContentSummary extends Component{
    render(){
        return(
            <div>
                {JSON.stringify(this.props.data)}
                <>1번째</>
            </div>
        )
    }
}

class ContentSubnet extends Component{
    render(){
        return(
            <div>
                <>2번째</>
            </div>
        )
    }
}

class ContentPort extends Component{
    render(){
        return(
            <div>
                <>3번째</>
            </div>
        )
    }
}

class Detail extends Component{   
    constructor(props){
        super(props);
        this.state = {
            clickNum : 0,
            activeContent : 0,
            data: undefined,
        }
    }

    async getDetail() {
        let key_id=this.props.match.params.key_id;
        let resource=this.props.match.params.type;
        let resource_id=this.props.match.params.id;
        let keys=JSON.parse(localStorage.getItem('key'));
        let vendor;
        for(let key of keys){
            if(key.key==key_id){
                vendor=key.vendor
                break
            }
        }
        let url=`http://localhost:4000/api/cloud/data/${vendor}/${resource}?key_id=${key_id}&resource_id=${resource_id}&type=data`
        let resopnse=await (await fetch(url)).json()
        return resopnse.data
    }

    async componentDidMount(){
        this.setState({
            data : await this.getDetail()
        })
    }
    

    tabClicked = (idx) => {
        this.setState({
            clickNum : idx
        });
    };

    showContent = (idx) => {
        this.setState({
            activeContent : idx
        });
    }

    render(){

        const { clickNum, activeContent } = this.state;

        return(
            <div className='detail-container'>
                <Sidebar />
                <div className='tab-container'>
                    <h2 className='tab-title'>Detail Page</h2>
                    <ul className='tabName'>
                        {
                            tabName.map((tabName, idx) => {
                                return( <li 
                                            className={ 'tab ' + ( clickNum === idx ? 
                                                "clicked" : "noClicked") }
                                            onClick={ () => { 
                                                this.tabClicked(idx); 
                                                this.showContent(idx);
                                            }}>
                                            {tabName}
                                        </li> )
                            })
                        }
                    </ul>

                    <div className='tab-content-container'>
                        <div className='tab-content'>
                            {activeContent == 0 && <ContentSummary data={this.state.data} /> }
                            {activeContent == 1 && <ContentSubnet data={this.state.data} /> }
                            {activeContent == 2 && <ContentPort data={this.state.data} /> }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;