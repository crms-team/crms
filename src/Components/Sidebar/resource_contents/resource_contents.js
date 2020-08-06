import React,{Component} from 'react';
import './contents.css';
import {showmodal, ShowModal} from '../../../actions';
import {connect} from 'react-redux';

const resources = {
    aws_compute:[
        {
            id:'ec2',
            width:'20px',
            height:'20px',
            vpc:'',
            subnet:'',
            security:'',
            region:'',
            platform:'',
            instype:'',
            size:'',
            bliling:0
        }
    ],
    aws_setting:[
        {
            id:'VPC',
            width:'20px',
            height:'20px',
            vpc:'',
            subnet:'',
            security:'',
            region:'',
            platform:'',
            instype:'',
            size:'',
            bliling:0
        },
        {
            id:'SecurityGroup',
            width:'20px',
            height:'20px',
            vpc:'',
            subnet:'',
            security:'',
            region:'',
            platform:'',
            instype:'',
            size:'',
            bliling:0
        },
        {
            id:'Subnet',
            width:'20px',
            height:'20px',
            vpc:'',
            subnet:'',
            security:'',
            region:'',
            platform:'',
            instype:'',
            size:'',
            bliling:0
        },
    ],
    aws_storage:[
        {
            id:'s3',
            width:'20px',
            height:'20px',
            volume:'',
            platform:'',
            instype:'',
            size:'',
            bliling:0
        }
    ],
    aws_networking:[

    ],
    aws_database:[

    ],
    aws_analytics:[

    ],
    aws_appservices:[

    ]
    }


class Resource extends React.Component{
    constructor(props){
        super(props);

        this.state={
            restype:"hi"
        }

        this.onshowres=this.onshowres.bind(this);
    }

    render(){
        return(
            <div className="Resource">
            <hr />
                { Object.keys(resources).map((v)=> {
                    return (
                            <div>   
                                <button className="List">{v}</button>
                                {
                                    resources[v].map((t)=>{
                                        return (
                                            <button onClick={this.onshowres} className="resource">{t.id}</button>
                                        )
                                    }) 
                                }
                                <hr/>
                            </div>
                        )
                    }) 
                }
            </div>
        );
    }

    onshowres(e){  
        this.setState({restype:e.target.innerText});
        this.props.onupdateshow(e.target.innerText);
    }
}

let mapDispatchToProps = (dispatch) =>{
    return{
        onupdateshow: (value) => dispatch(ShowModal(value))
    };
}

Resource = connect(undefined,mapDispatchToProps)(Resource);

export default Resource;