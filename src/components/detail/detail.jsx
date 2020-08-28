import React, { Component } from 'react';
import './detail.scss';
import Sidebar from '../sidebar';

const tabName = ['개요','서브넷','포트'];

class ContentSummary extends Component{
    render(){
        return(
            <div>
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

const tabContent = {
    0 : <ContentSummary />,
    1 : <ContentSubnet />,
    2 : <ContentPort />    
}


class Detail extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            clickNum : 0,
            activeContent : 0
        }
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
                            {tabContent[activeContent]}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;