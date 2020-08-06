import React,{Component} from 'react';
import './budget_contents.css';

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


class BudgetContents extends Component{

    render(){
        return(
            <div className="budgetlist">
            <hr />
                { Object.keys(resources).map((v)=> {
                    return (
                            <div>   
                                <button className="List">{v}</button>
                                {
                                    resources[v].map((t)=>{
                                        return (
                                            <button className="budgetresource">{t.id}</button>
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

export default BudgetContents;