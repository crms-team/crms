import React,{Component} from 'react';
import './Sidebar.css'
import Resource from './resource_contents/resource_contents'
import BudgetContents from './budget_contents/budget_contents'

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state={
            resource:true,
            budget:false,
            text:''
        }
    }


    render(){
        return(
            <div className="Sidebar">
                <div className="header">
                    <b>CRMS</b>
                    <br/>
                <button className="clresource" onClick={()=>{
                    this.setState({
                        resource: true,
                        budget: false
                    })
                }}>
                    리소스
                </button>
                <button className="budget"onClick={()=>{
                    this.setState({
                        resource: false,
                        budget: true
                    })
                }}>
                    예산
                </button>
                </div>
                { this.state.resource && <Resource/> }
                { this.state.budget && <BudgetContents/> }
            </div>
        );
    }
}

export default Sidebar;