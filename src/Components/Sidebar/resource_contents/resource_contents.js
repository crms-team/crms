import React,{Component} from 'react';
import './contents.css';

const resources = {
    common:[
        {
            id:'block',
            width:'20px',
            height:'20px',
            vpc:'',
            subnet:'',
            security:'',
        },
        {
            id:'text',
            size:25,
            text:'text',
            vpc:'',
            subnet:'',
            security:''
        }
    ],
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


class Resource extends Component{
    constructor(props){
        super(props) 
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
                                            <button className="resource">{t.id}</button>
                                        )
                                    }) 
                                }
                                <hr />
                            </div>
                    )
                }) }
            </div>
        );
    }

}

export default Resource;